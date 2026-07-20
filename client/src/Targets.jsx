import { useState } from "react";

function Targets({ style, className, imgCoors, targetsObj }) {
  const [list, setList] = useState(["waldo", "odlaw", "wizard", "wenda"]);

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
      {/* Don't forget to hide the button after click */}
      {list.map((name) => (
        <button
          key={name}
          type="button"
          className="rounded-base bg-linear-to-br from-pink-500 to-orange-400 px-4 py-2.5 text-center text-sm leading-5 font-medium text-white hover:bg-linear-to-bl focus:ring-4 focus:ring-pink-200 focus:outline-none dark:focus:ring-pink-800"
          onClick={() => handleButtonClick(name)}
        >
          {name}
        </button>
      ))}
    </div>
  );
}

export default Targets;
