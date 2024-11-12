import { useMediaQuery } from "react-responsive";
import Yaarit from "../public/YaarIt.svg";
import tickicon from "../public/Group13.svg";
import { useNavigate } from "react-router-dom";
import git from "../public/git.svg";
import insta from "../public/insta.svg";
import linkedin from "../public/linkedin.svg";
import rajesh from "../public/rajesh-kanugu.jpg";

function Description() {
  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-width: 1215px)",
  });
  const isTablet = useMediaQuery({
    query: "(min-width: 850px)",
  });
  const navigate = useNavigate();

  const array = [
    "Early access to events",
    "Access to special events",
    "Access to blogs",
    "Doubts sessions",
    "Chance to win goodies",
  ];

  const plans = [
    { price: "Rs.700", duration: "6 Months" },
    { price: "Rs.1000", duration: "1 Year" },
    { price: "Rs.1400", duration: "2 Years" },
  ];

  const team = [
    {
      name: "Kanugu Rajesh",
      insta: "",
      git: "https://github.com/KanuguRajesh",
      linkedin: "https://www.linkedin.com/in/rajesh-kanugu-aba8a3254/",
      photo: rajesh,
    },
  ];

  return (
    <div>
      <div className="px-[30px] py-[40px] description-bg ">
        <div
          className={`rounded-xl border-[2px] shadow-[0_10px_30px_-15px_rgba(255,255,255)] border-[#ffffff85] bg-[#ffffff85] backdrop-blur  px-[30px]  ${
            isTablet
              ? isDesktopOrLaptop
                ? " min-w-[440px] py-[30px]"
                : "min-w-[390px] py-[20px]"
              : "min-w-[220px] py-[15px]"
          }`}
        >
          <div className="flex justify-between items-center">
            <div className="flex flex-col">
              <img
                src={Yaarit}
                alt=""
                className="w-full max-w-[170px] h-auto"
              />
            </div>
            <div>
              <button
                id="profile"
                className={`font-black pt-[6px] ${
                  isTablet ? "text-[20px]" : "text-[15px]"
                } tracking-wide`}
                onClick={() => {
                  navigate("/Login");
                }}
              >
                Login
              </button>
              <button
                id="signout"
                className={`font-black rounded-md bg-black text-white  px-[10px] py-[6px] ${
                  isTablet ? "text-[20px] ml-[30px]" : "text-[15px] ml-[10px]"
                } tracking-wide`}
                onClick={() => {
                  navigate("/Register");
                }}
              >
                Register
              </button>
            </div>
          </div>
          <div
            className={`flex flex-wrap justify-evenly ${
              isTablet
                ? isDesktopOrLaptop
                  ? "my-[120px]"
                  : "text-center my-[100px]"
                : "text-center my-[60px]"
            } items-center  `}
          >
            {isDesktopOrLaptop && <span></span>}
            <span
              className={`font-black flex flex-col text-left pt-[6px] ${
                isTablet
                  ? isDesktopOrLaptop
                    ? "text-[50px]"
                    : "text-[50px]"
                  : "text-[35px]"
              } tracking-wide `}
            >
              <span className={`${!isDesktopOrLaptop && "text-center"}`}>
                Let’s start
              </span>
              <span className={`${!isDesktopOrLaptop && "text-center"}`}>
                something big.
              </span>
              <span className={`${!isDesktopOrLaptop && "text-center"}`}>
                With <span className="text-[#636AFF]">Yaarit!</span>
              </span>
            </span>
            <span
              className={`font-black flex flex-col w-[35ch] pt-[6px] ${
                isTablet
                  ? isDesktopOrLaptop
                    ? "text-[30px] leading-[50px] ml-[30px] "
                    : "text-[25px] leading-[40px]"
                  : "text-[20px] leading-[35px]"
              } ${!isDesktopOrLaptop && "mt-[40px]"} tracking-wider `}
            >
              A hub of knowledge and exploration. Our platform is your gateway
              to endless opportunities for learning and growth. Dive into a
              world of diverse content, from blogs to thought-provoking events,
              all designed to expand your horizons. Join our vibrant community
              of passionate learners, and let the journey of discovery commence.
              Your quest for knowledge starts here, with limitless
              possibilities!
            </span>
          </div>
        </div>
      </div>
      <div className="px-[30px] py-[100px]">
        <div className="flex flex-col justify-center items-center">
          <span
            className={`font-black tracking-wider ${
              isTablet
                ? isDesktopOrLaptop
                  ? "text-[50px]"
                  : "text-[50px]"
                : "text-[35px]"
            }`}
          >
            Find The Plan That
          </span>
          <span
            className={` font-black tracking-wider ${
              isTablet
                ? isDesktopOrLaptop
                  ? "text-[50px]"
                  : "text-[50px]"
                : "text-[35px]"
            }`}
          >
            Suits <span className="text-[#5258FF]">Your Needs</span>
          </span>
        </div>
        <div className="flex flex-wrap justify-evenly gap-[20px] mt-[60px] items-center">
          <ul className="mt-[20px] drop-shadow-xl flex flex-col items-center justify-center">
            {array.map((obj, index) => {
              return (
                <div key={index} className="flex w-full">
                  <img
                    src={tickicon}
                    alt=""
                    className={`w-full h-auto ${
                      isTablet
                        ? isDesktopOrLaptop
                          ? "max-w-[20px] mr-[5px]"
                          : "max-w-[23px] mr-[5px]"
                        : "max-w-[18px] mr-[5px]"
                    }`}
                  />
                  <li
                    className={`font-bold  ${
                      isTablet
                        ? isDesktopOrLaptop
                          ? "text-[25px] "
                          : "text-[23px] "
                        : "text-[18px] "
                    } mt-[10px]`}
                  >
                    {obj}
                  </li>
                </div>
              );
            })}
          </ul>
          {plans.map((obj, index) => {
            return (
              <div
                key={index}
                className={` flex flex-col rounded-xl text-[#15144B] text-center shadow-xl border-[2px] border-[#71B0FF] backdrop-blur py-[50px] px-[50px] ${
                  isTablet
                    ? isDesktopOrLaptop
                      ? "mt-[50px] max-w-[400px] "
                      : "mt-[40px] max-w-[380px] "
                    : "mt-[25px] max-w-[340px] "
                }`}
              >
                <span
                  className={`font-black ${
                    isTablet
                      ? isDesktopOrLaptop
                        ? "text-[60px] "
                        : "text-[50px] "
                      : "text-[30px] "
                  } mt-[10px]`}
                >
                  {obj.price}
                </span>
                <span
                  className={`font-bold ${
                    isTablet
                      ? isDesktopOrLaptop
                        ? "text-[30px] "
                        : "text-[25px] "
                      : "text-[20px] "
                  }`}
                >
                  - {obj.duration} -
                </span>
              </div>
            );
          })}
        </div>
      </div>
      <div className="px-[30px] py-[100px] ">
        <div className="flex flex-col justify-center items-center">
          <span
            className={`font-black tracking-wider ${
              isTablet
                ? isDesktopOrLaptop
                  ? "text-[50px]"
                  : "text-[50px]"
                : "text-[35px]"
            }`}
          >
            Developed By
          </span>
        </div>
        <div className="flex justify-evenly flex-wrap px-[40px] mt-[100px] gap-[60px] items-center">
          {team.map((obj, index) => {
            return (
              <div
                key={index}
                className={` flex flex-col gap-[30px] justify-center items-center py-[30px] ${
                  isTablet
                    ? isDesktopOrLaptop
                      ? " w-[350px]"
                      : " w-[340px]"
                    : " w-[320px]"
                }`}
              >
                <img
                  src={obj.photo}
                  alt=""
                  width={isTablet ? 200 : 150}
                  className="rounded-[100px] shadow-[0px_7px_29px_0px_rgba(100,100,111,0.2)]"
                />
                <span
                  className={`font-black tracking-wider ${
                    isTablet
                      ? isDesktopOrLaptop
                        ? "text-[27px]"
                        : "text-[27px]"
                      : "text-[19px]"
                  }`}
                >
                  {obj.name}
                </span>
                <div className="flex justify-center items-center gap-[20px]">
                  <a href={obj.insta} target="_blank">
                    <img src={insta} alt="" width={isTablet ? 30 : 20} />
                  </a>
                  <a href={obj.git} target="_blank">
                    <img src={git} alt="" width={isTablet ? 30 : 20} />
                  </a>
                  <a href={obj.linkedin} target="_blank">
                    {" "}
                    <img src={linkedin} alt="" width={isTablet ? 30 : 20} />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Description;
