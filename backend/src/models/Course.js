import mongoose from "mongoose";

const QuizSchema = new mongoose.Schema({
    question: {
        type: String,
        required: true,
    },

    options: [
        {
            type: String,
        },
    ],

    answer: {
        type: String,
        required: true,
    },
});

const AssignmentSchema = new mongoose.Schema({
    title: String,

    description: String,

    marks: {
        type: Number,
        default: 100,
    },

    dueDate: Date,

    file: {
        fileName: String,
        fileUrl: String,
        fileSize: Number,
    },
});

const DocumentSchema = new mongoose.Schema({
    fileName: String,

    fileUrl: String,

    fileType: String,

    fileSize: Number,
});

const LessonSchema = new mongoose.Schema({
    lessonNumber: Number,

    title: {
        type: String,
        required: true,
    },

    video: {
        title: String,

        fileUrl: String,

        duration: Number,

        thumbnail: String,

        size: Number,
    },

    documents: [DocumentSchema],

    quiz: [QuizSchema],

    assignment: AssignmentSchema,
});

const CertificateSchema = new mongoose.Schema({
    enabled: {
        type: Boolean,
        default: true,
    },

    type: {
        type: String,
        default: "Completion",
    },

    template: String,

    logo: String,

    signature: String,

    background: String,
});


const ReviewSchema = new mongoose.Schema(
    {
        student: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        studentName: {
            type: String,
            required: true,
        },

        rating: {
            type: Number,
            required: true,
            min: 1,
            max: 5,
        },

        comment: {
            type: String,
            default: "",
            trim: true,
        },
    },
    {
        timestamps: true,
    }
);

const CourseSchema = new mongoose.Schema(
    {
        instructor: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        title: {
            type: String,
            required: true,
            trim: true,
        },

        slug: {
            type: String,
            unique: true,
        },

        description: {
            type: String,
            required: true,
        },

        image: {
            type: String,
        },

        category: {
            type: String,
            required: true,
        },

        difficulty: {
            type: String,
            enum: ["Beginner", "Intermediate", "Advanced"],
        },

        duration: String,

        offeredBy: String,

        language: {
            type: String,
            default: "English",
        },

        courseIncludes: [
            {
                type: String,
            },
        ],

        pricing: {
            isFree: {
                type: Boolean,
                default: false,
            },

            originalPrice: {
                type: Number,
                default: 0,
            },

            discountPrice: {
                type: Number,
                default: 0,
            },

            currency: {
                type: String,
                default: "LKR",
            },
        },

        lessons: [LessonSchema],

        certificate: CertificateSchema,

        totalLessons: {
            type: Number,
            default: 0,
        },

        totalVideos: {
            type: Number,
            default: 0,
        },

        totalDocuments: {
            type: Number,
            default: 0,
        },

        totalQuizzes: {
            type: Number,
            default: 0,
        },

        totalAssignments: {
            type: Number,
            default: 0,
        },

        totalDuration: {
            type: Number,
            default: 0,
        },

        enrolledStudents: {
            type: Number,
            default: 0,
        },

        averageRating: {
            type: Number,
            default: 0,
        },

        totalRatings: {
            type: Number,
            default: 0,
        },

        ratingBreakdown: {
            1: {
                type: Number,
                default: 0,
            },

            2: {
                type: Number,
                default: 0,
            },

            3: {
                type: Number,
                default: 0,
            },

            4: {
                type: Number,
                default: 0,
            },

            5: {
                type: Number,
                default: 0,
            },
        },

        reviews: [ReviewSchema],

        status: {
            type: String,
            // enum: ["Draft", "Pending", "Published", "Rejected"],
            default: "Published",
        },
    },
    {
        timestamps: true,
    }
);

// Automatically update lesson statistics before saving
CourseSchema.pre("save", function () {

    this.totalLessons = this.lessons?.length || 0;

    this.totalVideos = (this.lessons || []).filter(
        lesson => lesson.video && lesson.video.fileUrl
    ).length;

    this.totalDocuments = (this.lessons || []).reduce(
        (total, lesson) => total + (lesson.documents?.length || 0),
        0
    );

    this.totalQuizzes = (this.lessons || []).reduce(
        (total, lesson) => total + (lesson.quiz?.length || 0),
        0
    );

    this.totalAssignments = (this.lessons || []).filter(
        lesson =>
            lesson.assignment &&
            lesson.assignment.title &&
            lesson.assignment.title.trim() !== ""
    ).length;

});

CourseSchema.methods.updateRatings = function () {

    const reviews = this.reviews || [];

    this.totalRatings = reviews.length;

    if (reviews.length === 0) {

        this.averageRating = 0;

        this.ratingBreakdown = {
            1: 0,
            2: 0,
            3: 0,
            4: 0,
            5: 0,
        };

        return;
    }

    let total = 0;

    const breakdown = {
        1: 0,
        2: 0,
        3: 0,
        4: 0,
        5: 0,
    };

    reviews.forEach((review) => {

        total += review.rating;

        breakdown[review.rating]++;

    });

    this.averageRating =
        Number((total / reviews.length).toFixed(1));

    this.ratingBreakdown = {
        1: Math.round((breakdown[1] / reviews.length) * 100),
        2: Math.round((breakdown[2] / reviews.length) * 100),
        3: Math.round((breakdown[3] / reviews.length) * 100),
        4: Math.round((breakdown[4] / reviews.length) * 100),
        5: Math.round((breakdown[5] / reviews.length) * 100),
    };

};

const Course = mongoose.model("Course", CourseSchema);

export default Course;