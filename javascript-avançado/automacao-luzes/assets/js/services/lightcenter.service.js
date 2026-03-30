class LightCenter {
    static #instance = null;

    constructor() {
        if (LightCenter.#instance) {
            return LightCenter.#instance;
        }
        LightCenter.#instance = this;
    }

    static getInstance() {
        if (!LightCenter.#instance) {
            new LightCenter();
        }
        return LightCenter.#instance;
    }

    turnOn(roomName) {
        const roomDiv = document.getElementById(roomName.toLowerCase());
        const display = document.getElementById('status-display');

        if (roomDiv) {
            roomDiv.classList.add('lit');
            display.innerText = `Luz do ${roomName} ligada`;
            console.log(`[${roomName.toUpperCase()}] Light is ON`);
        }
    }

    turnOff(roomName) {
        const roomDiv = document.getElementById(roomName.toLowerCase());
        const display = document.getElementById('status-display');

        if (roomDiv) {
            roomDiv.classList.remove('lit');
            display.innerText = `Luz do ${roomName} desligada`;
            console.log(`[${roomName.toUpperCase()}] Light is OFF`);
        }
    }
}
