function displayProducts(productList = products) {
  const container = document.getElementById("product-container");
  container.innerHTML = "";

  productList.forEach(product => {
    const cartItem = cart.find(item => item.id === product.id);
    const quantity = cartItem ? cartItem.quantity : 0;

    container.innerHTML += `
      <div class="product">
        <img src="${product.image}">
        <h3>${product.name}</h3>
        <p>₹${product.price}</p>

        ${
          quantity === 0
            ? `<button onclick="addToCart(${product.id}); refreshProducts();">
                Add to Cart
              </button>`
            : `
              <div class="product-qty">
                <button onclick="decreaseQuantity(${product.id}); refreshProducts();">-</button>
                <span>${quantity}</span>
                <button onclick="increaseQuantity(${product.id}); refreshProducts();">+</button>
              </div>
            `
        }
      </div>
    `;
  });
}

function refreshProducts() {
  displayProducts();
}

function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

function loadCart() {
  const storedCart = localStorage.getItem("cart");
  if (storedCart) {
    cart = JSON.parse(storedCart);
    updateCart();
  }
}

document.addEventListener("DOMContentLoaded", () => {
  displayProducts();
  loadCart();
});
function goToCheckout() {
  if (cart.length === 0) {
    alert("Cart is empty!");
    return;
  }
  window.location.href = "checkout.html";
}
function toggleCart() {
  const drawer = document.getElementById("cart-drawer");
  drawer.classList.toggle("active");
}

function searchProducts() {
  const input = document.getElementById("search-input").value.toLowerCase();

  const filtered = products.filter(product =>
    product.name.toLowerCase().includes(input)
  );

  displayProducts(filtered);
}