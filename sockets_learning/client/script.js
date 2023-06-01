import { io } from "socket.io-client";
const messageInput = document.querySelector("#message-input");
const roomInput = document.querySelector("#room-input");
const joinRoomButton = document.querySelector("#join-room-button");
const form = document.querySelector("#form");

const socket = io("http://localhost:3000");

socket.on("connect", () => {
  displayMessage(`You are connect with -> ${socket.id}`);
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const message = messageInput.value;
  const room = roomInput.value;
  console.log(message);
  socket.emit("send-message", message, room);
  messageInput.value = "";
});

joinRoomButton.addEventListener("click", (e) => {
  const room = roomInput.value;
  socket.emit("join-room", room, (info) => {
    displayMessage(info);
  });
});

socket.on("recieve-message", (message) => {
  displayMessage(message);
});

function displayMessage(message) {
  const div = document.createElement("div");
  div.textContent = message;
  document.querySelector("#message-container").append(div);
}
