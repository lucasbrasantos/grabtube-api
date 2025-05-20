import { Request } from 'express';

export async function validateRequest(req: Request) {
	const contentType = req.headers['content-type'];

	console.log('Request query:', req.query);

	// Ensure req.query is populated
	if (!req.query || Object.keys(req.query).length === 0) {
		throw new Error('Request query is empty');
	}

	const { url, quality } = req.query;

	if (!url || typeof url !== 'string') {
		throw new Error('URL is required and must be a string');
	}

	if (quality && typeof quality === 'string' && !['highest', 'lowest'].includes(quality)) {
		throw new Error('Invalid quality parameter');
	}

	return { url, quality: (typeof quality === 'string' ? quality : 'highest') };
}