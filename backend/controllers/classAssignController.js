import { YearAssign } from "../models/ClassAssign.model.js"; // Adjust the path to your actual file

// POST controller to create a YearAssign document
export const createYearAssign = async (req, res) => {
  try {
    const {
      election_id,
      first_year,
      second_year,
      third_year,
      fourth_year
    } = req.body;

    // Validate required fields
    if (!election_id || !first_year || !second_year || !third_year || !fourth_year) {
      return res.status(400).json({ message: "All fields including election_id and year-wise data are required." });
    }

    // Create the new YearAssign document
    const newYearAssign = new YearAssign({
      election_id,
      first_year,
      second_year,
      third_year,
      fourth_year
    });

    const savedYearAssign = await newYearAssign.save();
    res.status(201).json(savedYearAssign);
  } catch (error) {
    console.error("Error creating YearAssign:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


// Controller: Get all class assignments for a faculty across all elections
export const getFacultyAssignedClasses = async (req, res) => {
  const { email } = req.query;

  if (!email) {
    return res.status(400).json({ message: "Faculty email is required" });
  }

  try {
    const assignments = await YearAssign.find({});

    const assignedClasses = [];

    assignments.forEach((doc) => {
      const { election_id, first_year, second_year, third_year, fourth_year } = doc;

      const checkYear = (yearData, yearLabel) => {
        if (Array.isArray(yearData)) {
          yearData.forEach((deptObj) => {
            Object.entries(deptObj).forEach(([key, val]) => {
              if (val === email) {
                assignedClasses.push({
                  election_id,
                  year: yearLabel,
                  department: key.replace("_faculty", "")
                });
              }
            });
          });
        }
      };

      checkYear(first_year, "1st Year");
      checkYear(second_year, "2nd Year");
      checkYear(third_year, "3rd Year");
      checkYear(fourth_year, "4th Year");
    });

    res.status(200).json(assignedClasses);
  } catch (error) {
    console.error("Error fetching faculty assigned classes:", error);
    res.status(500).json({ message: "Server error while fetching assignments" });
  }
};