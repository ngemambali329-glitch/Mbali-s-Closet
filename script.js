// Load products from local storage or default
let products = JSON.parse(localStorage.getItem('products')) || [
  { name: "Red Shirt", price: 20, image: "https://via.placeholder.com/150/FF0000/FFFFFF?text=Red+Shirt" },
  { name: "Blue Jeans", price: 40, image: "https://via.placeholder.com/150/0000FF/FFFFFF?text=Blue+Jeans" }
];

let cart = [];

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
    itemDiv.id = 'cart-item';
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

// Handle order form submission
document.getElementById('orderForm').addEventListener('submit', function(e) {
  e.preventDefault();
  if (cart.length === 0) {
    alert('Your cart is empty!');
    return;
  }
  const name = document.getElementById('name').value;
  const phone = document.getElementById('phone').value;

  // Save order data
  const orders = JSON.parse(localStorage.getItem('orders')) || [];
  orders.push({ name, phone, items: cart });
  localStorage.setItem('orders', JSON.stringify(orders));

  alert('Order placed! Thank you.');
  // Clear cart and form
  cart = [];
  displayCart();
  document.getElementById('orderForm').reset();
});

// Initialize page
displayProducts();
