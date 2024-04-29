document.getElementById('input').addEventListener('keydown', function(event) {
    if (event.ctrlKey && event.key === 'c') {
        displayOutput(`$ ${this.value} (cancelled)`);  // Mostra o comando como cancelado
        this.value = ''; // Limpa o campo de entrada
        event.preventDefault(); // Impede o comportamento padrão
    } else if (event.ctrlKey && event.key === 'l') {
        document.getElementById('output').innerHTML = ''; // Limpa o terminal
        event.preventDefault(); // Impede o comportamento padrão
    } else if (event.key === 'Enter') {
        displayOutput(`$ ${this.value}`); // Exibe o comando na saída antes de executar
        handleCommand(this.value); // Manipula o comando
        commandHistory.push(this.value); // Armazena no histórico
        historyIndex = commandHistory.length; // Atualiza o índice
        this.value = ''; // Limpa o campo de entrada
        event.preventDefault(); // Impede o envio do formulário
    } else if (event.key === 'ArrowUp') {
        if (historyIndex > 0) {
            historyIndex--; // Navega pelo histórico
            this.value = commandHistory[historyIndex]; // Exibe o comando anterior
            event.preventDefault(); // Impede o cursor de se mover
        }
    } else if (event.key === 'ArrowDown') {
        if (historyIndex < commandHistory.length - 1) {
            historyIndex++; // Navega pelo histórico
            this.value = commandHistory[historyIndex]; // Exibe o comando seguinte
        } else if (historyIndex === commandHistory.length - 1) {
            historyIndex++;
            this.value = ''; // Limpa o campo se estiver no fim do histórico
        }
    }
});

const commandHistory = []; // Armazena o histórico de comandos
let historyIndex = 0; // Índice atual no histórico

// Aqui permanecem suas definições de comandos como antes
const commands = {
    "get": {
        description: "Fetch social media profiles.",
        execute: function(args) {
            const socialLinks = {
                "linkedin": "https://www.linkedin.com/in/cassianoamarinho",
                "github": "https://github.com/sudocassiano",
            };
            if (socialLinks[args]) {
                window.open(socialLinks[args]);
            } else {
                displayOutput(`No social media found for ${args}. Try 'help <command>' to get for more info.`);
            }
        },
        help: "Usage: get <social_media>\nAvailable options: linkedin, github"
    },
    "domains": {
        description: "List all custom domains.",
        execute: function() {
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
            displayOutput("Available domains:\n- " + domains.join("\n- "));
        },
        help: "Usage: domains"
    },
    "open": {
        description: "Open a specified domain.",
        execute: function(domain) {
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
            if (domains.includes(domain)) {
                window.open(`http://${domain}`);
            } else {
                displayOutput(`Domain not found: ${domain}. Try 'domains' to see all available domains.`);
            }
        },
        help: "Usage: open <domain>\nExample: open brega.cassiano.link"
    },
    "help": {
        description: "Display help information.",
        execute: function(command) {
            if (commands[command]) {
                displayOutput(commands[command].help);
            } else {
                displayOutput("Available commands:\n" + Object.keys(commands).join("\n"));
            }
        },
        help: "Usage: help [command]"
    },
    "pudim": {
        description: "Redirect to the Pudim website.",
        execute: function() {
            window.open("https://www.pudim.com.br/");
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
        displayOutput(`Command not found: ${command}. Try help for a list of commands.`);
    }
}

function displayOutput(message) {
    const output = document.getElementById('output');
    output.innerHTML += `<p>${message}</p>`; // Adiciona a mensagem ao terminal
    document.getElementById('input').focus(); // Mantém o foco no campo de entrada
}