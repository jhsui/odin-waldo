import { useState } from "react";

function GameResult({ gameOver, timer }) {
  // if (!gameOver) return null;
  const [username, setUsername] = useState("");
  const [submissionStatus, setSubmissionStatus] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:8080/resultSubmit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, timer }),
      });

      const data = await res.json();

      if (data.message) {
        setSubmissionStatus(true);
      }
      //
      console.log("STATUS:", res.status);
      console.log("RESPONSE:", data);
      //
    } catch (error) {
      console.error("FETCH ERROR:", error);
    }
  };

  return (
    <>
      {gameOver && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
          onClick={() => window.location.reload()}
        >
          <div
            role="dialog"
            className="relative w-full max-w-sm rounded-2xl bg-white p-8 text-center shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="absolute top-4 right-4 flex h-9 w-9 items-center justify-center rounded-full text-2xl text-gray-400 transition hover:bg-gray-100 hover:text-gray-700"
            >
              &times;
            </button>

            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-3xl">
              🏆
            </div>

            <h2
              id="game-result-title"
              className="mb-2 text-2xl font-bold text-gray-900"
            >
              Game over—you win!
            </h2>

            <p className="mb-6 text-gray-600">
              Congratulations! You completed the game.
            </p>

            <p>Time used: {formatTime(timer)}</p>

            <form onSubmit={handleSubmit} className="border">
              <label htmlFor="username" className="border-4">
                Your name:
              </label>
              <input
                type="text"
                id="username"
                name="username"
                onChange={(e) => setUsername(e.target.value)}
                className="border-2"
              />

              <button type="submit" className="border-8">
                Submit
              </button>
            </form>

            {submissionStatus && (
              <i className="text-red-500">Submission successful!</i>
            )}

            <button
              type="button"
              onClick={() => window.location.reload()}
              className="w-full rounded-lg bg-green-600 px-4 py-3 font-semibold text-white transition hover:bg-green-700 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:outline-none"
            >
              Play again
            </button>
          </div>
        </div>
      )}
    </>
  );
}

function formatTime(milliseconds) {
  const totalCentiseconds = Math.floor(milliseconds / 10);

  const hours = Math.floor(totalCentiseconds / 360000);
  const minutes = Math.floor((totalCentiseconds % 360000) / 6000);
  const seconds = Math.floor((totalCentiseconds % 6000) / 100);
  const centiseconds = totalCentiseconds % 100;

  const formattedSeconds =
    `${String(seconds).padStart(2, "0")}.` +
    String(centiseconds).padStart(2, "0");

  if (hours > 0) {
    return `${hours}:${String(minutes).padStart(2, "0")}:${formattedSeconds}`;
  }

  if (minutes > 0) {
    return `${minutes}:${formattedSeconds}`;
  }

  return formattedSeconds + "s";
}

export default GameResult;
