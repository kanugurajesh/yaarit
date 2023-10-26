import Arrow from "./assets/Vector.svg";

export default function Quote() {
  return (
    <>
      <div className="credentials-bg grid h-screen min-h-[500px] place-content-center">
        <div className="px-[30px] py-[60px] rounded-2xl border-[2px] box-shadow-quote border-[#dfe4ff] bg-[#dfe4ff4d] backdrop-blur pl-[60px] pr-[80px] floats-vertical">
          <div className="flex">
            <img
              src={Arrow}
              alt=""
              width={"25px"}
              height={"45px"}
              className="mr-[20px]"
            />
            <span className="text-[4.2em] leading-[1.1em] font-black text-white tracking-wider">
              Your{" "}
            </span>
          </div>

          <p className="text-[4.2em] leading-[1.1em] font-black text-white tracking-wider">
            Destination
          </p>
          <p className="text-[4.2em] leading-[1.1em] font-black text-[#15144B] tracking-wider">
            Awaits.
          </p>
          <br />
          <br />
          <span className="font-black text-white tracking-wider">
            Unlock your educational journey
          </span>
        </div>
      </div>
    </>
  );
}
