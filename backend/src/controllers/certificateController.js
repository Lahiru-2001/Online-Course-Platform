import Enrollment from "../models/Enrollment.js";


// Get Logged-in Student Certificates
export const getMyCertificates = async (req, res) => {
    try {

        const studentId = req.user._id;

        const enrollments = await Enrollment.find({
            student: studentId,
            completed: true,
        })
            .populate({
                path: "course",
            })
            .populate({
                path: "instructor",
                select: "fullName email",
            });

        const certificates = enrollments.map((enrollment) => ({

            certificateId:
                `CERT-${enrollment._id.toString().slice(-6).toUpperCase()}`,
            enrollmentId: enrollment._id,
            completedDate: enrollment.updatedAt,
            progress: enrollment.progress,
            student: {
                id: req.user._id,
                fullName: req.user.fullName,
                email: req.user.email,
            },

            instructor: {
                id: enrollment.instructor?._id,
                fullName: enrollment.instructor?.fullName,
                email: enrollment.instructor?.email,
            },

            course: {
                id: enrollment.course?._id,
                title: enrollment.course?.title,
                description: enrollment.course?.description,
                image: enrollment.course?.image,
                category: enrollment.course?.category,
                duration: enrollment.course?.duration,
                language: enrollment.course?.language,
                difficulty: enrollment.course?.difficulty,
                offeredBy: enrollment.course?.offeredBy,
                certificate: enrollment.course?.certificate,
            }

        }));

        return res.status(200).json({
            success: true,
            total: certificates.length,
            certificates

        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Unable to fetch certificates.",
            error: error.message

        });

    }
};