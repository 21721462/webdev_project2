Instructions to start the server
- Load up the node.js command prompt
- For windows, execute the line: set DEBUG=gamenode:* & npm start
- For linux/mac, execute the line: DEBUG=gamenode:* npm start
- Then load: http://localhost:3000/ in your browser
- To stop the server, press Ctrl+C in the command prompt

I installed a module to help with development. It automatically
restarts the server whenever it detects a file change, so you
don't have to constantly stop and start it.

To run this feature execute the command:
- For windows: set DEBUG=gamenode:* & npm run devstart
- For linux/mac: DEBUG=gamenode:* & npm run devstart
