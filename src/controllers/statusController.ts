import { Request, Response } from 'express';

export class StatusController {
	public ping(req: Request, res: Response): void {
		res.json({
			message: 'Server is running',
			timestamp: new Date().toISOString(),
		});
	}
}