import BackIcon from "../../public/arrow_back_FILL0_wght400_GRAD0_opsz24.svg";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef } from "react";
import { useMediaQuery } from "react-responsive";
import Axios from "axios";
import BlogLoadingCard from "./BodyComponents/BlogLoadingCard";
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
      Axios.post(
        process.env.IP + "/blogs/blogsPage",
        {
          AUTH_API_KEY: process.env.AUTH_API_KEY,
        },
        {
          timeout: 3000000,
        }
      ).then((response) => {
        setBlogs(response.data.data);
        setRenderNowBlogs(true);
      });
    }
  }, []);
  return (
    <div ref={blogPage} className="relative">
      <div
        className={`bg-gray-100 flex gap-[30px] items-center ${
          isTablet
            ? isDesktopOrLaptop
              ? "px-[200px] py-[150px]"
              : "px-[100px] py-[100px]"
            : "px-[70px] py-[70px]"
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
          className={`font-[700] cut-out ${
            isTablet
              ? isDesktopOrLaptop
                ? "text-[60px]"
                : "text-[50px]"
              : "text-[40px]"
          } tracking-wider text-[#15144B]`}
        >
          Blogs
        </span>
        <div></div>
      </div>
      <div
        className={`absolute w-full flex flex-col justify-evenly overflow-y-auto no-scrollbar gap-[30px] py-[60px] px-[40px] items-center ${
          isTablet
            ? isDesktopOrLaptop
              ? "top-[250px] "
              : "top-[170px] "
            : "top-[110px] "
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
            <BlogLoadingCard
              isTablet={isTablet}
              isDesktopOrLaptop={isDesktopOrLaptop}
            />
            <BlogLoadingCard
              isTablet={isTablet}
              isDesktopOrLaptop={isDesktopOrLaptop}
            />
            {isTablet && (
              <BlogLoadingCard
                isTablet={isTablet}
                isDesktopOrLaptop={isDesktopOrLaptop}
              />
            )}
            {isDesktopOrLaptop && (
              <BlogLoadingCard
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
