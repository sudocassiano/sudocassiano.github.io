document.getElementById('input').addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        handleCommand(this.value);
        this.value = '';
    }
});

const commands = {
    "get": {
        description: "Fetch social media profiles.",
        execute: function(args) {
            const socialLinks = {
                "linkedin": "https://www.linkedin.com/in/yourprofile",
                "github": "https://github.com/yourprofile",
                "bluesky": "https://bluesky.com/yourprofile"
            };
            if (socialLinks[args]) {
                window.open(socialLinks[args]);
            } else {
                displayOutput(`No social media found for ${args}. Try --help get for more info.`);
            }
        },
        help: "Usage: get <social_media>\nAvailable options: linkedin, github, bluesky"
    },
    "list domains": {
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
        help: "Usage: list domains"
    },
    "open domain": {
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
                displayOutput(`Domain not found: ${domain}. Try 'list domains' to see all available domains.`);
            }
        },
        help: "Usage: open domain <domain>\nExample: open domain brega.cassiano.link"
    },
    "--help": {
        description: "Display help information.",
        execute: function(command) {
            if (commands[command]) {
                displayOutput(commands[command].help);
            } else {
                displayOutput("Available commands:\n" + Object.keys(commands).join("\n"));
            }
        },
        help: "Usage: --help [command]"
    }
};

function handleCommand(input) {
    const parts = input.split(' ');
    const command = parts[0];
    const args = parts.slice(1).join(' ');

    if (commands[command]) {
        commands[command].execute(args);
    } else {
        displayOutput(`Command not found: ${command}. Try --help for a list of commands.`);
    }
}

function displayOutput(message) {
    const output = document.getElementById('output');
    output.innerHTML += `<p>${message}</p>`;
}