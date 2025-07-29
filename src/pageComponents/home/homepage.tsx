"use client";

import { motion } from "motion/react";
import Faqs from "./components/faqs";
import Gallery from "./components/gallery";
import Hero from "./components/hero";
import Partners from "./components/partners";
import Team from "./components/team";
import Values from "./components/values";
import Volunteer from "./components/volunteer";
import Sectors from "./components/sectors";

const HomePage = () => (
  <>
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -0 }}
      transition={{ duration: 0.5 }}
    >
      <Hero />
      <Sectors />
      <Partners />
      <Values />
      <Volunteer />
      <Team />
      <Gallery />
      <Faqs />
    </motion.div>
  </>
);

export default HomePage;
