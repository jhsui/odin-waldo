function GameResult({ gameOver, onClose, timer }) {
  if (!gameOver) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="game-result-title"
        className="relative w-full max-w-sm rounded-2xl bg-white p-8 text-center shadow-2xl"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
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

        <p>
          Time used: {Math.floor(timer / 60)}:
          {String(timer % 60).padStart(2, "0")}
        </p>

        <button
          type="button"
          onClick={onClose}
          className="w-full rounded-lg bg-green-600 px-4 py-3 font-semibold text-white transition hover:bg-green-700 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:outline-none"
        >
          Play again
        </button>
      </div>
    </div>
  );
}

export default GameResult;
