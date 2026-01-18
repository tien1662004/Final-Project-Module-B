const productList = document.getElementById("productList");
const searchInput = document.getElementById("searchInput");
const categoryFilter = document.getElementById("categoryFilter");
const sortFilter = document.getElementById("sortFilter");
const pagination = document.getElementById("pagination");

let currentPage = 1;
const itemsPerPage = 6;

function render() {
  let result = [...products];

  // search
  if (searchInput.value) {
    const keyword = searchInput.value.toLowerCase();
    result = result.filter((p) => p.name.toLowerCase().includes(keyword));
  }

  // category
  if (categoryFilter.value) {
    result = result.filter((p) => p.category === categoryFilter.value);
  }

  // sort
  if (sortFilter.value === "price-asc") {
    result.sort((a, b) => a.price - b.price);
  }
  if (sortFilter.value === "price-desc") {
    result.sort((a, b) => b.price - a.price);
  }
  if (sortFilter.value === "sold-desc") {
    result.sort((a, b) => b.sold - a.sold);
  }

  renderPagination(result);
}

function renderPagination(list) {
  pagination.innerHTML = "";

  const totalPages = Math.ceil(list.length / itemsPerPage);
  const start = (currentPage - 1) * itemsPerPage;
  const pageItems = list.slice(start, start + itemsPerPage);

  renderProducts(pageItems);

  for (let i = 1; i <= totalPages; i++) {
    const btn = document.createElement("button");
    btn.innerText = i;
    btn.onclick = () => {
      currentPage = i;
      renderPagination(list);
    };
    pagination.appendChild(btn);
  }
}

function renderProducts(list) {
  productList.innerHTML = "";

  if (list.length === 0) {
    productList.innerHTML = "<p>Không có sản phẩm</p>";
    return;
  }

  list.forEach((product) => {
    productList.innerHTML += `
  <div class="product">
    <div class="product-img">
      <img src="${product.image}" alt="${product.name}">
    </div>

    <div class="product-content">
      <h3>${product.name}</h3>
      <p>${product.description}</p>
      <div class="price">${product.price.toLocaleString()}đ</div>
    </div>

    <button onclick="addToCart(${product.id})">Thêm vào giỏ</button>
  </div>
`;
  });
}

searchInput.oninput = () => {
  currentPage = 1;
  render();
};
categoryFilter.onchange = () => {
  currentPage = 1;
  render();
};
sortFilter.onchange = () => {
  currentPage = 1;
  render();
};

render();

function addToCart(productId) {
  const user = JSON.parse(localStorage.getItem("user"));

  // CHƯA ĐĂNG NHẬP
  if (!user) {
    alert("Vui lòng đăng nhập để thêm vào giỏ hàng");
    window.location.href = "auth/login.html";
    return;
  }

  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  // LẤY PRODUCT TỪ DANH SÁCH
  const product = products.find((p) => p.id === productId);

  if (!product) {
    alert("Sản phẩm không tồn tại");
    return;
  }

  const index = cart.findIndex((item) => item.id === productId);

  if (index !== -1) {
    cart[index].quantity += 1;
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1,
    });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  alert("Đã thêm vào giỏ hàng 🛒");

  // chuyển trang giỏ hàng
  window.location.href = "cart/cart.html";
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
