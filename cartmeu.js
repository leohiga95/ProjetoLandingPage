let carts = document.querySelectorAll('.addCart')

for (let i = 0; i < carts.length; i++) {
    carts[i].addEventListener('click', () => {
        cartNumbers(produtosJson[i-1])
        totalCost(produtosJson[i-1])
    })
}

//AO CARREGAR MANTER O CARRINHO
function onLoadCartNumbers () {
    let productNumbers = localStorage.getItem('cartNumbers')
    
    if(productNumbers) {
        document.querySelector('.myCart span').textContent = productNumbers
    }
}

// ADICIONAR AO CARRINHO
function cartNumbers(product) {
    let productNumbers = localStorage.getItem('cartNumbers')
   
    productNumbers = parseInt(productNumbers)
    
    if (productNumbers) {
        localStorage.setItem('cartNumbers', productNumbers + 1)
        document.querySelector('.myCart span').textContent = productNumbers + 1
    } else {
        localStorage.setItem('cartNumbers', 1)
       document.querySelector('.myCart span').textContent = 1
    }

    setItems(product)
}

//PRODUTOS NO BANCO
function setItems(product) {
    let cartItems = localStorage.getItem('productsInCart')
    cartItems = JSON.parse(cartItems)
   
    if (cartItems != null){
      if(cartItems[product.tag] == undefined){
        cartItems = {
          ...cartItems,
          [product.tag]:product
        }
      }
      cartItems[product.tag].inCart += 1 
    } else {
        product.inCart = 1
        cartItems = {
          [product.tag]: product  
        }
    }
localStorage.setItem('productsInCart', JSON.stringify (cartItems))
}
 
  
function totalCost(product) {
  let cartCost = localStorage.getItem('totalCost')
  
  
  if(cartCost != null) {
    cartCost = parseInt(cartCost)
    localStorage.setItem('totalCost', cartCost + product.price)
  } else {
      localStorage.setItem('totalCost', product.price)
  }
}  

function displayCart () {
    let cartItems = localStorage.getItem('productsInCart')
    cartItems = JSON.parse(cartItems)
    let productContainer = document.querySelector('.products')
    let cartCost = localStorage.getItem('totalCost')
    
    if(cartItems && productContainer) {
        productContainer.innerHTML = ''
        Object.values(cartItems).map(item => {
            productContainer.innerHTML += `
            <div class="products">
                <div class="infoProduct">
                  <img src="${item.img}">
                  <span>${item.name}</span>                  
                </div>              
                <div class="quantity">
                  <button>
                    <ion-icon onclick="changeNumberInCart('minus', ${item.id})" name="remove-circle-outline"></ion-icon>
                  </button>  
                  <span id="numeroItensCarrinho">${item.inCart}</span>
                  <button>
                    <ion-icon onclick="changeNumberInCart('plus', ${item.id})" name="add-circle-outline"></ion-icon>
                  </button>  
                </div>  
                <div class="total">
                    $${item.inCart * item.price},00
                </div>  
            </div>    
                       
            `
        })
        
        productContainer.innerHTML += `
            <div class="cestaTotalContainer">
                <h4 class="cestaTotalTitle">
                    Preço Total
                </h4>
                <h4 class="cestaTotal">
                    R$${cartCost},00 
                </h4>       
        `
    }
}

//MUDAR O NUMERO DE ITENS NO CARRINHO
function changeNumberInCart(action, id) {
  carts = produtosJson.map((item) => {
    
    let inCart = item.inCart

    console.log(item.id, id)

    if(item.id === id){
      if(action === "minus" && inCart > 1){
        inCart--
      } else if (action === 'plus') {
        inCart++
      }
    }
    
    return {
      ...item,
      inCart,
    }
  }) 
  displayCart()     
}

onLoadCartNumbers()
displayCart()
