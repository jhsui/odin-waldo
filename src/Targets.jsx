function Targets({ style, className }) {
  return (
    <div style={style} className={`${className} flex flex-col gap-1 bg-white`}>
      <button
        type="button"
        className="rounded-base bg-linear-to-br from-pink-500 to-orange-400 px-4 py-2.5 text-center text-sm leading-5 font-medium text-white hover:bg-gradient-to-bl focus:ring-4 focus:ring-pink-200 focus:outline-none dark:focus:ring-pink-800"
      >
        Waldo
      </button>
      <button
        type="button"
        className="rounded-base bg-linear-to-br from-pink-500 to-orange-400 px-4 py-2.5 text-center text-sm leading-5 font-medium text-white hover:bg-gradient-to-bl focus:ring-4 focus:ring-pink-200 focus:outline-none dark:focus:ring-pink-800"
      >
        Odlaw
      </button>
      <button
        type="button"
        className="rounded-base bg-linear-to-br from-pink-500 to-orange-400 px-4 py-2.5 text-center text-sm leading-5 font-medium text-white hover:bg-gradient-to-bl focus:ring-4 focus:ring-pink-200 focus:outline-none dark:focus:ring-pink-800"
      >
        Wizard
      </button>
      <button
        type="button"
        className="rounded-base bg-linear-to-br from-pink-500 to-orange-400 px-4 py-2.5 text-center text-sm leading-5 font-medium text-white hover:bg-gradient-to-bl focus:ring-4 focus:ring-pink-200 focus:outline-none dark:focus:ring-pink-800"
      >
        Wenda
      </button>
    </div>
  );
}

export default Targets;
