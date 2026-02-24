/**
 * LEARNINEER - TECH LEARNING PORTAL
 * Complete JavaScript File
 * Handles all functionality across all pages
 */

// ============================================
// DOM ELEMENTS & INITIALIZATION
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functions
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
// NAVBAR FUNCTIONALITY
// ============================================

function initNavbar() {
    const navbar = document.getElementById('navbar');
    
    if (!navbar) return;

    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

// ============================================
// DARK MODE TOGGLE
// ============================================

function initDarkMode() {
    const toggleBtn = document.getElementById('darkModeToggle');
    
    if (!toggleBtn) return;

    // Check for saved preference
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
        const icon = this.querySelector('i');
        icon.classList.toggle('fa-times');
        icon.classList.toggle('fa-bars');
    });

    // Close menu when clicking on a link
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', function() {
            navLinks.classList.remove('active');
            hamburger.querySelector('i').classList.add('fa-bars');
            hamburger.querySelector('i').classList.remove('fa-times');
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
            navLinks.classList.remove('active');
            hamburger.querySelector('i').classList.add('fa-bars');
            hamburger.querySelector('i').classList.remove('fa-times');
        }
    });
}

// ============================================
// TYPING EFFECT
// ============================================

function initTypingEffect() {
    const typedText = document.getElementById('typedText');
    
    if (!typedText) return;

    const phrases = ['Machine Learning', 'Data Structures', 'Web Development', 'Deep Learning', 'Computer Networks'];
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

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
            typingSpeed = 2000; // Pause at end
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            typingSpeed = 500; // Pause before next word
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

    // Toggle password visibility
    if (togglePassword && passwordInput) {
        togglePassword.addEventListener('click', function() {
            const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordInput.setAttribute('type', type);
            this.querySelector('i').classList.toggle('fa-eye');
            this.querySelector('i').classList.toggle('fa-eye-slash');
        });
    }

    // Form submission
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value;

        // Clear previous errors
        clearErrors();

        // Validate
        let isValid = true;

        if (!validateEmail(email)) {
            showError('emailError', 'Please enter a valid email address');
            isValid = false;
        }

        if (password.length < 6) {
            showError('passwordError', 'Password must be at least 6 characters');
            isValid = false;
        }

        if (isValid) {
            // Simulate login
            const btn = loginForm.querySelector('button[type="submit"]');
            const btnText = btn.querySelector('.btn-text');
            const originalText = btnText.textContent;
            
            btn.disabled = true;
            btnText.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Logging in...';

            setTimeout(() => {
                // Check demo credentials
                if (email === 'demo@learnineer.com' && password === 'demo123') {
                    // Save user to localStorage
                    const user = {
                        name: 'Demo User',
                        email: email,
                        isLoggedIn: true,
                        enrolledCourses: ['ML Fundamentals', 'DSA with C++']
                    };
                    localStorage.setItem('learnineerUser', JSON.stringify(user));
                    
                    showToast('Login successful! Redirecting...');
                    setTimeout(() => {
                        window.location.href = 'dashboard.html';
                    }, 1500);
                } else if (email && password) {
                    // Accept any login for demo
                    const user = {
                        name: email.split('@')[0],
                        email: email,
                        isLoggedIn: true,
                        enrolledCourses: []
                    };
                    localStorage.setItem('learnineerUser', JSON.stringify(user));
                    
                    showToast('Login successful! Redirecting...');
                    setTimeout(() => {
                        window.location.href = 'dashboard.html';
                    }, 1500);
                } else {
                    showError('passwordError', 'Invalid email or password');
                }
                
                btn.disabled = false;
                btnText.innerHTML = originalText;
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

    // Toggle password visibility
    if (togglePassword && passwordInput) {
        togglePassword.addEventListener('click', function() {
            const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordInput.setAttribute('type', type);
            this.querySelector('i').classList.toggle('fa-eye');
            this.querySelector('i').classList.toggle('fa-eye-slash');
        });
    }

    // Password strength indicator
    passwordInput.addEventListener('input', function() {
        const strength = checkPasswordStrength(this.value);
        updatePasswordStrength(strength);
    });

    // Form submission
    registerForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirmPassword').value;

        // Clear previous errors
        clearErrors();

        // Validate
        let isValid = true;

        if (name.length < 2) {
            showError('nameError', 'Name must be at least 2 characters');
            isValid = false;
        }

        if (!validateEmail(email)) {
            showError('emailError', 'Please enter a valid email address');
            isValid = false;
        }

        if (password.length < 6) {
            showError('passwordError', 'Password must be at least 6 characters');
            isValid = false;
        }

        if (password !== confirmPassword) {
            showError('confirmError', 'Passwords do not match');
            isValid = false;
        }

        if (isValid) {
            // Simulate registration
            const btn = registerForm.querySelector('button[type="submit"]');
            const btnText = btn.querySelector('.btn-text');
            const originalText = btnText.textContent;
            
            btn.disabled = true;
            btnText.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Creating account...';

            setTimeout(() => {
                // Save user to localStorage
                const user = {
                    name: name,
                    email: email,
                    isLoggedIn: true,
                    enrolledCourses: []
                };
                localStorage.setItem('learnineerUser', JSON.stringify(user));
                
                showToast('Account created successfully! Redirecting...');
                setTimeout(() => {
                    window.location.href = 'dashboard.html';
                }, 1500);
                
                btn.disabled = false;
                btnText.innerHTML = originalText;
            }, 1500);
        }
    });
}

// ============================================
// PASSWORD STRENGTH CHECKER
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
    
    strengthBar.innerHTML = `
        <div class="strength-bar">
            <div class="strength-fill" style="width: ${(strength / 6) * 100}%; background: ${colors[Math.min(strength, 5)]}"></div>
        </div>
        <span style="color: ${colors[Math.min(strength, 5)]}">${labels[Math.min(strength, 5)]}</span>
    `;
}

// ============================================
// FORM VALIDATION UTILITIES
// ============================================

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function showError(elementId, message) {
    const errorEl = document.getElementById(elementId);
    if (errorEl) {
        errorEl.textContent = message;
        errorEl.style.display = 'block';
    }
}

function clearErrors() {
    document.querySelectorAll('.error-message').forEach(el => {
        el.textContent = '';
        el.style.display = 'none';
    });
}

// ============================================
// COURSE FILTERING
// ============================================

function initCourseFiltering() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const courseCards = document.querySelectorAll('.course-card');
    const searchInput = document.getElementById('courseSearch');

    if (filterButtons.length === 0) return;

    // Filter button click
    filterButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all
            filterButtons.forEach(b => b.classList.remove('active'));
            // Add active to clicked
            this.classList.add('active');

            const filter = this.getAttribute('data-filter');
            
            courseCards.forEach(card => {
                const category = card.getAttribute('data-category');
                
                if (filter === 'all' || category === filter) {
                    card.style.display = 'block';
                    card.style.animation = 'fadeIn 0.5s ease';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // Search functionality
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            
            courseCards.forEach(card => {
                const title = card.querySelector('h3').textContent.toLowerCase();
                const description = card.querySelector('p').textContent.toLowerCase();
                const category = card.querySelector('.course-category').textContent.toLowerCase();
                
                if (title.includes(searchTerm) || description.includes(searchTerm) || category.includes(searchTerm)) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    }
}

// ============================================
// QUIZ FUNCTIONALITY
// ============================================

function initQuiz() {
    const quizContainer = document.getElementById('quizContainer');
    
    if (!quizContainer) return;

    // Quiz questions data
    const quizQuestions = [
        {
            question: "What is Machine Learning primarily concerned with?",
            options: [
                "Writing code manually",
                "Systems that learn from data",
                "Building hardware",
                "Network configuration"
            ],
            correct: 1
        },
        {
            question: "Which type of learning uses labeled data?",
            options: [
                "Unsupervised Learning",
                "Supervised Learning",
                "Reinforcement Learning",
                "Transfer Learning"
            ],
            correct: 1
        },
        {
            question: "What is a neural network inspired by?",
            options: [
                "Computer hardware",
                "Human brain",
                "Solar system",
                "Ocean waves"
            ],
            correct: 1
        },
        {
            question: "Which algorithm is commonly used for classification?",
            options: [
                "Linear Regression",
                "Logistic Regression",
                "K-Means",
                "PCA"
            ],
            correct: 1
        },
        {
            question: "What does 'overfitting' mean in ML?",
            options: [
                "Model is too simple",
                "Model performs well on training but poorly on test data",
                "Model is perfectly trained",
                "Model has no bias"
            ],
            correct: 1
        }
    ];

    let currentQuestion = 0;
    let score = 0;
    let userAnswers = [];
    let timeLeft = 15 * 60; // 15 minutes
    let timerInterval;

    const questionText = document.getElementById('questionText');
    const optionsContainer = document.getElementById('optionsContainer');
    const currentQuestionEl = document.getElementById('currentQuestion');
    const totalQuestionsEl = document.getElementById('totalQuestions');
    const quizProgressBar = document.getElementById('quizProgressBar');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const timerEl = document.getElementById('timeLeft');

    // Initialize quiz
    function initQuiz() {
        totalQuestionsEl.textContent = quizQuestions.length;
        loadQuestion(currentQuestion);
        startTimer();
    }

    // Load question
    function loadQuestion(index) {
        const question = quizQuestions[index];
        
        questionText.textContent = question.question;
        currentQuestionEl.textContent = index + 1;
        
        // Update progress bar
        quizProgressBar.style.width = ((index + 1) / quizQuestions.length * 100) + '%';
        
        // Generate options
        optionsContainer.innerHTML = '';
        
        question.options.forEach((option, i) => {
            const optionEl = document.createElement('div');
            optionEl.className = 'option';
            if (userAnswers[index] === i) {
                optionEl.classList.add('selected');
            }
            optionEl.innerHTML = `
                <span class="option-letter">${String.fromCharCode(65 + i)}</span>
                <span class="option-text">${option}</span>
            `;
            
            optionEl.addEventListener('click', function() {
                selectOption(i);
            });
            
            optionsContainer.appendChild(optionEl);
        });

        // Update buttons
        prevBtn.disabled = index === 0;
        nextBtn.textContent = index === quizQuestions.length - 1 ? 'Submit' : 'Next';
    }

    // Select option
    function selectOption(optionIndex) {
        userAnswers[currentQuestion] = optionIndex;
        
        const options = document.querySelectorAll('.option');
        options.forEach((opt, i) => {
            if (i === optionIndex) {
                opt.classList.add('selected');
            } else {
                opt.classList.remove('selected');
            }