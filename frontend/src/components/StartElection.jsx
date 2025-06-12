import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const StartElection = () => {
  const navigate = useNavigate();
  const [electionYear, setElectionYear] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await axios.post("/api/election/create-election", {
        election_year: parseInt(electionYear),
      });

      const createdElection = res.data;
      navigate("/admin/assign-faculty", { state: { election_id: createdElection.election_id } });
    } catch (err) {
      console.error(err);
      setError("Failed to create election");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex justify-center items-center">
      <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-xl">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">Start a New Election</h1>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-600">Election Year</label>
            <input
              type="number"
              value={electionYear}
              onChange={(e) => setElectionYear(e.target.value)}
              required
              className="w-full mt-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {error && <div className="text-red-600 text-sm font-medium">{error}</div>}

          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-blue-600 text-white py-2 rounded-md transition ${
              loading ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-700"
            }`}
          >
            {loading ? "Creating..." : "Next: Assign Faculties"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default StartElection;
