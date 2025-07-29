"use client";

import WhoWeAre from "./components/who-we-are";
import Sectors from "./components/sectors";
import Projects from "./components/projects";
import { motion } from "motion/react";

const AboutPage = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -0 }}
      transition={{ duration: 0.5 }}
    >
      <WhoWeAre />
      <Sectors />
      <Projects />
    </motion.div>
  );
};

export default AboutPage;
