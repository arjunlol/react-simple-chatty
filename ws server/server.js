// server.js

const express = require('express');
const SocketServer = require('ws').Server;
const uuidV1 = require('uuid/v1') //generate aV! UUID (time based)

// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer({ server });
let counter = 0; //counter keeps track of online users
const color = ["blue", "red", "green", "yellow"]; //color that will be randomly assigned to a user

const broadcast = (msg) => {
  console.log(msg)
  wss.clients.forEach((c) => {
    // if(c != client) {
      c.send(JSON.stringify(msg));
    // }
  })
}


// When a client connects they are assigned a socket, represented by
// the client parameter in the callback.
wss.on('connection', (client, req) => {
  console.log('Client connected');
  counter += 1;
  updateCount(counter);
  client['color'] = (color[getRandomInt(0,3)]) //set random color for client
  client.send(JSON.stringify({type: "color", color: client.color})) //send client color

  //callback for when client send msg to the server
  client.on('message', (msg) => {
    msgData = JSON.parse(msg)
    if (matches = msgData.contents.match(/(\S+).(jpg|png|gif)/ig)) { //match any url that has .jpg/.png/.gif
      for (let i = 0; i < matches.length; i++) { //loop through all regex matches
        msgData.contents = msgData.contents.replace(matches[i], "")
        msgData.contents += `<img src="${matches[i]}" referrer="Arjun.com" width="40%"/><br>` //want the images at the end of the content
      }
    }
    handleMessage(msgData);
  })

  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  client.on('close', () => {
    console.log('Client disconnected')
    counter -= 1;
    updateCount(counter);
  });
});

const updateCount = (count) => {
  wss.clients.forEach((c) => {
    c.send(JSON.stringify({type: "count", counter: count}))
  })
}

const getRandomInt = (min, max) => { //used to randomly pick a color
  return Math.floor(Math.random() * (max - min + 1)) + min;
}


const handleMessage = (msgData) => {
  //handle notifications and messages differently
  switch(msgData.type){
    case "postMessage":
      //handles message
      msgData['key'] = uuidV1();
      msgData['type'] = "incomingMessage" //change type for broadcast
      broadcast(msgData)
      break;
    case "postNotification":
      //handles notification
      msgData['type'] = 'incomingNotification'
      broadcast(msgData);
      break;
    default:
    //if unknown type
    throw new Error("Unknown event type" + data.type)
  }
}