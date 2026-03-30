const central = LightCenter.getInstance();
const buttons = document.querySelectorAll('button[data-comodo]');

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const room = button.getAttribute('data-comodo');
        const action = button.getAttribute('data-acao');

        if (action === 'ligar') {
            central.turnOn(room);
        } else {
            central.turnOff(room);
        }
    });
});