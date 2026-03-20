
class Auth {
    #users = [];

    constructor() {
        this.#data();
    }

    #data() {
        this.#users.push(new Student("Joao", "joao@gmail.com", "senha123", "5A"));
        this.#users.push(new Teacher("Ana", "ana@gov.br", "senha456", "Matemática"));
    }

    login(email, password) {
        const userFound = this.#users.find(x => x.email == email);

        if (!userFound || !userFound.checkPassword(password)) {
            throw new Error("E-mail ou senha incorretos!");
        }

        const sessionData = {
            name: userFound.name,
            email: userFound.email,
            profile: userFound.viewProfile()
        };


        localStorage.setItem("loggedUser", JSON.stringify(sessionData));

        window.location.href = "dashborard.html";
    }


}


