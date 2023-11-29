// About us page

// Login user
let firstName = '';
let lastName = '';

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

// All users

  // Get users with AJAX
function run() {
  // Creating Our XMLHttpRequest object
  let xhr = new XMLHttpRequest();

  // Making our connection
  let url = 'https://dummyjson.com/users';
  xhr.open('GET', url, true);

  // function execute after request is successful
  xhr.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      const usersContainer = document.querySelector('.users-container');
      let usersArray = null;
      let allUsers = JSON.parse(this.responseText);
      usersArray = allUsers.users;

      let text = '';

      usersArray.map(user => {
        text += `
        <div class="user-box">
        <div class="user-img-holder">
          <img src="${user.image}" alt="${user.username}" />
        </div>
        <h4>${user.firstName} ${user.lastName}</h4>
        <p>${user.username}</p>
        <p>${user.company.title}</p>
        <p>${user.email}</p>
        <p>age:${user.age}</p>
      </div>
        `;
      })

        
        usersContainer.innerHTML += text;
    }
  };
  // Sending our request
  xhr.send();
}
run();

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
})()