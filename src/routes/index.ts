import { Router } from 'express';
import videoRoutes from './videoRoutes';
import statusRoutes from './statusRoutes';

interface RouteConfig {
	path: string;
	router: Router;
}

const routes: RouteConfig[] = [
	{ path: '/videos', router: videoRoutes },
	{ path: '/status', router: statusRoutes },
];

export default routes;