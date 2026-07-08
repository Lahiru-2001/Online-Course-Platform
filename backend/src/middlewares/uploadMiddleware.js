import multer from "multer";
import path from "path";
import fs from "fs";


// Create Upload Directories
const folders = {
    images: "src/uploads/images",
    videos: "src/uploads/videos",
    files: "src/uploads/files",
};

Object.values(folders).forEach((folder) => {
    if (!fs.existsSync(folder)) {
        fs.mkdirSync(folder, { recursive: true });
    }
});


// Storage
const storage = multer.diskStorage({

    destination: (req, file, cb) => {

        if (
            file.fieldname === "courseImage" ||
            file.fieldname === "certificateLogo" ||
            file.fieldname === "certificateSignature" ||
            file.fieldname === "certificateBackground" ||
            file.fieldname === "profileImage"
        ) {
            return cb(null, folders.images);
        }

        if (file.fieldname.startsWith("lessonVideo")) {
            return cb(null, folders.videos);
        }

        if (
            file.fieldname.startsWith("lessonDocument") ||
            file.fieldname.startsWith("assignmentFile")
        ) {
            return cb(null, folders.files);
        }

        cb(null, folders.files);

    },

    filename: (req, file, cb) => {

        const uniqueName =
            Date.now() +
            "-" +
            Math.round(Math.random() * 1000000000);

        cb(
            null,
            uniqueName + path.extname(file.originalname)
        );

    }

});


// File Filter

const imageTypes = /jpeg|jpg|png|webp/;
const videoTypes = /mp4|mov|avi|mkv|webm/;
const documentTypes =
    /pdf|doc|docx|ppt|pptx|xls|xlsx|csv|zip|rar|7z|txt/;

const fileFilter = (req, file, cb) => {

    const extension = path
        .extname(file.originalname)
        .toLowerCase()
        .replace(".", "");


    // Images
    if (
        file.fieldname === "courseImage" ||
        file.fieldname === "profileImage" ||
        file.fieldname === "certificateLogo" ||
        file.fieldname === "certificateSignature" ||
        file.fieldname === "certificateBackground"
    ) {

        if (imageTypes.test(extension)) {
            return cb(null, true);
        }

        return cb(
            new Error("Only JPG, PNG and WEBP images are allowed.")
        );

    }


    // Videos

    if (file.fieldname.startsWith("lessonVideo")) {

        if (videoTypes.test(extension)) {
            return cb(null, true);
        }

        return cb(
            new Error("Only MP4, MOV, AVI, MKV and WEBM videos are allowed.")
        );

    }


    // Documents

    if (
        file.fieldname.startsWith("lessonDocument") ||
        file.fieldname.startsWith("assignmentFile")
    ) {

        if (documentTypes.test(extension)) {
            return cb(null, true);
        }

        return cb(
            new Error("Unsupported document type.")
        );

    }

    cb(null, true);

};

// Limits

const upload = multer({

    storage,
    fileFilter,
    limits: {

        fileSize: 1024 * 1024 * 500, // 500MB

    },

});

export default upload;