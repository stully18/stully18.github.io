# Interactive Terminal Portfolio Upgrade

## Goal
Replace the static hero section with an interactive terminal interface to create a memorable first impression that demonstrates technical ability to recruiters.

## Core Experience

### Welcome Sequence
When visitors land on the site, they see a terminal window with auto-typed welcome message:
```
$ welcome
> Hey, I'm Shane Tully.
> Software Engineer | CS @ Rider University '27
> Type 'help' to explore.
_
```

### Interaction Model
- Terminal accepts typed keyboard commands
- Commands are simple and discoverable
- Invalid commands return friendly error message
- Clickable command chips below terminal for mobile users
- Rest of portfolio (About, Projects, Contact) remains below for traditional scrolling

## Commands

| Command | Output |
|---------|--------|
| `help` | Lists all available commands |
| `about` | Brief intro (CS student, seeking internships) |
| `skills` | Tech stack formatted cleanly |
| `projects` | Numbered list of 4 projects |
| `project [n]` | Detail view for specific project |
| `contact` | Email, GitHub, LinkedIn |
| `resume` | Opens/downloads PDF |
| `clear` | Clears terminal output |

### Command Outputs

**help**
```
Available commands:
  about     - Who I am
  skills    - Tech stack
  projects  - What I've built
  contact   - Get in touch
  resume    - Download my resume
  clear     - Clear terminal
```

**about**
```
CS student at Rider University, graduating May 2027.
Concentration in Software Engineering, minor in Cybersecurity.
Currently seeking internship opportunities.

→ Scroll down for more, or type 'skills'
```

**skills**
```
Languages:    Python, Java, SQL, HTML/CSS
Frameworks:   Flask, PyTorch, Pandas
Tools:        Git, Linux, VS Code
```

**projects**
```
[1] Net Worth Optimizer - Full-stack financial planning app
[2] AI Malware Detection - PyTorch deep learning classifier
[3] Chapter Management App - Flask web application
[4] Multithreading Analysis - Parallel computing research

Type 'project 1' for details, or scroll to Projects section.
```

**project 1**
```
Net Worth Optimizer
───────────────────
Helps students decide: pay off debt or invest?

Tech: FastAPI, Next.js, TypeScript, Supabase, NumPy
Features: Risk-adjusted portfolios, visual projections,
          ETF recommendations, user authentication

→ github.com/stully18/net-worth-optimizer
```

**contact**
```
Email:    tullys@rider.edu
GitHub:   github.com/stully18
LinkedIn: linkedin.com/in/shane-tully-swe
```

## Visual Design

### Terminal Container
- Dark background (`#0d0d0d`) slightly darker than page background
- Subtle border with teal accent (`#64ffda`) glow on hover
- Rounded corners (8px)
- Fixed height (~350px) with scrollable output area

### Window Chrome
macOS-style title bar with three dots:
```
┌─ ● ● ● ─────────────────── shane@portfolio ─┐
│                                              │
│  $ welcome                                   │
│  > Hey, I'm Shane Tully.                     │
│  > Type 'help' to explore.                   │
│  _                                           │
│                                              │
└──────────────────────────────────────────────┘
```

### Typography
- Monospace font (`'Fira Code'`, `'Consolas'`, `'Monaco'`)
- Command prompt (`$`) in teal accent color
- Output text in light gray (`#e0e0e0`)
- Links highlighted in teal, underlined on hover

### Command Hints
Clickable chips below terminal:
```
[help] [about] [skills] [projects] [contact]
```

### Animation
- Blinking cursor (`|`) after prompt
- Output appears with typing effect (~20ms per character)
- Smooth scroll when output exceeds terminal height

## Technical Implementation

### HTML Structure
New `<section id="terminal">` replaces current hero containing:
- Terminal window wrapper with title bar
- Output container (scrollable div)
- Input line with prompt and text field
- Command hint buttons below

### JavaScript Functions
```
initTerminal()      - Set up event listeners, run welcome sequence
executeCommand(cmd) - Look up command, return output or error
typeOutput(text)    - Animate text appearing in terminal
clearTerminal()     - Wipe output area
scrollToSection(id) - Smooth scroll to full section
```

### Mobile Handling
- Command hint buttons trigger executeCommand() on click/tap
- Virtual keyboard appears when input is focused
- Terminal height adjusts on smaller screens (~250px)

### Accessibility
- Input field has proper `aria-label`
- Output is live region (`aria-live="polite"`) for screen readers
- All interactive elements keyboard-navigable
- Fallback static hero if JS disabled

## Fallback & Edge Cases

### No JavaScript
Show simplified static hero via `<noscript>`:
```html
<noscript>
  <div class="hero-fallback">
    <h1>Shane Tully</h1>
    <p>Software Engineer | CS @ Rider '27</p>
    <a href="#projects">View Projects</a>
  </div>
</noscript>
```

### Invalid Commands
```
$ asdfgh
Command not found: 'asdfgh'
Type 'help' for available commands.
```

### Empty Input
New prompt line, no error.

### Rapid Input
Skip animation, show full output, process new command.

### Easter Eggs (Optional)
- `sudo hire me` → "Permission granted. Check your inbox."
- `ls` → Lists skills as files
- `cat resume.pdf` → Opens resume

## Additional Updates

### Resume File
Update link from `ShaneTully_Resume.pdf` to `Shane_Tully_Resume.pdf`

### Contact Email
Update from `stullyrl@gmail.com` to `tullys@rider.edu`

### New Project
Add Net Worth Optimizer to Projects section:
- **Name**: Net Worth Optimizer
- **Description**: Full-stack financial planning app helping students decide between paying debt or investing
- **Tech**: FastAPI, Next.js, TypeScript, Supabase, NumPy, Chart.js
- **Link**: github.com/stully18/net-worth-optimizer

## Performance
- No external dependencies (vanilla JS)
- Terminal initializes after DOM ready
- Typing animation uses requestAnimationFrame for 60fps
