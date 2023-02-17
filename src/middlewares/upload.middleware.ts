import multer from 'multer';
import path from 'path';
import { Exception } from '@/lib/exception';

const maxFileSizeMB = 10;
const whiteList = ['image/jpg', "image/jpeg", 'image/png'];

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, path.resolve(__dirname, '../static'));
	},
	filename: function (req, file, cb) {
		const uniqueSuffix = Date.now() + Math.round(Math.random() * 1e9);
		cb(null, uniqueSuffix + '');
	},
});

export const upload = multer({
	storage,
	fileFilter(req, file, cb) {
		console.log(file);
		const fileSize = parseInt(req.headers['content-length']!) / 1000000;
		if (fileSize > maxFileSizeMB) {
			return cb(Exception.FileSizeIsBig(10, 'mb') as any, false);
		}
		if (!whiteList.includes(file.mimetype)) {
			return cb(Exception.InvalidFileType(whiteList) as any, false);
		}
		return cb(null, true);
	},
});
