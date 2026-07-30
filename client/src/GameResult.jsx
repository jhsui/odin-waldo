import { useState } from "react";
import { API_URL } from "./config";

function GameResult({ gameOver, timer }) {
  // if (!gameOver) return null;
  const [username, setUsername] = useState("");
  const [submissionStatus, setSubmissionStatus] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`${API_URL}/result-submission`, {
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
          className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/60 p-4 backdrop-blur-sm"
          onClick={() => window.location.reload()}
        >
          <div
            className="relative w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl sm:p-8"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="absolute top-4 right-4 flex size-9 items-center justify-center rounded-full text-2xl leading-none text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-700 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:outline-none"
            >
              &times;
            </button>

            <div className="text-center">
              <div className="mx-auto mb-4 flex size-16 items-center justify-center rounded-full bg-green-100 text-3xl">
                🏆
              </div>

              <h2 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
                Game over—you win!
              </h2>

              <p className="text-gray-600">
                Congratulations! You completed the game.
              </p>

              <p className="mt-2 text-sm font-medium text-gray-700">
                Time used:{" "}
                <span className="font-semibold text-green-700">
                  {formatTime(timer)}
                </span>
              </p>
            </div>

            <form onSubmit={handleSubmit} className="mt-6 space-y-4 text-left">
              <div>
                <label
                  htmlFor="username"
                  className="mb-1.5 block text-sm font-medium text-gray-700"
                >
                  Your name
                </label>

                <input
                  type="text"
                  id="username"
                  name="username"
                  value={username}
                  onChange={(event) => setUsername(event.target.value)}
                  placeholder="Enter your name"
                  className="block w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 shadow-sm transition outline-none placeholder:text-gray-400 hover:border-gray-400 focus:border-green-500 focus:ring-2 focus:ring-green-500/20"
                />
              </div>

              <button
                type="submit"
                className="w-full rounded-lg bg-green-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-green-700 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:outline-none active:bg-green-800"
              >
                Submit score
              </button>
            </form>

            {submissionStatus && (
              <p className="mt-3 text-center text-sm font-medium text-green-700">
                Submission successful!
              </p>
            )}

            <div className="my-5 flex items-center gap-3">
              <div className="h-px flex-1 bg-gray-200" />
              <span className="text-xs font-medium tracking-wide text-gray-400 uppercase">
                or
              </span>
              <div className="h-px flex-1 bg-gray-200" />
            </div>

            <button
              type="button"
              onClick={() => window.location.reload()}
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-semibold text-gray-700 shadow-sm transition-colors hover:bg-gray-50 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:outline-none"
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
