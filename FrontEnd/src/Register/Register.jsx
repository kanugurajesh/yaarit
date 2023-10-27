import { useMediaQuery } from "react-responsive";
import Quote from "../Quote.jsx";
import RegisterLayout from "./RegisterLayout.jsx";
import frame from "../assets/Frame.svg";
import { useEffect, useState } from "react";
import Axios from "axios";
import RegisterCode from "./RegisterCode.jsx";

function Register() {
  const [fullName, setFullName] = useState("");
  const [rEmail, setREmail] = useState("");
  const [phNo, setPhoneNo] = useState(0);
  const [rPass, setRPass] = useState("");
  const [year, setYear] = useState("");
  const [branch, setBranch] = useState("");
  const [plan, setPlan] = useState(0);
  const [code, setCode] = useState(false);

  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-width: 1090px)",
  });

  async function checkRazorpay(event) {
    try {
      await Axios.post("http://localhost:8000/register/sendMail", {
        username: fullName,
        email: rEmail,
        phno: phNo,
        password: rPass,
        year: year,
        branch: branch,
        plan: plan,
        AUTH_API_KEY: "AIyuhjerty9poiud9qwer4poijkhpoiubqXpkjm",
      });
      setCode(true);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <div className={`grid ${isDesktopOrLaptop ? "grid-cols-2" : ""}`}>
        {isDesktopOrLaptop && <Quote />}
        <div className={`grid place-content-center h-screen relative `}>
          {!isDesktopOrLaptop && (
            <img src={frame} alt="" className="absolute top-0 left-0" />
          )}
          <div className="grid mx-[30px] pt-[100px] overflow-y-scroll no-scrollbar">
            {!code ? (
              <RegisterLayout
                fullName={fullName}
                setFullName={setFullName}
                rEmail={rEmail}
                setREmail={setREmail}
                phNo={phNo}
                setPhoneNo={setPhoneNo}
                rPass={rPass}
                setRPass={setRPass}
                setYear={setYear}
                setBranch={setBranch}
                setPlan={setPlan}
                checkRazorpay={checkRazorpay}
              />
            ) : (
              <RegisterCode Email={rEmail} Password={rPass} />
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Register;
