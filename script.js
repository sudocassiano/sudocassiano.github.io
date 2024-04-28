document.getElementById('input').addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        handleCommand(this.value);
        this.value = '';
    } else if (event.ctrlKey && event.key === 'l') {
        document.getElementById('output').innerHTML = '';
    }
});

function handleCommand(command) {
    const output = document.getElementById('output');
    const cmd = command.trim().split(' ');
    switch(cmd[0].toLowerCase()) {
        case 'get':
            if (cmd[1] === 'linkedin') {
                window.open('https://www.linkedin.com/in/yourprofile');
            } else if (cmd[1] === 'facebook') {
                window.open('https://www.facebook.com/yourprofile');
            } else if (cmd[1] === 'twitter') {
                window.open('https://twitter.com/yourprofile');
            } else if (cmd[1] === 'youtube') {
                window.open('https://www.youtube.com/user/yourchannel');
            } else {
                output.innerHTML += `<p>Directory not found: ${cmd[1]}</p>`;
            }
            break;
        case 'get':
            handleGet(cmd.slice(1).join(' '));
            break;
        case 'help':
            if (cmd[1] === 'get') {
                output.innerHTML += '<p>Use "get <list>" to open social media links. Available: linkedin, facebook, twitter, youtube.</p>';
            } else {
                output.innerHTML += '<p>Available commands:<br>- get [linkedin, facebook, twitter, youtube]<br>- get <list><br>- help [command]</p>';
            }
            break;
        default:
            output.innerHTML += `<p>Command not found: ${command}</p>`;
    }
}

function handleGet(list) {
    const output = document.getElementById('output');
    const listItems = list.split(',');
    listItems.forEach(item => {
        switch(item.trim()) {
            case 'linkedin':
                window.open('https://www.linkedin.com/in/yourprofile');
                break;
            case 'facebook':
                window.open('https://www.facebook.com/yourprofile');
                break;
            case 'twitter':
                window.open('https://twitter.com/yourprofile');
                break;
            case 'youtube':
                window.open('https://www.youtube.com/user/yourchannel');
                break;
            default:
                output.innerHTML += `<p>List item not found: ${item}</p>`;
        }
    });
}