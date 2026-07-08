import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { MOCK_USERS, MOCK_COURSES } from "../../utils/mockData";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import Badge from "../../components/ui/Badge";

const API_URL = "http://localhost:5000";

export default function AdminProfile() {
  const { setUser } = useAuth();

  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phone: "",
    avatar: "",
  });

  const [errors, setErrors] = useState({});

  const loadProfile = async () => {
    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      const response = await fetch(`${API_URL}/api/admin/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to load profile.");
      }

      setFormData({
        firstName: data.admin.firstName,
        lastName: data.admin.lastName,
        email: data.admin.email,
        password: "",
        phone: data.admin.phone,
        avatar: data.admin.profileImage || "",
      });

      setUser((prev) => ({
        ...prev,
        name: `${data.admin.firstName} ${data.admin.lastName}`,
        email: data.admin.email,
        avatar: data.admin.profileImage,
      }));
    } catch (error) {
      console.error(error);
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProfile();
  }, []);


  const validateForm = () => {
    const newErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required.";
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required.";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
    } else {
      const emailRegex =
        /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

      if (!emailRegex.test(formData.email)) {
        newErrors.email = "Invalid email address.";
      }
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required.";
    }

    if (
      formData.password &&
      formData.password.length > 0 &&
      formData.password.length < 6
    ) {
      newErrors.password =
        "Password must be at least 6 characters.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };


  const handleImageUpload = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setFormData((prev) => ({
      ...prev,
      avatar: file,
    }));
  };


  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      const token = localStorage.getItem("token");

      const body = new FormData();

      body.append("firstName", formData.firstName);
      body.append("lastName", formData.lastName);
      body.append("email", formData.email);
      body.append("phone", formData.phone);

      if (formData.password.trim() !== "") {
        body.append("password", formData.password);
      }

      if (formData.avatar instanceof File) {
        body.append("profileImage", formData.avatar);
      }

      const response = await fetch(
        `${API_URL}/api/admin/profile`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body,
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Profile update failed.");
      }

      alert(data.message);

      setFormData((prev) => ({
        ...prev,
        password: "",
      }));

      setUser((prev) => ({
        ...prev,
        name: `${data.admin.firstName} ${data.admin.lastName}`,
        email: data.admin.email,
        avatar: data.admin.profileImage,
      }));

      setIsEditing(false);

      loadProfile();
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  };


  if (loading) {
    return (
      <div className="flex justify-center items-center h-80 text-lg font-semibold">
        Loading profile...
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto flex flex-col gap-6">


      <Card className="flex flex-col sm:flex-row items-center justify-between gap-6">

        <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">

          <img
            src={
              formData.avatar
                ? formData.avatar instanceof File
                  ? URL.createObjectURL(formData.avatar)
                  : `${API_URL}/${formData.avatar}`
                : "/default-avatar.png"
            }
            alt="Administrator"
            className="w-24 h-24 rounded-full border-4 border-gray-200 object-cover"
          />

          <div>

            <div className="flex flex-col sm:flex-row items-center gap-2">

              <h2 className="text-2xl font-bold text-[#1e3a5f]">
                {formData.firstName} {formData.lastName}
              </h2>

              <Badge variant="gray">
                Administrator
              </Badge>

            </div>

            <p className="text-sm text-gray-500 mt-2">
              {formData.email}
            </p>

            <p className="text-sm text-gray-400">
              {formData.phone}
            </p>

          </div>

        </div>

        <Button
          variant="primary"
          onClick={() => setIsEditing(!isEditing)}
          className="px-6 py-3"
        >
          {isEditing ? "Cancel Edit" : "Edit Profile"}
        </Button>

      </Card>


      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        <Card className="text-center">

          <p className="text-xs uppercase tracking-wider text-gray-500 font-semibold">
            Users Managed
          </p>

          <h2 className="text-3xl font-bold text-[#1e3a5f] mt-2">
            {MOCK_USERS.length}
          </h2>

        </Card>

        <Card className="text-center">

          <p className="text-xs uppercase tracking-wider text-gray-500 font-semibold">
            Platform Revenue
          </p>

          <h2 className="text-3xl font-bold text-[#1e3a5f] mt-2">
            LKR 1.25M
          </h2>

        </Card>

        <Card className="text-center">

          <p className="text-xs uppercase tracking-wider text-gray-500 font-semibold">
            Active Courses
          </p>

          <h2 className="text-3xl font-bold text-[#1e3a5f] mt-2">
            {MOCK_COURSES.length}
          </h2>

        </Card>

      </div>

      {isEditing ? (
        <Card>
          <form onSubmit={handleUpdate} className="flex flex-col gap-6">

            {/* Profile Image */}
            <div className="flex flex-col items-center gap-4">

              <img
                src={
                  formData.avatar
                    ? formData.avatar instanceof File
                      ? URL.createObjectURL(formData.avatar)
                      : `${API_URL}/${formData.avatar}`
                    : "/default-avatar.png"
                }
                alt="Profile Preview"
                className="w-32 h-32 rounded-full object-cover border-4 border-gray-200"
              />

              <label className="cursor-pointer bg-orange-500 hover:bg-orange-600 text-white px-5 py-2 rounded-lg font-medium transition">

                Upload New Photo

                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />

              </label>

            </div>

            {/* First Name / Last Name */}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

              <div>

                <Input
                  label="First Name"
                  value={formData.firstName}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      firstName: e.target.value,
                    })
                  }
                />

                {errors.firstName && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.firstName}
                  </p>
                )}

              </div>

              <div>

                <Input
                  label="Last Name"
                  value={formData.lastName}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      lastName: e.target.value,
                    })
                  }
                />

                {errors.lastName && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.lastName}
                  </p>
                )}

              </div>

            </div>

            {/* Email / Phone */}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

              <div>

                <Input
                  label="Email Address"
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      email: e.target.value,
                    })
                  }
                />

                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.email}
                  </p>
                )}

              </div>

              <div>

                <Input
                  label="Phone Number"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      phone: e.target.value,
                    })
                  }
                />

                {errors.phone && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.phone}
                  </p>
                )}

              </div>

            </div>

            {/* Password */}

            <div>

              <Input
                label="New Password"
                type="password"
                placeholder="Leave blank to keep current password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    password: e.target.value,
                  })
                }
              />

              {errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.password}
                </p>
              )}

            </div>

            {/* Buttons */}

            <div className="flex justify-end gap-3 pt-2">

              <Button
                type="button"
                variant="secondary"
                onClick={() => {
                  setIsEditing(false);
                  setErrors({});
                }}
              >
                Cancel
              </Button>

              <Button
                type="submit"
                variant="primary"
              >
                Update Profile
              </Button>

            </div>

          </form>
        </Card>
      ) : (
        <Card>
          <h3 className="text-lg font-semibold text-[#1e3a5f] mb-4">
            Recent Activity Log
          </h3>

          <div className="flex flex-col gap-3">

            <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg flex justify-between items-center">
              <div>
                <h4 className="font-medium text-gray-800">
                  Deleted Course "c12" from portal registry
                </h4>
                <p className="text-sm text-gray-500">
                  Administrator removed an inactive course from the LMS.
                </p>
              </div>

              <span className="text-xs text-gray-400 whitespace-nowrap">
                10 mins ago
              </span>
            </div>

            <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg flex justify-between items-center">
              <div>
                <h4 className="font-medium text-gray-800">
                  Approved registration request
                </h4>
                <p className="text-sm text-gray-500">
                  BOC Bank payment verification has been approved.
                </p>
              </div>

              <span className="text-xs text-gray-400 whitespace-nowrap">
                2 hours ago
              </span>
            </div>

            <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg flex justify-between items-center">
              <div>
                <h4 className="font-medium text-gray-800">
                  Published new course
                </h4>
                <p className="text-sm text-gray-500">
                  Advanced React Development course is now available.
                </p>
              </div>

              <span className="text-xs text-gray-400 whitespace-nowrap">
                Yesterday
              </span>
            </div>

            <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg flex justify-between items-center">
              <div>
                <h4 className="font-medium text-gray-800">
                  Updated instructor profile
                </h4>
                <p className="text-sm text-gray-500">
                  Instructor profile information has been updated.
                </p>
              </div>

              <span className="text-xs text-gray-400 whitespace-nowrap">
                2 days ago
              </span>
            </div>

            <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg flex justify-between items-center">
              <div>
                <h4 className="font-medium text-gray-800">
                  Generated monthly revenue report
                </h4>
                <p className="text-sm text-gray-500">
                  Monthly platform revenue report generated successfully.
                </p>
              </div>

              <span className="text-xs text-gray-400 whitespace-nowrap">
                3 days ago
              </span>
            </div>

          </div>
        </Card>
      )}

    </div>
  );
}