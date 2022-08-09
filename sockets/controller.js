const TicketControl = require('../models/ticket-control')
const ticketcontrol = new TicketControl()

const socketController = (socket) => {
    
    socket.emit('ultimo-ticket', ticketcontrol.ultimo)
    socket.emit('estado-actual', ticketcontrol.ultimos4)

    socket.emit('tickets-pendientes', ticketcontrol.tickets.length)
    

    socket.on('siguiente-ticket', ( payload, callback ) => {
        
        callback(ticketcontrol.siguiente())
        // notificar que hay nuevo ticket pendiente
        socket.broadcast.emit('tickets-pendientes', ticketcontrol.tickets.length)
        
    })

    socket.on('obtener-ticket', ({escritorio}, callback) =>{
         if(!escritorio){
            return callback({
                ok: false,
                msg: 'Falta el escritorio'
            })
         }
         const ticket = ticketcontrol.atenderTicket(escritorio)
         socket.broadcast.emit('estado-actual', ticketcontrol.ultimos4)
         socket.broadcast.emit('tickets-pendientes', ticketcontrol.tickets.length)
         // notificar cambios en los ultimos 4
         if (!ticket) {
            return callback({
                ok: false,
                msg: 'No hay tickets disponibles'
            })   
         }
         
         
         return callback({
            ok: true,
            ticket,
            cola: ticketcontrol.tickets.length
         
         })
         
    })

}



module.exports = {
    socketController
}

