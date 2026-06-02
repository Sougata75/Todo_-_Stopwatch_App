import { useState } from "react";
import type { LapData } from "../typescript/interface/interface";
import { bestLaps } from "../services/json/lapData";

function stopmWatch() {
  const [laps, setLaps] = useState<LapData[]>(bestLaps);

  const [minute, setMinute] = useState(0);
  const [second, setSecond] = useState(0);
  const [miliSecond, setMiliSecond] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [intervalId, setIntervalID] = useState<any>(null);

  const myWatch = () => {
    if (isRunning) {
      clearInterval(intervalId);
      setIsRunning(false);
      return;
    }

    setIsRunning(true);
    const id = setInterval(() => {
      setMiliSecond((ms) => {
        if (ms >= 99) {
          setSecond((s) => {
            if (s >= 59) {
              setMinute((m) => m + 1);
              return 0;
            }
            return s + 1;
          });
          return 0;
        }
        return ms + 1;
      });
    }, 10);

    setIntervalID(id);
  };

  const displayMinute = minute.toString().padStart(2, "0");
  const displaySecond = second.toString().padStart(2, "0");
  const displayMiliSecond = miliSecond.toString().padStart(2, "0");

  const handleLapData = () => {
    const currentLapTime = `${displayMinute}:${displaySecond}:${displayMiliSecond}`;
    const newLaps: LapData = {
      time: currentLapTime,
    };
    const updatedLaps = [...laps, newLaps];
    setLaps(updatedLaps);
    sessionStorage.setItem("bestLaps", JSON.stringify(updatedLaps));
  };

  const handleReset = () => {
    clearInterval(intervalId);
    setIsRunning(false);
    setMinute(0);
    setSecond(0);
    setMiliSecond(0);

    setLaps([]);
    sessionStorage.setItem("bestLaps", JSON.stringify([]));
  };

  return (
    <>
      <div className="w-full h-[100vh] bg-gray-900 flex flex-wrap justify-center items-center">
        <div className="w-[400px] h-[600px] bg-gray-100 rounded-2xl shadow-xl shadow-purple-900 p-3">
          <div className="w-full h-[30%] flex justify-center items-center">
            <p className={` ${isRunning? "text-purple-600":"text-gray-600"} fontStyle txtShadow font-bold text-[60px]`}>
              {displayMinute}:{displaySecond}:{displayMiliSecond}
            </p>
          </div>
          <div className=" w-full h-[40%] mb-[45px] overflow-y-scroll noBar">
            {laps?.map((times, index) => (
              <div key={index} className="w-full flex justify-center mb-[10px]">
                <p className="fontStyle text-xl font-semibold text-gray-400">
                  {index + 1} Best lap time : {times.time}
                </p>
              </div>
            ))}
          </div>
          <div className="w-full h-[10%] flex flex-wrap justify-between px-12 items-center">
            <div className="">
              <button
                onClick={handleLapData}
                className="bg-cyan-200 py-5 px-[22px] rounded-[50%] shadow-lg shadow-cyan-400 text-gray-600 font-semibold hover:translate-y-[-2px] transition-all hover:text-black"
              >
                <i className="fa-solid fa-flag"></i>
              </button>
            </div>
            <div className="">
              <button
                className={`${isRunning ? "bg-red-600 shadow-red-900 text-white" : "bg-cyan-300 shadow-cyan-600 text-black"} py-[22px] px-[22px] rounded-[50%] shadow-lg text-3xl font-semibold hover:translate-y-[-2px] transition-all`}
                onClick={myWatch}
              >
                {isRunning? (
                  <i className="fa-solid fa-pause"></i>
                ) : (
                  <i className="fa-solid fa-play"></i>
                )}
              </button>
            </div>
            <div className="">
              <button
                onClick={handleReset}
                className="bg-cyan-200 py-5 px-[22px] rounded-[50%] shadow-lg shadow-cyan-400 text-gray-600 font-semibold hover:translate-y-[-2px] transition-all hover:text-black"
              >
                <i className="fa-solid fa-arrow-rotate-left"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default stopmWatch;
