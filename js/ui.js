// js/ui.js

const mainContent = document.getElementById('main-content');

// Helper to activate a screen
function showScreen(screenId) {
    document.querySelectorAll('.screen').forEach(screen => screen.classList.remove('active'));
    const activeScreen = document.getElementById(screenId);
    if (activeScreen) {
        activeScreen.classList.add('active');
        mainContent.scrollTop = 0; // Scroll to top on new screen
    }
}

// Renders the Welcome/Register screen
function renderWelcomeScreen() {
    const screen = document.getElementById('welcome-screen');
    screen.innerHTML = `
    <div class="auth-container">
        <div class="auth-box">
            <div class="auth-image" style="background-image: url('assets/welcome.jpg');">
                <h2>Welcome</h2>
            </div>
            <div class="auth-form-container">
                <form class="auth-form" id="register-form">
                    <h3>Register</h3>
                    <p>Start your scientific journey today!</p>
                    <div class="form-grid">
                        <div class="input-group"><input name="firstName" type="text" placeholder="First Name" class="input-field" required></div>
                        <div class="input-group"><input name="lastName" type="text" placeholder="Last Name" class="input-field" required></div>
                        <div class="input-group full-width"><input name="email" type="email" placeholder="Email" class="input-field" required></div>
                        <div class="input-group full-width"><input name="password" type="password" placeholder="Password" class="input-field" required></div>
                    </div>
                    <button type="submit" class="auth-btn">Register</button>
                    <p class="auth-switch">Already have an account? <a href="#" id="go-to-login">Login</a></p>
                </form>
            </div>
        </div>
    </div>`;
    showScreen('welcome-screen');
}

// Renders the Login screen
function renderLoginScreen() {
    const screen = document.getElementById('login-screen');
    screen.innerHTML = `
    <div class="auth-container">
        <div class="auth-box">
             <div class="auth-image" style="background-image: url('assets/welcome.jpg');">
                <h2>CELEBPS</h2>
            </div>
            <div class="auth-form-container">
                <form class="auth-form" id="login-form">
                    <h3>Login</h3>
                    <p>Welcome back! Please enter your details.</p>
                    <div class="form-grid">
                        <div class="input-group full-width"><input name="email" type="email" placeholder="Email" class="input-field" required></div>
                        <div class="input-group full-width"><input name="password" type="password" placeholder="Password" class="input-field" required></div>
                    </div>
                    <button type="submit" class="auth-btn">Login</button>
                    <p class="auth-switch">Don't have an account? <a href="#" id="go-to-register">Register</a></p>
                </form>
            </div>
        </div>
    </div>`;
    showScreen('login-screen');
}

// Renders the main dashboard
function renderDashboard() {
    const screen = document.getElementById('dashboard-screen');
    screen.innerHTML = `
        <h1 class="page-title">Dashboard</h1>
        <div class="hero-banner">
            <h2>Explore science with CELEBPS</h2>
            <p>This isn't just a platform — it's a place where ideas come alive. Crafted with passion, built on dreams, and driven by purpose. It is to empower you, to inspire you, to move you forward.</p>
        </div>
        <div class="card-grid">
            <div class="card" onclick="navigateTo('topic', { topic: 'physics' })"><h3>Physics</h3></div>
            <div class="card" onclick="navigateTo('topic', { topic: 'chemistry' })"><h3>Chemistry</h3></div>
            <div class="card" onclick="navigateTo('topic', { topic: 'biology' })"><h3>Biology</h3></div>
            <div class="card" onclick="navigateTo('topic', { topic: 'astronomy' })"><h3>Astronomy</h3></div>
        </div>
    `;
    showScreen('dashboard-screen');
}

// Renders a topic page (e.g., Physics)
function renderTopicScreen(topic, data, filter = 'articles') {
    const screen = document.getElementById('topic-screen');
    const topicData = data[topic];
    const topicName = topic.charAt(0).toUpperCase() + topic.slice(1);

    let cardsHtml = '';
    const items = topicData[filter] || [];
    if (items.length > 0) {
        items.forEach(item => {
            const isBookmarked = bookmarks.includes(item.id) ? 'bookmarked' : '';
            cardsHtml += `
            <div class="card" onclick="navigateTo('content', { topic: '${topic}', type: '${filter}', id: '${item.id}' })">
                <span class="bookmark-icon ${isBookmarked}" onclick="event.stopPropagation(); toggleBookmark('${item.id}', this)">${isBookmarked ? '★' : '☆'}</span>
                <h3>${item.title}</h3>
            </div>`;
        });
    } else {
        cardsHtml = `<p>No ${filter} found for ${topicName}.</p>`;
    }
    
    screen.innerHTML = `
        <div class="page-header">
            <div class="back-arrow" onclick="navigateTo('dashboard')">←</div>
            <h1 class="page-title">${topicName}</h1>
        </div>
        <div class="filter-tabs">
            <button class="tab-btn ${filter === 'articles' ? 'active' : ''}" onclick="renderTopicScreen('${topic}', appData, 'articles')">Articles</button>
            <button class="tab-btn ${filter === 'experiments' ? 'active' : ''}" onclick="renderTopicScreen('${topic}', appData, 'experiments')">Experiments</button>
            <button class="tab-btn ${filter === 'provements' ? 'active' : ''}" onclick="renderTopicScreen('${topic}', appData, 'provements')">Provements</button>
            <button class="tab-btn ${filter === 'tools' ? 'active' : ''}" onclick="renderTopicScreen('${topic}', appData, 'tools')">Tools</button>
        </div>
        <div class="card-grid">${cardsHtml}</div>
    `;
    showScreen('topic-screen');
}

// Renders an article or other content page
function renderContentScreen(contentData, backParams) {
    const screen = document.getElementById('content-screen');
    screen.innerHTML = `
        <div class="page-header">
            <div class="back-arrow" onclick="navigateTo('topic', { topic: '${backParams.topic}', type: '${backParams.type}' })">←</div>
            <h1 class="page-title">${contentData.title}</h1>
        </div>
        <div class="article-content">${contentData.content}</div>
    `;
    showScreen('content-screen');
}

// Renders the user profile screen
function renderProfileScreen() {
    const screen = document.getElementById('profile-screen');
    const user = getCurrentUser();
    // NOTE: Additional details are mocked as Firebase Auth only stores Display Name, Email, Photo URL by default.
    const profileData = {
        name: user.displayName || 'User Name',
        email: user.email,
        location: 'Narail, Bangladesh',
        personalId: '231-342-3245',
        dob: '14 February 2010',
        role: 'Student'
    };

    screen.innerHTML = `
        <div class="page-header">
             <div class="back-arrow" onclick="navigateTo('dashboard')">←</div>
             <h1 class="page-title">Profile</h1>
        </div>
        <div class="profile-header"></div>
        <div class="profile-card">
            <div class="profile-info-header">
                <img src="https://i.pravatar.cc/150?u=${user.uid}" alt="Profile Picture" class="profile-pic">
                <div class="profile-name-section">
                    <h2>${profileData.name}</h2>
                    <p>📍 ${profileData.location}</p>
                </div>
                <div class="profile-actions">
                    <a href="#" onclick="alert('Edit profile feature not implemented.')">Change</a>
                    <a href="#" onclick="alert('Delete account feature not implemented.')">Delete</a>
                </div>
            </div>
            <div class="profile-details">
                <div class="detail-item"><strong>Personal ID</strong><span>${profileData.personalId}</span></div>
                <div class="detail-item"><strong>Email</strong><span>${profileData.email}</span></div>
                <div class="detail-item"><strong>Date of Birth</strong><span>${profileData.dob}</span></div>
                <div class="detail-item"><strong>Role</strong><span>${profileData.role}</span></div>
                <div class="detail-item"><strong>Password</strong>
                    <div>
                        <span>********</span> 
                        <a href="#" onclick="alert('Change password feature not implemented.')" style="margin-left: 15px; color: var(--primary-color);">Change Password</a>
                    </div>
                </div>
            </div>
        </div>
    `;
    showScreen('profile-screen');
}

// Renders the bookmarks screen
function renderBookmarksScreen(data) {
    const screen = document.getElementById('bookmarks-screen');
    let cardsHtml = '';

    if (bookmarks.length === 0) {
        cardsHtml = '<p>You have no bookmarks yet. Click the ☆ icon on an article to save it.</p>';
    } else {
        // Find bookmarked items from all topics and types
        for (const topicKey in data) {
            for (const typeKey in data[topicKey]) {
                if(Array.isArray(data[topicKey][typeKey])) {
                    data[topicKey][typeKey].forEach(item => {
                        if (bookmarks.includes(item.id)) {
                            cardsHtml += `
                            <div class="card" onclick="navigateTo('content', { topic: '${topicKey}', type: '${typeKey}', id: '${item.id}' })">
                                <span class="bookmark-icon bookmarked" onclick="event.stopPropagation(); toggleBookmark('${item.id}', this)">★</span>
                                <h3>${item.title}</h3>
                                <p><em>${topicKey.charAt(0).toUpperCase() + topicKey.slice(1)} / ${typeKey.slice(0, -1)}</em></p>
                            </div>`;
                        }
                    });
                }
            }
        }
    }

    screen.innerHTML = `
        <div class="page-header">
            <div class="back-arrow" onclick="navigateTo('dashboard')">←</div>
            <h1 class="page-title">Bookmarks</h1>
        </div>
        <div class="card-grid">${cardsHtml}</div>
    `;
    showScreen('bookmarks-screen');
}

// Renders the calculator tool
function renderCalculator() {
    const screen = document.getElementById('calculator-screen');
    screen.innerHTML = `
        <div class="page-header">
            <div class="back-arrow" onclick="navigateTo('topic', { topic: 'physics' })">←</div>
            <h1 class="page-title">Calculator</h1>
        </div>
        <div class="calculator">
            <div id="calc-display" class="calc-display">0</div>
            <div class="calc-keys">
                <button class="calc-btn operator" data-key="AC">AC</button>
                <button class="calc-btn operator" data-key="(">(</button>
                <button class="calc-btn operator" data-key=")">)</button>
                <button class="calc-btn operator" data-key="/">÷</button>
                
                <button class="calc-btn" data-key="7">7</button>
                <button class="calc-btn" data-key="8">8</button>
                <button class="calc-btn" data-key="9">9</button>
                <button class="calc-btn operator" data-key="*">×</button>
                
                <button class="calc-btn" data-key="4">4</button>
                <button class="calc-btn" data-key="5">5</button>
                <button class="calc-btn" data-key="6">6</button>
                <button class="calc-btn operator" data-key="-">-</button>
                
                <button class="calc-btn" data-key="1">1</button>
                <button class="calc-btn" data-key="2">2</button>
                <button class="calc-btn" data-key="3">3</button>
                <button class="calc-btn operator" data-key="+">+</button>

                <button class="calc-btn" data-key="0">0</button>
                <button class="calc-btn" data-key=".">.</button>
                <button class="calc-btn equal" data-key="=">=</button>
            </div>
        </div>
    `;
    showScreen('calculator-screen');
}

// Renders the settings screen
function renderSettingsScreen() {
    const screen = document.getElementById('settings-screen');
    const isDarkMode = document.body.getAttribute('data-theme') === 'dark';
    screen.innerHTML = `
        <div class="page-header">
             <div class="back-arrow" onclick="navigateTo('dashboard')">←</div>
             <h1 class="page-title">Settings</h1>
        </div>
        <div class="card">
            <h3>Appearance</h3>
            <div class="detail-item">
                <strong>Dark Mode</strong>
                <label class="switch">
                    <input type="checkbox" id="dark-mode-toggle" ${isDarkMode ? 'checked' : ''}>
                    <span class="slider round"></span>
                </label>
            </div>
        </div>
    `;
    showScreen('settings-screen');
}
