let cart = [];

function addToCart(productId) {
  const product = products.find(p => p.id === productId);
  const existing = cart.find(item => item.id === productId);

  if (existing) {
    existing.quantity++;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  updateCart();
  saveCart();
}

function increaseQuantity(productId) {
  const item = cart.find(p => p.id === productId);
  if (item) {
    item.quantity++;
    updateCart();
    saveCart();
  }
}

function decreaseQuantity(productId) {
  const item = cart.find(p => p.id === productId);
  if (item && item.quantity > 1) {
    item.quantity--;
  } else {
    removeItem(productId);
    return;
  }
  updateCart();
  saveCart();
}

function removeItem(productId) {
  cart = cart.filter(item => item.id !== productId);
  updateCart();
  saveCart();
}

function updateCart() {
  const cartItems = document.getElementById("cart-items");
  const cartCount = document.getElementById("cart-count");
  const cartTotal = document.getElementById("cart-total");

  cartItems.innerHTML = "";

  let total = 0;
  let count = 0;

  cart.forEach(item => {
    total += item.price * item.quantity;
    count += item.quantity;

    cartItems.innerHTML += `
      <div class="cart-item">
        <p>${item.name}</p>
        <div class="qty-controls">
          <button onclick="decreaseQuantity(${item.id})">-</button>
          <span>${item.quantity}</span>
          <button onclick="increaseQuantity(${item.id})">+</button>
        </div>
        <p>₹${item.price * item.quantity}</p>
        <button class="remove-btn" onclick="removeItem(${item.id})">
          Remove
        </button>
      </div>
    `;
  });

  cartCount.textContent = count;
  cartTotal.textContent = total;
  refreshProducts();
}