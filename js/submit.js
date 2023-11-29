// Submit page
const successfulMsg = document.getElementById('successful-message');

if (successfulMsg.innerText === 'Message sent successfully.') {
  setTimeout(function () {
    window.location = 'index.html';
  }, 3000);
}
