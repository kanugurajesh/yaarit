import { useMediaQuery } from "react-responsive";
import Yaarit from "../assets/Yaarit.svg";
import { useNavigate } from "react-router-dom";

function Description() {
  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-width: 1215px)",
  });
  const isTablet = useMediaQuery({
    query: "(min-width: 850px)",
  });
  const navigate = useNavigate();

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
    </div>
  );
}

export default Description;
