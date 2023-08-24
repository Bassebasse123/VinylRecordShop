import React from "react";
import { motion } from "framer-motion";

const HomePage = () => {
  return (
    <motion.div
      initial={{ x: 1000 }}
      animate={{ x: 0 }}
      transition={{ duration: 0.5 }}
      className='homepage'
    >
      <section className='hero'>
        <div className='gabriel'>Illustrations by Gabriel Hollington</div>
      </section>
    </motion.div>
  );
};

export default HomePage;
