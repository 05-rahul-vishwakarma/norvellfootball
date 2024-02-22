import { motion } from "framer-motion";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
export default function RecordAccordians({
  cardDetails,
  setActive,
  setDeactivated,
  idx,
}) {
  return (
    <div className="bg-white mb-4 w-full px-6 py-2 shadow-md rounded-md">
      <div className="flex justify-between ">
        <div className="space-y-0.5">
          <h2 className="font-bold capitalize text-sm">Deposit</h2>
          <h2 className=" text-gray-600 capitalize text-xs">
            12/02/2023 10:00
          </h2>
        </div>
        <div className="flex space-x-4">
          <div className="text-end">
            <h2 className="font-bold capitalize text-sm">1999</h2>
            <h2 className=" text-[#38ff3e] font-medium capitalize text-[0.7rem]">
              success
            </h2>
          </div>
          <div
            onClick={() =>
              cardDetails.selected ? setDeactivated() : setActive(idx)
            }
            className=" flex justify-end h-fit"
          >
            <span className="p-[0.1rem] bg-gray-300 text-gray-600 rounded-full">
              {cardDetails.selected ? <IoIosArrowUp /> : <IoIosArrowDown />}
            </span>
          </div>
        </div>
      </div>
      {cardDetails.selected && (
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.2 }}
          className="mt-5 capitalize text-[0.56rem] space-y-[1.25px] text-black font-medium"
        >
          <span className="flex">
            <p>transaction Id - </p>
            <p>2309482093840</p>
          </span>
          <span className="flex">
            <p>transaction Id - </p>
            <p>2309482093840</p>
          </span>
        </motion.div>
      )}
    </div>
  );
}
