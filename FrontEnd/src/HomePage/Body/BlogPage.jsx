import BackIcon from "../../assets/arrow_back_FILL0_wght400_GRAD0_opsz24.svg";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { useMediaQuery } from "react-responsive";
import Axios from "axios";
import LoadingCard from "./BodyComponents/LoadingCard";
import BlogPanel from "./BodyComponents/BlogPanel";

export default function BlogPage({
  renderNowBlogs,
  setRenderNowBlogs,
  blogs,
  setBlogs,
}) {
  const navigate = useNavigate();
  const blogPage = useRef(null);

  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-width: 1090px)",
  });
  const isTablet = useMediaQuery({
    query: "(min-width: 700px)",
  });

  useEffect(() => {
    window.history.scrollRestoration = "manual";
    blogPage.current?.scrollIntoView();
    if (!renderNowBlogs) {
      Axios.post("http://192.168.0.104:8000/blogs/blogsPage", {
        AUTH_API_KEY: "AIyuhjerty9poiud9qwer4poijkhpoiubqXpkjm",
      }).then((response) => {
        setBlogs(response.data.data);
        setRenderNowBlogs(true);
      });
    }
  }, []);
  return (
    <div ref={blogPage} className="relative">
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
          BLOGS
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
        {renderNowBlogs ? (
          blogs.map((obj, index) => {
            return (
              <div key={obj + index}>
                <BlogPanel
                  object={blogs[index]}
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
