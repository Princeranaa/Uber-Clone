const http = require('http');
const app = require('./app');

// port import 
const PORT = process.env.PORT || 3000;

const server = http.createServer(app)

server.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);  // log the server is running on the specified port
 
});
