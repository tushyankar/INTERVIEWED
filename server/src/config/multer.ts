import fs from 'node:fs';
import path from 'node:path';

import multer from 'multer';

const uploadDirectory = path.resolve('uploads/resumes');

if (!fs.existsSync(uploadDirectory)) {
  fs.mkdirSync(uploadDirectory, {
    recursive: true,
  });
}

const storage = multer.diskStorage({
  destination: (_req, _file, callback) => {
    callback(null, uploadDirectory);
  },

  filename: (_req, file, callback) => {
    const timestamp = Date.now();
    const sanitizedName = file.originalname.replace(/\s+/g, '-');

    callback(null, `${timestamp}-${sanitizedName}`);
  },
});

const fileFilter: multer.Options['fileFilter'] = (
  _req,
  file,
  callback,
) => {
  if (file.mimetype !== 'application/pdf') {
    callback(new Error('Only PDF files are allowed.'));
    return;
  }

  callback(null, true);
};

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10 MB
  },
});

export default upload;
