// GUARDANDO EN CONSTANTES LOS ELEMENTOS PARA EL DRAG AND DROP
const boxPaterns = document.getElementById('box-paterns')
const dropZone = document.getElementById('drop-zone')
const checkoutButton = document.getElementById('checkout')


// ESCUCHAR EL EVENTO Y PASARLE UNA FUNCION PARA LOCALIZAR LOS ELEMENTOS POR SEPARADO Y METERLOS EN CONSTANTES
boxPaterns.addEventListener('dragstart', onDragStart)

function onDragStart(event) {
    event
    .dataTransfer
    .setData('text/plain', event.target.id);
}

function onDragOver(event) {
    event.preventDefault();
}

function onDrop(event) {
	
	const id = event.dataTransfer.getData('text');
		
	const paternSelected = document.getElementById(id).closest('.patern');
	const paternSelectedTitle = paternSelected.querySelector('.patern-title').textContent
	const paternSelectedPrice = paternSelected.querySelector('.patern-price').textContent
	const paternSelectedImage = paternSelected.querySelector('.patern-image').src

	// cuando termina de localizar los elementos realizar una funcion para agregar el html 
	addPaternToCart(paternSelectedTitle, paternSelectedPrice, paternSelectedImage)

	event.dataTransfer.clearData();
}




function addPaternToCart(paternSelectedTitle, paternSelectedPrice, paternSelectedImage){
    const paternCart = document.createElement('div')
    // Creando el HTML para insertar 
    const paternCartContent = `
        <div class="patern-drop">
            <img src=${paternSelectedImage}>
            <h3>${paternSelectedTitle}</h3>
            <h4 class="patern-drop-price">${paternSelectedPrice}</h4>
            <button class="delete" type="button">X</button>      
        </div>`

    paternCart.innerHTML = paternCartContent
	
	
    dropZone.append(paternCart)    

    paternCart.querySelector('.delete').addEventListener('click', removePatern)

    updateSubtotal()
}

// FUNCION PARA ACTUALIZAR EL SUBTOTAL

function updateSubtotal(){
    let subtotal = 0
    const cartSubtotal = document.getElementById('subtotal')
    const cartPaternsSelected = document.querySelectorAll('.patern-drop')
    
    cartPaternsSelected.forEach((cartPaternSelected) => {
        const cartPaternSelectedPriceElement = cartPaternSelected.querySelector('.patern-drop-price')
        
        const cartPaternSelectedPrice = Number(cartPaternSelectedPriceElement.textContent.replace('€', ''))
        
        subtotal = subtotal + cartPaternSelectedPrice
    })

    cartSubtotal.innerHTML = `${subtotal.toFixed(2)}€`
}

// FUNCION PARA ELIMINAR UNA PATERN DENTRO DEL CARRO

function removePatern(e){
    const buttonclicked = e.target 
    buttonclicked.closest('.patern-drop').remove()
    updateSubtotal()
}


// FINALIZAR COMPRA

checkoutButton.addEventListener('click', (e) =>{
    alert('¡Gracias por su compra!')
    cleanCart()
})

function cleanCart(){
    dropZone.innerHTML = ''
    updateSubtotal()
}







