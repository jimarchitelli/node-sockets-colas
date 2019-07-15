var socket = io();
var searchParams = new URLSearchParams(window.location.search);
var small = $('small');

if (!searchParams.has('escritorio'))
{
    window.location = 'index.html';
    throw new Error('El escritorio es necesario');
} 

var escritorio = searchParams.get('escritorio');
$('h1').text('Escritorio ' + escritorio);


$('button').on('click', function() {
    socket.emit('atenderTicket', { escritorio: escritorio }, function(atenderTicket) {

        if (atenderTicket === 'No hay más tickets')
        {
            alert(atenderTicket);
            small.text(atenderTicket);    
            return;
        }                

        small.text('Ticket' + atenderTicket.numero);      
    });
});