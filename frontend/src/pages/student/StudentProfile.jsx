import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { Link } from "react-router-dom";
import axios from "axios";

import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";

export default function StudentProfile() {

    const { logout } = useAuth();

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");

    const [profile, setProfile] = useState({

        firstName: "",

        lastName: "",

        email: "",

        phone: "",

        bio: "",

        profileImage: "",

    });

    const token = localStorage.getItem("token");
    const loadProfile = async () => {

        try {

            setLoading(true);

            const res = await axios.get(
                "http://localhost:5000/api/student/profile",
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setProfile(res.data.student);

        } catch (err) {

            console.log(err);

            setError(
                err.response?.data?.message ||
                "Unable to load profile."
            );

        } finally {

            setLoading(false);

        }

    };

    useEffect(() => {

        loadProfile();

    }, []);

    if (loading) {

        return (

            <div className="flex justify-center items-center h-96">

                <p className="text-lg font-semibold">

                    Loading Profile...

                </p>

            </div>

        );

    }

    if (error) {

        return (

            <div className="max-w-4xl mx-auto mt-8">

                <div className="bg-red-100 border border-red-300 rounded-lg p-4 text-red-600">

                    {error}

                </div>

            </div>

        );

    }

    return (

        <div className="flex flex-col gap-6">

            {/* Header */}

            <div className="flex justify-between items-center">

                <h1 className="text-2xl font-bold text-[#1e3a5f]">

                    Student Profile

                </h1>

                <Link to="/student/edit-profile">

                    <Button>

                        Edit Profile

                    </Button>

                </Link>

            </div>

            {/* Profile Card */}

            <Card className="p-8">

                <div className="flex flex-col md:flex-row gap-8 items-center">

                    <img

                        src={
                            profile.profileImage
                                ? `http://localhost:5000${profile.profileImage}`
                                : "http://localhost:5000/uploads/images/default-profile.png"
                        }

                        alt="Profile"

                        className="w-36 h-36 rounded-full object-cover border-4 border-orange-500"

                    />

                    <div className="flex-1">

                        <h2 className="text-3xl font-bold">

                            {profile.firstName} {profile.lastName}

                        </h2>

                        <p className="text-gray-500">

                            Student

                        </p>

                        <div className="grid md:grid-cols-2 gap-5 mt-8">

                            <div>

                                <label className="font-semibold">

                                    Email

                                </label>

                                <p>

                                    {profile.email}

                                </p>

                            </div>

                            <div>

                                <label className="font-semibold">

                                    Phone

                                </label>

                                <p>

                                    {profile.phone || "-"}

                                </p>

                            </div>

                        </div>

                    </div>

                </div>

            </Card>

            {/* About */}

            <Card className="p-6">

                <h3 className="text-xl font-bold mb-3">

                    About Me

                </h3>

                <p className="text-gray-700 leading-7">

                    {profile.bio || "No bio available."}

                </p>

            </Card>

            {/* Logout */}

            <div>

                <Button
                    variant="danger"
                    onClick={logout}
                >
                    Logout
                </Button>

            </div>

        </div>

    );

}