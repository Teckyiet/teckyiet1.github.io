const itemID = [];
const imageUrl = [];
const itemTitle = [];
const itemPrice = [];
const orderQuantity = [];

for (let i = 0; i < 100; i++){

    if (typeof (localStorage.getItem('item image ' + i)) === 'string'){

        itemID.push(localStorage.getItem('item ID ' + i))
        imageUrl.push(localStorage.getItem('item image ' + i))
        itemTitle.push(localStorage.getItem('order item ' + i))
        itemPrice.push(localStorage.getItem('price of item ' + i))
        orderQuantity.push(localStorage.getItem('order quantity ' + i))
    }
}


window.addEventListener('load', ()=> {

    for(let i = 0; i < imageUrl.length; i++){
        addInCart(imageUrl[i], itemTitle[i], itemPrice[i], orderQuantity[i])
    }

    const increaseBtn = document.querySelectorAll('.stepupbtn')
    const decreaseBtn = document.querySelectorAll('.stepdownbtn')
    const removeBtn = document.querySelectorAll('.remove-btn')
    
    updateCartTotal()
    
    increaseBtnFx(increaseBtn)

    decreaseBtnFx(decreaseBtn)

    removeBtnFx(removeBtn)

    purchaseFx()
})


/* --------------------------- addInCart Fucntion --------------------------- */
const addInCart = (itemImage, itemName, itemPrice, itemQuantity) =>{
    const cartWrapper = document .querySelector('.cart-content-wrapper')
    const newItemDiv = document.createElement('div')

    newItemDiv.classList = "cart-item-list cart-row"
    
    const newItem = `          
                    <div class="item-image column-1">
                        <img src="${itemImage}" alt="" />
                        <div class="item-name">${itemName}</div>
                    </div>
                    <div class="item-price column-2">${itemPrice}</div>
                    <div class="item-order-quantity column-3">
                        <div class="quantity-details">
                            <button class="quantity-btn stepdownbtn">-</button>
                            <input type="number" value="${itemQuantity}"/>
                            <button class="quantity-btn stepupbtn">+</button>
                        </div>
                        <button class="remove-btn">Remove</button>
                    </div>`
    
    newItemDiv.innerHTML = newItem
    cartWrapper.append(newItemDiv)
}


/* -------------------------- quantity step up btn -------------------------- */
const increaseBtnFx = (input) =>{
    const quantityDisplay = document.querySelectorAll('.quantity-details input')

    for (let i = 0; i < input.length; i++){

        input[i].addEventListener('click', ()=>{            
            quantityDisplay[i].value++

            targetItemID = localStorage.getItem('item ID ' + itemID[i])
            localStorage.setItem('order quantity ' + targetItemID, quantityDisplay[i].value)

            updateCartTotal()
        })
    }
}


/* ------------------------- quantity step down btn ------------------------- */
const decreaseBtnFx = (input) =>{
    const quantityDisplay = document.querySelectorAll('.quantity-details input')

    for (let i = 0; i < input.length; i++){

        input[i].addEventListener('click', ()=>{
           if (quantityDisplay[i].value > 1){
            quantityDisplay[i].value--

            targetItemID = localStorage.getItem('item ID ' + itemID[i])
            localStorage.setItem('order quantity ' + targetItemID, quantityDisplay[i].value)
            
            updateCartTotal()
           }else{
               return
           }
        })
    }
}


/* ----------------------------- item remove btn ---------------------------- */
const removeBtnFx = (removeBtn) =>{
    let numOfItems = removeBtn.length;

    for(let i = 0; i < removeBtn.length; i++){

        removeBtn[i].addEventListener('click', (event)=>{

            if(numOfItems > 1){

                dataRemoving(itemID, i)

                event.target.parentElement.parentElement.classList.add('cart-cart')
                setTimeout(()=>event.target.parentElement.parentElement.remove(), 1000)

                setTimeout(()=>{
                
                    updateCartTotal()}, 1100)

                    numOfItems -= 1
            }else{
                alert('Are you sure you want to remove the last item?')
            }
        })
    }
}


/* ---------------------------- update cart total --------------------------- */
const updateCartTotal = () =>{
    let numberTotal = '';

    const quantityDisplay = document.querySelectorAll('.quantity-details input')
    const pricePerItem = document.querySelectorAll('.item-price')
    const cartTotal = document.querySelector('.cart-total-price')

    for (let i = 0; i < pricePerItem.length; i++){
        numberPrice = parseFloat(pricePerItem[i].innerText.replace('$', ''))
        numberQuantity = parseFloat(quantityDisplay[i].value)
        
        numberTotal =+ numberTotal + (numberPrice*numberQuantity)
        numberTotal = (Math.floor(numberTotal * 1000)/1000).toFixed(2)
    }

    cartTotal.innerText = '$' + numberTotal
}


const purchaseFx = () =>{
    const purchaseBtn = document.querySelector('.purchase-btn button a')

    purchaseBtn.addEventListener('click', ()=>{
        alert('Thank you for your order. Delivery shall be done in a jiffy =D')
    })
}




/* -----------------------------data-storing ---------------------------- */
let dataStoring = (index) => {
    localStorage.setItem('item ID ' + index, index)
    localStorage.setItem('item image ' + index, itemUrl[index])
    localStorage.setItem('order item ' + index, itemTitle[index].innerHTML)
    localStorage.setItem('price of item ' + index, itemPrice[index].innerHTML)
    localStorage.setItem('order quantity ' + index, itemOrderQuantity[index].value)
}

/* ------------------------------ data-removing ----------------------------- */
let dataRemoving = (itemID, index) =>{
    window.localStorage.removeItem('item ID ' + itemID[index])
    window.localStorage.removeItem('item image ' + itemID[index])
    window.localStorage.removeItem('order item ' + itemID[index])
    window.localStorage.removeItem('price of item ' + itemID[index])
    window.localStorage.removeItem('order quantity ' + itemID[index])
}
