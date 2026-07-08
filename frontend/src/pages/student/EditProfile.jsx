import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";

import axios from "axios";

export default function EditProfile() {
  const navigate = useNavigate();

  const { user, setUser } = useAuth();

  const [loading, setLoading] = useState(true);

  const [saving, setSaving] = useState(false);

  const [error, setError] = useState("");

  const [imagePreview, setImagePreview] = useState("");

  const [profileImage, setProfileImage] = useState(null);

  const [formData, setFormData] = useState({

    firstName: "",

    lastName: "",

    email: "",

    phone: "",

    bio: "",

    password: "",

  });

  const token = localStorage.getItem("token");
  const handleChange = (e) => {

    setFormData((prev) => ({

      ...prev,

      [e.target.name]: e.target.value,

    }));

  };

  const handleImageChange = (e) => {

    const file = e.target.files[0];

    if (!file) return;

    setProfileImage(file);

    setImagePreview(URL.createObjectURL(file));

  };

  const loadProfile = async () => {

    try {

      setLoading(true);

      const response = await axios.get(

        "http://localhost:5000/api/student/profile",

        {

          headers: {

            Authorization: `Bearer ${token}`,

          },

        }

      );

      const student = response.data.student;

      setFormData({

        firstName: student.firstName || "",

        lastName: student.lastName || "",

        email: student.email || "",

        phone: student.phone || "",

        bio: student.bio || "",

        password: "",

      });

      if (student.profileImage) {

        setImagePreview(

          `http://localhost:5000${student.profileImage}`

        );

      }

    } catch (err) {

      console.log(err);

      setError(

        err.response?.data?.message ||

        "Failed to load profile."

      );

    } finally {

      setLoading(false);

    }

  };

  useEffect(() => {

    loadProfile();

  }, []);


  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    if (!formData.firstName.trim()) {
      return setError("First Name is required.");
    }

    if (!formData.lastName.trim()) {
      return setError("Last Name is required.");
    }

    if (!formData.email.trim()) {
      return setError("Email Address is required.");
    }

    const emailRegex =
      /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

    if (!emailRegex.test(formData.email)) {
      return setError("Invalid Email Address.");
    }

    if (!formData.phone.trim()) {
      return setError("Phone Number is required.");
    }

    if (
      formData.password &&
      formData.password.length < 6
    ) {
      return setError(
        "Password must be at least 6 characters."
      );
    }

    try {

      setSaving(true);


      const data = new FormData();

      data.append("firstName", formData.firstName);

      data.append("lastName", formData.lastName);

      data.append("email", formData.email);

      data.append("phone", formData.phone);

      data.append("bio", formData.bio);

      if (formData.password.trim()) {
        data.append("password", formData.password);
      }

      if (profileImage) {
        data.append("profileImage", profileImage);
      }

      const response = await axios.put(
        "http://localhost:5000/api/student/profile",
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );


      setUser((prev) => ({
        ...prev,
        fullName: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        avatar:
          response.data.student.profileImage ||
          prev.avatar,
      }));

      alert(response.data.message);

      navigate("/student/profile");

    } catch (err) {

      console.log(err);

      setError(
        err.response?.data?.message ||
        "Failed to update profile."
      );

    } finally {

      setSaving(false);

    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <p className="text-gray-500 text-lg font-semibold">
          Loading profile...
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto flex flex-col gap-6">

      {/* Header */}

      <div className="flex justify-between items-center">

        <div className="flex items-center gap-3">

          <button
            onClick={() => navigate("/student/profile")}
            className="text-gray-500 hover:text-orange-500"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>

          <h1 className="text-2xl font-bold text-[#1e3a5f]">
            Edit Profile
          </h1>

        </div>

        <Button
          type="submit"
          form="profileForm"
          disabled={saving}
          className="px-6"
        >
          {saving ? "Updating..." : "Save Changes"}
        </Button>

      </div>

      {/* Error */}

      {error && (

        <div className="bg-red-100 border border-red-300 text-red-600 rounded-lg p-3">

          {error}

        </div>

      )}

      <Card className="border border-gray-200">

        <form
          id="profileForm"
          onSubmit={handleSubmit}
          className="flex flex-col gap-6"
        >

          {/* Image */}

          <div className="flex items-center gap-6">

            <img
              src={
                imagePreview ||
                "http://localhost:5000/uploads/images/default-profile.png"
              }
              alt="Profile"
              className="w-24 h-24 rounded-full object-cover border-2 border-gray-300"
            />

            <div className="flex flex-col gap-2">

              <label className="text-sm font-semibold">

                Profile Image

              </label>

              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="text-sm"
              />

              <p className="text-xs text-gray-500">

                JPG, PNG or WEBP

              </p>

            </div>

          </div>

          {/* First & Last Name */}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

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

          {/* Email & Phone */}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

            <Input
              label="Email Address"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />

            <Input
              label="Phone Number"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
            />

          </div>

          {/* Password */}

          <Input
            label="New Password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Leave blank to keep current password"
          />

          {/* Bio */}

          <div>

            <label className="block text-sm font-semibold mb-2">

              About Me (Bio)

            </label>

            <textarea
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              rows={5}
              className="w-full rounded-lg border border-gray-300 p-3 focus:outline-none focus:border-orange-500"
            />

          </div>

          <Button
            type="submit"
            disabled={saving}
            className="w-52"
          >
            {saving ? "Updating..." : "Update Profile"}
          </Button>

        </form>

      </Card>

    </div>
  );

}