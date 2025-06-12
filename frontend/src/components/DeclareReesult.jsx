import React, { useState } from "react";

const DeclareResult = () => {
  const [sessionStatus, setSessionStatus] = useState("stopped"); // Mocked status
  const [candidates, setCandidates] = useState([
    { id: 1, name: "John Doe", votes: 45 },
    { id: 2, name: "Jane Smith", votes: 78 },
    { id: 3, name: "David Johnson", votes: 62 },
  ]);
  const [declared, setDeclared] = useState(false);

  const declareWinner = () => {
    setDeclared(true);
    alert("Results declared successfully!");
  };

  const winner = candidates.reduce((prev, current) => (prev.votes > current.votes ? prev : current));

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-2xl">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">Declare Election Results</h1>

        {sessionStatus !== "stopped" ? (
          <p className="text-red-500 text-center">Election session must be stopped to declare results.</p>
        ) : !declared ? (
          <>
            <p className="text-center text-gray-700 mb-4">Results are ready to be declared. Review vote counts below:</p>
            <ul className="mb-6 space-y-3">
              {candidates.map((candidate) => (
                <li
                  key={candidate.id}
                  className="flex justify-between px-4 py-2 bg-gray-50 rounded-md border"
                >
                  <span>{candidate.name}</span>
                  <span className="font-semibold text-blue-600">{candidate.votes} votes</span>
                </li>
              ))}
            </ul>
            <button
              onClick={declareWinner}
              className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition"
            >
              Declare Winner
            </button>
          </>
        ) : (
          <div className="text-center">
            <p className="text-xl text-green-700 font-bold mb-4">Winner Declared!</p>
            <div className="bg-blue-100 p-4 rounded-md">
              <h2 className="text-lg font-semibold text-blue-800">{winner.name}</h2>
              <p className="text-sm text-gray-700">Votes: {winner.votes}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DeclareResult;
