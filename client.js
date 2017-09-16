var http = require('http');
var express = require("express");
var RED = require("node-red");

// Create an Express app
var app = express();

app.use(cors());

// Add a simple route for static content served from 'public'
app.use("/",express.static("public"));

// Create a server
var server = http.createServer(app);

// Create the settings object - see default settings.js file for other options
var settings = {
    httpAdminRoot:"/red",
    httpNodeRoot: "/x",
    userDir:"./nr",
    flowFile:"miservidor.json",
    functionGlobalContext: { },    // enables global context
    httpNodeAuth: {
    	user:"kranfix",
    	pass:"$2a$08$DC8h8LYBtWn9F6b8Hsu/qeafyQFaC/i9bCRdf0JVunM4Bhugj89Ma"
    },
    adminAuth: {
	    type: "credentials",
	    users: [{
	        username: "admin",
	        password: "$2a$08$/yFK336D8w3Z51FUTxBADOKdat6xkLpir2S4mwS95RekmQPtkresK",
	        permissions: "*"
	    },
	    {
	        username: "kranfix",
	        password: "$2a$08$DC8h8LYBtWn9F6b8Hsu/qeafyQFaC/i9bCRdf0JVunM4Bhugj89Ma",
	        permissions: "*"
	    }]
	}
};

// Initialise the runtime with a server and settings
RED.init(server,settings);

// Serve the editor UI from /red
app.use(settings.httpAdminRoot,RED.httpAdmin);

// Serve the http nodes UI from /api
app.use(settings.httpNodeRoot,RED.httpNode);

server.listen(8080);

// Start the runtime
RED.start();