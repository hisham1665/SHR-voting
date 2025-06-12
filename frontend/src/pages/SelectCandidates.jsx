import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SelectCandidates = () => {
  const [boyCandidates, setBoyCandidates] = useState([{ SR_NO: "", name: "" }]);
  const [girlCandidates, setGirlCandidates] = useState([{ SR_NO: "", name: "" }]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (index, field, value, gender) => {
    const updater = gender === "boy" ? [...boyCandidates] : [...girlCandidates];
    updater[index][field] = value;

    gender === "boy" ? setBoyCandidates(updater) : setGirlCandidates(updater);
  };

  const addCandidate = (gender) => {
    const newCandidate = { SR_NO: "", name: "" };
    gender === "boy"
      ? setBoyCandidates([...boyCandidates, newCandidate])
      : setGirlCandidates([...girlCandidates, newCandidate]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const election_id = localStorage.getItem("selectedElectionId");
    if (!election_id) {
      alert("Election ID not found!");
      return;
    }

    const candidate_list_id = `${election_id}_CS_first_year`; // You can customize this

    const payload = {
      election_id,
      candidate_list_id,
      boy_candidates: boyCandidates.filter(c => c.SR_NO && c.name),
      girl_candidates: girlCandidates.filter(c => c.SR_NO && c.name)
    };

    try {
      setLoading(true);
      const res = await axios.post("/api/candidate/create-candidate-list", payload);

      // Save to localStorage for session creation page
      localStorage.setItem("candidateListId", candidate_list_id);

      alert("Candidates submitted successfully!");

      // Redirect to create session page
      navigate("/faculty/create-session");
    } catch (err) {
      console.error(err);
      alert("Error submitting candidates.");
    } finally {
      setLoading(false);
    }
  };

  const renderInputs = (list, gender) =>
    list.map((candidate, index) => (
      <div key={index} className="grid grid-cols-2 gap-4 mb-3">
        <input
          type="text"
          placeholder="SR_NO"
          value={candidate.SR_NO}
          onChange={(e) => handleChange(index, "SR_NO", e.target.value, gender)}
          className="border px-3 py-2 rounded-md"
          required
        />
        <input
          type="text"
          placeholder="Name"
          value={candidate.name}
          onChange={(e) => handleChange(index, "name", e.target.value, gender)}
          className="border px-3 py-2 rounded-md"
          required
        />
      </div>
    ));

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-2xl">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Select Candidates
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <h2 className="text-lg font-semibold text-blue-600 mb-2">
              Boy Candidates
            </h2>
            {renderInputs(boyCandidates, "boy")}
            <button
              type="button"
              onClick={() => addCandidate("boy")}
              className="text-sm text-blue-600 hover:underline"
            >
              + Add Boy
            </button>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-pink-600 mb-2">
              Girl Candidates
            </h2>
            {renderInputs(girlCandidates, "girl")}
            <button
              type="button"
              onClick={() => addCandidate("girl")}
              className="text-sm text-pink-600 hover:underline"
            >
              + Add Girl
            </button>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
          >
            {loading ? "Submitting..." : "Submit Candidates"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SelectCandidates;
