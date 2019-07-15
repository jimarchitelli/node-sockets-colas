const { io } = require("../server");
const { TicketControl } = require("../classes/ticket-control");

const ticketControl = new TicketControl();

io.on("connection", client => {
  client.on("siguienteTicket", (data, callback) => {
    callback(ticketControl.siguiente());
  });

  client.emit("estadoActual", {
    actual: ticketControl.getUltimoTicket(),
    ultimos: ticketControl.getUltimosTickets()
  });

  client.on("atenderTicket", (data, callback) => {
    if (!data.escritorio)
      return callback({
        err: true,
        message: "El escritorio es necesario"
      });

    let atenderTicket = ticketControl.atenderTicket(data.escritorio);

    callback(atenderTicket);

    client.broadcast.emit("ultimosTickets", {
      ultimos: ticketControl.getUltimosTickets()
    });
  });
});
