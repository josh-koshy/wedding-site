"use client";

// page.js

import { useEffect, useState, useRef } from "react";
import Cookies from "js-cookie";
import { v4 as uuidv4 } from "uuid";
import { ReactLenis, useLenis } from "lenis/react";
import Snap from "lenis/snap";
import { motion, cancelFrame, frame } from "motion/react";

// Icons & UI Components
import { Moon, Sun } from "lucide-react";

// Component Imports
import HeaderTextSplashScreen from "./components/HeaderTextSplashScreen";
import SectionTwo from "./components/SectionTwo";
import SectionThree from "./components/SectionThree";

export default function Home() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [cursorVariant, setCursorVariant] = useState("default");
  const [isDarkMode, setIsDarkMode] = useState(false);

  // const loco = new LocomotiveScroll();

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


  const lenisRef = useRef();

  useEffect(() => {
    if (!lenisRef.current) return;

    function update(time) {
      lenisRef.current.raf(time);
    }

    frame.update(update);
    return () => {
      cancelFrame(update);
    };
  }, []);

  let hasUserScrolledOnce = false;
  const lenis = useLenis()

  let curentSection = 0;

  useEffect(() => {
    const handleScroll = () => {
      if (!hasUserScrolledOnce) {
        // Get the scroll position
        const scrollPosition = window.scrollY; // Distance scrolled vertically in pixels

        // Get the viewport height
        const viewportHeight = window.innerHeight; // Height of the viewport

        // Check if the user is within the first viewport height (0 to 1 viewport)
        if (scrollPosition >= 65 && scrollPosition <= viewportHeight) {

          console.log("User is within the first viewport!")

          lenis.scrollTo('.second-viewport-section', {
          duration: 1.5,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          onComplete: () => { curentSection += 1},
          lock: true // Exponential easing
        })
          
          hasUserScrolledOnce = true;
        }
      }
    };

    // Attach the scroll event listener
    window.addEventListener("scroll", handleScroll);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lenis]); // Empty dependency array ensures this runs once when the component mounts

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
    <ReactLenis root>
      <div className="h-screen w-screen">
        {/* First full-screen section */}
        <div className="relative h-screen w-screen flex items-center justify-center bg-white dark:bg-black font-[family-name:var(--font-geist-sans)]">
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
        </div>

        {/* Second full-screen section */}
        <div className="second-viewport-section h-screen w-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 font-[family-name:var(--font-geist-sans)]">
          <SectionTwo />
        </div>

        {/* Third full-screen section */}
        <div className="h-screen w-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 font-[family-name:var(--font-geist-sans)]">
          <SectionThree />
        </div>
      </div>
    </ReactLenis>
  );
}
