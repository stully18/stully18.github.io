document.addEventListener('DOMContentLoaded', () => {

    // 1. Navbar Scroll Effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.boxShadow = "0 4px 6px rgba(0,0,0,0.3)";
        } else {
            navbar.style.boxShadow = "none";
        }
    });

    // 2. Terminal Functionality
    const terminalOutput = document.getElementById('terminal-output');
    const terminalInput = document.getElementById('terminal-input');
    const hintButtons = document.querySelectorAll('.hint-btn');
    const commandHistory = [];
    let historyIndex = -1;

    // Command definitions
    const commands = {
        help: () => `Available commands:
  <span class="prompt">about</span>     - Who I am
  <span class="prompt">skills</span>    - Tech stack
  <span class="prompt">projects</span>  - What I've built
  <span class="prompt">contact</span>   - Get in touch
  <span class="prompt">resume</span>    - Download my resume
  <span class="prompt">clear</span>     - Clear terminal`,

        about: () => `CS student at <span style="color: var(--accent)">Rider University</span>, graduating May 2027.
Concentration in Software Engineering, minor in Cybersecurity.
Currently seeking internship opportunities.

<span style="color: var(--text-secondary)">→ Scroll down for more, or type 'skills'</span>`,

        skills: () => `<span style="color: var(--accent)">Languages:</span>    Python, Java, SQL, HTML/CSS, TypeScript
<span style="color: var(--accent)">Frameworks:</span>   Flask, FastAPI, Next.js, PyTorch, Pandas
<span style="color: var(--accent)">Tools:</span>        Git, Linux, Supabase, NumPy`,

        projects: () => `<span style="color: var(--accent)">[1]</span> Net Worth Optimizer - Full-stack financial planning app
<span style="color: var(--accent)">[2]</span> AI Malware Detection - PyTorch deep learning classifier
<span style="color: var(--accent)">[3]</span> Chapter Management App - Flask web application
<span style="color: var(--accent)">[4]</span> Multithreading Analysis - Parallel computing research

Type <span class="prompt">'project 1'</span> for details, or scroll to Projects section.`,

        'project 1': () => `<span style="color: var(--accent)">Net Worth Optimizer</span>
${'─'.repeat(20)}
Helps students decide: pay off debt or invest?

<span style="color: var(--text-secondary)">Tech:</span> FastAPI, Next.js, TypeScript, Supabase, NumPy
<span style="color: var(--text-secondary)">Features:</span> Risk-adjusted portfolios, visual projections,
          ETF recommendations, user authentication

→ <a href="https://github.com/stully18/net-worth-optimizer" target="_blank">github.com/stully18/net-worth-optimizer</a>`,

        'project 2': () => `<span style="color: var(--accent)">AI Malware Detection</span>
${'─'.repeat(20)}
Deep learning model to classify files as benign or malicious.

<span style="color: var(--text-secondary)">Tech:</span> PyTorch, Pandas, NumPy, Scikit-Learn
<span style="color: var(--text-secondary)">Features:</span> Neural network classifier, Binary Cross Entropy loss,
          80/20 train-test split, high accuracy results

→ <a href="malware.html">View Case Study</a>`,

        'project 3': () => `<span style="color: var(--accent)">Chapter Management App</span>
${'─'.repeat(20)}
Full-stack web app for Sigma Phi Epsilon chapter management.

<span style="color: var(--text-secondary)">Tech:</span> Flask, Python, Pandas, SQL
<span style="color: var(--text-secondary)">Features:</span> Role-based authentication, member data management,
          automated CSV parsing, service hour tracking

→ <a href="https://github.com/stully18" target="_blank">github.com/stully18</a>`,

        'project 4': () => `<span style="color: var(--accent)">Multithreading Analysis</span>
${'─'.repeat(20)}
Research tool analyzing CPU utilization with parallel computing.

<span style="color: var(--text-secondary)">Tech:</span> Python, Threading, Performance Analysis
<span style="color: var(--text-secondary)">Results:</span> 73.5% reduction in execution time using
          parallel computing for prime number calculations

→ <a href="https://github.com/stully18" target="_blank">github.com/stully18</a>`,

        contact: () => `<span style="color: var(--accent)">Email:</span>    <a href="mailto:tullys@rider.edu">tullys@rider.edu</a>
<span style="color: var(--accent)">GitHub:</span>   <a href="https://github.com/stully18" target="_blank">github.com/stully18</a>
<span style="color: var(--accent)">LinkedIn:</span> <a href="https://www.linkedin.com/in/shane-tully-swe/" target="_blank">linkedin.com/in/shane-tully-swe</a>`,

        resume: () => {
            window.open('assets/Shane_Tully_Resume.pdf', '_blank');
            return `Opening resume...`;
        },

        clear: () => {
            terminalOutput.innerHTML = '';
            return null;
        },

        // Easter eggs
        'sudo hire me': () => `<span style="color: var(--accent)">Permission granted.</span> Check your inbox. 😉`,

        ls: () => `python.skill    java.skill      sql.skill
flask.exp       fastapi.exp     nextjs.exp
pytorch.lib     pandas.lib      numpy.lib
git.tool        linux.tool      supabase.tool`,

        'cat resume.pdf': () => {
            window.open('assets/Shane_Tully_Resume.pdf', '_blank');
            return `Opening resume.pdf...`;
        },

        whoami: () => `shane - software engineer, cs student, problem solver`,

        pwd: () => `/home/shane/portfolio`,

        date: () => new Date().toString(),
    };

    // Welcome message
    const welcomeMessage = `<span class="prompt">$</span> welcome
<span class="output">Hey, I'm <span style="color: var(--accent)">Shane Tully</span>.
Software Engineer | CS @ Rider University '27
Type <span class="prompt">'help'</span> to explore.</span>`;

    // Type text with animation
    const terminalBody = document.querySelector('.terminal-body');

    function typeText(text, element, speed = 15) {
        return new Promise((resolve) => {
            let i = 0;
            const interval = setInterval(() => {
                if (i < text.length) {
                    // Handle HTML tags - add them all at once
                    if (text[i] === '<') {
                        const closeIndex = text.indexOf('>', i);
                        element.innerHTML += text.substring(i, closeIndex + 1);
                        i = closeIndex + 1;
                    } else {
                        element.innerHTML += text[i];
                        i++;
                    }
                    // Auto-scroll to bottom
                    terminalBody.scrollTop = terminalBody.scrollHeight;
                } else {
                    clearInterval(interval);
                    resolve();
                }
            }, speed);
        });
    }

    // Execute command
    async function executeCommand(cmd) {
        const trimmedCmd = cmd.trim().toLowerCase();

        // Add command to history
        if (trimmedCmd) {
            commandHistory.push(trimmedCmd);
            historyIndex = commandHistory.length;
        }

        // Display the command
        const commandLine = document.createElement('div');
        commandLine.innerHTML = `<span class="prompt">$</span> ${cmd}`;
        commandLine.className = 'command-line';
        terminalOutput.appendChild(commandLine);

        // Get output
        let output = null;
        if (trimmedCmd === '') {
            // Empty command, just new line
        } else if (commands[trimmedCmd]) {
            output = typeof commands[trimmedCmd] === 'function'
                ? commands[trimmedCmd]()
                : commands[trimmedCmd];
        } else {
            output = `Command not found: '${trimmedCmd}'
Type <span class="prompt">'help'</span> for available commands.`;
        }

        // Display output with typing effect
        if (output) {
            const outputElement = document.createElement('span');
            outputElement.className = 'output';
            terminalOutput.appendChild(outputElement);
            await typeText(output, outputElement);
        }

        // Scroll to bottom
        terminalBody.scrollTop = terminalBody.scrollHeight;

        // Clear input
        terminalInput.value = '';
    }

    // Initialize terminal with welcome message
    async function initTerminal() {
        const welcomeElement = document.createElement('span');
        welcomeElement.className = 'output';
        terminalOutput.appendChild(welcomeElement);
        await typeText(welcomeMessage, welcomeElement, 20);
    }

    // Event listeners
    terminalInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            executeCommand(terminalInput.value);
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            if (historyIndex > 0) {
                historyIndex--;
                terminalInput.value = commandHistory[historyIndex];
            }
        } else if (e.key === 'ArrowDown') {
            e.preventDefault();
            if (historyIndex < commandHistory.length - 1) {
                historyIndex++;
                terminalInput.value = commandHistory[historyIndex];
            } else {
                historyIndex = commandHistory.length;
                terminalInput.value = '';
            }
        }
    });

    // Hint buttons
    hintButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const cmd = btn.getAttribute('data-cmd');
            executeCommand(cmd);
        });
    });

    // Focus input when clicking terminal
    document.querySelector('.terminal').addEventListener('click', () => {
        terminalInput.focus();
    });

    // Start terminal
    initTerminal();

    // 3. Smooth Scroll for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});
