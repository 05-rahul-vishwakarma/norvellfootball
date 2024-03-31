"use client"

import "@/app/style/loading.css";
import { useEffect } from 'react';
import gsap from 'gsap';

function loading() {
   
  useEffect(() => {
    gsap.config({ trialWarn: false });

    let tl = gsap.timeline({ repeat: -1, yoyo: true, defaults: { ease: 'sine.inOut', duration: 1.2 } });
    tl.fromTo('#gradDot', { x: 90 }, { x: -90 })
      .fromTo('#fillDot', { x: -90 }, { x: 90 }, 0)
      .fromTo('#mainGrad', { attr: { cx: 230, fx: 230 } }, { attr: { cx: 570, fx: 570 } }, 0);
  }, []);

  return (
    <div className="w-dvw h-dvh absolute top-0 left-0  z-[20]  ">
      <div style={{ textAlign: "center" }} className="bg-[rgba(0,0,0,0.5)] min-h-dvh grid place-items-center " >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600">
          <defs>
            <radialGradient
              id="mainGrad"
              cx="400"
              cy="300"
              fx="400"
              fy="300"
              r="100"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset=".68" stopColor="#6334fb" />
              <stop offset=".72" stopColor="#6639fb" />
              <stop offset=".77" stopColor="#7248fb" />
              <stop offset=".82" stopColor="#8561fb" />
              <stop offset=".88" stopColor="#9f83fb" />
              <stop offset=".93" stopColor="#c2b0fb" />
              <stop offset=".99" stopColor="#ebe6fb" />
              <stop offset="1" stopColor="#f1eefb" />
            </radialGradient>
          </defs>
          <circle id="fillDot" cx="400" cy="300" fill="#6334fb" r="100" />
          <circle
            id="gradDot"
            cx="400"
            cy="300"
            fill="url(#mainGrad)"
            r="100"
          />
        </svg>
      </div>
    </div>
  );
}

export default loading;
