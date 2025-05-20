import { Request, Response, NextFunction } from 'express';
import { VideoService } from '../services/videoService';
import { validateRequest } from '../utils/validateRequests';

export class VideoController {
	private videoService: VideoService;

	constructor() {
		this.videoService = new VideoService();
	}

	getVideoInfo = async (req: Request, res: Response, next: NextFunction) => {
		try {
			const { url } = await validateRequest(req);
			const info = await this.videoService.getVideoInfo(url);
			res.json(info);
		} catch (error) {
			next(error);
		}
	};

	downloadVideo = async (req: Request, res: Response, next: NextFunction) => {
		try {
			const { url, quality } = await validateRequest(req);
			const { stream, info } = await this.videoService.getVideoStream(url, quality);
			res.header('Content-Type', 'video/mp4');
			res.header('Content-Disposition', `attachment; filename="${VideoService.sanitizeFilename(info.title)}.mp4"`);
			res.header('Cache-Control', 'no-store, max-age=0');
			stream.pipe(res);
		} catch (error) {
			next(error);
		}
	};
}