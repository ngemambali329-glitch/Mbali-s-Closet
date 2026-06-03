// Admin credentials
const adminUsername = "admin"; // Change as needed
const adminPassword = "password"; // Change as needed

// Initialize products and orders from localStorage or defaults
let products = JSON.parse(localStorage.getItem('products')) || [
  { name: "Red Shirt", price: 20, image: "https://via.placeholder.com/150/FF0000/FFFFFF?text=Red+Shirt" },
  { name: "Blue Jeans", price: 40, image: "https://via.placeholder.com/150/0000FF/FFFFFF?text=Blue+Jeans" }
];

let cart = [];
const orders = JSON.parse(localStorage.getItem('orders')) || [];

// --- Admin Login Functions ---

function toggleLogin() {
  const loginDiv = document.getElementById('loginForm');
  loginDiv.style.display = (loginDiv.style.display === 'none') ? 'block' : 'none';
}

function checkLogin() {
  const username = document.getElementById('adminUser').value;
  const password = document.getElementById('adminPass').value;
  if (username === adminUsername && password === adminPassword) {
    localStorage.setItem('isAdmin', 'true');
    alert('Admin logged in!');
    hideAdminFeatures();
    toggleLogin(); // hide login form
  } else {
    alert('Incorrect username or password.');
  }
}

function logout() {
  localStorage.removeItem('isAdmin');
  alert('Logged out!');
  hideAdminFeatures();
}

function hideAdminFeatures() {
  const isAdmin = localStorage.getItem('isAdmin');
  document.getElementById('admin-section').style.display = (isAdmin === 'true') ? 'block' : 'none';
}

// --- Display Products ---

function displayProducts() {
  const productsDiv = document.getElementById('products');
  productsDiv.innerHTML = '';
  products.forEach((prod, index) => {
    const prodDiv = document.createElement('div');
    prodDiv.className = 'product';
    prodDiv.innerHTML = `
      <img src="${prod.image}" alt="${prod.name}" />
      <h3>${prod.name}</h3>
      <p>Price: $${prod.price}</p>
      <button onclick="addToCart(${index})">Add to Cart</button>
    `;
    productsDiv.appendChild(prodDiv);
  });
}

// --- Cart Functions ---

function addToCart(index) {
  cart.push(products[index]);
  displayCart();
}

function displayCart() {
  const cartDiv = document.getElementById('cart');
  cartDiv.innerHTML = '';
  if (cart.length === 0) {
    cartDiv.innerHTML = '<p>Cart is empty</p>';
    return;
  }
  let total = 0;
  cart.forEach((item, i) => {
    total += item.price;
    const itemDiv = document.createElement('div');
    itemDiv.innerHTML = `
      ${item.name} - $${item.price}
      <button onclick="removeFromCart(${i})">Remove</button>
    `;
    cartDiv.appendChild(itemDiv);
  });
  const totalDiv = document.createElement('div');
  totalDiv.innerHTML = `<strong>Total: $${total}</strong>`;
  cartDiv.appendChild(totalDiv);
}

function removeFromCart(index) {
  cart.splice(index, 1);
  displayCart();
}

// --- Place Order ---

document.getElementById('orderForm').addEventListener('submit', function(e) {
  e.preventDefault();
  if (cart.length === 0) {
    alert('Your cart is empty!');
    return;
  }
  const name = document.getElementById('name').value;
  const phone = document.getElementById('phone').value;
  if (!name || !phone) {
    alert('Please fill in all details.');
    return;
  }
  // Save order
  orders.push({ name, phone, items: [...cart] });
  localStorage.setItem('orders', JSON.stringify(orders));
  alert('Order placed! Thank you.');
  // Clear cart and form
  cart = [];
  displayCart();
  document.getElementById('orderForm').reset();
});

// --- Add Product with Image Upload ---

document.getElementById('productForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const name = document.getElementById('productName').value;
  const price = parseFloat(document.getElementById('productPrice').value);
  const fileInput = document.getElementById('productImageFile');
  const file = fileInput.files[0];

  if (file) {
    const reader = new FileReader();
    reader.onload = function(e) {
      const imageDataUrl = e.target.result;
      products.push({ name, price, image: imageDataUrl });
      localStorage.setItem('products', JSON.stringify(products));
      alert('Product added!');
      document.getElementById('productForm').reset();
      displayProducts();
    };
    reader.readAsDataURL(file);
  } else {
    alert('Please select an image file.');
  }
});

// --- On Load ---

window.onload = () => {
  hideAdminFeatures();
  displayProducts();
};
