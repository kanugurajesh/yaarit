import { useState } from "react";
import { useNavigate } from "react-router";
import Axios from "axios";

export default function RegisterCode({ Email, Password }) {
  const navigate = useNavigate();
  const [verifyCode, setVerifyCode] = useState("");
  const [verificationCodeEmpty, setVerificationCodeEmpty] = useState(0);

  const directHome = async () => {
    try {
      const response = await Axios.post(
        process.env.IP + "/register/verifyMail",
        {
          AUTH_PASSWORD: verifyCode,
          AUTH_API_KEY: process.env.AUTH_API_KEY,
        },
        {
          timeout: 3000000,
        }
      );
      console.log(response);
      navigate("/Home", { state: { Password, Email }, replace: true });
    } catch (error) {}
  };

  return (
    <div className="flex flex-col">
      <span
        className={"text-[#15144B] text-[2.2em] font-black tracking-wider "}
      >
        Verification Code
      </span>
      <span className=" text-[#778391] text-[1.2em] font-[500] tracking-wider">
        Enter Verification Code
      </span>
      <br />
      <br />
      <form
        className="grid"
        onSubmit={(e) => {
          e.preventDefault();
          if (verificationCodeEmpty === 1) directHome();
        }}
      >
        <span className="text-[#15144B] text-[1.2em] font-black tracking-wider">
          Code
          {verificationCodeEmpty === -1 && <span> - Empty!</span>}
        </span>
        <input
          type="text"
          id="code-register"
          className="credentials-input"
          value={verifyCode}
          onChange={(e) => {
            setVerifyCode(e.target.value.trim());
            if (e.target.value.trim().length !== 0) {
              setVerificationCodeEmpty(1);
            } else {
              setVerificationCodeEmpty(-1);
            }
          }}
          required
        ></input>
        <br />
        <input
          type="submit"
          id="code"
          value="Verify"
          className="text-white text-[1.5em] font-black tracking-wider py-[10px] rounded-md credentials-button "
        ></input>
        <br />
      </form>
      <span className="text-center my-[10px]">
        Already have an account?
        <button
          className="text-[#5258FF] font-black ml-[5px]"
          onClick={() => {
            navigate("/Login", { replace: true });
          }}
        >
          Login
        </button>
      </span>
    </div>
  );
}
