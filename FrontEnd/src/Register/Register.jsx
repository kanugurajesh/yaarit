import { useMediaQuery } from "react-responsive";
import Quote from "../Quote.jsx";
import RegisterLayout from "./RegisterLayout.jsx";
import { useState } from "react";
import Axios from "axios";
import RegisterCode from "./RegisterCode.jsx";
import { useNavigate } from "react-router";

function Register() {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState("");
  const [rEmail, setREmail] = useState("");
  const [phNo, setPhoneNo] = useState(0);
  const [rPass, setRPass] = useState("");
  const [year, setYear] = useState("");
  const [branch, setBranch] = useState("");
  const [plan, setPlan] = useState(0);
  const [code, setCode] = useState(false);

  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-width: 1100px)",
  });

  async function checkRazorpay(event) {
    try {
      await Axios.post(
        process.env.IP + "/register/sendMail",
        {
          username: fullName,
          email: rEmail,
          phno: phNo,
          password: rPass,
          year: year,
          branch: branch,
          plan: plan,
          AUTH_API_KEY: process.env.AUTH_API_KEY,
        },
        {
          timeout: 3000000,
        }
      );
      setCode(true);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <div
        className={`grid shadow-xl h-screen rounded-xl ${
          isDesktopOrLaptop ? "grid-cols-2" : ""
        }`}
      >
        {isDesktopOrLaptop && <Quote />}
        <div
          className={` flex justify-center h-screen relative ${
            code && "items-center"
          } bg-white overflow-y-auto no-scrollbar`}
        >
          {!code ? (
            <div className="pt-[100px] pb-[30px]">
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
                navigate={navigate}
              />
            </div>
          ) : (
            <RegisterCode Email={rEmail} Password={rPass} />
          )}
        </div>
      </div>
    </>
  );
}

export default Register;
