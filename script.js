document.getElementById('input').addEventListener('keydown', function(event) {
    if (event.ctrlKey && event.key === 'c') {
        displayOutput(`$ ${this.value} (cancelled)`);  
        this.value = ''; 
        event.preventDefault(); 
    } else if (event.ctrlKey && event.key === 'l') {
        document.getElementById('output').innerHTML = ''; 
        event.preventDefault(); 
    } else if (event.key === 'Enter') {
        displayOutput(`$ ${this.value}`); 
        handleCommand(this.value); 
        commandHistory.push(this.value); 
        historyIndex = commandHistory.length; 
        this.value = ''; 
        event.preventDefault(); 
    } else if (event.key === 'ArrowUp') {
        if (historyIndex > 0) {
            historyIndex--; 
            this.value = commandHistory[historyIndex]; 
            event.preventDefault(); 
        }
    } else if (event.key === 'ArrowDown') {
        if (historyIndex < commandHistory.length - 1) {
            historyIndex++; 
            this.value = commandHistory[historyIndex]; 
        } else if (historyIndex === commandHistory.length - 1) {
            historyIndex++;
            this.value = ''; 
        }
    }
});

const commandHistory = []; 
let historyIndex = 0; 

const commands = {
    "get": {
        description: "Fetch social media profiles.",
        execute: function(args) {
            if (args === '--help' || args === '-h') {
                displayOutput(commands['get'].help);
            } else {
                const socialLinks = {
                    "linkedin": "https://www.linkedin.com/in/cassianoamarinho",
                    "github": "https://github.com/sudocassiano",
                };
                if (socialLinks[args]) {
                    window.open(socialLinks[args]);
                } else {
                    displayOutput(`No social media found for ${args}. Try include -h to get for more info.`);
                }
            }
        },
        help: "Usage: get [options] <br> Available options: [linkedin, github]"
    },
    "domains": {
        description: "List all custom domains.",
        execute: function(args) {
            if (args === '--help' || args === '-h') {
                displayOutput(commands['domains'].help);
            } else {
                const domains = [
                    "brega.cassiano.link",
                    "espinafre.cassiano.link",
                    "kernel.cassiano.link",
                    "mpb.cassiano.link",
                    "nada.cassiano.link",
                    "rocknroll.cassiano.link",
                    "setthefuckup.cassiano.link",
                    "treshorasdamanha.cassiano.link",
                    "work.cassiano.link"
                ];
                displayOutput("Available domains:<br>- " + domains.join("<br>- "));
            }
        },
        help: "Usage: domains"
    },
    "open": {
        description: "Open a specified domain.",
        execute: function(args) {
            if (args === '--help' || args === '-h') {
                displayOutput(commands['open'].help);
            } else {
                const argss = [
                    "brega.cassiano.link",
                    "espinafre.cassiano.link",
                    "kernel.cassiano.link",
                    "mpb.cassiano.link",
                    "nada.cassiano.link",
                    "rocknroll.cassiano.link",
                    "setthefuckup.cassiano.link",
                    "treshorasdamanha.cassiano.link",
                    "work.cassiano.link"
                ];
                if (argss.includes(args)) {
                    window.open(`http://${args}`);
                } else {
                    displayOutput(`Domain not found: ${args}. Try 'domains' to see all available domains.`);
                }
            }
        },
        help: "Usage: open [domain] <br> Example: open brega.cassiano.link"
    },
    "commands": {
        description: "Display all comands avaliable.",
        execute: function(args) {
            if (args === '--help' || args === '-h') {
                displayOutput(commands['commands'].help);
            } else {
                displayOutput("Available commands:<br> - " + Object.keys(commands).join("<br> - "));
            }
        },
        help: "Usage: commands"
    },
    "pudim": {
        description: "Open the best website.",
        execute: function(args) {
            if (args === '--help' || args === '-h') {
                displayOutput(commands['pudim'].help);
            } else {
                window.open("https://www.pudim.com.br/");
            }
        },
        help: "Usage: pudim"
    }
};

function handleCommand(input) {
    const parts = input.split(' ');
    const command = parts[0];
    const args = parts.slice(1).join(' ');

    if (commands[command]) {
        commands[command].execute(args);
    } else {
        displayOutput(`Command not found: ${command}. Try 'commands' for a list of commands.`);
    }
}

function displayOutput(message) {
    const output = document.getElementById('output');
    output.innerHTML += `<p>${message}</p>`; 
    document.getElementById('input').focus(); 
}