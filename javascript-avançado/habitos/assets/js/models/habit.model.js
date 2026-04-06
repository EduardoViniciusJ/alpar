class Habit {
    static #lastId = 0;

    #id = null;
    #name = '';
    #active = true;
    #createdAt = null;

    constructor() {
        Habit.#lastId++;
        this.#id = Habit.#lastId;
        this.#createdAt = new Date().toISOString();
    }

    get id() {
        return this.#id;
    }

    set id(id) {
        const normalizedId = Number(id);

        if (!Number.isInteger(normalizedId) || normalizedId <= 0) {
            throw new Error('Id must be a positive integer');
        }

        this.#id = normalizedId;

        if (normalizedId > Habit.#lastId) {
            Habit.#lastId = normalizedId;
        }
    }

    get name() {
        return this.#name;
    }

    set name(name) {
        const normalizedName = String(name || '').trim();

        if (!normalizedName) {
            throw new Error('Name cannot be empty');
        }

        if (normalizedName.length > 60) {
            throw new Error('Name is too long');
        }

        this.#name = normalizedName;
    }

    get active() {
        return this.#active;
    }

    set active(active) {
        if (active === undefined || active === null) {
            this.#active = true;
            return;
        }

        if (typeof active !== 'boolean') {
            throw new Error('Active must be a boolean');
        }

        this.#active = active;
    }

    get createdAt() {
        return this.#createdAt;
    }

    set createdAt(createdAt) {
        const normalizedCreatedAt = String(createdAt || '').trim();

        if (!normalizedCreatedAt) {
            throw new Error('CreatedAt cannot be empty');
        }

        if (Number.isNaN(new Date(normalizedCreatedAt).getTime())) {
            throw new Error('CreatedAt must be a valid date');
        }

        this.#createdAt = normalizedCreatedAt;
    }
}

window.Habit = Habit;
