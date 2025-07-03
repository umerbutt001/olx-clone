var currentUser = null;
let allUsers = [];
let isEditingProfile = false;

// Load users from localStorage when page loads
function loadUsers() {
    let savedUsers = localStorage.getItem('allUsers');
    if (savedUsers) {
        allUsers = JSON.parse(savedUsers);
    }
}

// Save users to localStorage
function saveUsers() {
    localStorage.setItem('allUsers', JSON.stringify(allUsers));
}

// Load current user from localStorage
function loadCurrentUser() {
    let savedCurrentUser = localStorage.getItem('currentUser');
    if (savedCurrentUser) {
        currentUser = JSON.parse(savedCurrentUser);
        return true;
    }
    return false;
}

// Save current user to localStorage
function saveCurrentUser() {
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
}

// Remove current user from localStorage (logout)
function removeCurrentUser() {
    localStorage.removeItem('currentUser');
    currentUser = null;
}

// Check if user exists
function findUser(username, email, password) {
    for (let i = 0; i < allUsers.length; i++) {
        if (allUsers[i].username === username && 
            allUsers[i].email === email && 
            allUsers[i].password === password) {
            return allUsers[i];
        }
    }
    return null;
}

// Check if username or email already exists
function checkUserExists(username, email) {
    for (let i = 0; i < allUsers.length; i++) {
        if (allUsers[i].username === username || allUsers[i].email === email) {
            return true;
        }
    }
    return false;
}

// Create new user
function createNewUser(username, email, password) {
    if (checkUserExists(username, email)) {
        alert('Username or Email already exists! Please use different credentials.');
        return false;
    }
    
    let newUser = {
        username: username,
        email: email,
        password: password
    };
    
    allUsers.push(newUser);
    saveUsers();
    alert('Account created successfully! Please login with your new credentials.');
    return true;
}

// Update user data
function updateUser(field, newValue) {
    // Check if new username/email already exists (for other users)
    if (field === 'username' || field === 'email') {
        for (let i = 0; i < allUsers.length; i++) {
            if (allUsers[i][field] === newValue && allUsers[i] !== currentUser) {
                alert('This ' + field + ' already exists! Please choose a different one.');
                return false;
            }
        }
    }
    
    // Update in allUsers array
    for (let i = 0; i < allUsers.length; i++) {
        if (allUsers[i].username === currentUser.username && 
            allUsers[i].email === currentUser.email) {
            allUsers[i][field] = newValue;
            break;
        }
    }
    
    // Update current user
    currentUser[field] = newValue;
    
    // Save to localStorage
    saveUsers();
    saveCurrentUser();
    
    return true;
}

// Initialize when page loads
function init() {
    loadUsers();
    
    // Check if we're on index.html (login page)
    if (document.getElementById('loginForm')) {
        // Check if user is already logged in
        if (loadCurrentUser()) {
            window.location.href = 'olx.html';
            return;
        }
        
        setupLoginPage();
    }
    
    // Check if we're on olx.html (main page)
    if (document.querySelector('.button1')) {
        // Check if user is logged in
        if (!loadCurrentUser()) {
            window.location.href = 'index.html';
            return;
        }
        
        setupMainPage();
    }
}


function setupLoginPage() {
    let loginForm = document.getElementById('loginForm');
    let createNewBtn = document.getElementById('createNewBtn')

    // ✅ Handle login form submission
    loginForm.addEventListener('submit', function (e) {
        e.preventDefault();

        let username = document.getElementById('username').value.trim();
        let email = document.getElementById('email').value.trim();
        let password = document.getElementById('password').value.trim();

        if (!username || !email || !password) {
            alert('Please fill all fields');
            return;
        }

        let users = JSON.parse(localStorage.getItem('allUsers')) || [];

        // 🔍 Try to find exact match
        let existingUser = users.find(user =>
            user.username === username &&
            user.email === email &&
            user.password === password
        );

        if (existingUser) {
            // ✅ Login success
            localStorage.setItem('currentUser', JSON.stringify(existingUser));
            alert("Login successful!");
            window.location.href = 'olx.html';
        } else {
            alert('Incorrect username, email, or password');
        }
    });

    // ✅ Handle Create New Account
    createNewBtn.addEventListener('click', function (e) {
        e.preventDefault();

        let username = document.getElementById('username').value.trim();
        let email = document.getElementById('email').value.trim();
        let password = document.getElementById('password').value.trim();

        if (!username || !email || !password) {
            alert('Please fill all fields to create an account');
            return;
        }

        // Validate email
        let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Please enter a valid email address');
            return;
        }

        let users = JSON.parse(localStorage.getItem('allUsers')) || [];

        // ❌ Check if username OR email already exists
        let alreadyExists = users.find(user =>
            user.username === username || user.email === email
        );

        if (alreadyExists) {
            alert('Username or email already exists!');
            return;
        }

        // ✅ Create new user and login
        let newUser = { username, email, password };
        users.push(newUser);
        localStorage.setItem('allUsers', JSON.stringify(users));
        localStorage.setItem('currentUser', JSON.stringify(newUser));
        alert('Account created successfully! Redirecting to OLX...');
        window.location.href = 'olx.html';
    });
}


// Setup main page functionality
function setupMainPage() {
    let profileBtn = document.querySelector('.button1');
    let logoutBtn = document.getElementById('logout');
    
    // Handle profile button click
    profileBtn.addEventListener('click', function() {
        showProfile();
    });
    
    // Handle logout button click
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function() {
            removeCurrentUser();
            window.location.href = 'index.html';
        });
    }
}

// Show profile popup
// Call this function when button1 is clicked
function showProfile() {
    if (isEditingProfile) return;
    isEditingProfile = true;

    // Hide everything else (optional)
    document.body.innerHTML = '';

    // Container div
    let container = document.createElement('div');
    container.style.cssText = `
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        min-height: 100vh;
        background: linear-gradient(to right, #74ebd5, #acb6e5);
        font-family: Arial, sans-serif;
        padding: 30px;
        color: #333;
    `;

    // Profile card
    let card = document.createElement('div');
    card.id = "profileCard";
    // card.style.cssText = `
    //     background-color: #fff;
    //     padding: 30px;
    //     border-radius: 12px;
    //     box-shadow: 0 8px 16px rgba(0,0,0,0.2);
    //     max-width: 350px;
    //     text-align: center;
    //     width: 50%;
    // `;

    card.innerHTML = `
        <h2 style="margin-bottom: 20px; color: #007bff;">👤 My Profile</h2>
        <p><strong>Username:</strong> <span id="displayUsername">${currentUser.username}</span></p>
        <p><strong>Email:</strong> <span id="displayEmail">${currentUser.email}</span></p>
        <p><strong>Password:</strong> <span id="displayPassword">${currentUser.password}</span></p>
        <br>
        <button onclick="changeField('username')" style="margin: 5px; width: 150px;background-color: #0ABAB5;height: 50px;border:none;color: white;font-weight: bolder;">Change Username</button>
        <button onclick="changeField('email')" style="margin: 5px; width: 150px;background-color: #0ABAB5;height: 50px;border:none;color: white;font-weight: bolder;">Change Email</button>
        <button onclick="changeField('password')" style="margin: 5px; width: 150px;background-color: #0ABAB5;height: 50px;border:none;color: white;font-weight: bolder;">Change Password</button>
        <br><br>
        <button onclick="window.location.href = 'olx.html'" style="margin: 5px; background-color: green; color: white; width: 150px;height: 50px; border:none;">Back to OLX</button>
        <button onclick="logoutFromProfile()" style="margin: 5px; background-color: red; color: white; width: 150px;height: 50px;border:none;">Logout</button>
    `;

    container.appendChild(card);
    document.body.appendChild(container);
}


// Change field function
function changeField(field) {
    let displayElement = document.getElementById('display' + field.charAt(0).toUpperCase() + field.slice(1));
    let currentValue = currentUser[field];
    
    // Create input field
    let input = document.createElement('input');
    input.type = field === 'password' ? 'password' : 'text';
    input.value = currentValue;
    input.style.cssText = 'width: 200px; padding: 5px; margin: 5px;';
    
    // Create save and cancel buttons
    let saveBtn = document.createElement('button');
    saveBtn.textContent = 'Save';
    saveBtn.style.margin = '5px';
    saveBtn.style.width = '60px'
    saveBtn.style.height = '38px'
    saveBtn.style.border = 'none'
    saveBtn.style.backgroundColor = '#FEFBC7'
    
    let cancelBtn = document.createElement('button');
    cancelBtn.textContent = 'Cancel';
    cancelBtn.style.margin = '5px';
    cancelBtn.style.width = '60px'
    cancelBtn.style.height = '38px'
    cancelBtn.style.border = 'none'
    cancelBtn.style.backgroundColor = '#FEFBC7'
    
    // Replace display with input
    displayElement.innerHTML = '';
    displayElement.appendChild(input);
    displayElement.appendChild(saveBtn);
    displayElement.appendChild(cancelBtn);
    
    // Handle save
    saveBtn.addEventListener('click', function() {
        let newValue = input.value.trim();
        if (!newValue) {
            alert('Field cannot be empty!');
            return;
        }
        
        // Email validation if changing email
        if (field === 'email') {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(newValue)) {
                alert('Please enter a valid email address');
                return;
            }
        }
        
        if (updateUser(field, newValue)) {
            displayElement.textContent = newValue;
            alert(field.charAt(0).toUpperCase() + field.slice(1) + ' updated successfully!');
        }
    });
    
    // Handle cancel
    cancelBtn.addEventListener('click', function() {
        displayElement.textContent = currentValue;
    });
}

// Back to OLX function
function backToOLX() {
    closeProfile();
}

// Logout from profile function
function logoutFromProfile() {
    removeCurrentUser();
    window.location.href = 'index.html';
}

// Close profile popup
function closeProfile() {
    let popup = document.getElementById('profilePopup');
    let overlay = document.getElementById('profileOverlay');
    
    if (popup) {
        popup.remove();
    }
    if (overlay) {
        overlay.remove();
    }
    
    isEditingProfile = false;
}

// Make functions global so they can be called from HTML
window.changeField = changeField;
window.backToOLX = backToOLX;
window.logoutFromProfile = logoutFromProfile;

// Initialize when page loads
document.addEventListener('DOMContentLoaded', init);












// olx.html ||



var cardMobile = document.getElementById('cardmobile');
var big = document.getElementsByClassName('div3');
var backs = document.getElementById('back');
var cars = document.getElementById('cardcar')
var saveCards = document.getElementById('savecard')
var bikes = document.getElementById('cardbike')
var washCard = document.getElementById('cardwash')
var microWave = document.getElementById('cardmicro')
var ledTV = document.getElementById('ledtv')
var Ac = document.getElementById('ac')
var Refrigerator = document.getElementById('fridge')
var wardRobes = document.getElementById('wardrobes')
var tablesChiar = document.getElementById('table')
var Bed = document.getElementById('beds')
var dressingTable = document.getElementById('dressing-table')
var woodenChairs = document.getElementById('chairs')
var dinningTables = document.getElementById('dinningtables')
var Couch = document.getElementById('couchs')
var Kabnets = document.getElementById('kabnet')
var previewBox = document.getElementById("imagePreview");
var previewImg = document.getElementById("previewImg");
var addToCartBtn = document.getElementById("addToCartBtn");
var cartOverlay = document.getElementById("cartOverlay");
var cartImagesContainer = document.getElementById("cartImagesContainer");
var closeCart = document.getElementById("closeCart");




function setCurrentView(view) {
   localStorage.setItem('currentView', view);
}


function phone() {
   saveCards.style.display = 'none';
   big[0].style.display = 'block';
   big[0].style.width = '99vw';
   big[0].style.justifyself = 'center'
   big[0].style.display = 'flex';
   big[0].style.flexwrap = 'wrap'
   big[0].style.justifycontent = 'space-evenly';
   big[0].style.margintop = '50px';
   AOS.refresh();
   setCurrentView('phone');
}


function back() {
   for (let i = 0; i < big.length; i++) {
      big[i].style.display = 'none';
   }
   saveCards.style.display = 'flex';
   cardMobile.style.display = 'block';
   cars.style.display = 'block';
   bikes.style.display = 'block';
   washCard.style.display = 'block';
   microWave.style.display = 'block';
   ledTV.style.display = 'block';
   Ac.style.display = 'block';
   Refrigerator.style.display = 'block';
   wardRobes.style.display = 'block';
   tablesChiar.style.display = 'block';
   Bed.style.display = 'block';
   dressingTable.style.display = 'block';
   woodenChairs.style.display = 'block';
   dinningTables.style.display = 'block';
   Couch.style.display = 'block';
   Kabnets.style.display = 'block'

   setCurrentView('saveCard');
}

 function car() {
   saveCards.style.display = 'none';
   big[1].style.display = 'block'
   big[1].style.width = '99vw';
   big[1].style.justifyself = 'center'
   big[1].style.display = 'flex';
   big[1].style.flexwrap = 'wrap'
   big[1].style.justifycontent = 'space-evenly';
   big[1].style.margintop = '50px';
   AOS.refresh();
   setCurrentView('phone');
}

function bike() {
   saveCards.style.display = 'none';
   big[2].style.display = 'block'
   big[2].style.width = '99vw';
   big[2].style.justifyself = 'center'
   big[2].style.display = 'flex';
   big[2].style.flexwrap = 'wrap'
   big[2].style.justifycontent = 'space-evenly';
   big[2].style.margintop = '50px';
   AOS.refresh();
   setCurrentView('phone');
}

function wash() {
   saveCards.style.display = 'none';
   bikes.style.display = 'none'
   big[3].style.display = 'block'
   big[3].style.width = '99vw';
   big[3].style.justifyself = 'center'
   big[3].style.display = 'flex';
   big[3].style.flexwrap = 'wrap'
   big[3].style.justifycontent = 'space-evenly';
   big[3].style.margintop = '50px';
   AOS.refresh();
   setCurrentView('phone');
}

function micro() {
   saveCards.style.display = 'none';
   big[4].style.display = 'block'
   big[4].style.width = '99vw';
   big[4].style.justifyself = 'center'
   big[4].style.display = 'flex';
   big[4].style.flexwrap = 'wrap'
   big[4].style.justifycontent = 'space-evenly';
   big[4].style.margintop = '50px';
   AOS.refresh();
   setCurrentView('phone');
}

function led() {
   saveCards.style.display = 'none';
   big[5].style.display = 'block'
   big[5].style.width = '99vw';
   big[5].style.justifyself = 'center'
   big[5].style.display = 'flex';
   big[5].style.flexwrap = 'wrap'
   big[5].style.justifycontent = 'space-evenly';
   big[5].style.margintop = '50px';
   AOS.refresh();
   setCurrentView('phone');
}


function ac() {
   saveCards.style.display = 'none';
   big[6].style.display = 'block'
   big[6].style.width = '99vw';
   big[6].style.justifyself = 'center'
   big[6].style.display = 'flex';
   big[6].style.flexwrap = 'wrap'
   big[6].style.justifycontent = 'space-evenly';
   big[6].style.margintop = '50px';
   AOS.refresh();
   setCurrentView('phone');
}


function refrigerator() {
   saveCards.style.display = 'none';
   big[7].style.display = 'block'
   big[7].style.width = '99vw';
   big[7].style.justifyself = 'center'
   big[7].style.display = 'flex';
   big[7].style.flexwrap = 'wrap'
   big[7].style.justifycontent = 'space-evenly';
   big[7].style.margintop = '50px';
   AOS.refresh();
   setCurrentView('phone');
}



function wardrobe() {
   saveCards.style.display = 'none';
   big[8].style.display = 'block'
   big[8].style.width = '99vw';
   big[8].style.justifyself = 'center'
   big[8].style.display = 'flex';
   big[8].style.flexwrap = 'wrap'
   big[8].style.justifycontent = 'space-evenly';
   big[8].style.margintop = '50px';
   AOS.refresh();
   setCurrentView('phone');
}

function tables() {
   saveCards.style.display = 'none';
   big[9].style.display = 'block'
   big[9].style.width = '99vw';
   big[9].style.justifyself = 'center'
   big[9].style.display = 'flex';
   big[9].style.flexwrap = 'wrap'
   big[9].style.justifycontent = 'space-evenly';
   big[9].style.margintop = '50px';
   AOS.refresh();
   setCurrentView('phone');
}

function bed() {
   saveCards.style.display = 'none';
   big[10].style.display = 'block'
   big[10].style.width = '99vw';
   big[10].style.justifyself = 'center'
   big[10].style.display = 'flex';
   big[10].style.flexwrap = 'wrap'
   big[10].style.justifycontent = 'space-evenly';
   big[10].style.margintop = '50px';
   AOS.refresh();
   setCurrentView('phone');
}

function dressingtable() {
   saveCards.style.display = 'none';
   big[11].style.display = 'block'
   big[11].style.width = '99vw';
   big[11].style.justifyself = 'center'
   big[11].style.display = 'flex';
   big[11].style.flexwrap = 'wrap'
   big[11].style.justifycontent = 'space-evenly';
   big[11].style.margintop = '50px';
   AOS.refresh();
   setCurrentView('phone');
}

function chair() {
   saveCards.style.display = 'none';
   big[12].style.display = 'block'
   big[12].style.width = '99vw';
   big[12].style.justifyself = 'center'
   big[12].style.display = 'flex';
   big[12].style.flexwrap = 'wrap'
   big[12].style.justifycontent = 'space-evenly';
   big[12].style.margintop = '50px';
   AOS.refresh();
   setCurrentView('phone');
}

function dinningtable() {
   saveCards.style.display = 'none';
   big[13].style.display = 'block'
   big[13].style.width = '99vw';
   big[13].style.justifyself = 'center'
   big[13].style.display = 'flex';
   big[13].style.flexwrap = 'wrap'
   big[13].style.justifycontent = 'space-evenly';
   big[13].style.margintop = '50px';
   AOS.refresh();
   setCurrentView('phone');
}

function couch() {
   saveCards.style.display = 'none';
   big[14].style.display = 'block'
   big[14].style.width = '99vw';
   big[14].style.justifyself = 'center'
   big[14].style.display = 'flex';
   big[14].style.flexwrap = 'wrap'
   big[14].style.justifycontent = 'space-evenly';
   big[14].style.margintop = '50px';
   AOS.refresh();
   setCurrentView('phone');
}


function kabnets() {
   saveCards.style.display = 'none';
   big[15].style.display = 'block'
   big[15].style.width = '99vw';
   big[15].style.justifyself = 'center'
   big[15].style.display = 'flex';
   big[15].style.flexwrap = 'wrap'
   big[15].style.justifycontent = 'space-evenly';
   big[15].style.margintop = '50px';
   AOS.refresh();
   setCurrentView('phone');
}


// 🛒 Step 1: Load user-specific cart data
let cartImages = [];

let currentUserRaw = localStorage.getItem("currentUser");
var currentUser = currentUserRaw ? JSON.parse(currentUserRaw) : null;

if (currentUser) {
   let userCartKey = `cart_${currentUser.username}`;
   cartImages = JSON.parse(localStorage.getItem(userCartKey)) || [];
}

// 🖼️ Step 2: Setup image click to show preview
let allImages = document.getElementsByClassName("size");

for (let i = 0; i < allImages.length; i++) {
   allImages[i].addEventListener("click", function () {
      let imgSrc = this.src;
      let text = this.parentElement.querySelector("p").textContent;

      document.getElementById("previewImg").src = imgSrc;

      let previewText = document.getElementById("previewText");
      if (!previewText) {
         previewText = document.createElement("p");
         previewText.id = "previewText";
         previewText.style.fontSize = "14px";
         document.getElementById("imagePreview").appendChild(previewText);
      }
      previewText.textContent = text;

      localStorage.setItem("previewItem", JSON.stringify({ src: imgSrc, text }));

      document.getElementById("imagePreview").style.display = "block";
   });
}

// ➕ Step 3: Add to Cart

if (currentUser) {
   let userCartKey = `cart_${currentUser.username}`;

   document.getElementById("addToCartBtn").addEventListener("click", function () {
      let previewItem = JSON.parse(localStorage.getItem("previewItem"));

      if (!previewItem) {
         alert("No image selected!");
         return;
      }

      let alreadyExists = cartImages.some(item => item.src === previewItem.src);

      if (alreadyExists) {
         Swal.fire("Already in cart!", "", "info");
      } else {
         cartImages.push(previewItem);
         localStorage.setItem(userCartKey, JSON.stringify(cartImages));
         Swal.fire("Added to cart!", "", "success");
      }

      hidePreview();
   });

   // 🛍️ Step 4: Open cart for current user
   let openCartBtns = document.getElementsByClassName("button2");

   for (let j = 0; j < openCartBtns.length; j++) {
      openCartBtns[j].addEventListener("click", function () {
         let cartImagesContainer = document.getElementById("cartImagesContainer");
         cartImagesContainer.innerHTML = "";

         if (cartImages.length === 0) {
            cartImagesContainer.innerHTML = "<p>Your cart is empty.</p>";
         }

         for (let i = 0; i < cartImages.length; i++) {
            let item = cartImages[i];

            let wrapper = document.createElement("div");
            wrapper.style.textAlign = "center";
            wrapper.style.margin = "10px";

            let img = document.createElement("img");
            img.src = item.src;
            img.style.width = "100px";

            let text = document.createElement("p");
            text.textContent = item.text;
            text.style.fontSize = "12px";

            let removeBtn = document.createElement("button");
            removeBtn.textContent = "❌ Remove";
            removeBtn.style.marginTop = "5px";

            removeBtn.addEventListener("click", function () {
               cartImages.splice(i, 1);
               localStorage.setItem(userCartKey, JSON.stringify(cartImages));
               wrapper.remove();
            });

            wrapper.appendChild(img);
            wrapper.appendChild(text);
            wrapper.appendChild(removeBtn);

            cartImagesContainer.appendChild(wrapper);
         }

         document.getElementById("cartOverlay").style.display = "block";
      });
   }
}

// ❌ Step 5: Close cart overlay

document.getElementById("closeCart").addEventListener("click", function () {
   document.getElementById("cartOverlay").style.display = "none";
});

function hidePreview() {
   document.getElementById("imagePreview").style.display = "none";
}
