// Game Haven Home page

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

// Welcome message
(function () {
    let welcome = {
      welcomeText: document.getElementById('welcomeText'),
      init: () => window.addEventListener('DOMContentLoaded', welcome.showTime),
      showTime: function () {
        let date = new Date();
        let h = date.getHours();
        let m = date.getMinutes();
        let s = date.getSeconds();
        h = h < 10 ? (h = '0' + h) : h;
        m = m < 10 ? (m = '0' + m) : m;
        s = s < 10 ? (s = '0' + s) : s;
        const welc = 'and welcome';
        if (h < 9) {
          welcome.welcomeText.innerHTML = `Good morning ${welc} ${firstName} ${lastName}`;
        }
        if (h >= 9) {
          welcome.welcomeText.innerHTML = `Good day ${welc} ${firstName} ${lastName}`;
        }
        if (h >= 20) {
          welcome.welcomeText.innerHTML = `Good evening ${welc} ${firstName} ${lastName}`;
        }
      },
    };
    welcome.init();
})();

// Image Slider
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');
let slideIndex = 0;

prevBtn.onclick = () => nextSlide(-1);
nextBtn.onclick = () => nextSlide(1);

function nextSlide(n) {
    showSlides((slideIndex += n));
}

function showSlides(n) {
    if (n > slides.length - 1) {
        slideIndex = 0;
    }
    if (n < 0) {
        slideIndex = slides.length - 1;
    }
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = 'none';
        slides[i].classList.add('fade');
        dots[i].className = dots[i].className.replace(' active', '');
        dots[i].addEventListener('click', dotView);
    }
    slides[slideIndex].style.display = 'block';
    dots[slideIndex].className += ' active';
}

function dotView() {
    slideIndex = parseInt(this.getAttribute('data-id'));
    showSlides();
}

showSlides(slideIndex);

// Comments with AJAX
function run() {
  // Creating Our XMLHttpRequest object
  let xhr = new XMLHttpRequest();

  // Making our connection
  let url = 'https://dummyjson.com/comments';
  xhr.open('GET', url, true);

  // function execute after request is successful
  xhr.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      const commentsContainer = document.querySelector('.comments-container');
      let commentsArray = null;
      let allComments = JSON.parse(this.responseText);
      commentsArray = allComments.comments;

      for (let index = 0; index < 3; index++) {
        let randomNumber = Math.floor(Math.random() * 30);
        let randUser = commentsArray[randomNumber];
        let text = `
      <div class="comments-box">
          <h4>${randUser.user.username}</h4>
          <p>${randUser.body}</p>
        </div>
      `;
        commentsContainer.innerHTML += text;
      }
      
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
})();