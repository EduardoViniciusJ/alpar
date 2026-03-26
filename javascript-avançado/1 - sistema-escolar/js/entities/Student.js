class Student extends User {
    #grade;

    constructor(name, email, password, grade) {
        super(name, email, password);
        this.#grade = grade;
    }

    get grade() {
        return this.#grade;
    }

    viewProfile() {
        return `${super.viewProfile()} | Turma: ${this.#grade}`;
    }
}