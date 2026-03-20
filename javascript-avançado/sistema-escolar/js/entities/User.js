class User {
    #name
    #email
    #password

    constructor(name, email, password) {
        this.#name = name;
        this.#password = password;

        this.email = email;
    }

    get name() {
        return this.#name;
    }

    get email() {
        return this.#email;
    }

    set email(email) {
        if (email.includes("@")) {
            this.#email = email;
        } else {
            throw new Error("Formato de e-mail inválido!");
        }
    }

    checkPassword(passwordDigitada) {
        return this.#password === passwordDigitada;
    }


    viewProfile() {
        return `Nome: ${this.#name} | Email: ${this.#email}`;
    }
}

