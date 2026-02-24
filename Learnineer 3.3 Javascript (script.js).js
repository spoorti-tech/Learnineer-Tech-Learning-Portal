/**
 * LEARNINEER - TECH LEARNING PORTAL
 * Complete JavaScript File
 */

// ============================================
// INITIALIZATION
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    initNavbar();
    initDarkMode();
    initMobileMenu();
    initTypingEffect();
    initLoginForm();
    initRegisterForm();
    initCourseFiltering();
    initQuiz();
    initContactForm();
    initFAQ();
    initBookmarks();
    loadUserData();
    initNewsletterForm();
    initScrollAnimations();
});

// ============================================
// NAVBAR
// ============================================

function initNavbar() {
    const navbar = document.getElementById('navbar');
    if (!navbar) return;
    window.addEventListener('scroll', function() {
        navbar.classList.toggle('scrolled', window.scrollY > 50);
    });
}

// ============================================
// DARK MODE
// ============================================

function initDarkMode() {
    const toggleBtn = document.getElementById('darkModeToggle');
    if (!toggleBtn) return;

    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.setAttribute('data-theme', 'dark');
        toggleBtn.innerHTML = '<i class="fas fa-sun"></i>';
    }

    toggleBtn.addEventListener('click', function() {
        const currentTheme = document.body.getAttribute('data-theme');
        if (currentTheme === 'dark') {
            document.body.setAttribute('data-theme', 'light');
            localStorage.setItem('theme', 'light');
            toggleBtn.innerHTML = '<i class="fas fa-moon"></i>';
        } else {
            document.body.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
            toggleBtn.innerHTML = '<i class="fas fa-sun"></i>';
        }
    });
}

// ============================================
// MOBILE MENU
// ============================================

function initMobileMenu() {
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');
    if (!hamburger || !navLinks) return;

    hamburger.addEventListener('click', function() {
        navLinks.classList.toggle('active');
        this.querySelector('i').classList.toggle('fa-times');
        this.querySelector('i').classList.toggle('fa-bars');
    });

    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            hamburger.querySelector('i').classList.add('fa-bars');
            hamburger.querySelector('i').classList.remove('fa-times');
        });
    });
}

// ============================================
// TYPING EFFECT
// ============================================

function initTypingEffect() {
    const typedText = document.getElementById('typedText');
    if (!typedText) return;

    const phrases = ['Machine Learning', 'Data Structures', 'Web Development', 'Deep Learning', 'Computer Networks'];
    let phraseIndex = 0, charIndex = 0, isDeleting = false, typingSpeed = 100;

    function type() {
        const currentPhrase = phrases[phraseIndex];
        if (isDeleting) {
            typedText.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50;
        } else {
            typedText.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100;
        }

        if (!isDeleting && charIndex === currentPhrase.length) {
            isDeleting = true;
            typingSpeed = 2000;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            typingSpeed = 500;
        }
        setTimeout(type, typingSpeed);
    }
    type();
}

// ============================================
// LOGIN FORM
// ============================================

function initLoginForm() {
    const loginForm = document.getElementById('loginForm');
    if (!loginForm) return;

    const togglePassword = document.getElementById('togglePassword');
    const passwordInput = document.getElementById('password');

    if (togglePassword && passwordInput) {
        togglePassword.addEventListener('click', function() {
            const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordInput.setAttribute('type', type);
            this.querySelector('i').classList.toggle('fa-eye');
            this.querySelector('i').classList.toggle('fa-eye-slash');
        });
    }

    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value;
        clearErrors();
        
        let isValid = true;
        if (!validateEmail(email)) {
            showError('emailError', 'Please enter a valid email');
            isValid = false;
        }
        if (password.length < 6) {
            showError('passwordError', 'Password must be at least 6 characters');
            isValid = false;
        }

        if (isValid) {
            const btn = loginForm.querySelector('button[type="submit"]');
            btn.disabled = true;
            btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Logging in...';

            setTimeout(() => {
                const user = {
                    name: email === 'demo@learnineer.com' ? 'Demo User' : email.split('@')[0],
                    email: email,
                    isLoggedIn: true,
                    enrolledCourses: email === 'demo@learnineer.com' ? ['ML Fundamentals', 'DSA with C++'] : []
                };
                localStorage.setItem('learnineerUser', JSON.stringify(user));
                showToast('Login successful! Redirecting...');
                setTimeout(() => window.location.href = 'dashboard.html', 1500);
                btn.disabled = false;
                btn.innerHTML = '<span class="btn-text">Login</span>';
            }, 1500);
        }
    });
}

// ============================================
// REGISTER FORM
// ============================================

function initRegisterForm() {
    const registerForm = document.getElementById('registerForm');
    if (!registerForm) return;

    const togglePassword = document.getElementById('togglePassword');
    const passwordInput = document.getElementById('password');

    if (togglePassword && passwordInput) {
        togglePassword.addEventListener('click', function() {
            const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordInput.setAttribute('type', type);
            this.querySelector('i').classList.toggle('fa-eye');
            this.querySelector('i').classList.toggle('fa-eye-slash');
        });
    }

    if (passwordInput) {
        passwordInput.addEventListener('input', function() {
            updatePasswordStrength(checkPasswordStrength(this.value));
        });
    }

    registerForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirmPassword').value;
        clearErrors();

        let isValid = true;
        if (name.length < 2) { showError('nameError', 'Name must be at least 2 characters'); isValid = false; }
        if (!validateEmail(email)) { showError('emailError', 'Please enter a valid email'); isValid = false; }
        if (password.length < 6) { showError('passwordError', 'Password must be at least 6 characters'); isValid = false; }
        if (password !== confirmPassword) { showError('confirmError', 'Passwords do not match'); isValid = false; }

        if (isValid) {
            const btn = registerForm.querySelector('button[type="submit"]');
            btn.disabled = true;
            btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Creating account...';

            setTimeout(() => {
                const user = { name: name, email: email, isLoggedIn: true, enrolledCourses: [] };
                localStorage.setItem('learnineerUser', JSON.stringify(user));
                showToast('Account created! Redirecting...');
                setTimeout(() => window.location.href = 'dashboard.html', 1500);
                btn.disabled = false;
                btn.innerHTML = '<span class="btn-text">Register</span>';
            }, 1500);
        }
    });
}

// ============================================
// PASSWORD STRENGTH
// ============================================

function checkPasswordStrength(password) {
    let strength = 0;
    if (password.length >= 6) strength++;
    if (password.length >= 10) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^a-zA-Z0-9]/.test(password)) strength++;
    return strength;
}

function updatePasswordStrength(strength) {
    const strengthBar = document.getElementById('passwordStrength');
    if (!strengthBar) return;
    const colors = ['#ef4444', '#f59e0b', '#eab308', '#22c55e', '#10b981', '#059669'];
    const labels = ['Very Weak', 'Weak', 'Fair', 'Good', 'Strong', 'Very Strong'];
    strengthBar.innerHTML = `<div class="strength-bar"><div class="strength-fill" style="width:${(strength/6)*100}%;background:${colors[Math.min(strength,5)]}"></div></div><span style="color:${colors[Math.min(strength,5)]}">${labels[Math.min(strength,5)]}</span>`;
}

// ============================================
// VALIDATION UTILITIES
// ============================================

function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function showError(elementId, message) {
    const el = document.getElementById(elementId);
    if (el) { el.textContent = message; el.style.display = 'block'; }
}

function clearErrors() {
    document.querySelectorAll('.error-message').forEach(el => { el.textContent = ''; el.style.display = 'none'; });
}

// ============================================
// COURSE FILTERING
// ============================================

function initCourseFiltering() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const courseCards = document.querySelectorAll('.course-card');
    const searchInput = document.getElementById('courseSearch');
    if (filterButtons.length === 0) return;

    filterButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            filterButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            const filter = this.getAttribute('data-filter');
            courseCards.forEach(card => {
                const category = card.getAttribute('data-category');
                card.style.display = (filter === 'all' || category === filter) ? 'block' : 'none';
            });
        });
    });

    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const term = this.value.toLowerCase();
            courseCards.forEach(card => {
                const title = card.querySelector('h3').textContent.toLowerCase();
                const desc = card.querySelector('p').textContent.toLowerCase();
                card.style.display = (title.includes(term) || desc.includes(term)) ? 'block' : 'none';
            });
        });
    }
}

// ============================================
// QUIZ
// ============================================

function initQuiz() {
    const quizContainer = document.getElementById('quizContainer');
    if (!quizContainer) return;

    const questions = [
        { q: "What is Machine Learning primarily concerned with?", o: ["Writing code manually", "Systems that learn from data", "Building hardware", "Network configuration"], c: 1 },
        { q: "Which type of learning uses labeled data?", o: ["Unsupervised Learning", "Supervised Learning", "Reinforcement Learning", "Transfer Learning"], c: 1 },
        { q: "What is a neural network inspired by?", o: ["Computer hardware", "Human brain", "Solar system", "Ocean waves"], c: 1 },
        { q: "Which algorithm is commonly used for classification?", o: ["Linear Regression", "Logistic Regression", "K-Means", "PCA"], c: 1 },
        { q: "What does 'overfitting' mean in ML?", o: ["Model is too simple", "Model performs well on training but poorly on test data", "Model is perfectly trained", "Model has no bias"], c: 1 }
    ];

    let currentQ = 0, score = 0, answers = [], timeLeft = 15 * 60, timerInterval;
    
    const qText = document.getElementById('questionText');
    const optContainer = document.getElementById('optionsContainer');
    const currQEl = document.getElementById('currentQuestion');
    const totQEl = document.getElementById('totalQuestions');
    const progBar = document.getElementById('quizProgressBar');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const timerEl = document.getElementById('timeLeft');

    function loadQ(index) {
        const q = questions[index];
        qText.textContent = q.q;
        currQEl.textContent = index + 1;
        totQEl.textContent = questions.length;
        progBar.style.width = ((index + 1) / questions.length * 100) + '%';
        
        optContainer.innerHTML = '';
        q.o.forEach((opt, i) => {
            const el = document.createElement('div');
            el.className = 'option' + (answers[index] === i ? ' selected' : '');
            el.innerHTML = `<span class="option-letter">${String.fromCharCode(65+i)}</span><span class="option-text">${opt}</span>`;
            el.onclick = () => { answers[index] = i; document.querySelectorAll('.option').forEach(o => o.classList.remove('selected')); el.classList.add('selected'); };
            optContainer.appendChild(el);
        });

        prevBtn.disabled = index === 0;
        nextBtn.textContent = index === questions.length - 1 ? 'Submit' : 'Next';
    }

    function startTimer() {
        timerInterval = setInterval(() => {
            timeLeft--;
            const m = Math.floor(timeLeft / 60), s = timeLeft % 60;
            timerEl.textContent = `${m.toString().padStart(2,'0')}:${s.toString().padStart(2,'0')}`;
            if (timeLeft <= 0) { clearInterval(timerInterval); submitQuiz(); }
        }, 1000);
    }

    function submitQuiz() {
        clearInterval(timerInterval);
        score = answers.reduce((s, a, i) => s + (a === questions[i].c ? 1 : 0), 0);
        const pct = (score / questions.length) * 100;
        
        document.getElementById('quizContainer').classList.add('hidden');
        document.getElementById('quizResult').classList.remove('hidden');
        document.getElementById('scoreValue').textContent = score;
        document.getElementById('totalScore').textContent = questions.length;
        document.getElementById('scorePercentage').textContent = pct + '%';
        
        const msg = document.getElementById('resultMessage');
        if (pct >= 80) { msg.textContent = 'Excellent! You have a great understanding!'; msg.style.color = '#22c55e'; }
        else if (pct >= 60) { msg.textContent = 'Good job! Keep practicing!'; msg.style.color = '#f59e0b'; }
        else { msg.textContent = 'Keep learning and try again!'; msg.style.color = '#ef4444'; }
    }

    if (nextBtn) {
        nextBtn.onclick = () => {
            if (currentQ < questions.length - 1) { currentQ++; loadQ(currentQ); }
            else { submitQuiz(); }
        };
    }
    if (prevBtn) prevBtn.onclick = () => { if (currentQ > 0) { currentQ--; loadQ(currentQ); } };
    
    const retryBtn = document.getElementById('retryBtn');
    if (retryBtn) retryBtn.onclick = () => { currentQ = 0; score = 0; answers = []; timeLeft = 15*60; document.getElementById('quizContainer').classList.remove('hidden'); document.getElementById('quizResult').classList.add('hidden'); loadQ(0); startTimer(); };

    loadQ(0);
    startTimer();
}

// ============================================
// CONTACT FORM
// ============================================

function initContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        const btn = form.querySelector('button[type="submit"]');
        const originalText = btn.innerHTML;
        
        btn.disabled = true;
        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';

        setTimeout(() => {
            showToast('Message sent successfully! We\'ll get back to you soon.');
            form.reset();
            btn.disabled = false;
            btn.innerHTML = originalText;
        }, 1500);
    });
}

// ============================================
// FAQ
// ============================================

function initFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    if (faqItems.length === 0) return;

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            item.classList.toggle('active');
        });
    });
}

// ============================================
// BOOKMARKS
// ============================================

function initBookmarks() {
    const bookmarkBtns = document.querySelectorAll('.bookmark-btn');
    if (bookmarkBtns.length === 0) return;

    bookmarkBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            this.querySelector('i').classList.toggle('far');
            this.querySelector('i').classList.toggle('fas');
            showToast(this