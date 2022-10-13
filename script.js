//let carrinhoCompra = 0

produtosJson.map((item, index) => {
    let productsItem = document.querySelector('.productsItem').cloneNode(true)
      
    document.querySelector('.productsArea').append(productsItem)
    

    // preenchimento de dados dos produtos no index
    productsItem.querySelector('.productsItemImg img').src = item.img
    productsItem.querySelector('.productsItemName').innerHTML = item.name
    productsItem.querySelector('.productsItemDesc').innerHTML = item.description
    productsItem.querySelector('.productsItemPrice').innerHTML = `R$ ${item.price.toFixed(2)}`
    
    //produto clicado  
    productsItem.querySelector('.productsItem a').addEventListener('click', (e) => {
        e.preventDefault()
        // carrinhoCompra++
        //document.getElementById('carrinhoCompra').innerHTML = carrinhoCompra
        
    //abrir janela modal
        document.querySelector('.modalProductsBody').style.display = 'flex'
       
     //preenchimento dos dados da modal
        document.querySelector('.productsModal img').src = item.img
        document.querySelector('.productsInfo h1').innerHTML = item.name
        document.querySelector('.productsInfo-actualPrice').innerHTML = `R$ ${item.price.toFixed(2)}`    
        closeAutomatic()  
})

    //Fechar Modal
    document.querySelector('.closeModal').addEventListener('click', () => {
        document.querySelector('.modalProductsBody').style.display = 'none'
    }) 
})
  
//fechar modal automaticamente
function closeAutomatic(){
    setTimeout( function(){
    document.querySelector('.modalProductsBody').style.display = 'none'
    }, 1500 )
  }


  