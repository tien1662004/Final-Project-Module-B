let cart = JSON.parse(localStorage.getItem("cart")) || [];

const cartBody = document.getElementById("cartBody");
const totalPriceEl = document.getElementById("totalPrice");
const checkoutBtn = document.getElementById("checkoutBtn");

function renderCart() {
  cartBody.innerHTML = "";
  let total = 0;

  if (cart.length === 0) {
    cartBody.innerHTML = `
      <tr>
      <td colspan="5" style="text-align:center;">Giỏ hàng trống</td>
      </tr>
    `;
    totalPriceEl.innerText = "0đ";
    return;
  }

  cart.forEach((item, index) => {
    const itemTotal = item.price * item.quantity;
    total += itemTotal;

    cartBody.innerHTML += `
      <tr>
        <td>${item.name}</td>
        <td>${item.price.toLocaleString()}đ</td>
        <td>
          <button onclick="changeQty(${index}, -1)">-</button>
          ${item.quantity}
          <button onclick="changeQty(${index}, 1)">+</button>
        </td>
        <td>${itemTotal.toLocaleString()}đ</td>
        <td class="remove" onclick="removeItem(${index})">✖</td>
      </tr>
    `;
  });

  totalPriceEl.innerText = total.toLocaleString() + "đ";
}

function changeQty(index, delta) {
  cart[index].quantity += delta;
  if (cart[index].quantity <= 0) cart.splice(index, 1);
  saveCart();
}

function removeItem(index) {
  cart.splice(index, 1);
  saveCart();
}

function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
}

checkoutBtn.onclick = () => {
  if (cart.length === 0) {
    alert("Giỏ hàng đang trống!");
    return;
  }
  window.location.href = "./checkout.html";
};

renderCart();
