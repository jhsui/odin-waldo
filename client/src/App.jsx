import { useState, useEffect } from "react";
import "./App.css";
import Targets from "./Targets";

function App() {
  // Set up the timer
  const [timer, setTimer] = useState(0);
  const [isRunning, setIsRunning] = useState(true);

  useEffect(() => {
    if (!isRunning) {
      return;
    }
    const startTime = Date.now();

    const intervalId = setInterval(() => {
      const elapsedSeconds = Math.floor((Date.now() - startTime) / 1000);

      setTimer(elapsedSeconds);
    }, 250);

    return () => clearInterval(intervalId);
  }, [isRunning]);

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
        <p>
          Timer: {Math.floor(timer / 60)}:{String(timer % 60).padStart(2, "0")}
        </p>

        <Targets
          timer={timer}
          stopTimer={() => setIsRunning(false)}
          imgCoors={imgCoors}
          targetsObj={targetsObj}

          style={{
            "--positionX": `${targetsObj.position.X}px`,
            "--positionY": `${targetsObj.position.Y}px`,
          }}
          className={`absolute top-(--positionY) left-(--positionX) ${targetsObj.display ? "visible" : "invisible"}`}
        ></Targets>

        <img
          id="waldoImg"
          src="../public/moon-colony.webp"
          alt="waldo"
          className="w-7xl"
          onClick={handleClick}
        />
      </div>
    </>
  );
}

export default App;
