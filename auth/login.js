const api = "https://api-class-o1lo.onrender.com/api/tien";

const loginForm = document.getElementById("loginForm");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const errors = document.querySelectorAll(".error");

/* LOGIN */
async function login(email, password) {
  try {
    const res = await axios.post(`${api}/auth/login`, {
      email,
      password,
    });

    const userData = res.data.data;

    // LƯU USER ĐÚNG CHUẨN CHO auth.js
    localStorage.setItem(
      "user",
      JSON.stringify({
        id: userData.user._id,
        email: userData.user.email,
        token: userData.accessToken,
      })
    );

    alert("Đăng nhập thành công");

    // ⚠️ QUAN TRỌNG
    window.location.href = "../index.html";
  } catch (error) {
    alert(error.response?.data?.message || error.message);
  }
}

loginForm.addEventListener("submit", function (e) {
  e.preventDefault();

  errors.forEach((err) => (err.style.display = "none"));

  let isValid = true;

  if (emailInput.value.trim() === "") {
    errors[0].innerText = "Email không được để trống";
    errors[0].style.display = "block";
    isValid = false;
  }

  if (passwordInput.value.trim().length < 6) {
    errors[1].innerText = "Mật khẩu phải từ 6 ký tự";
    errors[1].style.display = "block";
    isValid = false;
  }

  if (!isValid) return;

  login(emailInput.value, passwordInput.value);
});
