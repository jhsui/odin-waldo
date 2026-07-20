function Targets({ style, className, imgCoors, targetsObj }) {
  async function handleButtonClick(name) {
    try {
      const res = await fetch(`http://localhost:8080/${name}/validation`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ targetsObj, imgCoors }),
      });

      const data = await res.json();

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
      <button
        type="button"
        className="rounded-base bg-linear-to-br from-pink-500 to-orange-400 px-4 py-2.5 text-center text-sm leading-5 font-medium text-white hover:bg-linear-to-bl focus:ring-4 focus:ring-pink-200 focus:outline-none dark:focus:ring-pink-800"
        onClick={() => handleButtonClick("waldo")}
      >
        Waldo
      </button>
      <button
        type="button"
        className="rounded-base bg-linear-to-br from-pink-500 to-orange-400 px-4 py-2.5 text-center text-sm leading-5 font-medium text-white hover:bg-linear-to-bl focus:ring-4 focus:ring-pink-200 focus:outline-none dark:focus:ring-pink-800"
        onClick={() => handleButtonClick("odlaw")}
      >
        Odlaw
      </button>
      <button
        type="button"
        className="rounded-base bg-linear-to-br from-pink-500 to-orange-400 px-4 py-2.5 text-center text-sm leading-5 font-medium text-white hover:bg-linear-to-bl focus:ring-4 focus:ring-pink-200 focus:outline-none dark:focus:ring-pink-800"
        onClick={() => handleButtonClick("wizard")}
      >
        Wizard
      </button>
      <button
        type="button"
        className="rounded-base bg-linear-to-br from-pink-500 to-orange-400 px-4 py-2.5 text-center text-sm leading-5 font-medium text-white hover:bg-linear-to-bl focus:ring-4 focus:ring-pink-200 focus:outline-none dark:focus:ring-pink-800"
        onClick={() => handleButtonClick("wenda")}
      >
        Wenda
      </button>
    </div>
  );
}

export default Targets;
