document.addEventListener("DOMContentLoaded",()=>{
    const productForm=document.getElementById("product-form")
    const productCards=document.getElementById("product-cards")
    const salesList=document.getElementById("sales-list")
    const totalSalesDisplay=document.getElementById("total-sales")

   let products=[]
   let totalSales=0

   //Manejamos el envio del formulario
   productForm.addEventListener("submit",(e)=>{
    e.preventDefault()
      const name= document.getElementById("product-name").value
      const price=parseFloat(document.getElementById("product-price").value)
      const image=document.getElementById("product-image").files[0]
       
      if(name&&price&&image){
         const imageUrl=URL.createObjectURL(image)
         products.push({name,price,image:imageUrl})
         renderProducts()
         productForm.reset()
      }
    });
    //Renderizamos los productos
    function renderProducts(){
        productCards.innerHTML=""
        products.forEach((product,index)=>{
            const card=document.createElement("div")
            card.className="card"

            card.innerHTML=`
              <img src="${product.image}" alt="${product.name}">
              <h4>${product.name}</h4>
              <p>$${product.price.toFixed(2)}</p>
              <button class="edit" onClick="editProduct(${index})">Editar</button>
              <button class="delete" onClick="deleteProduct(${index})">Eliminar</button>
              <button class="sold" onClick="sellProduct(${index})">Vender</button>

            
            `;
            productCards.appendChild(card);
        })
    }
    //Eliminar Producto
    window.deleteProduct=(index)=>{
       products.splice(index,1);
       renderProducts()
    };
    //Editar el producto
    window.editProduct=(index)=>{
        const newName=prompt("Nuevo Nombre:", products[index].name);
        const newPrice=parseFloat(prompt("Nuevo Precio:",products[index].price))
        if(newName && newPrice)
        {
            products[index].name=newName
            products[index].price=newPrice
            renderProducts()
        }
    };

    //Vender Producto

    window.sellProduct=(index)=>{
        const product=products[index]
        totalSales +=products.price

        const soldItem=document.createElement("li")
        soldItem.textContent=`${product.name} - $${products.price.toFixed(2)}`
        salesList.appendChild(soldItem)
        
        products.splice(index,1)
        renderProducts()
        totalSalesDisplay.textContent=totalSales.toFixed(2)
    }
})