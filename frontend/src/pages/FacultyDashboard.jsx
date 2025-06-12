import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import axios from "axios";

const FacultyDashboard = () => {
  const { user } = useAuth();
  const [elections, setElections] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchElections = async () => {
      try {
        const res = await axios.get("/api/election/get-election");
        setElections(res.data);
      } catch (err) {
        console.error("Error fetching elections", err);
      } finally {
        setLoading(false);
      }
    };

    fetchElections();
  }, []);

  const handleElectionSelect = (electionId) => {
    localStorage.setItem("selectedElectionId", electionId);
    navigate("/faculty/select-candidates");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h3 className="text-2xl text-gray-900 font-semibold mb-6 font-serif">
        Hi {user?.name}, Welcome to your Dashboard
      </h3>

      <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-md">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Faculty Dashboard
        </h1>

        <div className="bg-purple-100 p-6 rounded-md text-center mb-6">
          <h2 className="text-lg font-semibold mb-4">Choose an Election</h2>
          {loading ? (
            <p className="text-gray-600">Loading elections...</p>
          ) : elections.length === 0 ? (
            <p className="text-gray-600">No elections found.</p>
          ) : (
            <>
              <p className="mb-4 text-gray-700">
                Please select an election to proceed.
              </p>
              <div className="grid sm:grid-cols-2 gap-4">
                {elections.map((election) => (
                  <button
                    key={election.election_id}
                    onClick={() => handleElectionSelect(election.election_id)}
                    className="bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
                  >
                    Election {election.election_year} ({election.election_id})
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default FacultyDashboard;
