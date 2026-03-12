import Image from "next/image";
import { SignupFlow } from "./components/SignupFlow";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-zinc-50 dark:bg-black">
    <SignupFlow />
  </main>
  );
}
