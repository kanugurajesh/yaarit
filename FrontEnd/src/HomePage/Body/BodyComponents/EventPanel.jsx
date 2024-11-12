import Axios from "axios";
import Calender from "../../../public/Calender.svg";
import { useState } from "react";
import load from "../../../public/Double-Ring-0.8s-231px.svg";

export default function EventPanel({
  Event,
  isDesktopOrLaptop,
  userEvents,
  setUserEvents,
  isTablet,
}) {
  const [loading, setLoading] = useState(false);
  const [moreDetails, setMoreDetails] = useState(false);
  const [expired, setExpired] = useState(true);

  async function HandleRegister() {
    setLoading(true);
    try {
      const token = sessionStorage.getItem("token");
      const response = await Axios.post(
        process.env.IP + "/events/eventRegistration",
        {
          AUTH_API_KEY: process.env.AUTH_API_KEY,
          token: token,
          id: Event["_id"],
        },
        {
          timeout: 3000000,
        }
      );
      if (response.data === "Mail sent") {
        alert("Check Registered Mail for further Information!");
        const res = await Axios.post(
          process.env.IP + "/events/eventsFetch",
          {
            AUTH_API_KEY: process.env.AUTH_API_KEY,
            token: token,
          },
          {
            timeout: 3000000,
          }
        );
        setUserEvents(new Set(res.data.data[0].Events));
        setExpired(new Date(Event.Expiry) < new Date());
      } else {
        alert(response.data);
      }
    } catch (error) {}
  }

  return (
    <div
      className={`bg-white flex flex-col justify-evenly shadow-[0px_7px_29px_0px_rgba(100,100,111,0.2)] rounded-md px-[30px] py-[30px] h-full ${
        isTablet
          ? isDesktopOrLaptop
            ? " max-w-[350px]"
            : " max-w-[340px]"
          : " max-w-[320px]"
      }`}
    >
      {!moreDetails ? (
        <>
          <img src={`data:image/png;base64,` + Event.Image.data} alt="" />
          <span
            id="event-heading"
            className={`text-[#606CFA] drop-shadow-xl mt-[25px] ${
              isTablet
                ? isDesktopOrLaptop
                  ? "text-[25px]"
                  : "text-[23px]"
                : "text-[18px]"
            } leading-[40px] tracking-wider font-[600]`}
          >
            {Event.Heading}
          </span>
          <div className="flex mt-[10px] items-center">
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
              {Event.Date}
            </span>
          </div>
          <div className="flex items-center gap-[20px]">
            <button
              className={`text-white font-bold w-fit px-[30px] tracking-wider ${
                isTablet
                  ? isDesktopOrLaptop
                    ? "text-[20px] mt-[20px]"
                    : "text-[20px] mt-[15px]"
                  : "text-[18px] mt-[10px]"
              } ${
                expired
                  ? "credentials-button-disabled "
                  : userEvents.has(Event["_id"])
                  ? "credentials-button-disabled "
                  : "credentials-button "
              }  `}
              onClick={() => {
                HandleRegister();
              }}
              disabled={userEvents.has(Event["_id"])}
            >
              {expired ? (
                "Completed"
              ) : userEvents.has(Event["_id"]) ? (
                "Registered"
              ) : loading ? (
                <img src={load} alt="" className="w-full max-w-[60px] h-auto" />
              ) : (
                "Register"
              )}
            </button>
            <button
              id="view-details"
              className={`font-bold transition-all w-fit hover:drop-shadow-xl ml-[10px] ${
                isTablet
                  ? isDesktopOrLaptop
                    ? "text-[20px] mt-[20px]"
                    : "text-[20px] mt-[15px]"
                  : "text-[18px] mt-[10px]"
              }`}
              onClick={() => {
                setMoreDetails(true);
              }}
            >
              Details
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
  );
}
