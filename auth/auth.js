const navAuth = document.getElementById("navAuth");
const user = JSON.parse(localStorage.getItem("user"));

// console.log("auth.js loaded", user);

if (user && user.email) {
  navAuth.innerHTML = `
    <span>Xin chào, <b>${user.email}</b></span>
    <a href="#" onclick="goToCart()">Giỏ hàng</a>
    <a href="#" onclick="logout()">Logout</a>
  `;
} else {
  navAuth.innerHTML = `
    <a href="auth/login.html">Đăng nhập</a>
    <a href="auth/register.html">Đăng ký</a>
    <a href="#" onclick="goToCart()">Giỏ hàng</a>
  `;
}

function logout() {
  localStorage.removeItem("user");
  localStorage.removeItem("cart");
  alert("Đã đăng xuất");
  window.location.href = "index.html";
}

function goToCart() {
  const user = JSON.parse(localStorage.getItem("user"));
  if (!user) {
    alert("Bạn cần đăng nhập để xem giỏ hàng");
    window.location.href = "auth/login.html";
    return;
  }
  window.location.href = "./cart/cart.html";
}
