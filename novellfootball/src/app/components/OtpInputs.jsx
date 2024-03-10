import React, { useEffect, useRef, useState } from "react";

let currentOtpIdx = 0;

const OtpInputs = ({ otp, setOtp }) => {
  const [activeIdx, updateActiveIdx] = useState(0);
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, [activeIdx]);
  function updateOtp(e) {
    let value = e.target.value;
    let val = value.substring(value.length - 1);
    let newOtp = [...otp];
    newOtp[currentOtpIdx] = val;
    if (!value) updateActiveIdx(currentOtpIdx - 1);
    else updateActiveIdx(currentOtpIdx + 1);
    setOtp(newOtp);
  }

  function handleKeyDown(e, idx) {
    currentOtpIdx = idx;
    if (e.key === "Backspace") {
      updateActiveIdx(currentOtpIdx - 1);
    }
  }
  return (
    <>
      {otp.map((val, idx) => (
        <div key={idx} className="w-16 h-16 ">
          <input
            ref={activeIdx == idx ? inputRef : null}
            className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-400 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
            type="text"
            name=""
            onChange={updateOtp}
            onKeyDown={(e) => handleKeyDown(e, idx)}
            value={otp[idx]}
          />
        </div>
      ))}
    </>
  );
};

export default OtpInputs;
