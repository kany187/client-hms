import { io } from 'socket.io-client';

//const URL = process.env.WEB_SERVER;
const URL = 'http://localhost:4000';

export const socket = io(URL);

