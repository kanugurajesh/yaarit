import EventPanel from "./EventPanel";
import LoadingCard from "./LoadingCard";
import { useNavigate } from "react-router-dom";
import forwardIcon from "../../../public/arrow_forward_FILL0_wght400_GRAD0_opsz24.svg";

export default function EventsList({
  Events,
  eventScroll,
  isDesktopOrLaptop,
  isTablet,
  userEvents,
  setUserEvents,
  renderNow,
}) {
  const navigate = useNavigate();
  return (
    <div className="my-[80px]">
      <div
        ref={eventScroll}
        className={`mt-[50px] flex flex-wrap items-center justify-center`}
      >
        <span
          className={`font-[700] ${
            isTablet
              ? isDesktopOrLaptop
                ? "text-[60px]"
                : "text-[55px]"
              : "text-[45px]"
          } tracking-wider leading-[118.5px] text-[#15144B] mr-[40px]`}
        >
          Events
        </span>
        <button
          onClick={() => {
            navigate("/Home/EventPage");
          }}
          className={`${
            isTablet
              ? isDesktopOrLaptop
                ? "w-[40px] h-[40px]"
                : "w-[35px] h-[35px]"
              : "w-[30px] h-[30px]"
          }`}
        >
          <img src={forwardIcon} alt="" className="w-full h-full" />
        </button>
        <div></div>
      </div>
      <div className="flex flex-wrap my-[50px] gap-y-[40px] gap-x-[20px] justify-evenly ">
        {renderNow ? (
          Events.map((obj, index) => {
            if (index < (isTablet ? 3 : 2))
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
          </>
        )}
      </div>
    </div>
  );
}
