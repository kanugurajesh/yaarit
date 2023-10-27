import { useState } from "react";
import Resetpass from "./ResetPass";
import ArrowLeft from "../assets/chevron_left_FILL0_wght400_GRAD0_opsz24.svg";
import Axios from "axios";

export default function ForgotPass({ setForgotPass }) {
  const [emailForCode, setEmailForLink] = useState("");
  const [codeForReset, setCodeForReset] = useState("");

  const [getC, setGetC] = useState(true);
  const [verify, setVerify] = useState(false);
  const [newpass, setNewpass] = useState(false);

  const GetMail = async (event) => {
    event.preventDefault();
    try {
      await Axios.post("http://localhost:8000/reset/sendForgetMail", {
        email: emailForCode,
        AUTH_API_KEY: "AIyuhjerty9poiud9qwer4poijkhpoiubqXpkjm",
      });
      setGetC(false);
      setVerify(true);
    } catch (error) {
      console.error("Error in reaching the server");
    }
  };

  const GetResetPass = async (event) => {
    event.preventDefault();
    try {
      await Axios.post("http://localhost:8000/reset/verifyForgetMail", {
        AUTH_PASSWORD: codeForReset,
        AUTH_API_KEY: "AIyuhjerty9poiud9qwer4poijkhpoiubqXpkjm",
      });
      setVerify(false);
      setNewpass(true);
      setCodeForReset("");
    } catch (error) {
      console.error("Error in reaching the server");
    }
  };

  function getCode() {
    return (
      <>
        <div>
          <button onClick={() => setForgotPass(false)}>
            <img src={ArrowLeft} alt="" width={"40px"} height={"40px"} />
          </button>
        </div>
        <br />
        <span
          className={"text-[#15144B] text-[2.2em] font-black tracking-wider "}
        >
          Forgot Password &#128273;
        </span>
        <span className=" text-[#778391] text-[1.2em] font-[500] tracking-wider">
          Enter your email for to get Code
        </span>
        <br />
        <br />
        <form
          onSubmit={(event) => {
            GetMail(event);
          }}
          className="grid"
        >
          <span className="text-[#15144B] text-[1.2em] font-black tracking-wider">
            Email
          </span>

          <input
            type="text"
            id="Email-login-forgot_pass"
            className="credentials-input"
            value={emailForCode}
            onChange={(e) => {
              setEmailForLink(e.target.value);
            }}
            required
          ></input>
          <br />
          <br />
          <input
            type="submit"
            id="get-code"
            value="Get code"
            className="text-white text-[1.5em] font-black tracking-wider credentials-button"
          ></input>
        </form>
      </>
    );
  }

  function enterCode() {
    return (
      <>
        <div>
          <button
            onClick={() => {
              setForgotPass(false);
            }}
          >
            <img src={ArrowLeft} alt="" width={"40px"} height={"40px"} />
          </button>
        </div>
        <br />
        <span
          className={"text-[#15144B] text-[2.2em] font-black tracking-wider "}
        >
          Enter the code &#x1f5a5;
        </span>
        <br />
        <br />
        <form
          onSubmit={(event) => {
            GetResetPass(event);
          }}
          className="grid"
        >
          <span className="text-[#15144B] text-[1.2em] font-black tracking-wider">
            Code
          </span>

          <input
            type="text"
            id="Email-login-code"
            className="credentials-input"
            value={codeForReset}
            onChange={(e) => {
              setCodeForReset(e.target.value);
            }}
            required
          ></input>
          <br />
          <input
            type="submit"
            id="verify"
            value="Verify"
            className="text-white text-[1.5em] font-black tracking-wider credentials-button"
          ></input>
        </form>
      </>
    );
  }

  return (
    <>
      {getC && getCode()}
      {verify && enterCode()}
      {newpass && (
        <Resetpass setForgotPass={setForgotPass} email={emailForCode} />
      )}
    </>
  );
}
