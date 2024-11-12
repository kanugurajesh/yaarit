export default function Loadingcard({ isTablet, isDesktopOrLaptop }) {
  return (
    <div
      className={` text-left grid bg-white rounded-md shadow-[0px_7px_29px_0px_rgba(100,100,111,0.2)] px-[30px] py-[30px] ${
        isTablet
          ? isDesktopOrLaptop
            ? " w-[350px] min-h-[450px]"
            : " w-[320px] min-h-[420px]"
          : " w-[300px] min-h-[380px]"
      }`}
    >
      <div className={` animate-pulse h-[150px] rounded-md bg-blue-200`}></div>
      <div
        className={` animate-pulse w-[120px] mt-[15px] rounded-md bg-gray-400`}
      ></div>
      <div className={` animate-pulse mt-[15px] rounded-md bg-gray-200`}></div>
      <div className={` animate-pulse mt-[15px] rounded-md bg-gray-200`}></div>
      <div className={` animate-pulse mt-[15px] rounded-md bg-gray-200`}></div>
      <div className={` animate-pulse mt-[15px] rounded-md bg-gray-200`}></div>
    </div>
  );
}
