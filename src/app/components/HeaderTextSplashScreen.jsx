"use client"

import { useEffect } from "react";
import { useAnimation, motion } from "framer-motion";
import { useInView } from "react-intersection-observer";


function Character({ children, ...props }) {
    return (
      <motion.span 
        {...props} 
        className="inline-block mr-[-0.05em]"
      >
        {children}
      </motion.span>
    );
  }

  function Word({ children, ...props }) {
    return (
      <motion.span 
        {...props} 
        className="inline-block mr-[0.25em] whitespace-nowrap"
      >
        {children}
      </motion.span>
    );
  }


export default function HeaderTextSplashScreen() {
  const text = "Josh and Rylie";
  const ctrls = useAnimation();

  const { ref, inView } = useInView({
    threshold: 0.5,
    triggerOnce: true,
  });

  useEffect(() => {
    if (inView) {
      ctrls.start("visible");
    }
    if (!inView) {
      ctrls.start("hidden");
    }
  }, [ctrls, inView]);

  const wordAnimation = {
    hidden: {},
    visible: {},
  };

  const characterAnimation = {
    hidden: {
      opacity: 0,
      y: `0.25em`,
    },
    visible: {
      opacity: 1,
      y: `0em`,
      transition: {
        duration: 1,
        ease: [0.2, 0.65, 0.3, 0.9],
      },
    },
  };

  return (
    <div className="text-center">
      <h1
        ref={ref}
        aria-label={text}
        role="heading"
        className="text-5xl font-bold mb-4"
      >
        {text.split(" ").map((word, wIndex) => (
          <Word
            key={wIndex}
            initial="hidden"
            animate={ctrls}
            variants={wordAnimation}
            transition={{
              delayChildren: wIndex * 0.25,
              staggerChildren: 0.05,
            }}
            aria-hidden="true"
          >
            {word.split("").map((character, cIndex) => (
              <Character
                key={cIndex}
                variants={characterAnimation}
                aria-hidden="true"
              >
                {character}
              </Character>
            ))}
          </Word>
        ))}
      </h1>
      <p className="text-xl">July 19, 2024</p>
    </div>
  );
}
