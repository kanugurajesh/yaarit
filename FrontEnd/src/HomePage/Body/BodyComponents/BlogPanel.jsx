import Calender from "../../../public/Calender.svg";
import { useNavigate } from "react-router-dom";

export default function BlogPanel({ object, isDesktopOrLaptop, isTablet }) {
  const navigate = useNavigate();
  const { Photo, Domain, Heading, Summary, Date } = object;
  function HandleClick() {
    navigate("/Home/Blog/" + Domain, { state: { object } });
  }

  return (
    <div
      className={`bg-white flex items-center gap-[20px] shadow-[0px_7px_29px_0px_rgba(100,100,111,0.2)] rounded-md px-[30px] py-[30px] h-auto ${
        !isTablet && "flex-col max-w-[320px]"
      }`}
    >
      <img
        src={`data:image/png;base64,` + Photo.data}
        alt=""
        className={`h-fit ${
          isTablet
            ? isDesktopOrLaptop
              ? " w-[380px] "
              : " w-[380px] "
            : " w-[320px] "
        }`}
      />
      <div className="flex flex-col">
        <span
          id="blog-heading"
          className={`text-[#606CFA] drop-shadow-xl mt-[20px] ${
            isTablet
              ? isDesktopOrLaptop
                ? "text-[30px]"
                : "text-[27px]"
              : "text-[20px]"
          } leading-[40px] tracking-wider font-[600] `}
        >
          {Domain}
        </span>
        <span
          className={`inline-block wrapping max-w-[96ch] mt-[10px] text-black ${
            isTablet
              ? isDesktopOrLaptop
                ? "text-[25px] "
                : "text-[23px] "
              : "text-[20px]"
          } leading-[40px] tracking-wider font-[600] `}
        >
          {Heading}
        </span>
        <div>
          <span className="wrapping font-[500] text-[20px] mt-[10px] max-w-[96ch]">
            {Summary}
          </span>
          <button
            id="view-details"
            className={`font-black transition-all hover:drop-shadow-xl mt-[10px] ${
              isTablet
                ? isDesktopOrLaptop
                  ? "text-[23px]"
                  : "text-[20px]"
                : "text-[18px]"
            } `}
            onClick={() => {
              HandleClick();
            }}
          >
            . . . read more
          </button>
        </div>
        <div className="flex mt-[20px] items-center">
          <img
            src={Calender}
            alt=""
            style={{ width: "30px", height: "30px" }}
          />
          <span
            className={`font-[500] ${
              isTablet
                ? isDesktopOrLaptop
                  ? "text-[20px]"
                  : "text-[20px]"
                : "text-[18px]"
            } tracking-wider leading-[40px] ml-[15px] text-[#5F6A77]`}
          >
            {Date}
          </span>
        </div>
      </div>
    </div>
  );
}
