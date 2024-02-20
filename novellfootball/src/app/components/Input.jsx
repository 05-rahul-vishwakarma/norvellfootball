import Image from "next/image";
const Input = ({
  update,
  credentials,
  inputType,
  image,
  id,
  required = true,
}) => {
  return (
    <div className="mt-0 flex shadow-sm relative">
      <div className="absolute top-0 flex justify-center items-center left-0 h-full aspect-square px-1.5 py-1.5 ">
        <Image src={`/${image}`} alt="correct" width={25} height={25}></Image>
      </div>
      <div className="absolute top-0 flex justify-center items-center right-0  h-full aspect-square px-1.5 py-1.5 ">
        {credentials[id] && credentials[id].length > 2 ? (
          <Image
            src={`/tick_mark.png`}
            alt="correct"
            width={25}
            height={25}
          ></Image>
        ) : (
          <Image
            src={`/wrong.png`}
            alt="correct"
            width={25}
            height={25}
          ></Image>
        )}
      </div>

      <input
        id={id}
        name={id}
        type={inputType}
        value={credentials[id]}
        onChange={update}
        minLength={3}
        maxLength={12}
        placeholder="Eg.Abcd123"
        autoComplete="current-password"
        required={required}
        className="block w-full px-[2.7rem] rounded-md border-0 bg-white/50 py-[0.7rem] text-slate-800 shadow-md ring-2 ring-inset outline-none focus:ring-2 ring-blue-400 focus:ring-inset  sm:text-sm sm:leading-6"
      />
    </div>
  );
};

export default Input;
