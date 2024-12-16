import Image from "next/image";
import HeaderTextSplashScreen from "./components/HeaderTextSplashScreen";

export default function Home() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 font-[family-name:var(--font-geist-sans)]">
      <main className="text-center">
        <HeaderTextSplashScreen />
      </main>
    </div>
  );
}
