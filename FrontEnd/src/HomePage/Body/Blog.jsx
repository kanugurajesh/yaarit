import BackIcon from "../../assets/arrow_back_FILL0_wght400_GRAD0_opsz24.svg";

import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { useMediaQuery } from "react-responsive";

export default function Blog() {
  const navigate = useNavigate();
  const [content, setContent] = useState("");
  const [renderNow, setRenderNow] = useState(false);
  const blog = useRef(null);
  const location = useLocation();

  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-width: 1090px)",
  });
  const isTablet = useMediaQuery({
    query: "(min-width: 700px)",
  });

  useEffect(() => {
    window.history.scrollRestoration = "manual";
    blog.current?.scrollIntoView();
    if (
      location.state == undefined ||
      location.state == null ||
      location.state == ""
    )
      navigate("/Home", { replace: true });
    else {
      setContent(location.state.object);
      setRenderNow(true);
    }
  }, []);

  return (
    <>
      {renderNow && (
        <div
          className={`blog-bg  ${
            isTablet
              ? isDesktopOrLaptop
                ? "px-[100px] py-[40px]"
                : "px-[30px] py-[20px]"
              : "px-[5px] py-[10px]"
          }`}
          ref={blog}
        >
          <div className="flex justify-start items-center mt-[10px] mx-[20px]">
            <img
              src={BackIcon}
              alt=""
              className={`w-full ${
                isTablet ? "max-w-[40px]" : "max-w-[30px]"
              } h-auto cursor-pointer`}
              onClick={() => {
                navigate(-1);
              }}
            />
            {isTablet && (
              <span
                className={` text-[30px] font-black ml-[20px] cursor-pointer`}
                onClick={() => {
                  navigate(-1);
                }}
              >
                Back
              </span>
            )}
          </div>
          <div
            className={`rounded-xl shadow-md border-[#dfe4ffff] bg-[#dfe4ff] backdrop-blur border-[1px] mx-[20px]  py-[50px] ${
              isTablet
                ? isDesktopOrLaptop
                  ? "px-[150px] my-[30px]"
                  : "px-[80px] my-[20px]"
                : "px-[30px] my-[15px]"
            }`}
          >
            <div className="flex justify-center items-center">
              <span
                className={`${
                  isTablet
                    ? isDesktopOrLaptop
                      ? "text-[55px]"
                      : "text-[40px]"
                    : "text-[35px]"
                } tracking-wide font-bold text-[#606CFA] text-center`}
              >
                {content.Domain}
              </span>
            </div>
            <div className="flex justify-center items-center">
              <span
                className={`${
                  isTablet
                    ? isDesktopOrLaptop
                      ? "text-[40px] "
                      : "text-[30px]"
                    : "text-[25px] "
                } tracking-wider mt-[20px] font-[600] text-center`}
              >
                {content.Heading}
              </span>
            </div>
            <div className="flex justify-center items-center">
              <span
                className={`${
                  isTablet
                    ? isDesktopOrLaptop
                      ? "text-[30px]"
                      : "text-[20px]"
                    : "text-[18px]"
                } tracking-wider mt-[20px] font-[600] text-[#5F6A77] text-center`}
              >
                {content.Summary}
              </span>
            </div>
            <div className="flex justify-between items-center mt-[60px]">
              <div className="flex justify-between items-center">
                {isTablet && (
                  <img
                    src={`data:image/png;base64,` + content.Image.data}
                    alt=""
                  />
                )}
                <div className={`flex flex-col ${isTablet && "ml-[30px]"} `}>
                  <span
                    className={`${
                      isTablet
                        ? isDesktopOrLaptop
                          ? "text-[20px]"
                          : "text-[18px]"
                        : "text-[15px]"
                    } tracking-wider font-bold `}
                  >
                    {content.FirstName} {content.LastName}
                  </span>
                  <span
                    className={`${
                      isTablet
                        ? isDesktopOrLaptop
                          ? "text-[20px]"
                          : "text-[18px]"
                        : "text-[15px]"
                    } tracking-wider font-[500] `}
                  >
                    {content.Year}, {content.Dept}.
                  </span>
                </div>
              </div>
              <div className="flex flex-col text-end">
                <span
                  className={`${
                    isTablet
                      ? isDesktopOrLaptop
                        ? "text-[20px]"
                        : "text-[18px]"
                      : "text-[15px]"
                  } tracking-wider font-bold `}
                >
                  Published On
                </span>
                <span
                  className={`${
                    isTablet
                      ? isDesktopOrLaptop
                        ? "text-[20px]"
                        : "text-[18px]"
                      : "text-[15px]"
                  } tracking-wider font-[500] `}
                >
                  {content.Date}
                </span>
              </div>
            </div>
            <div
              className={`flex justify-center ${
                isTablet
                  ? isDesktopOrLaptop
                    ? "my-[100px]"
                    : "my-[50px]"
                  : "my-[30px]"
              }`}
            >
              <img
                src={`data:image/png;base64,` + content.Photo.data}
                alt=""
                className="w-full max-w-[700px] min-w-[300px] h-auto"
              />
            </div>
            <div
              className={`flex flex-col ${
                isTablet
                  ? isDesktopOrLaptop
                    ? "text-[35px]"
                    : "text-[23px]"
                  : "text-[18px]"
              }`}
            >
              {content.Text.map((obj, index) => {
                return (
                  <span className="mb-[50px]" key={index}>
                    {obj}
                  </span>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
