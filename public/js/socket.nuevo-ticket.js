var socket = io();

let lblNevoTicket = $('#lblNuevoTicket');

socket.on('connect', function() {
    console.log('Conectado al servidor');
});

socket.on('disconnect', function() {
    console.log('Desconectado del servidor');
});


socket.on('estadoActual', function(resp) {
    lblNevoTicket.text(resp.actual);
});

$('button').on('click', function() {
    socket.emit('siguienteTicket', null, function(siguienteTicket) {
        lblNevoTicket.text(siguienteTicket);
    });
});
