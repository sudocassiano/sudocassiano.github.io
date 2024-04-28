document.getElementById('input').addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        handleCommand(this.value);
        this.value = '';
    }
});

function handleCommand(command) {
    const output = document.getElementById('output');
    switch(command.trim().toLowerCase()) {
        case 'cd linkedin':
            window.open('https://www.linkedin.com/in/yourprofile');
            break;
        case 'show languages':
            output.innerHTML += '<p>JavaScript, Python, C++...</p>';
            break;
        default:
            output.innerHTML += `<p>Command not found: ${command}</p>`;
    }
}