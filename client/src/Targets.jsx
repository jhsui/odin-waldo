import { useState } from "react";
import GameResult from "./GameResult";
import { API_URL } from "./config";
import confetti from "canvas-confetti";

function Targets({
  style,
  className,
  imgCoors,
  targetsObj,
  timer,
  stopTimer,
  list,
  listUpdate,
}) {
  const [gameOver, setGameOver] = useState(false);

  async function playMusic() {
    const audio = new Audio("/mixkit-fairy-arcade-sparkle-866.wav");
    audio.play();
  }

  function fireConfettiAt(x, y) {
    const clientX = parseFloat(x);
    const clientY = parseFloat(y);

    confetti({
      particleCount: 80,
      spread: 70,
      startVelocity: 30,
      origin: {
        x: Math.max(0, Math.min(1, clientX / window.innerWidth)),
        y: Math.max(0, Math.min(1, clientY / window.innerHeight)),
      },
    });
  }

  async function handleButtonClick(name) {
    console.log(timer);

    try {
      const res = await fetch(`${API_URL}/${name}/validation`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ targetsObj, imgCoors, list }),
      });

      const data = await res.json();

      listUpdate(data.list);

      if (data.result) {
        playMusic();

        fireConfettiAt(style["--positionX"], style["--positionY"]);
      }

      if (data.gameOver) {
        stopTimer();
        setGameOver(true);
      }

      console.log("STATUS:", res.status);
      console.log("RESPONSE:", data);
    } catch (error) {
      console.error("FETCH ERROR:", error);
    }
  }

  return (
    <>
      <GameResult gameOver={gameOver} timer={timer} />

      <div
        style={style}
        className={` ${className} flex flex-col gap-1 bg-white`}
      >
        {list
          .filter((element) => !element.clicked)
          .map((element) => element.name)
          .map((name) => (
            <button
              key={name}
              type="button"
              className="flex w-full cursor-pointer items-center gap-2.5 border-0 bg-transparent px-3.5 py-2.5 text-left text-base text-[#333]"
              onClick={() => handleButtonClick(name)}
            >
              <img
                src={`/avatars/${name}.webp`}
                alt={`${name}`}
                className="size-7! object-contain"
              />
              <span>{capitalizeFirstLetter(name)}</span>
            </button>
          ))}
      </div>
    </>
  );
}

function capitalizeFirstLetter(val) {
  return String(val).charAt(0).toUpperCase() + String(val).slice(1);
}

export default Targets;
