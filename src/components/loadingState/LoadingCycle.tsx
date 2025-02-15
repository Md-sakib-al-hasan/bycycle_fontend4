import lodingimage from "../../assets/loadingCyle.gif";

const LaodingCycle = () => {
  return (
    <div className="bg-[#f2f2f2] relative flex flex-col justify-center items-center min-h-screen">
      <img className="md:w-3/12 w-full" src={lodingimage} alt="loading state" />
    </div>
  );
};

export default LaodingCycle;
