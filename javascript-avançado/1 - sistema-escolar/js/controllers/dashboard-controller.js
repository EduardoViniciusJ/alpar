// Inicializa a lógica do dashboard: carrega dados da sessão e configura UI.
const initDashboard = () => {

    const data = localStorage.getItem("loggedUser");

    if (!data) return (window.location.href = "index.html");

    const { profile } = JSON.parse(data);

    const profileEl = document.getElementById("profile-text");
    if (profileEl) profileEl.textContent = profile;

    const logoutBtn = document.getElementById("logoutBtn");
    logoutBtn?.addEventListener("click", () => {
        localStorage.removeItem("loggedUser");
        window.location.href = "index.html";
    });
};

initDashboard();