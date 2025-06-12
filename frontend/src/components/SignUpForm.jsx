import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SignupForm = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        SR_NO: "",
        password: "",
        role: "",
    });
    const handleGoBack = () => {
        navigate("/admin/dashboard");
    };
    const [message, setMessage] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("/api/user/createuser", formData);
            setMessage("User created successfully!");
            console.log(res.data);
        } catch (error) {
            setMessage("Error creating user.");
            console.error(error);
        }
    };
    const navigate = useNavigate();
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 ">

            <div className="max-w-md mx-auto p-6 bg-white shadow rounded-2xl  ">
                <h2 className="text-xl font-bold mb-4">Signup Form</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        name="name"
                        type="text"
                        placeholder="Name"
                        className="w-full border p-2 rounded"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                    <input
                        name="email"
                        type="email"
                        placeholder="Email"
                        className="w-full border p-2 rounded"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                    <input
                        name="SR_NO"
                        type="text"
                        placeholder="Serial Number"
                        className="w-full border p-2 rounded"
                        value={formData.SR_NO}
                        onChange={handleChange}
                        required
                    />
                    <input
                        name="password"
                        type="password"
                        placeholder="Password"
                        className="w-full border p-2 rounded"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                    <select
                        name="role"
                        className="w-full border p-2 rounded"
                        value={formData.role}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select Role</option>
                        <option value="admin">Admin</option>
                        <option value="faculty">Faculty</option>
                        <option value="student">Student</option>
                    </select>
                    <div className="mt-4">
                        <button
                            type="submit"
                            className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
                        >
                            Submit
                        </button>
                    </div>
                </form>
                <div className="mt-4"> {/* Add margin-top for spacing from the form */}
                    <button
                        onClick={handleGoBack} // Use the dedicated handler
                        className="bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700"
                    >
                        Back
                    </button>
                </div>
                {message && <p className="mt-4 text-center text-sm text-gray-700">{message}</p>}
            </div>
        </div>
    );
};

export default SignupForm;
