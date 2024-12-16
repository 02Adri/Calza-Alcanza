document.addEventListener("DOMContentLoaded", () => {
    const productForm = document.getElementById("product-form");
    const productCards = document.getElementById("product-cards");
    const salesList = document.getElementById("sales-list");
    const totalSalesDisplay = document.getElementById("total-sales");
  
    let products = JSON.parse(localStorage.getItem("products")) || [];
    let totalSales = parseFloat(localStorage.getItem("totalSales")) || 0;
  
    // Renderizar al cargar
    renderProducts();
    renderSales();
  
    // Manejar el envío del formulario
    productForm.addEventListener("submit", (e) => {
      e.preventDefault();
  
      const name = document.getElementById("product-name").value;
      const price = parseFloat(document.getElementById("product-price").value);
      const image = document.getElementById("product-image").files[0];
  
      if (name && price && image) {
        const imageUrl = URL.createObjectURL(image);
        products.push({ name, price, image: imageUrl });
        saveToLocalStorage();
        renderProducts();
        productForm.reset();
      }
    });
  
    // Guardar productos y ventas en Local Storage
    function saveToLocalStorage() {
      localStorage.setItem("products", JSON.stringify(products));
      localStorage.setItem("totalSales", totalSales.toFixed(2));
    }
  
    // Renderizar productos
    function renderProducts() {
      productCards.innerHTML = "";
      products.forEach((product, index) => {
        const card = document.createElement("div");
        card.className = "card";
  
        card.innerHTML = `
          <img src="${product.image}" alt="${product.name}">
          <h4>${product.name}</h4>
          <p>$${product.price.toFixed(2)}</p>
          <button class="edit" onclick="editProduct(${index})">Editar</button>
          <button class="delete" onclick="deleteProduct(${index})">Eliminar</button>
          <button class="sold" onclick="sellProduct(${index})">Vender</button>
        `;
  
        productCards.appendChild(card);
      });
    }
  
    // Renderizar ventas
    function renderSales() {
      salesList.innerHTML = ""; // Limpiar la lista
      const sales = JSON.parse(localStorage.getItem("sales")) || [];
      sales.forEach(({ name, price }) => {
        const soldItem = document.createElement("li");
        soldItem.textContent = `${name} - $${price.toFixed(2)}`;
        salesList.appendChild(soldItem);
      });
      totalSalesDisplay.textContent = totalSales.toFixed(2);
    }
  
    // Eliminar producto
    window.deleteProduct = (index) => {
      products.splice(index, 1);
      saveToLocalStorage();
      renderProducts();
    };
  
    // Editar producto
    window.editProduct = (index) => {
      const newName = prompt("Nuevo nombre:", products[index].name);
      const newPrice = parseFloat(prompt("Nuevo precio:", products[index].price));
      if (newName && newPrice) {
        products[index].name = newName;
        products[index].price = newPrice;
        saveToLocalStorage();
        renderProducts();
      }
    };
  
    // Vender producto
    window.sellProduct = (index) => {
      const product = products[index];
      totalSales += product.price;
  
      const sales = JSON.parse(localStorage.getItem("sales")) || [];
      sales.push({ name: product.name, price: product.price });
      localStorage.setItem("sales", JSON.stringify(sales));
  
      products.splice(index, 1);
      saveToLocalStorage();
  
      renderProducts();
      renderSales();
    };
  });
  