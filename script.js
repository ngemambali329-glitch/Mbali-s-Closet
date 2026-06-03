// Hardcoded admin credentials (change these to your own)
const adminUsername = "adminuser";
const adminPassword = "mypassword";

// Function to toggle login form visibility
function toggleLogin() {
  const loginDiv = document.getElementById('loginForm');
  if (loginDiv.style.display === 'none') {
    loginDiv.style.display = 'block';
  } else {
    loginDiv.style.display = 'none';
  }
}

// Save login state
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

// Function to hide admin features if not logged in
function hideAdminFeatures() {
  const isAdmin = localStorage.getItem('isAdmin');
  if (isAdmin === 'true') {
    // Show admin features
    // For example, show admin button or section
    document.getElementById('admin-section').style.display = 'block';
  } else {
    // Hide admin features
    document.getElementById('admin-section').style.display = 'none';
  }
}

// Call this on page load
window.onload = () => {
  hideAdminFeatures();
};
