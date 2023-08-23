window.addEventListener('DOMContentLoaded', (event) => {
    console.log('DOMContentLoaded!!');
    new Game().start()
});
window.addEventListener('beforeunload', (event) => {
    console.log('beforeunload!!');
});

