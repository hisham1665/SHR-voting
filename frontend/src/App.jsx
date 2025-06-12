import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/Login";
import HomePage from "./pages/HomePage"; // create this
import NotFound from "./pages/NotFound";   // optional
import ProtectedRoute from "./ProtectedRoute";
import AdminDashboard from "./pages/AdminDashboard";
import StartElection from "./components/StartElection"; // create this
import FacultyDashboard from "./pages/FacultyDashboard";
import SelectCandidates from "./pages/SelectCandidates";
import ElectionSession from "./pages/SessionControl";
import DeclareResult from "./components/DeclareReesult";
import StudentDashboard from "./pages/StudentDashboard";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import SignupForm from "./components/SignUpForm";
import AssignFaculty from "./components/AssignFaculty";
import CreateSession from "./components/CreateSession";
function App() {
  return (
    <div>
      <NavBar />
      <div className="p-5 bg-gray-100 " >
        <Routes >
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <HomePage />
              </ProtectedRoute>
            }
          />
          {/* Redirect from "/" to "/home" */}
          <Route path="/" element={<Navigate to="/home" replace />} />
          <Route path="/admin/dashboard" element={<ProtectedRoute role="admin"><AdminDashboard /></ProtectedRoute>} />
          <Route path="/admin/start-election" element={<ProtectedRoute role="admin"><StartElection /> </ProtectedRoute>} />
          <Route path="/admin/assign-faculty" element={<ProtectedRoute role="admin"><AssignFaculty /> </ProtectedRoute>} />
          <Route path="/faculty/dashboard" element={<ProtectedRoute role="faculty"><FacultyDashboard /> </ProtectedRoute>} />
          <Route path="/faculty/select-candidates" element={<ProtectedRoute role="faculty"><SelectCandidates /> </ProtectedRoute>} />
          <Route path="/faculty/create-session" element={<ProtectedRoute role="faculty"><CreateSession /> </ProtectedRoute>} />
          <Route path="/faculty/session-control" element={<ProtectedRoute role="faculty"><ElectionSession /> </ProtectedRoute>} />
          <Route path="/faculty/declare-result" element={<ProtectedRoute role="faculty"><DeclareResult /> </ProtectedRoute>} />
          <Route path="/student/dashboard" element={<ProtectedRoute role="student"><StudentDashboard /> </ProtectedRoute>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
