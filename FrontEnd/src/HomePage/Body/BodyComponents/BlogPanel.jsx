import { useEffect, useState } from "react";
import Calender from "../../../assets/Calender.svg";
import { useNavigate } from "react-router-dom";

export default function BlogPanel({ object, isDesktopOrLaptop, isTablet }) {
  const navigate = useNavigate();
  const { Photo, Domain, Heading, Summary, Date } = object;
  function HandleClick() {
    navigate("/Home/Blog/" + Domain, { state: { object } });
  }

  return (
    <div
      className={` flex flex-col rounded-xl border-[2px] border-[#dfe4fff] backdrop-blur px-[25px]  h-auto ${
        isTablet
          ? isDesktopOrLaptop
            ? "mt-[50px] max-w-[400px] pt-[25px] pb-[30px]"
            : "mt-[40px] max-w-[380px] pt-[20px] pb-[25px]"
          : "mt-[25px] max-w-[340px] pt-[18px] pb-[23px]"
      }`}
    >
      <img src={`data:image/png;base64,` + Photo.data} alt="" />
      <br />
      <span
        id="blog-heading"
        className={`text-[#606CFA] drop-shadow-xl ${
          isTablet
            ? isDesktopOrLaptop
              ? "text-[30px]"
              : "text-[27px]"
            : "text-[20px]"
        } leading-[40px] tracking-wider font-[600] mb-[10px]`}
      >
        {Domain}
      </span>
      <span
        className={`inline-block wrapping max-w-[96ch] text-black ${
          isTablet
            ? isDesktopOrLaptop
              ? "text-[25px] mb-[10px]"
              : "text-[23px] mb-[10px]"
            : "text-[20px]"
        } leading-[40px] tracking-wider font-[600] `}
      >
        {Heading}
      </span>
      <div>
        <span className="wrapping font-[500] text-[20px] max-w-[96ch]">
          {Summary}
        </span>
        <button
          id="view-details"
          className={`font-black transition-all hover:drop-shadow-xl ${
            isTablet
              ? isDesktopOrLaptop
                ? "text-[25px]"
                : "text-[23px]"
              : "text-[18px]"
          } `}
          onClick={() => {
            HandleClick();
          }}
        >
          Read Article
        </button>
      </div>
      <div className="flex mt-[20px] items-center">
        <img src={Calender} alt="" style={{ width: "30px", height: "30px" }} />
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
  );
}
