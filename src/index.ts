import express from 'express';

const app = express();
const port = 3000;

interface User {
	name: string;
	age: number;
}

const user: User = {
	name: 'John Doe',
	age: 30,
};

app.get('/', (req, res) => {
	res.send('Hello, TypeScript with Express!\n ' + JSON.stringify(user));
});

app.listen(port, () => {
	console.log(`Server is running on http://localhost:${port}`);
});