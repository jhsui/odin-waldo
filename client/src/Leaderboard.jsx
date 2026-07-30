import { useEffect, useState } from "react";
import { API_URL } from "./config";

function Leaderboard({ titleRef }) {
  const [records, setRecords] = useState([]);

  const rankColors = [
    "text-[#f5b700]", // gold
    "text-[#94a3b8]", // silver
    "text-[#b45309]", // bronze
  ];

  useEffect(() => {
    // fetch leaderboard
    async function loadLeaderboard() {
      try {
        // 1. Fetch the file via its relative or absolute path
        const res = await fetch(`${API_URL}/leaderboard`);

        // 2. Ensure the network request was successful
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }

        // 3. Parse the res body as JSON
        const data = await res.json();

        setRecords(data);
      } catch (error) {
        console.error("Could not fetch the JSON file:", error);
      }
    }
    loadLeaderboard();
  }, []);

  // handler leaderboard scroll
  useEffect(() => {
    if (records.length === 0) return;

    requestAnimationFrame(() => {
      titleRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });
  }, [records.length, titleRef]);

  const formatTimer = (milliseconds) => {
    const minutes = Math.floor(milliseconds / 60_000);
    const seconds = Math.floor((milliseconds % 60_000) / 1_000);
    const ms = Math.floor(milliseconds % 1_000);

    return `${minutes}:${String(seconds).padStart(2, "0")}.${String(ms).padStart(3, "0")}s`;
  };

  return (
    <section className="mx-auto my-10 min-h-screen w-full max-w-225 rounded-xl bg-white p-5 shadow-[0_4px_20px_rgba(0,0,0,0.1)] max-[600px]:my-5 max-[600px]:box-border max-[600px]:p-2.5">
      <h3
        ref={titleRef}
        className="mb-6 scroll-mt-20 text-center text-3xl font-bold text-[#333]"
      >
        Leaderboard
      </h3>

      <table className="w-full border-collapse font-['Segoe_UI',Tahoma,Geneva,Verdana,sans-serif]">
        <thead className="border-b-2 border-[#e2e8f0] bg-[#f8fafc]">
          <tr>
            {["Rank", "Player", "Time", "Date"].map((heading) => (
              <th
                key={heading}
                className="p-4 text-left text-sm font-semibold tracking-[0.5px] text-[#475569] uppercase first:text-center max-[600px]:px-1 max-[600px]:py-2 max-[600px]:text-xs last:max-[600px]:hidden"
              >
                {heading}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {records
            .toSorted((a, b) => a.timer - b.timer)
            .map((record, index) => (
              <tr key={`${record.username}-${record.date}`}>
                <td
                  className={`border-b border-[#f1f5f9] p-4 text-center font-bold ${
                    rankColors[index] ?? "text-[#64748b]"
                  }`}
                >
                  {index + 1}
                </td>

                <td className="border-b border-[#f1f5f9] p-4 text-[15px] text-[#1e293b] max-[600px]:px-1 max-[600px]:py-2 max-[600px]:text-xs">
                  {record.name}
                </td>

                <td className="border-b border-[#f1f5f9] p-4 text-[15px] text-[#1e293b] max-[600px]:px-1 max-[600px]:py-2 max-[600px]:text-xs">
                  {formatTimer(record.timer)}
                </td>

                <td className="border-b border-[#f1f5f9] p-4 text-[15px] text-[#1e293b] max-[600px]:hidden">
                  {new Date(record.date).toLocaleString()}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </section>
  );
}

export default Leaderboard;
