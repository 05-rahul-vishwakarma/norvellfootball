"use client"

import React, { useRef } from 'react';
import { motion } from 'framer-motion';

const MyComponent = () => {
  const refElement = useRef(null);

  // Function to trigger animation
  const handleAnimation = () => {
    refElement.current.style.backgroundColor = 'red';
  };

  return (
    <div>
      {/* Reference the element and apply animation */}
      <motion.div
        ref={refElement}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        Hover over me!
      </motion.div>

      {/* Trigger animation */}
      <button onClick={handleAnimation}>Animate</button>
    </div>
  );
};

export default MyComponent;
