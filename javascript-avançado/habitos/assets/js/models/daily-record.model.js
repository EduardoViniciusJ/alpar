class DailyRecord {
    #date = null;
    #moodLevel = null;
    #note = '';
    #habits = [];

    constructor() {
        this.#date = new Date().toISOString().split('T')[0];
    }

    get date() {
        return this.#date;
    }

    set date(date) {
        const normalizedDate = String(date || '').trim();

        if (!normalizedDate) {
            throw new Error('Data não pode estar vazia');
        }

        if (Number.isNaN(new Date(normalizedDate).getTime())) {
            throw new Error('Data deve ser válida');
        }

        this.#date = normalizedDate;
    }

    get moodLevel() {
        return this.#moodLevel;
    }

    set moodLevel(moodLevel) {
        if (moodLevel === null || moodLevel === undefined || moodLevel === '') {
            this.#moodLevel = null;
            return;
        }

        const normalizedMoodLevel = Number(moodLevel);

        if (!Number.isInteger(normalizedMoodLevel) || normalizedMoodLevel < 1 || normalizedMoodLevel > 4) {
            throw new Error('Nível de humor deve estar entre 1 e 4');
        }

        this.#moodLevel = normalizedMoodLevel;
    }

    get note() {
        return this.#note;
    }

    set note(note) {
        const normalizedNote = String(note || '').trim();

        if (normalizedNote.length > 300) {
            throw new Error('Nota é muito longa');
        }

        this.#note = normalizedNote;
    }

    get habits() {
        return this.#habits;
    }

    set habits(habits) {
        if (!Array.isArray(habits)) {
            throw new Error('Hábitos deve ser um array');
        }

        this.#habits = habits;
    }
}

window.DailyRecord = DailyRecord;
