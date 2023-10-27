import { useNavigate } from "react-router";
import Yaarit from "../../assets/Yaarit.svg";
import CarouselPage from "./CarouselPage";
import { useMediaQuery } from "react-responsive";

export default function Header({
  blog,
  Event,
  blogScroll,
  eventScroll,
  scrollHandler,
  userEvents,
  setUserEvents,
  renderNow,
}) {
  const navigate = useNavigate();
  const isTablet = useMediaQuery({
    query: "(min-width: 700px)",
  });

  function HandleSignout() {
    if (confirm("Do you want to Logout?")) {
      localStorage.clear();
      sessionStorage.clear();
      navigate("/", { replace: true });
    }
  }

  return (
    <>
      <div
        className={`min-h-[60px] flex justify-between items-center py-[40px] ${
          isTablet ? "px-[60px]" : "px-[30px]"
        } absolute w-full`}
      >
        <div className="flex flex-col">
          <img src={Yaarit} alt="" className="w-full max-w-[170px] h-auto" />
        </div>
        <div>
          <button
            id="profile"
            className="font-black pt-[6px] text-[20px] tracking-wide"
          >
            Profile
          </button>
          <button
            id="signout"
            className="font-black ml-[30px] pt-[6px] text-[20px] tracking-wide"
            onClick={() => {
              HandleSignout();
            }}
          >
            SignOut
          </button>
        </div>
      </div>
      <div
        className={`bg-gradient-to-b from-[#87BDFB] via-[#D0E3FC] to-[#EADFFF] pt-[130px] pb-[80px] ${
          isTablet ? "px-[60px]" : "px-[30px]"
        } `}
      >
        <CarouselPage
          blog={blog}
          Event={Event}
          blogScroll={blogScroll}
          eventScroll={eventScroll}
          scrollHandler={scrollHandler}
          userEvents={userEvents}
          setUserEvents={setUserEvents}
          renderNow={renderNow}
        />
      </div>
    </>
  );
}
