import ytdl from '@distube/ytdl-core';
import { PassThrough } from 'stream';
import { VideoInfo, VideoResponse } from '../types';

export class VideoService {
	async getVideoInfo(url: string): Promise<VideoInfo> {
		if (!ytdl.validateURL(url)) {
			throw new Error('Invalid YouTube URL');
		}
		const fullInfo = await ytdl.getInfo(url);
		return {
			title: fullInfo.videoDetails.title,
			duration: fullInfo.videoDetails.lengthSeconds,
			thumbnail: fullInfo.videoDetails.thumbnails[0]?.url || '',
		};
	}

	async getVideoStream(url: string, quality: string = 'highest'): Promise<VideoResponse> {
		if (!ytdl.validateURL(url)) {
			throw new Error('Invalid YouTube URL');
		}

		const fullInfo = await ytdl.getInfo(url);
		const stream = ytdl.downloadFromInfo(fullInfo, {
			quality,
			dlChunkSize: 0,
		}).pipe(new PassThrough());

		return {
			stream,
			info: {
				title: fullInfo.videoDetails.title,
				duration: fullInfo.videoDetails.lengthSeconds,
				thumbnail: fullInfo.videoDetails.thumbnails[0]?.url || '',
			},
		};
	}

	static sanitizeFilename(title: string): string {
		return title.replace(/[^a-z0-9]/gi, '_').slice(0, 100);
	}
}