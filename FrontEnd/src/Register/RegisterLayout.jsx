import { useState } from "react";

export default function RegisterLayout({
  fullName,
  setFullName,
  rEmail,
  setREmail,
  phNo,
  setPhoneNo,
  rPass,
  setRPass,
  setYear,
  setBranch,
  setPlan,
  checkRazorpay,
}) {
  /* NOTATION LOGIC */
  //  0 - has not changed
  //  1 - true
  // -1 - false
  const [fnameCorrect, setFnameCorrect] = useState(0);
  const [rEmailCorrect, setREmailCorrect] = useState(0);
  const [phnoCorrect, setPhnoCorrect] = useState(0);
  const [rPassCorrect, setRPassCorrect] = useState(0);
  const [passMatchCorrect, setPassMatchCorrect] = useState(0);
  const [wrongDetails, setWrongDetails] = useState(false);

  //checking email domain
  function checkMail(mail) {
    if (mail.length !== 14 + 12) {
      setREmailCorrect(-1);
      return;
    } else {
      const x = "ni.ude.cersvm@";
      for (let i = mail.length - 1, j = 0; j < 14; i--, j++) {
        if (mail[i] !== x[j]) {
          setREmailCorrect(-1);
          return;
        }
      }
    }
    setREmailCorrect(1);
  }

  //check all conditions
  function checkRules(event) {
    event.preventDefault();
    if (
      fnameCorrect === 1 &&
      rEmailCorrect === 1 &&
      phnoCorrect === 1 &&
      rPassCorrect === 1 &&
      passMatchCorrect === 1
    ) {
      checkRazorpay(event);
    } else {
      setWrongDetails(true);
    }
  }

  return (
    <>
      <span
        className={"text-[#15144B] text-[2.2em] font-black tracking-wider "}
      >
        {wrongDetails ? "Hey!" : "Create Account"}
      </span>
      <span className=" text-[#778391] text-[1.2em] font-[500] tracking-wider">
        {wrongDetails ? "Get your ticks green!" : "Enter your details"}
      </span>
      <br />
      <br />
      <form className="grid" onSubmit={(e) => checkRules(e)}>
        <span className="text-[#15144B] text-[1.2em] font-black tracking-wider">
          Full Name{" "}
          {fnameCorrect === 1 ? (
            <span className="text-[#00FF00]">&#x2713;</span>
          ) : (
            fnameCorrect === -1 && <span>&#10060;</span>
          )}
        </span>
        <input
          type="text"
          id="name-register"
          className="credentials-input"
          value={fullName}
          onChange={(e) => {
            setFullName(e.target.value.trim());
            if (e.target.value.trim().length !== 0) {
              setFnameCorrect(1);
            } else {
              setFnameCorrect(-1);
            }
          }}
          required
        ></input>
        <br />
        <span className="text-[#15144B] text-[1.2em] font-black tracking-wider">
          Email{" "}
          {rEmailCorrect === 1 ? (
            <span className="text-[#00FF00]">&#x2713;</span>
          ) : (
            rEmailCorrect === -1 && <span>&#10060;</span>
          )}
        </span>
        <input
          type="text"
          id="email-register"
          className="credentials-input"
          value={rEmail}
          onChange={(e) => {
            setREmail(e.target.value.trim());
            checkMail(e.target.value.trim());
          }}
          required
        ></input>
        <br />
        <span className="text-[#15144B] text-[1.2em] font-black tracking-wider">
          Phone number{" "}
          {phnoCorrect === 1 ? (
            <span className="text-[#00FF00]">&#x2713;</span>
          ) : (
            phnoCorrect === -1 && <span>&#10060;</span>
          )}
        </span>
        <input
          type="number"
          max={1e10 - 1}
          min={1e9}
          id="phno-register"
          className="credentials-input no-arrow"
          value={phnoCorrect !== 0 && phNo}
          onChange={(e) => {
            setPhoneNo(e.target.value);
            if (e.target.value.length === 10) {
              setPhnoCorrect(1);
            } else {
              setPhnoCorrect(-1);
            }
          }}
          required
        ></input>
        <br />
        <span className="text-[#15144B] text-[1.2em] font-black tracking-wider">
          Password{" "}
          {rPassCorrect === 1 ? (
            <span className="text-[#00FF00]">&#x2713;</span>
          ) : rPassCorrect === -1 ? (
            <span>&#10060;</span>
          ) : (
            rPassCorrect === -2 && (
              <span className="text-[#ff0000]"> - too short</span>
            )
          )}
        </span>
        <input
          type="password"
          id="Password-register"
          className="credentials-input"
          value={rPass}
          onChange={(e) => {
            setPassMatchCorrect(0);
            setRPass(e.target.value.trim());
            if (e.target.value.trim().length === 0) {
              setRPassCorrect(-1);
            } else if (e.target.value.trim().length <= 5) {
              setRPassCorrect(-2);
            } else {
              setRPassCorrect(1);
            }
          }}
          required
        ></input>
        <br />
        <span className="text-[#15144B] text-[1.2em] font-black tracking-wider">
          Confirm password{" "}
          {passMatchCorrect === 1 ? (
            <span className="text-[#00FF00]">&#x2713;</span>
          ) : (
            passMatchCorrect === -1 && <span>&#10060;</span>
          )}
        </span>
        <input
          type="password"
          id="rePassword-register"
          className="credentials-input"
          onChange={(e) => {
            if (e.target.value.trim() === rPass) {
              setPassMatchCorrect(1);
            } else {
              setPassMatchCorrect(-1);
            }
          }}
          required
        ></input>
        <br />
        <div>
          <span className="text-[#15144B] text-[1.2em] font-black tracking-wider">
            Year
          </span>
          <select
            name="year"
            id="year"
            className="credentials-input ml-[10px]"
            required
            onChange={(e) => setYear(e.target.value)}
          >
            <option value=""></option>
            <option value="1">First Year</option>
            <option value="2">Second Year</option>
            <option value="3">Thrid year</option>
            <option value="4">Forth year</option>
          </select>

          <span className="text-[#15144B] text-[1.2em] font-black tracking-wider ml-[15px]">
            Branch
          </span>
          <select
            name="branch"
            id="branch"
            className="credentials-input ml-[10px]"
            required
            onChange={(e) => {
              setBranch(e.target.value);
            }}
          >
            <option value=""></option>
            <option value="cse">CSE</option>
            <option value="it">IT</option>
            <option value="ece">ECE</option>
            <option value="eee">EEE</option>
            <option value="civil">CIVIL</option>
            <option value="mech">MECH</option>
            <option value="auto">AUTO</option>
          </select>
        </div>
        <br />
        <div className="flex justify-between relative">
          <span
            className={"text-[#15144B] text-[1.5em] font-black tracking-wider "}
          >
            Select your plan
          </span>
          <span className="font-[600]" id="view-details">
            view details &#63;
          </span>
          <div className="popup">Refer MainPage for Plan Details</div>
        </div>
        <br />
        <div>
          <input
            type="radio"
            id="1/2"
            name="plan"
            value="1/2"
            required
            onChange={(e) => {
              setPlan(e.currentTarget.value);
            }}
          />
          <span className=" text-[#778391] text-[1.2em] font-[500] tracking-wider ml-[20px]">
            6 months
          </span>
        </div>
        <div>
          <input
            type="radio"
            id="1"
            name="plan"
            value="1"
            onChange={(e) => {
              setPlan(e.currentTarget.value);
            }}
          />
          <span className=" text-[#778391] text-[1.2em] font-[500] tracking-wider ml-[20px]">
            1 year
          </span>
        </div>
        <div>
          <input
            type="radio"
            id="2"
            name="plan"
            value="2"
            onChange={(e) => {
              setPlan(e.currentTarget.value);
            }}
          />
          <span className=" text-[#778391] text-[1.2em] font-[500] tracking-wider ml-[20px]">
            2 years
          </span>
        </div>
        <br />
        <input
          type="submit"
          id="register"
          value="Register"
          className="text-white text-[1.5em] font-black tracking-wider credentials-button "
        ></input>
        <br />
        <br />
      </form>
    </>
  );
}
