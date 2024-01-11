import digitalflakeIcon from "../assets/images/digitalflakeLogo.png";

export const Home = () => {
  return (
    <div className=" w-3/4 h-[calc(100vh-70px)] flexflex-col items-start text-center justify-center p-16">
      <img src={digitalflakeIcon} className="mt-4 mx-auto" />
      <p className="font-semibold text-xl">Welcome to Digitalflake Admin</p>
    </div>
  );
};
