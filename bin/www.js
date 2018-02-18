import http from 'http';
import app from '../app'; // The express app we just created

const port = parseInt(process.env.PORT, 10) || 8000;
app.set('port', port);

const server = http.createServer(app);
server.listen(port, () => {
  console.log('Server listening on port', port);
});
export default app;
