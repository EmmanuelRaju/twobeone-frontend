export type TApiResponse<T = unknown> = {
	success: boolean;
	status: number;
	message: string;
	data?: T; // main payload (optional)
	error?: string; // developer-oriented error message (optional)
	pagination?: TPagination;
};

export type TPagination = {
	page: number;
	limit: number;
	totalPages: number;
	totalItems: number;
};
