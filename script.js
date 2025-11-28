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

    // 2. Typewriter Effect for Hero Text
    const textElement = document.querySelector('.typewriter-text');
    const textToType = "Hi I am Shane,";
    const spanText = " a software engineer.";
    let i = 0;
    
    // Clear initial text to start animation
    textElement.innerHTML = `<span id="main-text"></span><span class="highlight" id="span-text"></span>`;
    
    const mainTextSpan = document.getElementById('main-text');
    const highlightSpan = document.getElementById('span-text');

    function typeWriter() {
        if (i < textToType.length) {
            mainTextSpan.textContent += textToType.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
        } else {
            // Once main text is done, type the highlighted part
            typeHighlight();
        }
    }

    let j = 0;
    function typeHighlight() {
        if (j < spanText.length) {
            highlightSpan.textContent += spanText.charAt(j);
            j++;
            setTimeout(typeHighlight, 100);
        }
    }

    // Start the typing effect
    setTimeout(typeWriter, 500);

    // 3. Smooth Scroll for Anchor Links (Optional fix for older browsers)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});