const cart = JSON.parse(localStorage.getItem("cart")) || [];
const container = document.getElementById("checkout-items");
const totalElement = document.getElementById("checkout-total");

let total = 0;

cart.forEach(item => {
  total += item.price * item.quantity;

  container.innerHTML += `
    <div>
      <p>${item.name} x ${item.quantity}</p>
      <p>₹${item.price * item.quantity}</p>
    </div>
  `;
});

totalElement.textContent = total;

function placeOrder() {
  alert("Order Placed Successfully!");
  localStorage.removeItem("cart");
  window.location.href = "index.html";
}