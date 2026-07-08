const multer = require("multer");

// Storage configuration
const storage = multer.diskStorage({

    destination:(req,file,cb)=>{
        cb(null,"uploads/");
    },

    filename:(req,file,cb)=>{
        cb(
            null,
            Date.now()+"-"+file.originalname
        );
    }
});

// File filter
const fileFilter = (req,file,cb)=>{

    const allowedTypes=[

        "image/jpeg",
        "image/png",
        "application/pdf",
        "video/mp4"
    ];

    if(
        allowedTypes.includes(file.mimetype)
    ){
        cb(null,true);

    }else{

        cb(
            new Error("File type not allowed"),
            false
        );

    }

};


const upload = multer({
    storage:storage,
    fileFilter:fileFilter,
    limits:{
        fileSize:50*1024*1024
    }

});

module.exports = upload;