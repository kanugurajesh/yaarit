import Axios from "axios";
import Calender from "../../../assets/Calender.svg";
import { useState } from "react";
import load from "../../../assets/Double-Ring-0.8s-231px.svg";
import backicon from "../../../assets/arrow_back_ios_FILL0_wght400_GRAD0_opsz24.svg";

export default function EventPanel({
  Event,
  isDesktopOrLaptop,
  userEvents,
  setUserEvents,
  isTablet,
}) {
  const [loading, setLoading] = useState(false);
  const [moreDetails, setMoreDetails] = useState(false);

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
      {!moreDetails ? (
        <>
          <img
            src={`data:image/png;base64,` + Event.Image.data}
            alt=""
            className={`${
              isTablet
                ? isDesktopOrLaptop
                  ? " max-w-[400px]"
                  : "max-w-[370px]"
                : "max-w-[280px]"
            }`}
          />
          <span
            id="event-heading"
            className={`text-[#606CFA] drop-shadow-xl mt-[15px] ${
              isTablet
                ? isDesktopOrLaptop
                  ? "text-[25px]"
                  : "text-[23px]"
                : "text-[18px]"
            } leading-[40px] tracking-wider font-[600] mb-[10px]`}
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
          <div
            className={`flex flex-wrap justify-between items-center mt-[15px] ${
              isTablet
                ? isDesktopOrLaptop
                  ? "text-[20px]"
                  : "text-[20px]"
                : "text-[18px]"
            }`}
          >
            <button
              className={`text-white font-bold flex items-center justify-center tracking-wider ${
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
                <img src={load} alt="" className="w-full max-w-[60px] h-auto" />
              ) : (
                "Register"
              )}
            </button>
            <button
              id="view-details"
              className="font-bold transition-all hover:drop-shadow-xl  ml-[10px] min-w-[100px]"
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
  );
}
