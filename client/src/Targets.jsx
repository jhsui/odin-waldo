import { useState, useEffect } from "react";

function capitalizeFirstLetter(val) {
  return String(val).charAt(0).toUpperCase() + String(val).slice(1);
}

function Targets({ style, className, imgCoors, targetsObj }) {
  const [list, setList] = useState(["waldo", "odlaw", "wizard", "wenda"]);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    if (gameOver) {
      alert("Game over, you win");
    }
  }, [gameOver]);

  async function handleButtonClick(name) {
    try {
      const res = await fetch(`http://localhost:8080/${name}/validation`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ targetsObj, imgCoors, list }),
      });

      const data = await res.json();

      setList(data.list);

      if (data.gameOver) {
        setGameOver(true);
      }

      console.log("STATUS:", res.status);
      console.log("RESPONSE:", data);
    } catch (error) {
      console.error("FETCH ERROR:", error);
    }
  }

  return (
    <div
      style={style}
      className={`${className} m-1 flex flex-col gap-1 bg-white`}
    >
      {list.map((name) => (
        <button
          key={name}
          type="button"
          className="rounded-base bg-linear-to-br from-pink-500 to-orange-400 px-4 py-2.5 text-center text-sm leading-5 font-medium text-white hover:bg-linear-to-bl focus:ring-4 focus:ring-pink-200 focus:outline-none dark:focus:ring-pink-800"
          onClick={() => handleButtonClick(name)}
        >
          {capitalizeFirstLetter(name)}
        </button>
      ))}
    </div>
  );
}

export default Targets;
