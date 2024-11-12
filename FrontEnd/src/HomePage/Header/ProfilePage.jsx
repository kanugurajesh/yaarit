import { useMediaQuery } from "react-responsive";
import Yaarit from "../../public/YaarIt.svg";
import backicon from "../../public/arrow_back_FILL0_wght400_GRAD0_opsz24.svg";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import Axios from "axios";

export default function ProfilePage() {
  const isTablet = useMediaQuery({
    query: "(min-width: 800px)",
  });
  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-width: 1190px)",
  });

  const [data, setData] = useState({});
  const [rendernow, setRendernow] = useState(false);
  const [changepass, setChangepass] = useState(false);
  const [pass, setPass] = useState("");
  const [oldpass, setOldpass] = useState(0);
  const [same, setSame] = useState(0);
  const [nPassCorrect, setNPassCorrect] = useState(0);

  const yearsArray = ["First Year", "Second Year", "Third Year", "Fourth Year"];

  const navigate = useNavigate();

  const fetching = async () => {
    try {
      const token = sessionStorage.getItem("token");
      const response = await Axios.post(
        process.env.IP + "/profile/profileInfo",
        {
          AUTH_API_KEY: process.env.AUTH_API_KEY,
          token: token,
        },
        {
          timeout: 3000000,
        }
      );
      setData(response.data.data);
      setRendernow(true);
    } catch (error) {
      alert(error);
      alert("Error reaching server");
      navigate("/Home");
    }
  };

  const checkSame = async (event) => {
    event.preventDefault();
    try {
      if (same === 1 && oldpass === 1) {
        await Axios.post(
          process.env.IP + "/reset/ChangePassword",
          {
            AUTH_API_KEY: process.env.AUTH_API_KEY,
            email: data.Email,
            password: pass,
          },
          {
            timeout: 3000000,
          }
        );
        alert("Password changed");
        setChangepass(false);
        fetching();
        setPass("");
        setSame(0);
        setOldpass(0);
        setNPassCorrect(0);
      }
    } catch (error) {
      console.error("Error in reaching the server");
    }
  };

  useEffect(() => {
    fetching();
  }, []);

  return (
    <div
      className={`bg-gradient-to-b from-[#87BDFB] via-[#D0E3FC] to-[#EADFFF] min-h-screen flex flex-col items-center  ${
        isTablet ? " py-[80px]" : " py-[50px] justify-evenly"
      } `}
    >
      <div className="flex justify-evenly items-center w-full">
        <div
          className="flex gap-[10px] items-center cursor-pointer"
          onClick={() => {
            navigate(-1);
          }}
        >
          <img src={backicon} alt="" width={isTablet ? 30 : 20} />
          <span
            className={`font-black ${isTablet ? "text-[25px]" : "text-[15px]"}`}
          >
            BACK
          </span>
        </div>
        <img
          src={Yaarit}
          alt=""
          className={`w-full h-auto ${
            isTablet ? "max-w-[170px]" : "max-w-[100px]"
          }`}
        />
      </div>
      <div
        className={`rounded-md bg-gradient-to-b from-[#FFFFFF66] to-[#FFFFFF] flex flex-col backdrop-blur items-center  ${
          isTablet ? "px-[150px] py-[80px]" : "px-[50px] py-[50px]"
        }  mt-[100px]`}
      >
        {rendernow ? (
          !changepass ? (
            <>
              <span
                id="profile-in"
                className={`font-black tracking-wide ${
                  isTablet
                    ? isDesktopOrLaptop
                      ? "text-[40px]"
                      : "text-[30px]"
                    : "text-[20px]"
                }`}
              >
                PROFILE
              </span>
              <div className="mt-[30px] flex flex-col gap-[20px]">
                <div className="flex flex-col gap-[5px]">
                  <span
                    className={`font-bold text-gray-500 underline ${
                      isTablet
                        ? isDesktopOrLaptop
                          ? "text-[23px]"
                          : "text-[18px]"
                        : "text-[15px]"
                    }`}
                  >
                    Email
                  </span>
                  <span
                    className={`font-bold   ${
                      isTablet
                        ? isDesktopOrLaptop
                          ? "text-[23px]"
                          : "text-[18px]"
                        : "text-[15px]"
                    }`}
                  >
                    {data.Email}
                  </span>
                </div>

                <div className="flex flex-col gap-[5px]">
                  <span
                    className={`font-bold text-gray-500 underline ${
                      isTablet
                        ? isDesktopOrLaptop
                          ? "text-[23px]"
                          : "text-[18px]"
                        : "text-[15px]"
                    }`}
                  >
                    Username
                  </span>
                  <span
                    className={`font-bold   ${
                      isTablet
                        ? isDesktopOrLaptop
                          ? "text-[23px]"
                          : "text-[18px]"
                        : "text-[15px]"
                    }`}
                  >
                    {data.Username}
                  </span>
                </div>

                <div className="flex flex-col gap-[5px]">
                  <span
                    className={`font-bold text-gray-500 underline ${
                      isTablet
                        ? isDesktopOrLaptop
                          ? "text-[23px]"
                          : "text-[18px]"
                        : "text-[15px]"
                    }`}
                  >
                    Phone number
                  </span>
                  <span
                    className={`font-bold   ${
                      isTablet
                        ? isDesktopOrLaptop
                          ? "text-[23px]"
                          : "text-[18px]"
                        : "text-[15px]"
                    }`}
                  >
                    {data.PhoneNo}
                  </span>
                </div>

                <div className="flex flex-col gap-[5px]">
                  <span
                    className={`font-bold text-gray-500 underline ${
                      isTablet
                        ? isDesktopOrLaptop
                          ? "text-[23px]"
                          : "text-[18px]"
                        : "text-[15px]"
                    }`}
                  >
                    Year
                  </span>
                  <span
                    className={`font-bold   ${
                      isTablet
                        ? isDesktopOrLaptop
                          ? "text-[23px]"
                          : "text-[18px]"
                        : "text-[15px]"
                    }`}
                  >
                    {yearsArray[data.Year - 1]}
                  </span>
                </div>

                <div className="flex flex-col gap-[5px]">
                  <span
                    className={`font-bold text-gray-500 underline ${
                      isTablet
                        ? isDesktopOrLaptop
                          ? "text-[23px]"
                          : "text-[18px]"
                        : "text-[15px]"
                    }`}
                  >
                    Branch
                  </span>
                  <span
                    className={`font-bold   ${
                      isTablet
                        ? isDesktopOrLaptop
                          ? "text-[23px]"
                          : "text-[18px]"
                        : "text-[15px]"
                    }`}
                  >
                    {data.Branch.toUpperCase()}
                  </span>
                </div>
              </div>
              <button
                className={`credentials-button px-[20px] rounded-md font-black text-white py-[10px] ${
                  isTablet
                    ? isDesktopOrLaptop
                      ? "text-[23px]"
                      : "text-[18px]"
                    : "text-[15px]"
                } ${isTablet ? "mt-[60px]" : "mt-[30px]"}`}
                onClick={() => {
                  setChangepass(!changepass);
                }}
              >
                Change Password
              </button>
            </>
          ) : (
            <>
              <form
                onSubmit={(event) => {
                  checkSame(event);
                }}
                className="flex flex-col items-center"
              >
                <span
                  className={`font-bold text-[#15144B] tracking-wider ${
                    isTablet
                      ? isDesktopOrLaptop
                        ? "text-[20px]"
                        : "text-[18px]"
                      : "text-[15px]"
                  }`}
                >
                  Old password{" "}
                  {oldpass === 1 ? (
                    <span className="text-[#00FF00]">&#x2713;</span>
                  ) : (
                    oldpass === -1 && <span>&#10060;</span>
                  )}
                </span>
                <input
                  type="password"
                  id="Profile-oldpass"
                  className={`credentials-input ${
                    isTablet
                      ? isDesktopOrLaptop
                        ? "w-[500px]"
                        : "w-[400px]"
                      : "w-[250px]"
                  }`}
                  onChange={(e) => {
                    if (data.Password === e.target.value) setOldpass(1);
                    else setOldpass(-1);
                  }}
                  required
                ></input>
                <br />
                <span
                  className={`font-bold text-[#15144B] tracking-wider ${
                    isTablet
                      ? isDesktopOrLaptop
                        ? "text-[20px]"
                        : "text-[18px]"
                      : "text-[15px]"
                  }`}
                >
                  New password{" "}
                  {nPassCorrect === 1 ? (
                    <span className="text-[#00FF00]">&#x2713;</span>
                  ) : nPassCorrect === -1 ? (
                    <span>&#10060;</span>
                  ) : (
                    nPassCorrect === -2 && (
                      <span className="text-[#ff0000]"> - too short</span>
                    )
                  )}
                </span>
                <input
                  type="password"
                  id="profile-newpass"
                  className={`credentials-input ${
                    isTablet
                      ? isDesktopOrLaptop
                        ? "w-[500px]"
                        : "w-[400px]"
                      : "w-[250px]"
                  }`}
                  value={pass}
                  onChange={(e) => {
                    setSame(0);
                    setPass(e.target.value.trim());
                    if (e.target.value.trim().length === 0) {
                      setNPassCorrect(-1);
                    } else if (e.target.value.trim().length <= 5) {
                      setNPassCorrect(-2);
                    } else {
                      setNPassCorrect(1);
                    }
                  }}
                  required
                ></input>
                <br />
                <span
                  className={`font-bold text-[#15144B] tracking-wider ${
                    isTablet
                      ? isDesktopOrLaptop
                        ? "text-[20px]"
                        : "text-[18px]"
                      : "text-[15px]"
                  }`}
                >
                  Confirm password{" "}
                  {same === 1 ? (
                    <span className="text-[#00FF00]">&#x2713;</span>
                  ) : (
                    same === -1 && <span>&#10060;</span>
                  )}
                </span>
                <input
                  type="password"
                  id="Profile-newpass-check"
                  className={`credentials-input ${
                    isTablet
                      ? isDesktopOrLaptop
                        ? "w-[500px]"
                        : "w-[400px]"
                      : "w-[250px]"
                  }`}
                  onChange={(e) => {
                    if (e.target.value === pass) setSame(1);
                    else setSame(-1);
                  }}
                  required
                ></input>
                <div className="flex justify-evenly items-center gap-[20px]">
                  <input
                    type="submit"
                    id="resetpass"
                    value="Reset Pass"
                    className={` px-[20px] rounded-md font-black text-white mt-[50px] py-[10px] ${
                      isTablet
                        ? isDesktopOrLaptop
                          ? "text-[23px] w-[200px]"
                          : "text-[18px] w-[150px]"
                        : "text-[15px] w-[120px]"
                    } ${
                      same === 1 && oldpass === 1
                        ? "cursor-pointer credentials-button"
                        : "credentials-button-disabled"
                    }`}
                  ></input>
                  <button
                    className={`credentials-button px-[20px] rounded-md font-black text-white mt-[50px] py-[10px] ${
                      isTablet
                        ? isDesktopOrLaptop
                          ? "text-[23px] w-[200px]"
                          : "text-[18px] w-[150px]"
                        : "text-[15px] w-[100px]"
                    } `}
                    onClick={() => {
                      setChangepass(!changepass);
                      setPass("");
                      setSame(0);
                      setOldpass(0);
                      setNPassCorrect(0);
                    }}
                    type="button"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </>
          )
        ) : (
          ""
        )}
      </div>
      {!isTablet && <div></div>}
    </div>
  );
}
