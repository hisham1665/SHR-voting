import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreateSession = () => {
  const [year, setYear] = useState("");
  const [department, setDepartment] = useState("");
  const [section, setSection] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const election_id = localStorage.getItem("selectedElectionId");
    const candidate_list_id = localStorage.getItem("candidateListId");

    if (!election_id || !candidate_list_id) {
      alert("Missing election or candidate list ID");
      return;
    }

    const session_class = `${year}_${department}_${section}`;

    const payload = {
      election_id,
      candidate_list_id,
      session_class,
    };

    try {
      setLoading(true);
      const res = await axios.post("/api/session/create-session", payload);
      alert("Session created successfully!");
      navigate("/faculty/session-control");
    } catch (err) {
      console.error(err);
      alert("Failed to create session");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-xl">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Create Session
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <select
              value={year}
              onChange={(e) => setYear(e.target.value)}
              required
              className="border px-3 py-2 rounded-md"
            >
              <option value="">Select Year</option>
              <option value="First">First Year</option>
              <option value="Second">Second Year</option>
              <option value="Third">Third Year</option>
              <option value="Fourth">Fourth Year</option>
            </select>

            <select
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              required
              className="border px-3 py-2 rounded-md"
            >
              <option value="">Select Department</option>
              <option value="CS">CS</option>
              <option value="EC">EC</option>
              <option value="CE">CE</option>
              <option value="EE">EE</option>
              <option value="BT">BT</option>
              <option value="BM">BM</option>
            </select>

            <select
              value={section}
              onChange={(e) => setSection(e.target.value)}
              required
              className="border px-3 py-2 rounded-md"
            >
              <option value="">Select Section</option>
              <option value="A">A</option>
              <option value="B">B</option>
              <option value="C">C</option>
              <option value="D">D</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
          >
            {loading ? "Creating..." : "Create Session"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateSession;
