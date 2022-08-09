const socket = io()


socket.on('estado-actual', (payload) =>{

    const audio = new Audio('./audio/new-ticket.mp3')
    audio.play()

    payload.map((element, index) => {
        document.querySelector(`#lblTicket${index + 1}`).innerText = 'Ticket ' + element.numero
        document.querySelector(`#lblEscritorio${index + 1}`).innerText = 'Escritorio ' + element.escritorio
    })
    
})
