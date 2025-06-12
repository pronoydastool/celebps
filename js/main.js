// js/main.js

let appData = null;
let bookmarks = JSON.parse(localStorage.getItem('celebps_bookmarks')) || [];

// --- App Initialization ---
document.addEventListener('DOMContentLoaded', () => {
    // Check initial dark mode setting
    if (localStorage.getItem('celebps_theme') === 'dark') {
        document.body.setAttribute('data-theme', 'dark');
    }
    
    onAuthStateChanged(user => {
        if (user) {
            document.getElementById('side-nav').style.display = 'flex';
            document.querySelector('.app-container').style.borderRadius = '20px'; // Re-apply radius when nav is shown
            fetchAppData().then(() => {
                navigateTo('dashboard');
            });
        } else {
            document.getElementById('side-nav').style.display = 'none';
            document.querySelector('.app-container').style.borderRadius = '0'; // Go full screen for auth
            if (!localStorage.getItem('hasVisited')) {
                navigateTo('welcome');
                localStorage.setItem('hasVisited', 'true');
            } else {
                navigateTo('login');
            }
        }
    });

    addGlobalEventListeners();
    initCalculatorLogic();
});


// --- Global Event Listeners ---
function addGlobalEventListeners() {
    const mainArea = document.getElementById('main-content');
    
    // Auth form switching
    mainArea.addEventListener('click', e => {
        if (e.target.id === 'go-to-login') {
            e.preventDefault();
            navigateTo('login');
        }
        if (e.target.id === 'go-to-register') {
            e.preventDefault();
            navigateTo('welcome');
        }
    });

    // Auth form submission
    mainArea.addEventListener('submit', e => {
        if (e.target.id === 'register-form') {
            e.preventDefault();
            const form = e.target;
            const displayName = `${form.firstName.value} ${form.lastName.value}`;
            signUp(form.email.value, form.password.value, displayName)
                .catch(error => alert(`Registration failed: ${error.message}`));
        }
        if (e.target.id === 'login-form') {
            e.preventDefault();
            const form = e.target;
            logIn(form.email.value, form.password.value)
                .catch(error => alert(`Login failed: ${error.message}`));
        }
    });

    // Side navigation
    document.getElementById('side-nav').addEventListener('click', e => {
        if (e.target.classList.contains('side-nav-icon')) {
            document.querySelectorAll('.side-nav-icon').forEach(icon => icon.classList.remove('active'));
            e.target.classList.add('active');
            const navTarget = e.target.dataset.nav;
            if(navTarget) navigateTo(navTarget);
        }
    });

    // Logout button
    document.getElementById('logout-btn').addEventListener('click', () => {
        logOut();
    });

    // Settings
    mainArea.addEventListener('change', e => {
        if (e.target.id === 'dark-mode-toggle') {
            if (e.target.checked) {
                document.body.setAttribute('data-theme', 'dark');
                localStorage.setItem('celebps_theme', 'dark');
            } else {
                document.body.removeAttribute('data-theme');
                localStorage.setItem('celebps_theme', 'light');
            }
        }
    });
}


// --- Data Fetching ---
async function fetchAppData() {
    if (appData) return;
    try {
        const response = await fetch('http://127.0.0.1:8001/api/data');
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        appData = await response.json();
    } catch (error) {
        console.error('Failed to fetch app data:', error);
        alert('Could not connect to the backend server. Please ensure it is running on http://127.0.0.1:8001.');
    }
}


// --- Client-Side Router ---
function navigateTo(page, params = {}) {
    switch (page) {
        case 'welcome': renderWelcomeScreen(); break;
        case 'login': renderLoginScreen(); break;
        case 'dashboard': renderDashboard(); break;
        case 'topic': renderTopicScreen(params.topic, appData, params.type || 'articles'); break;
        case 'content': {
            const content = appData[params.topic][params.type].find(item => item.id === params.id);
            renderContentScreen(content, params);
            break;
        }
        case 'profile': renderProfileScreen(); break;
        case 'bookmarks': renderBookmarksScreen(appData); break;
        case 'calculator': renderCalculator(); break;
        case 'settings': renderSettingsScreen(); break;
        default: renderDashboard();
    }
}


// --- Feature Logic ---
function toggleBookmark(itemId, element) {
    const index = bookmarks.indexOf(itemId);
    if (index > -1) {
        bookmarks.splice(index, 1); // Remove bookmark
        element.classList.remove('bookmarked');
        element.textContent = '☆';
    } else {
        bookmarks.push(itemId); // Add bookmark
        element.classList.add('bookmarked');
        element.textContent = '★';
    }
    localStorage.setItem('celebps_bookmarks', JSON.stringify(bookmarks));
}

function initCalculatorLogic() {
    mainContent.addEventListener('click', (e) => {
        if (e.target.matches('.calc-btn')) {
            const key = e.target.dataset.key;
            const display = document.getElementById('calc-display');
            if (!display) return;
            
            let currentContent = display.textContent;

            if (key === 'AC') {
                display.textContent = '0';
            } else if (key === '=') {
                try {
                    // Replace visual operators with evaluable ones
                    currentContent = currentContent.replace(/×/g, '*').replace(/÷/g, '/');
                    display.textContent = eval(currentContent);
                } catch {
                    display.textContent = 'Error';
                }
            } else {
                if (currentContent === '0' || currentContent === 'Error') {
                    display.textContent = key;
                } else {
                    display.textContent += key;
                }
            }
        }
    });
}
