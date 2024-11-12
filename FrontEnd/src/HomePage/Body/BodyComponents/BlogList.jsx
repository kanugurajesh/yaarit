import BlogPanel from "./BlogPanel";
import BlogLoadingCard from "./BlogLoadingCard";
import { useNavigate } from "react-router-dom";
import forwardIcon from "../../../public/arrow_forward_FILL0_wght400_GRAD0_opsz24.svg";

export default function BlogList({
  blogs,
  blogScroll,
  isDesktopOrLaptop,
  isTablet,
  renderNow,
}) {
  const navigate = useNavigate();
  return (
    <div className="mt-[100px] " ref={blogScroll}>
      <div className={`mt-[50px] flex flex-wrap items-center justify-center`}>
        <span
          className={`font-[700] ${
            isTablet
              ? isDesktopOrLaptop
                ? "text-[60px]"
                : "text-[55px]"
              : "text-[45px]"
          } tracking-wider leading-[118.5px] text-[#15144B] mr-[40px]`}
        >
          Blogs
        </span>
        <button
          onClick={() => {
            navigate("/Home/BlogPage");
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
      </div>
      <div className="flex flex-col justify-evenly items-center my-[50px] gap-y-[40px] gap-x-[20px]">
        {renderNow ? (
          blogs.map((obj, index) => {
            if (index < (isTablet ? 3 : 2))
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
          </>
        )}
      </div>
    </div>
  );
}
