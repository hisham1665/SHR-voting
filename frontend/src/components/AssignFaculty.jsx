import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const departments = ["CS", "EC", "EE", "BT", "BM", "CE"];
const years = ["first_year", "second_year", "third_year", "fourth_year"];

const AssignFaculty = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { election_id } = location.state || {};

  // State structure for all years and departments
  const [facultyData, setFacultyData] = useState(
    years.reduce((acc, year) => {
      acc[year] = departments.reduce((deptAcc, dept) => {
        deptAcc[`${dept}_faculty`] = "";
        return deptAcc;
      }, {});
      return acc;
    }, {})
  );

  const handleChange = (year, dept, value) => {
    setFacultyData((prev) => ({
      ...prev,
      [year]: {
        ...prev[year],
        [`${dept}_faculty`]: value,
      },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        election_id,
        first_year: [facultyData.first_year],
        second_year: [facultyData.second_year],
        third_year: [facultyData.third_year],
        fourth_year: [facultyData.fourth_year],
      };

      await axios.post("/api/assign/assign-faculties", payload);
      navigate("/admin/dashboard");
    } catch (err) {
      console.error("Error assigning faculty:", err);
      alert("Submission failed");
    }
  };

  if (!election_id) return <p className="text-red-600 text-center">❌ Missing election ID</p>;

  return (
    <div className="min-h-screen bg-gray-100 py-6 px-4 flex justify-center items-start">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-xl shadow-lg p-8 w-full max-w-3xl space-y-8"
      >
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Assign Faculties</h1>

        {years.map((yearKey, i) => (
          <div key={yearKey} className="space-y-4 border-t pt-4">
            <h2 className="text-lg font-semibold text-blue-700 capitalize">
              {yearKey.replace("_", " ")}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {departments.map((dept) => (
                <div key={`${yearKey}-${dept}`}>
                  <label className="block text-sm text-gray-600 font-medium mb-1">
                    {dept} Faculty
                  </label>
                  <input
                    type="email"
                    required
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={facultyData[yearKey][`${dept}_faculty`]}
                    onChange={(e) =>
                      handleChange(yearKey, dept, e.target.value)
                    }
                    placeholder={`Enter ${dept} faculty email`}
                  />
                </div>
              ))}
            </div>
          </div>
        ))}

        <button
          type="submit"
          className="w-full mt-6 bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition"
        >
          ✅ Submit Faculty Assignment
        </button>
      </form>
    </div>
  );
};

export default AssignFaculty;
