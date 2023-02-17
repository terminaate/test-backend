export class Exception {
	constructor(public message: string | string[], public statusCode: number) {}

	static UnauthorizedException() {
		return this.NewException('Unauthorized.', 401);
	}

	static ForbiddenException() {
		return this.NewException('Forbidden.', 403);
	}

	static InternalServerError() {
		return this.NewException('Internal Server Error', 500);
	}

	static FileSizeIsBig(
		maxFileSize: number | string,
		size: 'mb' | 'kb' | 'b' = 'b'
	) {
		return this.NewException(
			'File size is too big, max file size is - ' + maxFileSize + size,
			400
		);
	}

	static InvalidFileType(fileType: string | string[]) {
		fileType = Array.isArray(fileType) ? fileType.join(',') : fileType;
		return this.NewException(
			'File type is wrong, allowed file types is ' + fileType,
			400
		);
	}

	static NewException(message: string | string[], statusCode: number) {
		return new Exception(message, statusCode);
	}
}
