import { TypedRequest } from '@/types/TypedRequest';

export type FileRequest<
	ReqBody = Record<string, unknown>,
	Params = Record<string, unknown>,
	QueryString = Record<string, unknown>
> = TypedRequest<ReqBody, Params, QueryString> & Express.Multer.File;
