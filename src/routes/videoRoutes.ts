import { Router } from 'express';
import { VideoController } from '../controllers/videoController';

const videoController = new VideoController();
const router = Router();

/**
 * @swagger
 * /api/videos/info:
 *   get:
 *     summary: Get video information
 *     parameters:
 *       - in: query
 *         name: url
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Video information
 *       400:
 *         description: URL is required
 */
router.get('/info', videoController.getVideoInfo);

/**
 * @swagger
 * /api/videos/download:
 *   get:
 *     summary: Download video
 *     parameters:
 *       - in: query
 *         name: url
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Video file
 *         content:
 *           video/mp4:
 *             schema:
 *               type: string
 *               format: binary
 *       400:
 *         description: URL is required
 */
router.get('/download', videoController.downloadVideo);

export default router;