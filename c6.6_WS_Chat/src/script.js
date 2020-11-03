const wsUrl = "wss://echo.websocket.org/";
const mapUrl = "https://www.openstreetmap.org/#map=18";

const btnSend = document.querySelector('.j-btn-send');
const btnGeo = document.querySelector('.j-btn-geo');
const output = document.querySelector('#output');

let websocket;

// Создание поключения при загрузке DOM
window.addEventListener("DOMContentLoaded", () => {
	wsRequest();
});


// Вывод сообщениё от пользователя
function msgFromUser(msg) {
	let pre = document.createElement("p");
	pre.style.wordWrap = "break-word";
	pre.innerHTML = msg;
	pre.classList.add('user-message');
	pre.classList.add('message');
	output.appendChild(pre);
}
// Вывод сообщений от сервера
function msgFromServer(msg) {
	let pre = document.createElement("p");
	pre.style.wordWrap = "break-word";
	pre.innerHTML = msg;
	pre.classList.add('server-message');
	pre.classList.add('message');
	output.appendChild(pre);
}
// вывод служебных сообщений
function writeToScreen(message) {
	let pre = document.createElement("p");
	pre.style.wordWrap = "break-word";
	pre.innerHTML = message;
	output.appendChild(pre);
}

btnSend.addEventListener("click",() => {
	const inputMsg = document.querySelector('.j-message').value;
	console.log(inputMsg);
	msgFromUser(inputMsg);
	websocket.send(inputMsg);
});

// Запрос WebSocket
function wsRequest() {
	websocket = new WebSocket(wsUrl);
	websocket.onopen = function(evt) {
		// writeToScreen('<span class="server-message">CONNECTED' + '</span>');
		console.log("CONNECTED")
	};
	websocket.onmessage = function (evt) {
		msgFromServer(evt.data);
	};
	websocket.onerror = function(evt) {
		writeToScreen('<span style="color: red" class="server-message">ERROR: ' + evt.data + '</span>');
	};
	websocket.onclose = function (evt) {
		console.log("DISCONNECTED");
	};
};

// ====== Геолокация ======

const error = () => {
	status.textContent = "Невозможно получить ваше местоположение";
}

const success = (position) => {
	// console.log("position", position);
	const latitude = position.coords.latitude;
	const longitude = position.coords.longitude;

	// status.textContent = `Широта: ${latitude} Долгота: ${longitude}`;
	const urlLink = `${mapUrl}/${latitude}/${longitude}`;
	const urlText = "My Geoposition";
	showLink(`<a href="${urlLink}">` + urlText + '</a>');
}

btnGeo.addEventListener("click", () => {
	if(!navigator.geolocation) {
		status.textContent = "Geolocation не поддерживается вашим браузером";
	} else {
		// status.textContent = "Определение местоположения...";
		navigator.geolocation.getCurrentPosition(success, error);
	}
});

function showLink(link) {
	let pre = document.createElement("a");
	pre.style.wordWrap = "break-word";
	pre.innerHTML = link;
	pre.classList.add('user-message');
	pre.classList.add('message');
	pre.setAttribute("target", "_blank");
	output.appendChild(pre);
}

// Соединение закрывается с закрытием окна браузера
window.onbeforeunload = function () {
	websocket.close();
	websocket = null;
};