import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SessionControlPage = () => {
  const [session, setSession] = useState(null);
  const [candidatesList, setCandidatesList] = useState(null);
  const [loading, setLoading] = useState(true);
  const [winners, setWinners] = useState(null);
  const navigate = useNavigate();

  const election_id = localStorage.getItem("selectedElectionId");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const sessionRes = await axios.get(`/api/session/get-session/${election_id}`);
        setSession(sessionRes.data);

        const candidateRes = await axios.get(`/api/candidate/get-candidate-list/${election_id}`);
        setCandidatesList(candidateRes.data);
        localStorage.setItem("candidateListId", candidateRes.data.candidate_list_id);
      } catch (err) {
        console.error("Error fetching session or candidates", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [election_id]);

  const declareWinner = async () => {
    try {
      const res = await axios.put("/api/winner/declare-winner", {
        candidate_list_id: candidatesList?.candidate_list_id,
        session_id: session?.session_id,
      });

      alert("Winner declared!");

      const updatedCandidates = await axios.get(`/api/candidate/get-candidate-list/${election_id}`);
      setCandidatesList(updatedCandidates.data);

      // Set winners from API response
      setWinners(res.data.winners);
    } catch (err) {
      console.error("Error declaring winner", err);
      alert("Failed to declare winner.");
    }
  };

  const stopSession = async () => {
    try {
      await axios.put(`/api/session/stop-session`, {
        session_id: session?.session_id,
        isActive: false,
      });

      alert("Session stopped.");
      setSession({ ...session, isActive: false });
    } catch (err) {
      console.error("Error stopping session", err);
    }
  };

  const handleExit = () => {
    localStorage.clear();
    navigate("/faculty/dashboard");
  };

  if (loading) return <div className="p-6 text-center">Loading...</div>;
  console.log(session.isActive)
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-md">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Session Control
        </h1>

        <div className="mb-6 text-center">
          <p className="text-lg">
            <strong>Session Class:</strong> {session?.session_class}
          </p>
          <p className="text-lg">
            <strong>Status:</strong>{" "}
            <span className={session?.isActive ? "text-green-600" : "text-red-600"}>
              {session?.isActive ? "Active" : "Inactive"}
            </span>
          </p>

          <div className="flex justify-center gap-4 mt-4">
            <button
              onClick={declareWinner}
              className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition"
            >
              update Votes
            </button>
            <button
              onClick={stopSession}
              className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition"
            >
              Stop Session
            </button>
            <button
              onClick={handleExit}
              className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition"
            >
              Exit to Dashboard
            </button>
          </div>
        </div>

        {/* ✅ Winners Section */}
        {winners && (
          <div className="mt-6 text-center">
            <h2 className="text-xl font-bold text-green-700 mb-2">🏆 Election Winners</h2>
            <p className="text-lg text-blue-700">
              👦 Boy Winner: <strong>{winners.boy.name}</strong> (SR_NO: {winners.boy.SR_NO}) - {winners.boy.Votes} votes
            </p>
            <p className="text-lg text-pink-700">
              👧 Girl Winner: <strong>{winners.girl.name}</strong> (SR_NO: {winners.girl.SR_NO}) - {winners.girl.Votes} votes
            </p>
          </div>
        )}

        <div className="mt-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4 text-center">
            Candidates List
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-bold text-blue-600 mb-2">Boys</h3>
              <ul className="space-y-2">
                {candidatesList?.boy_candidates.map((c) => (
                  <li key={c.SR_NO} className="text-gray-700">
                    {c.name} (SR_NO: {c.SR_NO}) - Votes: {c.Votes}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold text-pink-600 mb-2">Girls</h3>
              <ul className="space-y-2">
                {candidatesList?.girl_candidates.map((c) => (
                  <li key={c.SR_NO} className="text-gray-700">
                    {c.name} (SR_NO: {c.SR_NO}) - Votes: {c.Votes}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SessionControlPage;
