"use client";

// page.js

import { useEffect, useState, useRef } from "react";
import Cookies from "js-cookie";
import { v4 as uuidv4 } from "uuid";
import { motion } from "framer-motion";
import HeaderTextSplashScreen from "./components/HeaderTextSplashScreen";
import { Moon, Sun } from "lucide-react";
import SectionTwo from "./components/SectionTwo";
import SectionThree from "./components/SectionThree";
import { ReactLenis, useLenis } from 'lenis/react'
import { cancelFrame, frame } from 'framer-motion';


export default function Home() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [cursorVariant, setCursorVariant] = useState("default");
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Check if user-id cookie is set, if not, set it
    const userId = Cookies.get("user-id");
    if (!userId) {
      Cookies.set("user-id", uuidv4(), { expires: 365 });
    }

    // Determine initial theme based on saved cookie or system preference
    const savedTheme = Cookies.get("theme");
    if (savedTheme === "dark") {
      document.documentElement.classList.add("dark");
      setIsDarkMode(true);
    } else if (savedTheme === "light") {
      document.documentElement.classList.remove("dark");
      setIsDarkMode(false);
    } else {
      // No saved theme, check system preference
      const prefersDark =
        window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches;
      if (prefersDark) {
        document.documentElement.classList.add("dark");
        setIsDarkMode(true);
      } else {
        document.documentElement.classList.remove("dark");
        setIsDarkMode(false);
      }
    }

    const mouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", mouseMove);
    return () => {
      window.removeEventListener("mousemove", mouseMove);
    };
  }, []);

  const variants = {
    default: {
      x: mousePosition.x - 10,
      y: mousePosition.y - 10,
      backgroundColor: isDarkMode ? "#ffffff" : "#F9A8D4",
      transition: {
        type: "spring",
        stiffness: 580,
        damping: 30,
      },
    },
    text: {
      x: mousePosition.x - 75,
      y: mousePosition.y - 75,
      width: 100,
      height: 100,
      backgroundColor: isDarkMode ? "#ffffff" : "#F9A8D4",
      mixBlendMode: "difference",
      transition: {
        type: "spring",
        stiffness: 500,
        damping: 28,
      },
    },
  };

  const lenisRef = useRef()

  useEffect(() => {
    function update(time) {
      lenisRef.current?.lenis?.raf(time)
    }

    frame.update(update, true)

    return () => cancelFrame(update)
  }, [])

  
  const toggleTheme = () => {
    if (document.documentElement.classList.contains("dark")) {
      document.documentElement.classList.remove("dark");
      Cookies.set("theme", "light");
      setIsDarkMode(false);
    } else {
      document.documentElement.classList.add("dark");
      Cookies.set("theme", "dark");
      setIsDarkMode(true);
    }
  };

  return (
    <ReactLenis 
    options={{
      duration: 1.2,
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      infinite: false,
    }} 
    ref={lenisRef}
  >
      <div className="snap-y snap-mandatory snap-always h-screen w-screen overflow-x-hidden overscroll-none overflow-y-scroll">
        {/* First full-screen section */}
        <div className="relative h-screen w-screen snap-start flex items-center justify-center overscroll-none bg-white dark:bg-black font-[family-name:var(--font-geist-sans)]">
          {/* ... first section content ... */}
          <button
            onClick={toggleTheme}
            className="absolute top-4 right-7 p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
            aria-label={
              isDarkMode ? "Switch to light mode" : "Switch to dark mode"
            }
          >
            {isDarkMode ? <Sun size={24} /> : <Moon size={24} />}
          </button>
          <main className="text-center">
            <HeaderTextSplashScreen
              onTextHoverEnter={() => setCursorVariant("text")}
              onTextHoverLeave={() => setCursorVariant("default")}
            />
          </main>
          <motion.div
            className="pointer-events-none fixed top-0 left-0 z-50 w-3 h-3 rounded-full"
            variants={variants}
            animate={cursorVariant}
          />
        </div>

        {/* Second full-screen section */}
        <div className="h-screen w-screen snap-start flex items-center justify-center overscroll-none bg-gray-100 dark:bg-gray-900 font-[family-name:var(--font-geist-sans)]">
          <SectionTwo />
        </div>

        {/* Third full-screen section */}
        <div className="h-screen w-screen snap-start flex items-center justify-center overscroll-none bg-gray-100 dark:bg-gray-900 font-[family-name:var(--font-geist-sans)]">
          <SectionThree />
        </div>
      </div>
    </ReactLenis>
  );
}
