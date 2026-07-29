import { useState, useEffect } from "react";
import "./App.css";
import Targets from "./Targets";
import Leaderboard from "./Leaderboard";

function App() {
  // Set up the timer
  const [timer, setTimer] = useState(0);
  const [isRunning, setIsRunning] = useState(true);
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [pointerPosition, setPointerPosition] = useState({ X: 0, Y: 0 });

  const [list, setList] = useState([
    { name: "waldo", clicked: false },
    { name: "odlaw", clicked: false },
    { name: "wizard", clicked: false },
    { name: "wenda", clicked: false },
  ]);

  useEffect(() => {
    if (!isRunning) {
      return;
    }
    const startTime = performance.now();

    const intervalId = setInterval(() => {
      // const elapsedSeconds = Math.floor((performance.now() - startTime) / 1000);
      const elapsedMilliSeconds = Math.floor(performance.now() - startTime);

      setTimer(elapsedMilliSeconds);
    }, 10);

    return () => clearInterval(intervalId);
  }, [isRunning]);

  const totalSeconds = Math.floor(timer / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  // Set up the coordinates
  const [imgCoors, setImgCoors] = useState({
    X: 0,
    Y: 0,
  });
  const [targetsObj, setTargetsObj] = useState({
    display: false,
    position: {
      X: 0,
      Y: 0,
    },
  });

  function handleClick(e) {
    const rect = e.currentTarget.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setPointerPosition({ X: e.clientX, Y: e.clientY });

    console.log(x / rect.width);
    console.log(y / rect.height);

    setTargetsObj((previousTargetsObj) => ({
      display: !previousTargetsObj.display,
      position: {
        X: x,
        Y: y,
      },
    }));

    setImgCoors({
      X: rect.width,
      Y: rect.height,
    });
  }

  function handleImgOutsideClick(e) {
    // Avoided using e.stopPropagation
    if (e.target.id === "waldoImg") {
      return;
    }

    setTargetsObj({
      ...targetsObj,
      display: false,
    });
  }

  return (
    <>
      <div
        className="relative flex min-h-screen flex-col items-center"
        onClick={(e) => handleImgOutsideClick(e)}
      >
        <h1 className="text-heading mb-4 flex items-center text-3xl font-bold md:text-5xl lg:text-6xl">
          <img src="/waldoheader.png" alt="" className="w-24" />
          Where is Waldo?
        </h1>

        <div className="my-2 h-px w-full shrink-0 bg-gray-300" />

        <div className="mx-auto mt-4 mb-1.5 box-border flex w-[min(1100px,calc(100%-24px))] items-center justify-between gap-4 rounded-lg border border-[#dbe3ef] bg-white p-3 shadow-[0_8px_24px_rgba(15,23,42,0.08)] max-[600px]:mx-0 max-[600px]:mt-2.5 max-[600px]:w-full max-[600px]:flex-col max-[600px]:items-stretch max-[600px]:gap-2 max-[600px]:p-2.5">
          <div>
            <h2 className="mb-1 text-[22px] leading-[1.15] font-bold text-[#111827] max-[600px]:text-lg">
              Level: Hard Hunt
            </h2>{" "}
            <p className="m-0 text-sm leading-[1.35] text-[#475569]">
              Find Waldo, Odlaw, Wizard, and Wenda.
            </p>
          </div>
          <div className="box-border flex min-h-13 flex-col justify-center gap-1 rounded-lg border border-[#e2e8f0] bg-[#f8fafc] px-2.5 py-2 font-mono max-[600px]:min-h-11.5 max-[600px]:gap-0.75 max-[600px]:px-2 max-[600px]:py-1.75">
            <span className="text-[11px] leading-none font-bold text-slate-500 uppercase">
              Time
            </span>
            <strong className="text-[17px] leading-[1.1] text-[#0f172a] max-[600px]:text-base">
              {String(minutes).padStart(2, "0")}:
              {String(seconds).padStart(2, "0")}
            </strong>
          </div>
        </div>

        <div className="sticky top-0 z-1000 mt-2.5 flex w-full items-center justify-center gap-(--status-item-gap)">
          {list.map((element) => (
            <div key={element.name} className="relative">
              <img
                src={`/avatars/${element.name}.webp`}
                alt={element.name}
                className="size-12.5! rounded-full border-2 border-transparent bg-white object-cover transition-all duration-300 ease-[ease]"
              />

              {element.clicked && (
                <div className="pointer-events-none absolute -top-1.5 -right-1.5 z-10 rounded-full bg-[#22c55e] px-1.5 py-0.5 text-sm font-bold text-white">
                  ✔
                </div>
              )}
            </div>
          ))}
        </div>

        <Targets
          timer={timer}
          stopTimer={() => setIsRunning(false)}
          imgCoors={imgCoors}
          targetsObj={targetsObj}

          list={list}
          listUpdate={(newList) => setList(newList)}

          style={{
            "--positionX": `${pointerPosition.X}px`,
            "--positionY": `${pointerPosition.Y}px`,
          }}

          className={`absolute top-(--positionY) left-(--positionX) z-9999 block w-45 rounded-xl bg-white px-0 py-1.5 font-[Arial,sans-serif] shadow-[0_4px_22px_rgba(0,0,0,0.25)] ${targetsObj.display ? "visible" : "invisible"}`}
        ></Targets>

        <img
          id="waldoImg"
          src="/moon-colony.webp"
          alt="waldo"
          className="w-full cursor-crosshair"
          onClick={handleClick}
        />

        <button
          type="button"
          onClick={() => setShowLeaderboard(!showLeaderboard)}
          className="m-14 min-h-11 cursor-pointer rounded-lg border-2 border-[#047857] bg-[#059669] px-4 text-[15px] font-bold whitespace-nowrap text-white shadow-[0_3px_10px_rgba(5,150,105,0.22)] not-disabled:hover:bg-[#047857] not-disabled:hover:outline-none focus-visible:bg-[#047857] focus-visible:outline-none"
        >
          Leaderboard
        </button>

        {showLeaderboard && <Leaderboard />}
      </div>
    </>
  );
}

export default App;
