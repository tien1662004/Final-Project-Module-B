const api = "https://api-class-o1lo.onrender.com/api/tien";

const user = JSON.parse(localStorage.getItem("user"));
const cart = JSON.parse(localStorage.getItem("cart")) || [];

const orderList = document.getElementById("orderList");
const totalPriceEl = document.getElementById("totalPrice");
const checkoutForm = document.getElementById("checkoutForm");
const errors = document.querySelectorAll(".error");

// 🔐 BẮT BUỘC ĐĂNG NHẬP
if (!user) {
  alert("Bạn cần đăng nhập để thanh toán");
  window.location.href = "../auth/login.html";
}

// 🛒 KIỂM TRA GIỎ HÀNG
if (cart.length === 0) {
  alert("Giỏ hàng trống");
  window.location.href = "../index.html";
}

// HIỂN THỊ ĐƠN HÀNG
let total = 0;
cart.forEach((item) => {
  total += item.price * item.quantity;
  orderList.innerHTML += `
    <div class="order-item">
      <span>${item.name} x ${item.quantity}</span>
      <span>${(item.price * item.quantity).toLocaleString()}đ</span>
    </div>
  `;
});
totalPriceEl.innerText = total.toLocaleString() + "đ";

// SUBMIT THANH TOÁN
checkoutForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  errors.forEach((e) => (e.innerText = ""));

  const name = document.getElementById("name").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const address = document.getElementById("address").value.trim();

  let valid = true;

  if (!name) {
    errors[0].innerText = "Vui lòng nhập họ tên";
    valid = false;
  }
  if (!phone) {
    errors[1].innerText = "Vui lòng nhập số điện thoại";
    valid = false;
  }
  if (!address) {
    errors[2].innerText = "Vui lòng nhập địa chỉ";
    valid = false;
  }

  if (!valid) return;

  try {
    await axios.post(
      `${api}/orders`,
      {
        userId: user.id,
        items: cart,
        total,
        name,
        phone,
        address,
      },
      {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }
    );

    alert("Thanh toán thành công 🎉");
    localStorage.removeItem("cart");
    window.location.href = "../index.html";
  } catch (err) {
    alert("Thanh toán thất bại");
    console.error(err);
  }
});
