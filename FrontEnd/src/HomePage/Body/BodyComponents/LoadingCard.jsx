export default function Loadingcard({ isTablet, isDesktopOrLaptop }) {
  return (
    <div
      className={` text-left grid rounded-xl border-[2px] border-[#dfe4fff] backdrop-blur px-[25px] ${
        isTablet
          ? isDesktopOrLaptop
            ? "mt-[50px] w-[380px] min-h-[490px] pt-[25px] pb-[30px]"
            : "mt-[40px] w-[330px] min-h-[440px] pt-[20px] pb-[25px]"
          : " mt-[25px] w-[320px] min-h-[400px] pt-[18px] pb-[23px]"
      }`}
    >
      <div className={` animate-pulse h-[150px] rounded-2xl bg-gray-200`}></div>
      <div
        className={` animate-pulse w-[120px] mt-[15px] rounded-2xl bg-gray-200`}
      ></div>
      <div className={` animate-pulse mt-[15px] rounded-2xl bg-gray-200`}></div>
      <div className={` animate-pulse mt-[15px] rounded-2xl bg-gray-200`}></div>
      <div className={` animate-pulse mt-[15px] rounded-2xl bg-gray-200`}></div>
      <div className={` animate-pulse mt-[15px] rounded-2xl bg-gray-200`}></div>
    </div>
  );
}
