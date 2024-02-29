// import React from 'react';
// import styles from '../style/CircularBar.module.css';

// // const CircularBar = ({ percentage }) => {
// //   const strokeDashoffset = 100 - percentage;

// //   return (
// //     <div className={styles.circularBar}>
// //       <svg className={styles.svg} viewBox="0 0 100 100">
// //         <circle className={styles.background} cx="50" cy="50" r="45" />
// //         <circle
// //           className={styles.progress}
// //           cx="50"
// //           cy="50"
// //           r="45"
// //           style={{ strokeDashoffset: `${strokeDashoffset}%` }}
// //         />
// //       </svg>
// //     </div>
// //   );
// // };

// export default CircularBar;

import React from "react";

function CircularBar() {
  return (
    <div class="relative w-20 h-30">
      <svg class="w-full h-full" viewBox="0 0 100 100">
        <circle
          class="text-gray-200 stroke-current"
          stroke-width="10"
          cx="50"
          cy="50"
          r="40"
          fill="transparent"
        ></circle>
        <circle
          style={{color:"red"}}
          class="progress-ring__circle stroke-current"
          stroke-width="10"
          stroke-linecap="round"
          cx="50"
          cy="50"
          r="40"
          fill="transparent"
          stroke-dashoffset="calc(400 - (400 * 45) / 100)"
        ></circle>

        <text
          x="50"
          y="50"
          font-family="Verdana"
          font-size="12"
          text-anchor="middle"
          alignment-baseline="middle"
        >
          70%
        </text>
      </svg>
    </div>
  );
}

export default CircularBar;
