var socket = io();

var lblTicket1 = $("#lblTicket1");
var lblTicket2 = $("#lblTicket2");
var lblTicket3 = $("#lblTicket3");
var lblTicket4 = $("#lblTicket4");

var lblEscritorio1 = $("#lblEscritorio1");
var lblEscritorio2 = $("#lblEscritorio2");
var lblEscritorio3 = $("#lblEscritorio3");
var lblEscritorio4 = $("#lblEscritorio4");

var lblTickets = [lblTicket1, lblTicket2, lblTicket3, lblTicket4];
var lblEscritorios = [
  lblEscritorio1,
  lblEscritorio2,
  lblEscritorio3,
  lblEscritorio4
];

socket.on("connect", function() {
  console.log("Conectado al servidor");
});

socket.on("disconnect", function() {
  console.log("Desconectado del servidor");
});

socket.on("estadoActual", function(data) {
  actualizaHTML(data.ultimos);
});

socket.on("ultimosTickets", function(data) {
  actualizaHTML(data.ultimos);

  var audio = new Audio("../audio/new-ticket.mp3");
  audio.play();
});

function actualizaHTML(ultimos) {
  for (var i = 0; i < ultimos.length; i++) {
    lblTickets[i].text("Ticket " + ultimos[i].numero);
    lblEscritorios[i].text("Escritorio " + ultimos[i].escritorio);
  }
}
