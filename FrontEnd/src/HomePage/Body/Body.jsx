import { useEffect } from "react";
import BlogList from "./BodyComponents/BlogList";
import EventsList from "./BodyComponents/EventsList";
import { useMediaQuery } from "react-responsive";

export default function Body({
  blogs,
  Events,
  blogScroll,
  eventScroll,
  userEvents,
  setUserEvents,
  renderNow,
}) {
  useEffect(() => {
    window.history.scrollRestoration = "manual";
  }, []);
  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-width: 1090px)",
  });
  const isTablet = useMediaQuery({
    query: "(min-width: 700px)",
  });
  return (
    <div
      className={
        isTablet
          ? isDesktopOrLaptop
            ? "py-[50px] px-[80px]"
            : "py-[40px] px-[60px]"
          : " py-[30px] px-[30px]"
      }
    >
      <EventsList
        Events={Events}
        eventScroll={eventScroll}
        isDesktopOrLaptop={isDesktopOrLaptop}
        isTablet={isTablet}
        userEvents={userEvents}
        setUserEvents={setUserEvents}
        renderNow={renderNow}
      />
      <BlogList
        blogs={blogs}
        blogScroll={blogScroll}
        isDesktopOrLaptop={isDesktopOrLaptop}
        isTablet={isTablet}
        renderNow={renderNow}
      />
    </div>
  );
}
