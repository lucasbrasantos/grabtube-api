import dotenv from 'dotenv';
import express from 'express';
import statusMonitor from 'express-status-monitor';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import errorHandler from './middlewares/errorHandler';
import routes from './routes';
import cors from 'cors';

dotenv.config();

const app = express();

// Cors
app.use(cors({
	origin: (origin, callback) => {
		// Allow requests with no origin (e.g., curl, Postman)
		if (!origin) return callback(null, true);

		// Allow local development
		if (origin === 'http://localhost:3000') {
			return callback(null, true);
		}

		// Allow any *.vercel.app domain
		if (origin.endsWith('.vercel.app')) {
			return callback(null, true);
		}

		// Reject other origins
		callback(new Error(`CORS policy: Origin ${origin} not allowed`));
	},
	methods: ['GET'], // Allow GET and POST
	allowedHeaders: ['Content-Type'], // Allow Content-Type header
}));

// Middleware
app.use(express.json());

// Status monitor at /status
app.use(statusMonitor());

// Root page
app.get('/', (req, res) => {
	const uptime = process.uptime();
	res.send(`
    <html>
      <head>
        <title>Grabtube Backend</title>
        <style>
          body { font-family: Arial, sans-serif; text-align: center; padding: 20px; }
          h1 { color: #333; }
          p { color: #666; }
          ul { list-style-type: none; padding: 0; }
          li { margin: 10px 0; }
          a { text-decoration: none; color: #007bff; font-weight: bold; }
          a:hover { text-decoration: underline; }
          .button { display: inline-block; padding: 10px 20px; background-color: #007bff; color: #fff; border-radius: 5px; text-decoration: none; }
          .button:hover { background-color: #0056b3; }
        </style>
      </head>
      <body>
        <h1>Grabtube Backend</h1>
        <p>Server is running for ${uptime.toFixed(2)} seconds</p>
        <h2>API Endpoints</h2>
        <ul>
          <li><a href="/api/videos/info?url=example" class="button">Get Video Info</a></li>
          <li><a href="/api/videos/download?url=example" class="button">Download Video</a></li>
        </ul>
        <p><a href="/status" class="button">View Detailed Status</a></p>
        <p><a href="/api-docs" class="button">View API Documentation</a></p>
      </body>
    </html>
  `);
});

// Swagger documentation
const swaggerOptions = {
	definition: {
		openapi: '3.0.0',
		info: {
			title: 'Grabtube API',
			version: '1.0.0',
		},
	},
	apis: ['./src/routes/*.ts'],
};
const swaggerSpec = swaggerJSDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Routes
routes.forEach((route) => {
	app.use(`/api${route.path}`, route.router);
});

// Error handling middleware
app.use(errorHandler);

export default app;