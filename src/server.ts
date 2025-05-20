import http from 'http';
import app from './app';
import ngrok from '@ngrok/ngrok';

const PORT = process.env.PORT || 3000;

const server = http.createServer(app);

app.get('/', (req, res) => {
	res.send('Hello, World!');
});

server.listen(PORT, () => {
	console.log(`Server is running on http://localhost:${PORT}`);
});

ngrok.connect({ addr: PORT, authtoken_from_env: true })
	.then(listener => console.log(`Ingress established at: ${listener.url()}`));