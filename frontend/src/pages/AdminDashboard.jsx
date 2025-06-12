import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const AdminDashboard = () => {
  const [elections, setElections] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchElections = async () => {
    try {
      const res = await axios.get("/api/election/get-election");
      setElections(res.data);
    } catch (err) {
      console.error("Error fetching elections:", err);
    } finally {
      setLoading(false);
    }
  };
  const stopElection = async (election_id) => {
    try {
      await axios.patch(`/api/election/stop-election/`, { election_id });
      fetchElections(); // refresh list after stopping
    } catch (err) {
      console.error("Error stopping election:", err);
    }
  };

  useEffect(() => {
    fetchElections();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Admin Dashboard</h1>

        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Elections</h2>
          <Link
            to="/admin/start-election"
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
          >
            Start New Election
          </Link>
        </div>

        {loading ? (
          <p>Loading elections...</p>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
            {elections.map((election) => (
              <div key={election._id} className="bg-white p-4 rounded-xl shadow-md">
                <h3 className="text-lg font-semibold text-gray-700 mb-2">
                  Election {election.election_year}
                </h3>
                <p className="text-sm text-gray-500 mb-1">
                  Status:{" "}
                  <span
                    className={`font-medium ${
                      election.isActive ? "text-green-600" : "text-gray-700"
                    }`}
                  >
                    {election.isActive ? "Active" : "Completed"}
                  </span>
                </p>
                <p className="text-sm text-gray-500">
                  Created At: {new Date(election.createdAt).toLocaleDateString()}
                </p>
                {election.isActive && (
                  <button
                    onClick={() => stopElection(election.election_id)}
                    className="mt-2 text-sm text-red-600 hover:underline"
                  >
                    Stop Election
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
