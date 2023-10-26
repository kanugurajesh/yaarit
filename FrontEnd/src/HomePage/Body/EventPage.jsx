import BackIcon from "../../assets/arrow_back_FILL0_wght400_GRAD0_opsz24.svg";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef } from "react";
import { useMediaQuery } from "react-responsive";
import Axios from "axios";
import LoadingCard from "./BodyComponents/LoadingCard";
import EventPanel from "./BodyComponents/EventPanel";

export default function EventPage({
  renderNowEvents,
  setRenderNowEvents,
  Events,
  setEvents,
  userEvents,
  setUserEvents,
}) {
  const navigate = useNavigate();
  const eventPage = useRef(null);

  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-width: 1090px)",
  });
  const isTablet = useMediaQuery({
    query: "(min-width: 700px)",
  });

  useEffect(() => {
    window.history.scrollRestoration = "manual";
    eventPage.current?.scrollIntoView();
    if (!renderNowEvents) {
      Axios.post("http://192.168.0.104:8000/events/eventsPage", {
        AUTH_API_KEY: "AIyuhjerty9poiud9qwer4poijkhpoiubqXpkjm",
      }).then((response) => {
        setEvents(response.data.data);
        const token = sessionStorage.getItem("token");
        Axios.post("http://192.168.0.104:8000/events/eventsFetch", {
          AUTH_API_KEY: "AIyuhjerty9poiud9qwer4poijkhpoiubqXpkjm",
          token: token,
        }).then((response) => {
          setUserEvents(new Set(response.data.data[0].Events));
          setRenderNowEvents(true);
        });
      });
    }
  }, []);
  return (
    <div ref={eventPage} className="relative">
      <div
        className={`blog-bg flex justify-evenly items-center ${
          isTablet
            ? isDesktopOrLaptop
              ? "px-[100px] py-[200px]"
              : "px-[30px] py-[100px]"
            : "px-[5px] py-[70px]"
        }`}
      >
        <img
          src={BackIcon}
          alt=""
          className={`w-full ${
            isTablet ? "max-w-[50px]" : "max-w-[30px]"
          } h-auto cursor-pointer`}
          onClick={() => {
            navigate(-1);
          }}
        />
        <span
          className={`font-[700] ${
            isTablet
              ? isDesktopOrLaptop
                ? "text-[60px]"
                : "text-[50px]"
              : "text-[40px]"
          } tracking-wider text-[#15144B]`}
        >
          EVENTS
        </span>
        <div></div>
      </div>
      <div
        className={`absolute w-full flex flex-wrap justify-evenly items-center ${
          isTablet
            ? isDesktopOrLaptop
              ? "top-[350px] "
              : "top-[230px] "
            : "top-[140px] "
        }`}
      >
        {renderNowEvents ? (
          Events.map((obj, index) => {
            return (
              <div key={obj + index}>
                <EventPanel
                  Event={Events[index]}
                  userEvents={userEvents}
                  setUserEvents={setUserEvents}
                  isDesktopOrLaptop={isDesktopOrLaptop}
                  isTablet={isTablet}
                />
              </div>
            );
          })
        ) : (
          <>
            <LoadingCard
              isTablet={isTablet}
              isDesktopOrLaptop={isDesktopOrLaptop}
            />
            <LoadingCard
              isTablet={isTablet}
              isDesktopOrLaptop={isDesktopOrLaptop}
            />
            {isTablet && (
              <LoadingCard
                isTablet={isTablet}
                isDesktopOrLaptop={isDesktopOrLaptop}
              />
            )}
            {isDesktopOrLaptop && (
              <LoadingCard
                isTablet={isTablet}
                isDesktopOrLaptop={isDesktopOrLaptop}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
}
