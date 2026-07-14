import { useState, useEffect } from "react";

// import reactLogo from './assets/react.svg'
// import viteLogo from './assets/vite.svg'
// import heroImg from './assets/hero.png'
import "./App.css";
import Targets from "./Targets";

function App() {
  const [timer, setTimer] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimer((previousTimer) => previousTimer + 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const [targetsObj, setTargetsObj] = useState({
    display: false,
    position: {
      X: 0,
      Y: 0,
    },
  });

  function handleClick(e) {
    setTargetsObj((previousTargetsObj) => ({
      display: !previousTargetsObj.display,
      position: {
        X: e.clientX,
        Y: e.clientY,
      },
    }));
  }

  function handleImgOutsideClick(e) {
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
