import { useEffect, useState } from "react";

function Leaderboard() {
  const [records, setRecords] = useState([]);

  useEffect(() => {
    // fetch leaderboard
    async function loadLeaderboard() {
      try {
        // 1. Fetch the file via its relative or absolute path
        const res = await fetch("http://localhost:8080/leaderboard");

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

  return (
    <>
      {records
        .toSorted((a, b) => a.timer - b.timer)
        .map((r) => (
          <div key={r.username}>
            {r.username}, {r.timer}, {new Date(r.date).toLocaleString()}
          </div>
        ))}
    </>
  );
}

export default Leaderboard;
