import Header from "./Header/Header";
import Body from "./Body/Body";
import Axios from "axios";
import { useRef, useEffect } from "react";

export default function Home({
  renderNow,
  setRenderNow,
  blogs,
  setBlogs,
  Events,
  setEvents,
  userEvents,
  setUserEvents,
}) {
  useEffect(() => {
    if (!renderNow)
      Axios.post("http://192.168.0.104:8000/blogs/blogsList", {
        AUTH_API_KEY: "AIyuhjerty9poiud9qwer4poijkhpoiubqXpkjm",
      }).then((response) => {
        setBlogs(response.data.data);
        Axios.post("http://192.168.0.104:8000/events/eventsList", {
          AUTH_API_KEY: "AIyuhjerty9poiud9qwer4poijkhpoiubqXpkjm",
        }).then((response) => {
          setEvents(response.data.data);
          const token = sessionStorage.getItem("token");
          Axios.post("http://192.168.0.104:8000/events/eventsFetch", {
            AUTH_API_KEY: "AIyuhjerty9poiud9qwer4poijkhpoiubqXpkjm",
            token: token,
          }).then((response) => {
            setUserEvents(new Set(response.data.data[0].Events));
            setRenderNow(true);
          });
        });
      });
  }, []);

  const blogScroll = useRef(null);
  const eventScroll = useRef(null);
  function scrollHandler(ref) {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }
  return (
    <>
      <>
        <Header
          blog={blogs[0]}
          Event={Events[0]}
          blogScroll={blogScroll}
          eventScroll={eventScroll}
          scrollHandler={scrollHandler}
          userEvents={userEvents}
          setUserEvents={setUserEvents}
          renderNow={renderNow}
        />
        <Body
          blogs={blogs}
          Events={Events}
          blogScroll={blogScroll}
          eventScroll={eventScroll}
          userEvents={userEvents}
          setUserEvents={setUserEvents}
          renderNow={renderNow}
        />
      </>
    </>
  );
}
