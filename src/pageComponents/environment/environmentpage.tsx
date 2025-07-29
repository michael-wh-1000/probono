"use client";

import Introduction from "./components/introduction";
import Approach from "./components/approach";
import Conclusion from "./components/conclusion";
import { motion } from "motion/react";

const EnvironmentPage = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -0 }}
      transition={{ duration: 0.5 }}
    >
      <Introduction />
      <Approach />
      <Conclusion />
    </motion.div>
  );
};

export default EnvironmentPage;
