const socket = io()
const titulo = document.querySelector('h1')
const button = document.querySelector('button')
const alert = document.querySelector('.alert')
const small = document.querySelector('small')
const lblPendientes = document.querySelector('#lblPendientes')
const searchParams = new URLSearchParams(window.location.search)

if(!searchParams.has('escritorio')){
    window.location = "index.html"
    throw new Error('El escritorio es obligatorio')
}
const escritorio = searchParams.get('escritorio')
titulo.innerText += ' ' + escritorio

socket.on('connect', () =>{
    button.disabled = false
})

socket.on('disconnect', () =>{
    button.disabled = true
})
alert.style.display = 'none'

button.addEventListener('click', () =>{

    socket.emit('obtener-ticket', ({escritorio}), ({ok, ticket, msg, cola}) =>{
        console.log(cola);
        if (!ok) {
            small.innerText = 'Nadie'
            alert.style.display = 'block'
            lblPendientes.innerText = ''
        }
        if(cola == 0){
            alert.style.display = 'block'
            lblPendientes.innerText = ''
        }
        else{
            lblPendientes.innerText = cola    
        }
        small.innerText = 'Ticket ' + ticket.numero
        
        
        
    })
})
socket.on('tickets-pendientes', (data) =>{
    if (data == 0) {
        alert.style.display = 'block'
        lblPendientes.innerText = ''
    }
    else{
        alert.style.display = 'none'
        lblPendientes.innerText = data
    }
    
    
})