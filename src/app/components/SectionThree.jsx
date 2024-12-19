import { motion } from "framer-motion";

const container = {
  hidden: { opacity: 0 }, // Container starts invisible
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.7,
    },
  },
};

const item = {
    hidden: {
        opacity: 0,
        y: 20,
        transition: { duration: 0.2, ease: "easeIn" }
      },      
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.2,
      ease: "easeOut",
    },
  },
};

export default function SectionThree() {
  const sentence = "This is the third full-page section";
  const words = sentence.split(" ");

  return (
    <div className="h-screen w-screen flex items-center justify-center bg-pink-300 dark:bg-black">
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        // Remove once: true, so animation can trigger multiple times
        viewport={{ once: false, amount: 0.8 }}
        className="overflow-hidden text-center"
      >
        <h1 className="text-4xl font-haasMedium font-bold text-black dark:text-white flex flex-wrap justify-center">
          {words.map((word, index) => (
            <motion.span
              key={index}
              variants={item}
              className="mr-2 inline-block"
            >
              {word}
            </motion.span>
          ))}
        </h1>
      </motion.div>
    </div>
  );
}
