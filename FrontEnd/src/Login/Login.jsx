import { useEffect, useState } from "react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import LoginLayout from "./LoginLoayout.jsx";
import ForgotPass from "./ForgotPass.jsx";
import Quote from "../Quote.jsx";
import { useMediaQuery } from "react-responsive";

function Login() {
  const navigate = useNavigate();
  const [Render, setRender] = useState(false);
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [remember, setRemeber] = useState(false);
  const [successfulLogin, setSuccessfulLogin] = useState(0);
  const [forgotPass, setForgotPass] = useState(false);

  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-width: 1090px)",
  });

  const authenticate = async (event) => {
    event.preventDefault();
    try {
      const response = await Axios.post(
        process.env.IP + "/users/signin",
        {
          email: Email,
          password: Password,
          AUTH_API_KEY: process.env.AUTH_API_KEY,
        },
        {
          timeout: 3000000,
        }
      );
      if (response.data.message !== "") {
        setSuccessfulLogin(-1);
        setEmail("");
        setPassword("");
      } else {
        const { token } = response.data;
        if (remember) localStorage.setItem("token", token);
        sessionStorage.setItem("token", token);
        setSuccessfulLogin(1);
        setTimeout(() => {
          navigate("/Home", { replace: true });
        }, 2000);
      }
    } catch (error) {
      alert("Error Connecting to Server");
      setEmail("");
      setPassword("");
    }
  };

  useEffect(() => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        sessionStorage.setItem("token", token);
        Axios.post(
          process.env.IP + "/users/autosignin",
          {
            token: token,
            AUTH_API_KEY: process.env.AUTH_API_KEY,
          },
          {
            timeout: 3000000,
          }
        ).then((response) => {
          if (response.data.email !== "") {
            navigate("/Home", { replace: true });
          }
        });
      } else {
        setRender(true);
      }
    } catch (error) {
      setRender(true);
    }
  }, []);

  useEffect(() => {
    setEmail("");
    setPassword("");
    setRemeber(false);
  }, [forgotPass]);

  return (
    <>
      {Render && (
        <div
          className={`grid shadow-xl h-screen rounded-xl ${
            isDesktopOrLaptop ? "grid-cols-2" : ""
          }`}
        >
          {isDesktopOrLaptop && <Quote />}
          <div className={`grid place-content-center h-screen relative`}>
            <div className="grid mx-[30px]">
              {forgotPass ? (
                <ForgotPass setForgotPass={setForgotPass} />
              ) : (
                <LoginLayout
                  Email={Email}
                  setEmail={setEmail}
                  Password={Password}
                  setPassword={setPassword}
                  remember={remember}
                  setRemeber={setRemeber}
                  successfulLogin={successfulLogin}
                  setForgotPass={setForgotPass}
                  authenticate={authenticate}
                  navigate={navigate}
                />
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Login;
