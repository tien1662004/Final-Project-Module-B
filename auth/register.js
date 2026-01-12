const api = "https://api-class-o1lo.onrender.com/api/tien";

const registerForm = document.getElementById("registerForm");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const confirmPasswordInput = document.getElementById("confirmPassword");
const errors = document.querySelectorAll(".error");

async function register(email, password) {
  try {
    await axios.post(`${api}/auth/register`, { email, password });
    alert("Đăng ký thành công");

    // chuyển sang login
    window.location.href = "login.html";
  } catch (error) {
    alert(error.response?.data?.message || error.message);
  }
}

registerForm.addEventListener("submit", function (e) {
  e.preventDefault();

  errors.forEach((err) => (err.style.display = "none"));

  let isValid = true;

  // email
  if (emailInput.value.trim() === "") {
    errors[0].innerText = "Email không được để trống";
    errors[0].style.display = "block";
    isValid = false;
  }

  // password
  if (passwordInput.value.trim().length < 6) {
    errors[1].innerText = "Mật khẩu tối thiểu 6 ký tự";
    errors[1].style.display = "block";
    isValid = false;
  }

  // confirm password
  if (confirmPasswordInput.value !== passwordInput.value) {
    errors[2].innerText = "Mật khẩu không khớp";
    errors[2].style.display = "block";
    isValid = false;
  }

  if (!isValid) return;

  register(emailInput.value, passwordInput.value);
});
