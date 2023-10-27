import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import LeftIcon from "../../assets/arrow_back_ios_FILL0_wght400_GRAD0_opsz24.svg";
import RightIcon from "../../assets/arrow_forward_ios_FILL0_wght400_GRAD0_opsz24.svg";
import Calender from "../../assets/Calender.svg";
import { useNavigate } from "react-router";
import { useMediaQuery } from "react-responsive";
import Axios from "axios";
import { useState } from "react";
import load from "../../assets/Double-Ring-0.8s-231px.svg";

export default function CarouselPage({
  blog,
  Event,
  blogScroll,
  eventScroll,
  scrollHandler,
  userEvents,
  setUserEvents,
  renderNow,
}) {
  const [loading, setLoading] = useState(false);
  const [moreDetails, setMoreDetails] = useState(false);

  const navigate = useNavigate();
  function HandleClick() {
    navigate("/Home/Blog/" + blog.Domain, { state: { object: blog } });
  }

  const isDesktopOrLaptopChange = useMediaQuery({
    query: "(min-width: 1090px)",
  });
  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-width: 1550px)",
  });
  const isTablet = useMediaQuery({
    query: "(min-width: 700px)",
  });

  async function HandleRegister() {
    setLoading(true);
    try {
      const token = sessionStorage.getItem("token");
      const response = await Axios.post(
        "http://192.168.0.104:8000/events/eventRegistration",
        {
          AUTH_API_KEY: "AIyuhjerty9poiud9qwer4poijkhpoiubqXpkjm",
          token: token,
          id: Event["_id"],
        }
      );
      if (response.data === "Mail sent") {
        alert("Check Registered Mail for further Information!");
        const res = await Axios.post(
          "http://192.168.0.104:8000/events/eventsFetch",
          {
            AUTH_API_KEY: "AIyuhjerty9poiud9qwer4poijkhpoiubqXpkjm",
            token: token,
          }
        );
        setUserEvents(new Set(res.data.data[0].Events));
      } else {
        alert(response.data);
      }
    } catch (error) {}
  }

  const blogpage = (
    <div className="flex justify-evenly items-center">
      <div className="flex flex-col justify-center items-center">
        <span
          className={`font-[700] ${
            isTablet
              ? isDesktopOrLaptop
                ? "text-[80px]"
                : "text-[60px]"
              : "text-[40px]"
          } tracking-wider text-[#15144B]`}
        >
          Expanding
        </span>
        <span
          className={`font-[700] ${
            isTablet
              ? isDesktopOrLaptop
                ? "text-[80px]"
                : "text-[60px]"
              : "text-[40px]"
          } tracking-wider text-[#15144B]`}
        >
          knowledge
        </span>
        <span
          className={`font-[700] ${
            isTablet
              ? isDesktopOrLaptop
                ? "text-[80px]"
                : "text-[60px]"
              : "text-[40px]"
          } tracking-wider text-[#15144B]`}
        >
          One Blog at a time.
        </span>
        <span
          className={`font-[600] ${
            isTablet
              ? isDesktopOrLaptop
                ? "text-[25px] mt-[30px]"
                : "text-[18px] mt-[20px]"
              : "text-[15px] mt-[15px]"
          } tracking-wider text-[#5F6A77]`}
        >
          All the latest blogs from our creative community.
        </span>
        <div>
          <button
            className={`text-white font-black tracking-wider credentials-button  ${
              isTablet
                ? isDesktopOrLaptop
                  ? "text-[25px] px-[60px] mt-[30px]"
                  : " text-[18px] px-[40px] mt-[20px]"
                : " text-[15px] px-[30px] mt-[15px]"
            }`}
            onClick={() => {
              scrollHandler(blogScroll);
            }}
          >
            {isDesktopOrLaptopChange ? "More Blogs" : "Blogs"}
          </button>
        </div>
      </div>
      {isDesktopOrLaptopChange &&
        (renderNow ? (
          <div
            className={` text-left grid rounded-2xl border-[2px] box-shadow-quote border-[#dfe4ffff] bg-[#e8eaf7] backdrop-blur px-[30px] py-[30px] ${
              isTablet
                ? isDesktopOrLaptop
                  ? " max-w-[400px]"
                  : "max-w-[350px]"
                : "max-w-[200px]"
            }`}
          >
            <img
              src={`data:image/png;base64,` + blog.Photo.data}
              alt=""
              className=" w-full h-auto rounded-2xl"
            />
            <span
              id="blog-heading"
              className={`text-[#606CFA] ${
                isTablet
                  ? isDesktopOrLaptop
                    ? "text-[25px]"
                    : "text-[23px]"
                  : "text-[20px]"
              } tracking-wider font-[600] mt-[15px]`}
            >
              {blog.Domain}
            </span>

            <div
              className={` mt-[15px] ${
                isTablet
                  ? isDesktopOrLaptop
                    ? " max-w-[400px]"
                    : "max-w-[350px]"
                  : "max-w-[200px]"
              }`}
            >
              <span
                className={`flex text-black ${
                  isTablet
                    ? isDesktopOrLaptop
                      ? "text-[25px]"
                      : "text-[20px]"
                    : "text-[18px]"
                } tracking-wider font-[600] max-w-[96ch] wrapping`}
              >
                {blog.Heading}
              </span>
            </div>

            <div className="mt-[15px]">
              <button
                className={`text-white  font-black tracking-wider credentials-button ${
                  isTablet
                    ? isDesktopOrLaptop
                      ? "px-[50px] text-[25px]"
                      : "px-[30px] text-[20px]"
                    : "px-[50px] text-[25px]"
                }`}
                onClick={() => {
                  HandleClick();
                }}
              >
                Read More
              </button>
            </div>
          </div>
        ) : (
          <div
            className={` text-left grid rounded-2xl border-[2px] box-shadow-quote border-[#dfe4ffff] bg-[#e8eaf7] backdrop-blur px-[30px] py-[30px] ${
              isTablet
                ? isDesktopOrLaptop
                  ? " min-w-[400px] min-h-[490px]"
                  : "min-w-[350px] min-h-[440px]"
                : "min-w-[200px] min-h-[290px]"
            }`}
          >
            <div
              className={` animate-pulse h-[150px] rounded-2xl bg-gray-300`}
            ></div>
            <div
              className={` animate-pulse w-[120px] mt-[15px] rounded-2xl bg-gray-300`}
            ></div>
            <div
              className={` animate-pulse mt-[15px] rounded-2xl bg-gray-300`}
            ></div>
            <div
              className={` animate-pulse mt-[15px] rounded-2xl bg-gray-300`}
            ></div>
            <div
              className={` animate-pulse mt-[15px] rounded-2xl bg-gray-300`}
            ></div>
            <div
              className={` animate-pulse mt-[15px] rounded-2xl bg-gray-300`}
            ></div>
          </div>
        ))}
    </div>
  );

  const registerpage = (
    <div className="text-left flex flex-wrap justify-evenly items-center">
      {isDesktopOrLaptopChange &&
        (renderNow ? (
          <div
            className={`grid rounded-2xl border-[2px] box-shadow-quote border-[#dfe4ffff] bg-[#e8eaf7] backdrop-blur px-[30px] py-[30px] ${
              isTablet
                ? isDesktopOrLaptop
                  ? " max-w-[440px]"
                  : "max-w-[390px]"
                : "max-w-[220px]"
            }`}
          >
            {!moreDetails ? (
              <>
                <img
                  src={`data:image/png;base64,` + Event.Image.data}
                  alt=""
                  className={` w-full h-auto rounded-2xl ${
                    isTablet
                      ? isDesktopOrLaptop
                        ? " max-w-[400px]"
                        : "max-w-[370px]"
                      : "max-w-[220px]"
                  }`}
                />
                <span
                  id="event-heading"
                  className={`text-[#606CFA] ${
                    isTablet
                      ? isDesktopOrLaptop
                        ? "text-[25px] mt-[20px]"
                        : "text-[23px] mt-[15px]"
                      : "text-[20px] mt-[10px]"
                  } tracking-wider font-[600]`}
                >
                  {Event.Heading}
                </span>
                <div className="flex mt-[10px] items-center mt-[15px]">
                  <img
                    src={Calender}
                    alt=""
                    style={{ width: "30px", height: "30px" }}
                  />
                  <span
                    className={`font-[600] ${
                      isTablet
                        ? isDesktopOrLaptop
                          ? "text-[20px]"
                          : "text-[20px]"
                        : "text-[18px]"
                    } tracking-wider ml-[15px] text-[#5F6A77]`}
                  >
                    {Event.Date}
                  </span>
                </div>
                <div className="mt-[15px] flex justify-between items-center">
                  <button
                    className={`text-white font-bold flex items-center justify-center tracking-wider ${
                      isTablet
                        ? isDesktopOrLaptop
                          ? "text-[20px]"
                          : "text-[20px]"
                        : "text-[18px]"
                    } ${
                      userEvents.has(Event["_id"])
                        ? "credentials-button-disabled"
                        : "credentials-button"
                    } px-[40px] `}
                    onClick={() => {
                      HandleRegister();
                    }}
                    disabled={userEvents.has(Event["_id"])}
                  >
                    {userEvents.has(Event["_id"]) ? (
                      "Registered"
                    ) : loading ? (
                      <img
                        src={load}
                        alt=""
                        className="w-full max-w-[60px] h-auto"
                      />
                    ) : (
                      "Register"
                    )}
                  </button>
                  <button
                    id="view-details"
                    className={`font-black ml-[20px] ${
                      isTablet
                        ? isDesktopOrLaptop
                          ? "text-[20px]"
                          : "text-[18px]"
                        : "text-[15px]"
                    }`}
                    onClick={() => {
                      setMoreDetails(true);
                    }}
                  >
                    View Details
                  </button>
                </div>
              </>
            ) : (
              <>
                <img
                  src={`data:image/png;base64,` + Event.Image.data}
                  alt=""
                  className={`mb-[5px] ${
                    isTablet
                      ? isDesktopOrLaptop
                        ? " max-w-[400px]"
                        : "max-w-[370px]"
                      : "max-w-[280px]"
                  }`}
                />

                <span
                  className={`text-black drop-shadow-xl mt-[15px] ${
                    isTablet
                      ? isDesktopOrLaptop
                        ? "text-[30px]"
                        : "text-[25px]"
                      : "text-[18px]"
                  } leading-[40px] tracking-wider cursor-pointer font-[600] mb-[10px]`}
                  onClick={() => {
                    setMoreDetails(false);
                  }}
                >
                  {"<"}
                </span>
                <span
                  className={`text-gray-600  ${
                    isTablet
                      ? isDesktopOrLaptop
                        ? "text-[20px]"
                        : "text-[18px]"
                      : "text-[15px]"
                  } leading-[40px] tracking-wider font-[600] mb-[10px]`}
                >
                  {Event.Summary}
                </span>
                <a
                  href={Event.Gdrive}
                  target="_blank"
                  className={`text-[#606CFA] drop-shadow-xl ${
                    isTablet
                      ? isDesktopOrLaptop
                        ? "text-[20px]"
                        : "text-[18px]"
                      : "text-[15px]"
                  } leading-[40px] tracking-wider font-[600] `}
                >
                  Google Drive Link
                </a>
              </>
            )}
          </div>
        ) : (
          <div
            className={` text-left grid rounded-2xl border-[2px] box-shadow-quote border-[#dfe4ffff] bg-[#e8eaf7] backdrop-blur px-[30px] py-[30px] ${
              isTablet
                ? isDesktopOrLaptop
                  ? " min-w-[400px] min-h-[490px]"
                  : "min-w-[350px] min-h-[440px]"
                : "min-w-[200px] min-h-[290px]"
            }`}
          >
            <div
              className={` animate-pulse h-[150px] rounded-2xl bg-gray-300`}
            ></div>
            <div
              className={` animate-pulse w-[120px] mt-[15px] rounded-2xl bg-gray-300`}
            ></div>
            <div
              className={` animate-pulse mt-[15px] rounded-2xl bg-gray-300`}
            ></div>
            <div
              className={` animate-pulse mt-[15px] rounded-2xl bg-gray-300`}
            ></div>
            <div
              className={` animate-pulse mt-[15px] rounded-2xl bg-gray-300`}
            ></div>
            <div
              className={` animate-pulse mt-[15px] rounded-2xl bg-gray-300`}
            ></div>
          </div>
        ))}
      <div className="text-right flex flex-col items-center justify-center">
        <span
          className={`font-[700] ${
            isTablet
              ? isDesktopOrLaptop
                ? "text-[80px]"
                : "text-[60px]"
              : "text-[40px]"
          } tracking-wider text-[#15144B]`}
        >
          Creating the
        </span>
        <span
          className={`font-[700] ${
            isTablet
              ? isDesktopOrLaptop
                ? "text-[80px]"
                : "text-[60px]"
              : "text-[40px]"
          } tracking-wider text-[#15144B]`}
        >
          Best.
        </span>
        <span
          className={`font-[700] ${
            isTablet
              ? isDesktopOrLaptop
                ? "text-[80px]"
                : "text-[60px]"
              : "text-[40px]"
          } tracking-wider text-[#15144B]`}
        >
          Day. Ever.
        </span>
        <span
          className={`font-[600] ${
            isTablet
              ? isDesktopOrLaptop
                ? "text-[25px] mt-[30px]"
                : "text-[20px] mt-[20px]"
              : "text-[15px] mt-[15px]"
          } tracking-wider text-[#5F6A77]`}
        >
          Life is an event. Make it memorable.
        </span>
        <div>
          <button
            className={`text-white  font-black tracking-wider credentials-button  ${
              isTablet
                ? isDesktopOrLaptop
                  ? "text-[25px] px-[60px] mt-[30px]"
                  : " text-[20px] px-[40px] mt-[20px]"
                : " text-[15px] px-[30px] mt-[15px]"
            }`}
            onClick={() => {
              scrollHandler(eventScroll);
            }}
          >
            {isDesktopOrLaptopChange ? "More Events" : "Events"}
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div
      className={`rounded-2xl border-[2px] box-shadow-quote border-[#dfe4ffff] bg-[#dfe4ff4d] backdrop-blur px-[20px] py-[100px] ${
        isTablet ? "py-[70px]" : "py-[100px] h-[70vh]"
      } `}
    >
      <Carousel
        infiniteLoop
        autoPlay
        interval={5000}
        showStatus={false}
        showIndicators={false}
        showArrows={isTablet}
        showThumbs={false}
        renderArrowPrev={(clickHandler, hasPrev) => {
          return (
            <div
              className={`${
                hasPrev ? "absolute" : "hidden"
              } top-0 bottom-0 left-0 flex justify-center items-center p-3 opacity-30 hover:opacity-100 cursor-pointer z-20`}
              onClick={clickHandler}
            >
              <img src={LeftIcon} alt="" />
            </div>
          );
        }}
        renderArrowNext={(clickHandler, hasNext) => {
          return (
            <div
              className={`${
                hasNext ? "absolute" : "hidden"
              } top-0 bottom-0 right-0 flex justify-center items-center p-3 opacity-30 hover:opacity-100 cursor-pointer z-20`}
              onClick={clickHandler}
            >
              <img src={RightIcon} alt="" />
            </div>
          );
        }}
      >
        {blogpage}
        {registerpage}
      </Carousel>
    </div>
  );
}
