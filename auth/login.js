const api = "https://api-class-o1lo.onrender.com/api/tien";

const loginForm = document.getElementById("loginForm");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const errors = document.querySelectorAll(".error");

/* LOGIN */
async function login(email, password) {
  try {
    const { data } = await axios.post(`${api}/auth/login`, {
      email,
      password,
    });
    localStorage.setItem("user", JSON.stringify(data.data));
    alert("Đăng nhập thành công");

    window.location.pathname = "index.html";
  } catch (error) {
    alert(error.response?.data?.message || error.message);
  }
}
async function register(email, password) {
  try {
    await axios.post(`${api}/auth/register`, { email, password });
    alert("Đăng ký thành công");
  } catch (error) {
    alert(error.response?.data?.message || error.message);
  }
}

loginForm.addEventListener("submit", function (e) {
  e.preventDefault();

  // reset lỗi
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
