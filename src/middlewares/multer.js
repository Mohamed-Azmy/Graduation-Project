import multer from 'multer';

export const fileTypes = {
    video: [
        'video/mp4',
        'video/webm',
        'video/x-matroska',
        'video/x-msvideo', 
        'video/quicktime',
        'video/x-ms-wmv',
        'video/x-flv',
        'video/mpeg',
        'video/3gpp'
    ],
    pdf: ['application/pdf']
}

export const multerCloudinary = (customValidation = []) => {
    const storage = multer.diskStorage({});

    function fileFilter (req, file, cb) {
        if (!customValidation.includes(file.mimetype))
            return cb(new Error("invalid file type"), false);

        return cb(null, true);
    }

    const upload = multer({ storage, fileFilter });
    
    return upload;
}