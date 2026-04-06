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
            throw new Error('Date cannot be empty');
        }

        if (Number.isNaN(new Date(normalizedDate).getTime())) {
            throw new Error('Date must be valid');
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
            throw new Error('Mood level must be between 1 and 4');
        }

        this.#moodLevel = normalizedMoodLevel;
    }

    get note() {
        return this.#note;
    }

    set note(note) {
        const normalizedNote = String(note || '').trim();

        if (normalizedNote.length > 300) {
            throw new Error('Note is too long');
        }

        this.#note = normalizedNote;
    }

    get habits() {
        return this.#habits;
    }

    set habits(habits) {
        if (!Array.isArray(habits)) {
            throw new Error('Habits must be an array');
        }

        this.#habits = habits;
    }
}

window.DailyRecord = DailyRecord;
