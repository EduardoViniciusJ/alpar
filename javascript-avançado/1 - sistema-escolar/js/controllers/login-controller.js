const auth = new Auth();

const form = document.getElementById("loginForm");

form.addEventListener("submit", (event) => {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    auth.login(email, password);
});