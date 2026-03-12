import React from 'react';

interface SignupLayoutProps {
  children: [React.ReactNode, React.ReactNode];
}

export function SignupLayout({ children }: SignupLayoutProps) {
  const [leftPanel, rightPanel] = children;

  return (
    <div className="flex min-h-screen">
      {/* Left Panel - Visual Storytelling */}
      <div className="hidden lg:flex lg:flex-1 bg-gradient-to-br from-blue-600 to-purple-700 relative overflow-hidden">
        {leftPanel}
      </div>
      
      {/* Right Panel - Signup Form */}
      <div className="flex-1 lg:flex-[0.6] flex items-center justify-center p-4 sm:p-6 lg:p-8">
        <div className="w-full max-w-md">
          {rightPanel}
        </div>
      </div>
    </div>
  );
}