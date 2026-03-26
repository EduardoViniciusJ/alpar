class Teacher extends User {
    #subject;

    constructor(name, email, password, subject) {
        super(name, email, password);
        this.#subject = subject;
    }

    get subject() {
        return this.#subject;
    }

    viewProfile() {
        return `${super.viewProfile()} | Matéria: ${this.#subject}`;
    }
}