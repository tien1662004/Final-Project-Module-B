
const loginForm = document.getElementById("loginForm");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");

const errors = document.querySelectorAll(".error");

// Lắng nghe sự kiện submit form
loginForm.addEventListener("submit", function (event) {
  // Ngăn form reload trang
  event.preventDefault();

  // Reset lỗi
  errors.forEach(error => error.style.display = "none");

  let isValid = true;

  // ===== VALIDATE EMAIL =====
  if (emailInput.value.trim() === "") {
    errors[0].innerText = "Email không được để trống";
    errors[0].style.display = "block";
    isValid = false;
  }

  // ===== VALIDATE PASSWORD =====
  if (passwordInput.value.trim().length < 6) {
    errors[1].innerText = "Mật khẩu phải từ 6 ký tự";
    errors[1].style.display = "block";
    isValid = false;
  }

  // Nếu có lỗi thì dừng
  if (!isValid) return;

  // ===== LOGIN GIẢ =====
  const user = {
    email: emailInput.value,
  };

  // Lưu user vào localStorage
  localStorage.setItem("user", JSON.stringify(user));

  alert("Đăng nhập thành công!");

  // Chuyển trang (sau này đổi thành trang shop)
  window.location.href = "index.html";
});
