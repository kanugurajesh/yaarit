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
      Axios.post(
        process.env.IP + "/blogs/blogsList",
        {
          AUTH_API_KEY: process.env.AUTH_API_KEY,
        },
        {
          timeout: 3000000,
        }
      ).then((response) => {
        setBlogs(response.data.data);
        Axios.post(
          process.env.IP + "/events/eventsList",
          {
            AUTH_API_KEY: process.env.AUTH_API_KEY,
          },
          {
            timeout: 3000000,
          }
        ).then((response) => {
          setEvents(response.data.data);
          const token = sessionStorage.getItem("token");
          Axios.post(
            process.env.IP + "/events/eventsFetch",
            {
              AUTH_API_KEY: process.env.AUTH_API_KEY,
              token: token,
            },
            {
              timeout: 3000000,
            }
          ).then((response) => {
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
    <div className="">
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
    </div>
  );
}
