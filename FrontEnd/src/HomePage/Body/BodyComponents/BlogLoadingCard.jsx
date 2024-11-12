export default function BlogLoadingcard({ isTablet, isDesktopOrLaptop }) {
  return (
    <div
      className={` text-left flex bg-white rounded-md w-[80%] shadow-[0px_7px_29px_0px_rgba(100,100,111,0.2)] px-[30px] gap-[20px] py-[30px] ${
        isTablet
          ? isDesktopOrLaptop
            ? " min-h-[320px]"
            : " min-h-[300px]"
          : " min-h-[380px]"
      } ${!isTablet && "flex-col"}`}
    >
      <div
        className={` animate-pulse  rounded-md bg-blue-200 ${
          isTablet
            ? isDesktopOrLaptop
              ? " w-[380px] h-auto"
              : " w-[380px] h-auto"
            : " h-[200px]"
        }`}
      ></div>
      <div className="flex flex-col w-full">
        <div
          className={` animate-pulse w-[120px] h-[25px] mt-[15px] rounded-md bg-gray-400`}
        ></div>
        <div
          className={` animate-pulse w-full mt-[15px] h-[25px] rounded-md bg-gray-200`}
        ></div>
        <div
          className={` animate-pulse w-full mt-[15px] h-[25px] rounded-md bg-gray-200`}
        ></div>
        <div
          className={` animate-pulse w-full mt-[15px] h-[25px] rounded-md bg-gray-200`}
        ></div>
        <div
          className={` animate-pulse w-full mt-[15px] h-[25px] rounded-md bg-gray-200`}
        ></div>
        <div
          className={` animate-pulse w-full mt-[15px] h-[25px] rounded-md bg-gray-200`}
        ></div>
        <div
          className={` animate-pulse w-full mt-[15px] h-[25px] rounded-md bg-gray-200`}
        ></div>
      </div>
    </div>
  );
}
