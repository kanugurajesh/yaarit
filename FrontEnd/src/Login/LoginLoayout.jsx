export default function LoginLayout({
  Email,
  setEmail,
  Password,
  setPassword,
  remember,
  setRemeber,
  successfulLogin,
  setForgotPass,
  authenticate,
  navigate,
}) {
  return (
    <>
      <span
        className={"text-[#15144B] text-[2.2em] font-black tracking-wider "}
      >
        {successfulLogin === 0 ? (
          <>Hello </>
        ) : successfulLogin === -1 ? (
          <>Hey!</>
        ) : (
          (successfulLogin === 1 || successfulLogin === 2) && <>Welcome back!</>
        )}
      </span>
      <span className=" text-[#778391] text-[1.2em] font-[500] tracking-wider">
        {successfulLogin === 0 ? (
          <>Enter your details</>
        ) : successfulLogin === -1 ? (
          <>Credentials are wrong. Try again!</>
        ) : (
          successfulLogin === 1 && <>Logging you in!</>
        )}
      </span>
      <br />
      <form className="flex flex-col " onSubmit={(e) => authenticate(e)}>
        <span className="text-[#15144B] text-[1.2em] font-black tracking-wider">
          Email
        </span>
        <input
          type="text"
          id="Email-login"
          className="credentials-input"
          value={Email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          required
        ></input>
        <br />
        <span className="text-[#15144B] text-[1.2em] font-black tracking-wider">
          Password
        </span>
        <input
          type="password"
          id="Password-login"
          className="credentials-input"
          value={Password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          required
        ></input>
        <br />
        <div className="flex justify-between">
          <div>
            <input
              type="checkbox"
              id="remember-me"
              value="Remember me"
              checked={remember}
              className="cursor-pointer"
              onChange={(e) => setRemeber(e.target.checked)}
            ></input>
            <label
              htmlFor="remember-me"
              className=" pl-[10px] text-[#15144B] font-black tracking-wider "
            >
              Remember me
            </label>
          </div>
          <button
            type="button"
            className="font-[600] ml-[40px]"
            id="forgot-password"
            onClick={() => setForgotPass(true)}
          >
            Forgot password?
          </button>
        </div>
        <br />
        <input
          type="submit"
          id="login"
          value="Login"
          className={`text-white text-[1.5em] font-black tracking-wider py-[10px] rounded-md cursor-pointer credentials-button`}
        />
      </form>
      <span className="text-center mt-[20px]">
        Don't have an account?
        <button
          className="text-[#5258FF] font-black ml-[5px]"
          onClick={() => {
            navigate("/Register", { replace: true });
          }}
        >
          Register
        </button>
      </span>
    </>
  );
}
