/*
    Jose Javier Jo Escobar, 14343
    Laboratorio #4  Chat Simple
*/
// Funcion GET que obtiene un array con la informacion de los mensaje del servidor 
function getChats() {
    fetch('http://34.210.35.174:7000')
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            console.log(data);
            //Organizador de datos
            var chat = document.getElementById("chat-area");
            while (chat.firstChild) {
                chat.removeChild(chat.firstChild);
            }
            for (var i = 0; i < data.length; i++) {
                var div = document.createElement("div");
                div.classList.add("messages");
                var node = document.createTextNode(data[i].nick + " " + data[i].student_id + ": "+data[i].text);
                //div.classList.add("bold-text");
                div.appendChild(node);

                // Si tiene urls el texto lo revisamos con el regex
                var urls = ReadURL(data[i].text);

                if (urls.length > 0) {
                    for (var o = 0; o < urls.length; o++) {
                        var url = urls[o];
                        var frame = document.createElement("iframe");
                        frame.setAttribute("id", url);
                        frame.setAttribute("src", url);
                        frame.style.marginTop = "10px";
                        frame.style.borderRadius = "20px";

                        div.appendChild(frame);
                    }
                }

                chat.appendChild(div);
            }
})
}

// Funcion POST enviando mis mensajes con mi id y mi nick y agregando el texto escrito
function sendMessage() {
    var student_id = "14343";
    var nick = "Chinitoveloxxx";
    var text = document.getElementById("text-box").value;

    if (student_id === "" || nick === "" || text === "") {
        // Campo Vacio
        alert("Algun campo esta vacio, porfavor llenarlo");
    } else {
        // Si no tiene campos vacios se revisa la longitud del texto que sea <140
        if (text.length <= 140) {
            console.log('Enviando mensaje.....');
            // POST request
            var fd = new FormData();

            fd.append("student_id", student_id);
            fd.append("text", text);
            fd.append("nick", nick);

            var request = new XMLHttpRequest();
            request.open("POST", "http://34.210.35.174:7000");
            request.send(fd);
            // Actualizacion de chats
            getChats();

        } else {
            // ALERTA tiene mas de 140 caracteres
            alert("El texto que desea enviar tiene mas de 140 caracteres.")
        }
    }    
}

// checks if there are any urls inside text. Returns an array of found urls.
function ReadURL(text) {
    var texts = (text || '').toString();
    var regex = /(https?:\/\/[^\s]+)/g;
    var URLS = [];
    var URL;
    var match = [];

    while ((match = regex.exec(texts)) !== null) {
        var URLmatch = match[0];
        URLS.push(URLmatch);
    }
    return URLS;
}

