import React, { useState, useEffect, Fragment } from "react";
import axios from "axios";
import { Dialog, Transition } from "@headlessui/react";

function StudentDashboard() {
  const [elections, setElections] = useState([]);
  const [selectedElection, setSelectedElection] = useState(null);
  const [session, setSession] = useState(null);
  const [candidatesList, setCandidatesList] = useState(null);

  const [selectedBoy, setSelectedBoy] = useState(null);
  const [selectedGirl, setSelectedGirl] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [voteSubmitted, setVoteSubmitted] = useState(false);

  // Step 1: Fetch all elections
  useEffect(() => {
    axios.get("/api/election/get-election").then((res) => {
      setElections(res.data);
    });
  }, []);

  const handleElectionSelect = async (election) => {
    setSelectedElection(election);

    try {
      const sessionRes = await axios.get(`/api/session/get-session/${election.election_id}`);
      if (!sessionRes.data?.isActive) {
        alert("No active session for this election.");
        return;
      }

      setSession(sessionRes.data);

      const candidateRes = await axios.get(`/api/candidate/get-candidate-list/${election.election_id}`);
      setCandidatesList(candidateRes.data);
    } catch (err) {
      alert("Error loading session or candidates.");
    }
  };

  const handleVote = () => {
    if (!selectedBoy || !selectedGirl) {
      alert("Please select one boy and one girl candidate.");
      return;
    }
    setIsOpen(true);
  };

  const submitVote = async () => {
    try {
      await axios.post("/api/vote/cast-vote", {
        election_id: selectedElection._id,
        session_id: session.session_id,
        boy_vote_sr_no: selectedBoy,
        girl_vote_sr_no: selectedGirl,
      });

      setVoteSubmitted(true);
      setIsOpen(false);
    } catch (err) {
      alert("Vote submission failed or already voted.");
    }
  };

  return (
    <div className="p-4 max-w-2xl mx-auto h-screen">
      <h1 className="text-2xl font-bold mb-6 text-center text-blue-800">
        Student Voting Panel
      </h1>

      {/* STEP 1: ELECTION SELECT */}
      {!selectedElection && (
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-gray-700">Available Elections</h2>
          {elections.map((el) => (
            <button
              key={el._id}
              onClick={() => handleElectionSelect(el)}
              className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
            >
             Election {el.election_year} ({el.election_id})
            </button>
          ))}
        </div>
      )}

      {/* STEP 2: SESSION + CANDIDATES */}
      {selectedElection && session && !voteSubmitted && (
        <>
          <div className="my-6">
            <h2 className="text-lg font-semibold text-green-700">
              Active Session: {session.session_name}
            </h2>
            <p className="text-sm text-gray-600">Session ID: {session.session_id}</p>
          </div>

          {candidatesList?.boy_candidates && (
            <div className="space-y-6">
              <div>
                <h3 className="text-md font-medium text-gray-600 mb-2">Boy Candidates</h3>
                <div className="grid grid-cols-2 gap-4">
                  {candidatesList.boy_candidates?.map((candidate) => (
                    <label
                      key={candidate.SR_NO}
                      className={`border rounded-md px-4 py-2 cursor-pointer text-center ${
                        selectedBoy === candidate.SR_NO
                          ? "bg-blue-200 border-blue-500"
                          : "bg-white"
                      }`}
                    >
                      <input
                        type="radio"
                        name="boy"
                        className="hidden"
                        onChange={() => setSelectedBoy(candidate.SR_NO)}
                      />
                      {candidate.name}
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-md font-medium text-gray-600 mb-2">Girl Candidates</h3>
                <div className="grid grid-cols-2 gap-4">
                  {candidatesList.girl_candidates.map((candidate) => (
                    <label
                      key={candidate.SR_NO}
                      className={`border rounded-md px-4 py-2 cursor-pointer text-center ${
                        selectedGirl === candidate.SR_NO
                          ? "bg-pink-200 border-pink-500"
                          : "bg-white"
                      }`}
                    >
                      <input
                        type="radio"
                        name="girl"
                        className="hidden"
                        onChange={() => setSelectedGirl(candidate.SR_NO)}
                      />
                      {candidate.name}
                    </label>
                  ))}
                </div>
              </div>

              <button
                onClick={handleVote}
                className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition"
                disabled={!selectedBoy || !selectedGirl}
              >
                Confirm Vote
              </button>
            </div>
          )}
        </>
      )}

      {/* STEP 3: Thank You */}
      {voteSubmitted && (
        <div className="text-center text-green-600 font-semibold mt-8">
          ✅ Your vote has been submitted successfully.
        </div>
      )}

      {/* MODAL */}
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={() => setIsOpen(false)}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/20 backdrop-blur-sm" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title className="text-lg font-medium text-gray-900">
                    Confirm Your Vote
                  </Dialog.Title>
                  <div className="mt-2 text-sm text-gray-600">
                    Are you sure you want to vote for:
                    <br />
                    <strong>
                      {
                        candidatesList?.boy_candidates?.find((c) => c.SR_NO === selectedBoy)?.name
                      }
                    </strong>{" "}
                    and{" "}
                    <strong>
                      {
                        candidatesList?.girl_candidates.find((c) => c.SR_NO === selectedGirl)?.name
                      }
                    </strong>
                    ?
                  </div>
                  <div className="mt-4 flex justify-end gap-2">
                    <button
                      onClick={() => setIsOpen(false)}
                      className="bg-gray-100 px-4 py-2 rounded-md hover:bg-gray-200"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={submitVote}
                      className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
                    >
                      Submit Vote
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
}

export default StudentDashboard;
