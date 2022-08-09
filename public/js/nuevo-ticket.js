const socket = io()

const lblNuevoTicket = document.querySelector('#lblNuevoTicket')
const button = document.querySelector('button')

socket.on('connect', () =>{
    button.disable = false
})

socket.on('disconnect', () =>{
    button.disable = true
})

socket.on('ultimo-ticket', (dato)=>{
    lblNuevoTicket.innerText = 'Ticket ' + dato
})

button.addEventListener('click', () =>{
    socket.emit('siguiente-ticket', null, (ticket) =>{
        lblNuevoTicket.innerText = ticket
    })
})