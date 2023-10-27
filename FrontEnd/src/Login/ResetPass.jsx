import { useState } from "react";
import ArrowLeft from "../assets/chevron_left_FILL0_wght400_GRAD0_opsz24.svg";
import Axios from "axios";

export default function Resetpass({ setForgotPass, email }) {
  const [pass, setPass] = useState("");
  const [same, setSame] = useState(0);
  const [nPassCorrect, setNPassCorrect] = useState(0);

  const checkSame = async (event) => {
    event.preventDefault();
    try {
      if (same === 1) {
        const response = await Axios.post(
          "http://localhost:8000/reset/ChangePassword",
          {
            AUTH_API_KEY: "AIyuhjerty9poiud9qwer4poijkhpoiubqXpkjm",
            email: email,
            password: pass,
          }
        );
        setForgotPass(false);
      }
    } catch (error) {
      console.error("Error in reaching the server");
    }
  };

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
        New Password &#128274;
      </span>
      <span className=" text-[#778391] text-[1.2em] font-[500] tracking-wider">
        Enter your New Password
      </span>
      <br />
      <br />
      <form
        onSubmit={(event) => {
          checkSame(event);
        }}
        className="grid"
      >
        <span className="text-[#15144B] text-[1.2em] font-black tracking-wider">
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
          id="Email-login-newpass"
          className="credentials-input"
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
        <span className="text-[#15144B] text-[1.2em] font-black tracking-wider">
          Re-enter new password{" "}
          {same === 1 ? (
            <span className="text-[#00FF00]">&#x2713;</span>
          ) : (
            same === -1 && <span>&#10060;</span>
          )}
        </span>
        <input
          type="password"
          id="Email-login-newpass-check"
          className="credentials-input"
          onChange={(e) => {
            if (e.target.value === pass) setSame(1);
            else setSame(-1);
          }}
          required
        ></input>
        <br />
        <br />
        <input
          type="submit"
          id="resetpass"
          value="Reset Pass"
          className="text-white text-[1.5em] font-black tracking-wider credentials-button"
        ></input>
      </form>
    </>
  );
}
