import { Router } from 'express';
import { StatusController } from '../controllers/statusController';

const router = Router();
const statusController = new StatusController();

/**
 * @swagger
 * /api/status/ping:
 *   get:
 *     summary: Check if the server is running
 *     responses:
 *       200:
 *         description: Server is running
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 timestamp:
 *                   type: string
 *                   format: date-time
 */
router.get('/ping', statusController.ping);

export default router;