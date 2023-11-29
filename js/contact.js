// Contact page

// Login user
let firstName = '';
let lastName = '';
let emailLogged = '';

// Hamburger Menu
(function () {
    let hamMenu = {
      showHideMenu: document.getElementById('show-hide-menu'),
      navUl: document.getElementById('nav-ul'),
      sizeMin768: window.matchMedia('(min-width: 768px)'),
      isLogged: false,
      liIsLogged: `<li><a href="index.html">Home</a></li>
            <li><a href="about-us.html">About us</a></li>
            <li><a href="store.html">Shop</a></li>
            <li><a href="contact.html">Contact</a></li>
            <li><a href="login.html" id="logout">Logout</a></li>`,
      liIsNotLogged: `<li><a href="index.html">Home</a></li>
            <li><a href="about-us.html">About us</a></li>
            <li><a href="store.html">Shop</a></li>
            <li><a href="contact.html">Contact</a></li>
            <li><a href="login.html">Log in</a></li>`,
      logout: () => {
        localStorage.removeItem('userHaven');
      },
      init: () => {
        if (localStorage.getItem('userHaven')) {
          let user = JSON.parse(localStorage.userHaven);
          firstName = user.firstName;
          lastName = user.lastName;
          emailLogged = user.email;
        }
        if (firstName !== '') {
          hamMenu.isLogged = true;
        }
        hamMenu.showHideMenu.addEventListener('click', () => {
          if (hamMenu.showHideMenu.getAttribute('src') === 'img/menu.png') {
            hamMenu.showHideMenu.setAttribute('src', 'img/close.png');
            if (hamMenu.isLogged) {
              hamMenu.navUl.innerHTML = hamMenu.liIsLogged;
              let logoutBtn = document.getElementById('logout');
              logoutBtn.addEventListener('click', () => hamMenu.logout());
            } else {
              hamMenu.navUl.innerHTML = hamMenu.liIsNotLogged;
            }
          } else {
            hamMenu.showHideMenu.setAttribute('src', 'img/menu.png');
            hamMenu.navUl.innerHTML = '';
          }
        });
        hamMenu.changeMenu();
      },
      changeMenu: () => {
        if (hamMenu.sizeMin768.matches) {
          hamMenu.showHideMenu.style.display = 'none';
          if (hamMenu.isLogged) {
            hamMenu.navUl.innerHTML = hamMenu.liIsLogged;
            let logoutBtn = document.getElementById('logout');
            logoutBtn.addEventListener('click', () => hamMenu.logout());
          } else {
            hamMenu.navUl.innerHTML = hamMenu.liIsNotLogged;
          }
        }
      },
    };
    hamMenu.init();
})();

// Send message
const fName = document.getElementById('fname');
const lName = document.getElementById('lname');
const email = document.getElementById('email');
const message = document.getElementById('message');
const myForm = document.getElementById('my-form');
const errorMsgDiv = document.querySelector('.error-message');

myForm.addEventListener('submit', sendMessage);

if (firstName !== '') {
  fName.value = firstName;
  lName.value = lastName;
  email.value = emailLogged;
}
let errorMsg = [];

function sendMessage(e) {
  e.preventDefault();
  
  // Regex for email
  function validateEmail(email) {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
  }
  // Validate form
  if (firstName === '') {
    if (fName.value === '' || fName.value.length < 3 || fName.value.length > 25) {
      errorMsg.push(
        'Ime ne sme biti prazno i može biti dugačko od 3 do 25 karaktera.'
      );
    }
    if (lName.value === '' || lName.value.length < 3 || lName.value.length > 25) {
      errorMsg.push(
        'Prezime ne sme biti prazno i može biti dugačko od 3 do 25 karaktera.'
      );
    }
    if (!validateEmail(email.value)) {
      errorMsg.push('Unesite ispravnu email adresu sa znakom @ i bez razmaka.');
    }
    if (message.value === '' || message.value.length > 255) {
      errorMsg.push('Napišite poruku maksimalne dužine do 255 karaktera.');
    }
    if (errorMsg.length > 0) {
      errorMsg.map((err) => {
        let text = `<div>${err}</div>`;
        errorMsgDiv.innerHTML += text;
      });
      return;
    }
  } else {
    if (message.value === '' || message.value.length > 255) {
      errorMsg.push('Napišite poruku maksimalne dužine do 255 karaktera.');
    }
    if (errorMsg.length > 0) {
      errorMsg.map((err) => {
        let text = `<div>${err}</div>`;
        errorMsgDiv.innerHTML += text;
      });
      return;
    }
  }
  console.log('Error--->', errorMsg)
  myForm.submit();
}
// Clear field
fName.addEventListener('focus', clearField);
lName.addEventListener('focus', clearField);
email.addEventListener('focus', clearField);
message.addEventListener('focus', clearField);

function clearField() {
  errorMsg = [];
  errorMsgDiv.innerHTML = '';
}

// Change theme color
(function changeColorTheme() {
  const darkModeBtn = document.getElementById('darkModeBtn');
  const textBtn = document.getElementById('textBtn');
  const myBody = document.body;
  const themeBtn = document.querySelector('.theme-btn');
  const sizeMin768 = window.matchMedia('(min-width: 768px)');
  const store = document.querySelector(':root');

  darkModeBtn.addEventListener('click', (e) => {
    if (e.target.checked) {
      store.style.setProperty('--body-bg', '#000000');
      store.style.setProperty('--body-color', '#ffffff');
      textBtn.innerHTML = 'Light theme';
    } else {
      store.style.setProperty('--body-bg', '#ffffff');
      store.style.setProperty('--body-color', '#000000');
      textBtn.innerHTML = 'Dark theme';
    }
    if (!myBody.classList.contains('animate')) {
      myBody.classList.toggle('animate');
      setTimeout(() => myBody.classList.remove('animate'), 1000);
    }
  });

  if (sizeMin768.matches) {
    themeBtn.style.top = '100px';
  }
})();
