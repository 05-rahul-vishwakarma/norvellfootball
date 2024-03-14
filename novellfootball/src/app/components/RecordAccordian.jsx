import { isDragActive, motion } from "framer-motion";
import { useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
export default function RecordAccordians({ details, cardDetails, idx }) {
  const [isActive, setActive] = useState(false);
  return (
    <div className="bg-white mb-4 w-full px-6 py-2 shadow-md rounded-md">
      <div className="flex justify-between ">
        <div className="space-y-0.5">
          <h2 className="font-bold capitalize text-sm">
            {cardDetails?.Type || "not available"}
          </h2>
          <h2 className=" text-gray-600 capitalize text-xs">
            12/02/2023 10:00
          </h2>
        </div>
        <div className="flex space-x-4">
          <div className="text-end">
            <h2 className="font-bold capitalize text-sm">
              {Number(cardDetails?.Amount) / 100}
            </h2>
            <h2
              style={{ color: cardDetails?.Status === 0 ? "red" : "#38ff3e" }}
              className="font-medium capitalize text-[0.7rem]"
            >
              {cardDetails?.Remark}
            </h2>
          </div>
          <div
            onClick={() => setActive((prev) => !prev)}
            className=" flex justify-end h-fit"
          >
            <span className="p-[0.1rem] bg-gray-300 text-gray-600 rounded-full">
              {isActive ? <IoIosArrowUp /> : <IoIosArrowDown />}
            </span>
          </div>
        </div>
      </div>
      {isActive && (
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="mt-5 capitalize text-[0.56rem] space-y-[1.25px] text-black font-medium"
        >
          {Object.keys(details)?.map((key) => {
            return (
              <span className="flex space-x-1 text-thin">
                <p>{key} - </p>
                <p>{details[key]}</p>
              </span>
            );
          })}
        </motion.div>
      )}
    </div>
  );
}
