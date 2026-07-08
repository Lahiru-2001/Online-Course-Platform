import React, { useEffect, useState } from "react";

import { useAuth } from "../../context/AuthContext";

import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import Badge from "../../components/ui/Badge";

import {
    getInstructorProfile,
    updateInstructorProfile,
} from "../../services/instructorService";

export default function InstructorProfile() {

    const { setUser } = useAuth();

    const [loading, setLoading] = useState(true);

    const [saving, setSaving] = useState(false);

    const [isEditing, setIsEditing] = useState(false);

    const [activeTab, setActiveTab] =
        useState("About Portfolio");

    const [error, setError] = useState("");

    const [success, setSuccess] = useState("");

    const [imageFile, setImageFile] =
        useState(null);

    const [formData, setFormData] = useState({

        firstName: "",

        lastName: "",

        email: "",

        title: "",

        specialization: "",

        bio: "",

        avatar: "/uploads/images/default-profile.png",

        expertise: [
            "React",
            "Node.js",
            "JavaScript",
            "MongoDB",
        ],

    });


    useEffect(() => {

        loadProfile();

    }, []);

    const loadProfile = async () => {

        try {

            setLoading(true);

            const response =
                await getInstructorProfile();

            const profile =
                response.instructor;

            setFormData({

                firstName:
                    profile.firstName || "",

                lastName:
                    profile.lastName || "",

                email:
                    profile.email || "",

                title:
                    profile.title || "",

                specialization:
                    profile.specialization || "",

                bio:
                    profile.bio || "",

                avatar:
                    profile.profileImage
                        ? `http://localhost:5000${profile.profileImage}`
                        : "/uploads/images/default-profile.png",

                expertise: [
                    "React",
                    "Node.js",
                    "JavaScript",
                    "MongoDB",
                ],

            });

        } catch (error) {

            console.log(error);

            setError(
                error.response?.data?.message ||
                "Failed to load profile."
            );

        } finally {

            setLoading(false);

        }

    };

    const handleChange = (e) => {

        setFormData({

            ...formData,

            [e.target.name]:
                e.target.value,

        });

    };

    const handleImageUpload = (e) => {

        const file = e.target.files[0];

        if (!file) return;

        setImageFile(file);

        setFormData((prev) => ({

            ...prev,

            avatar:
                URL.createObjectURL(file),

        }));

    };

    const validateForm = () => {

        if (!formData.firstName.trim()) {

            setError(
                "First Name is required."
            );

            return false;

        }

        if (!formData.lastName.trim()) {

            setError(
                "Last Name is required."
            );

            return false;

        }

        if (!formData.email.trim()) {

            setError(
                "Email Address is required."
            );

            return false;

        }

        const emailRegex =
            /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

        if (!emailRegex.test(formData.email)) {

            setError(
                "Invalid email address."
            );

            return false;

        }

        if (!formData.title.trim()) {

            setError(
                "Title is required."
            );

            return false;

        }

        if (!formData.specialization.trim()) {

            setError(
                "Specialization is required."
            );

            return false;

        }

        if (!formData.bio.trim()) {

            setError(
                "Professional Bio is required."
            );

            return false;

        }

        setError("");

        return true;

    };



    const handleUpdate = async (e) => {

        e.preventDefault();

        setSuccess("");

        if (!validateForm()) return;

        try {

            setSaving(true);

            const data =
                new FormData();

            data.append(
                "firstName",
                formData.firstName
            );

            data.append(
                "lastName",
                formData.lastName
            );

            data.append(
                "email",
                formData.email
            );

            data.append(
                "title",
                formData.title
            );

            data.append(
                "specialization",
                formData.specialization
            );

            data.append(
                "bio",
                formData.bio
            );

            if (imageFile) {

                data.append(
                    "profileImage",
                    imageFile
                );

            }

            const response =
                await updateInstructorProfile(
                    data
                );

            const profile =
                response.instructor;

            setUser((prev) => ({

                ...prev,

                name:
                    profile.fullName,

                email:
                    profile.email,

            }));

            setSuccess(
                response.message
            );

            setIsEditing(false);

            await loadProfile();

        } catch (error) {

            console.log(error);

            setError(

                error.response?.data?.message ||

                "Profile update failed."

            );

        } finally {

            setSaving(false);

        }

    };

    if (loading) {

        return (

            <div className="flex justify-center items-center h-80">

                <div className="text-lg font-semibold">

                    Loading Profile...

                </div>

            </div>

        );

    }
    return (
        <div className="max-w-4xl mx-auto flex flex-col gap-6">

            {error && (
                <div className="bg-red-100 border border-red-300 text-red-700 px-4 py-3 rounded-lg">
                    {error}
                </div>
            )}

            {success && (
                <div className="bg-green-100 border border-green-300 text-green-700 px-4 py-3 rounded-lg">
                    {success}
                </div>
            )}

            {/* Header */}

            <Card className="flex flex-col sm:flex-row items-center justify-between gap-6">

                <div className="flex flex-col sm:flex-row items-center gap-4">

                    <img
                        src={formData.avatar}
                        alt="Profile"
                        className="w-24 h-24 rounded-full border-4 border-green-100 object-cover"
                    />

                    <div>

                        <div className="flex items-center gap-2">

                            <h2 className="text-2xl font-bold text-[#1e3a5f]">

                                {formData.firstName} {formData.lastName}

                            </h2>

                            <Badge variant="green">
                                Instructor
                            </Badge>

                        </div>

                        <p className="text-orange-500 font-semibold mt-1">

                            {formData.title}

                        </p>

                        <p className="text-gray-500 text-sm">

                            {formData.specialization}

                        </p>

                        <p className="text-gray-400 text-xs mt-1">

                            {formData.email}

                        </p>

                    </div>

                </div>

                <Button
                    variant="primary"
                    onClick={() =>
                        setIsEditing(!isEditing)
                    }
                >

                    {isEditing
                        ? "Cancel"
                        : "Edit Profile"}

                </Button>

            </Card>

            {/* Dummy Stats */}

            {/* <div className="grid md:grid-cols-3 gap-5">

            <Card className="text-center">

                <p className="text-gray-500 text-sm">

                    Total Students

                </p>

                <h2 className="text-3xl font-bold mt-2">

                    1248

                </h2>

            </Card>

            <Card className="text-center">

                <p className="text-gray-500 text-sm">

                    Courses Created

                </p>

                <h2 className="text-3xl font-bold mt-2">

                    8

                </h2>

            </Card>

            <Card className="text-center">

                <p className="text-gray-500 text-sm">

                    Average Rating

                </p>

                <h2 className="text-3xl font-bold mt-2">

                    4.8 ★

                </h2>

            </Card>

        </div> */}

            {/* Tabs */}

            <div className="border-b flex gap-6">

                {[
                    "About Portfolio",
                    // "Expertise Tags",
                    // "Reviews",
                ].map((tab) => (

                    <button

                        key={tab}

                        onClick={() =>
                            setActiveTab(tab)
                        }

                        className={`pb-3 font-semibold ${activeTab === tab
                            ? "border-b-2 border-orange-500 text-orange-500"
                            : "text-gray-500"
                            }`}

                    >

                        {tab}

                    </button>

                ))}

            </div>

            {isEditing ? (

                <Card>

                    <form
                        onSubmit={handleUpdate}
                        className="space-y-5"
                    >

                        <div className="grid md:grid-cols-2 gap-4">

                            <Input
                                label="First Name"
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleChange}
                                required
                            />

                            <Input
                                label="Last Name"
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleChange}
                                required
                            />

                        </div>

                        <Input
                            label="Email Address"
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />

                        <Input
                            label="Title"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            required
                        />

                        <Input
                            label="Specialization"
                            name="specialization"
                            value={formData.specialization}
                            onChange={handleChange}
                            required
                        />

                        <div>

                            <label className="block text-sm font-semibold mb-2">

                                Professional Bio

                            </label>

                            <textarea

                                name="bio"

                                rows={5}

                                value={formData.bio}

                                onChange={handleChange}

                                className="w-full rounded-lg border border-gray-300 p-3"

                            />

                        </div>

                        <div>

                            <label className="block text-sm font-semibold mb-2">

                                Profile Image

                            </label>

                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageUpload}
                            />

                        </div>

                        <Button
                            type="submit"
                            variant="primary"
                            disabled={saving}
                        >

                            {saving
                                ? "Updating..."
                                : "Update Profile"}

                        </Button>

                    </form>

                </Card>

            ) : (

                <Card>

                    {activeTab === "About Portfolio" && (

                        <div>

                            <h3 className="font-bold text-lg mb-4">

                                Professional Bio

                            </h3>

                            <p className="text-gray-600 leading-7">

                                {formData.bio}

                            </p>

                            <div className="grid md:grid-cols-2 gap-6 mt-8">

                                <div>

                                    <span className="text-gray-500 text-sm">

                                        Title

                                    </span>

                                    <p className="font-semibold">

                                        {formData.title}

                                    </p>

                                </div>

                                <div>

                                    <span className="text-gray-500 text-sm">

                                        Specialization

                                    </span>

                                    <p className="font-semibold">

                                        {formData.specialization}

                                    </p>

                                </div>

                            </div>

                        </div>

                    )}


                </Card>

            )}

        </div>
    );
}