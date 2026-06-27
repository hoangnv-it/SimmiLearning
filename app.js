/**
 * SimmiLearning - Application Script
 * Controls page routing (views), practice quiz engine, score evaluation,
 * local storage progress persistence, and theme switching.
 */

// Questions Database is loaded globally from questions.js


// Application State
const state = {
  theme: 'light',
  language: 'en', // 'en' | 'vi'
  currentScreen: 'selection', // 'selection' | 'practice' | 'results'
  selectedTenseId: null,
  questions: [],
  currentQuestionIndex: 0,
  selectedOptionIndex: null,
  isAnswerChecked: false,
  score: 0,
  // History structure: { "tenseId": { score: N, total: M, date: string } }
  history: {}
};

const TRANSLATIONS = {
  en: {
    logo: "SimmiLearning",
    navDashboard: "Dashboard",
    navLessons: "Lessons",
    navPractice: "Practice",
    navGuide: "Grammar Guide",
    
    heroTitle: "Master the Flow of Time",
    heroSubtitle: "Select an English tense to focus your practice session today. Consistency is key to fluency.",
    
    startPractice: "Start Practice",
    practiceSession: "Practice Session",
    questionCounter: "Question {current} of {total}",
    selectOptionPrompt: "Select the most appropriate option below.",
    hint: "Hint",
    checkAnswer: "Check Answer",
    nextQuestion: "Next Question",
    viewResults: "View Results",
    finishPractice: "Finish Practice",
    
    sessionComplete: "Session Complete!",
    resultsSubtitle: "Excellent work! You're making solid progress on your English tenses.",
    strengths: "Strengths",
    improvements: "Areas to Improve",
    practiceMore: "Practice More",
    backDashboard: "Back to Dashboard",
    
    helpCenter: "Help Center",
    privacyPolicy: "Privacy Policy",
    termsService: "Terms of Service",
    copyright: "© 2026 SimmiLearning Grammar. All rights reserved.",
    
    bestScore: "Best: {score}/{total}",
    
    tenses: {
      "simple-present": {
        name: "Simple Present",
        badge: "Foundational",
        description: "Habits, general truths, and fixed arrangements."
      },
      "present-continuous": {
        name: "Present Continuous",
        badge: "Active",
        description: "Actions happening right now or around now."
      },
      "simple-past": {
        name: "Simple Past",
        badge: "Core",
        description: "Completed actions in a time before now."
      },
      "present-perfect": {
        name: "Present Perfect",
        badge: "Advanced",
        description: "Actions linked in time: from past to present."
      }
    },
    
    toastSelectOption: "Please select an option first.",
    toastCorrect: "Correct! Excellent work.",
    toastIncorrect: "Incorrect. Let's see why.",
    
    notPracticed: "Not Practiced Yet",
    noStrengthsYet: "No tenses at 80%+ yet. Keep practicing!",
    masteredAll: "Outstanding! You have mastered all tenses!"
  },
  vi: {
    logo: "SimmiLearning",
    navDashboard: "Trang chính",
    navLessons: "Bài học",
    navPractice: "Luyện tập",
    navGuide: "Hướng dẫn Ngữ pháp",
    
    heroTitle: "Làm Chủ Dòng Thời Gian",
    heroSubtitle: "Chọn một thì tiếng Anh để bắt đầu luyện tập hôm nay. Kiên trì là chìa khóa để thành thạo.",
    
    startPractice: "Bắt đầu Luyện tập",
    practiceSession: "Phiên Luyện tập",
    questionCounter: "Câu hỏi {current} trên {total}",
    selectOptionPrompt: "Chọn đáp án thích hợp nhất bên dưới.",
    hint: "Gợi ý",
    checkAnswer: "Kiểm tra Đáp án",
    nextQuestion: "Câu tiếp theo",
    viewResults: "Xem Kết quả",
    finishPractice: "Hoàn thành Luyện tập",
    
    sessionComplete: "Hoàn thành Phiên học!",
    resultsSubtitle: "Làm tốt lắm! Bạn đang tiến bộ rất tốt với các thì tiếng Anh.",
    strengths: "Điểm mạnh",
    improvements: "Phần cần cải thiện",
    practiceMore: "Luyện tập thêm",
    backDashboard: "Quay lại Trang chính",
    
    helpCenter: "Trung tâm Hỗ trợ",
    privacyPolicy: "Chính sách Bảo mật",
    termsService: "Điều khoản Dịch vụ",
    copyright: "© 2026 SimmiLearning Grammar. Bảo lưu mọi quyền.",
    
    bestScore: "Tốt nhất: {score}/{total}",
    
    tenses: {
      "simple-present": {
        name: "Thì Hiện tại Đơn",
        badge: "Cơ bản",
        description: "Thói quen, sự thật hiển nhiên và lịch trình cố định."
      },
      "present-continuous": {
        name: "Thì Hiện tại Tiếp diễn",
        badge: "Năng động",
        description: "Hành động đang xảy ra ngay lúc này hoặc xung quanh thời điểm nói."
      },
      "simple-past": {
        name: "Thì Quá khứ Đơn",
        badge: "Cốt lõi",
        description: "Hành động đã hoàn thành trong thời gian trước đây."
      },
      "present-perfect": {
        name: "Thì Hiện tại Hoàn thành",
        badge: "Nâng cao",
        description: "Hành động liên kết thời gian: từ quá khứ đến hiện tại."
      }
    },
    
    toastSelectOption: "Vui lòng chọn một đáp án trước.",
    toastCorrect: "Chính xác! Làm tốt lắm.",
    toastIncorrect: "Chưa chính xác. Hãy xem gợi ý nhé.",
    
    notPracticed: "Chưa Luyện tập",
    noStrengthsYet: "Chưa có thì nào đạt 80%+. Hãy tiếp tục cố gắng nhé!",
    masteredAll: "Xuất sắc! Bạn đã làm chủ tất cả các thì!"
  }
};

function t(key, variables = {}) {
  const lang = state.language || 'en';
  let template = TRANSLATIONS[lang][key] || TRANSLATIONS['en'][key] || key;
  Object.entries(variables).forEach(([name, val]) => {
    template = template.replace(`{${name}}`, val);
  });
  return template;
}

function getTenseTranslation(tenseId, field) {
  const lang = state.language || 'en';
  const tenseData = TRANSLATIONS[lang]?.tenses?.[tenseId] || TRANSLATIONS['en']?.tenses?.[tenseId];
  if (tenseData && tenseData[field]) {
    return tenseData[field];
  }
  return QUESTIONS_DATABASE[tenseId]?.[field] || '';
}

function applyTranslations() {
  // Update language indicator label
  const langLabel = document.getElementById('lang-label');
  if (langLabel) {
    langLabel.textContent = state.language.toUpperCase();
  }

  // Update static nav links
  const navDashboard = document.getElementById('nav-dashboard');
  if (navDashboard) navDashboard.textContent = t('navDashboard');
  const navLessons = document.getElementById('nav-lessons');
  if (navLessons) navLessons.textContent = t('navLessons');
  const navPractice = document.getElementById('nav-practice');
  if (navPractice) navPractice.textContent = t('navPractice');
  const navGuide = document.getElementById('nav-guide');
  if (navGuide) navGuide.textContent = t('navGuide');

  // Update selection hero block
  const heroTitle = document.getElementById('selection-hero-title');
  if (heroTitle) heroTitle.textContent = t('heroTitle');
  const heroSubtitle = document.getElementById('selection-hero-subtitle');
  if (heroSubtitle) heroSubtitle.textContent = t('heroSubtitle');

  // Update practice screen static elements
  const practiceTitle = document.getElementById('practice-session-title');
  if (practiceTitle) practiceTitle.textContent = t('practiceSession');
  const practicePrompt = document.getElementById('practice-prompt');
  if (practicePrompt) practicePrompt.textContent = t('selectOptionPrompt');

  const hintBtn = document.getElementById('hint-btn');
  if (hintBtn) {
    hintBtn.innerHTML = `<span class="material-symbols-outlined">lightbulb</span> ${t('hint')}`;
  }

  // Update action-btn text based on status
  const actionBtn = document.getElementById('action-btn');
  if (actionBtn) {
    const isChecked = state.isAnswerChecked;
    const currentQ = state.questions[state.currentQuestionIndex];
    if (!currentQ) {
      actionBtn.innerHTML = `${t('checkAnswer')} <span class="material-symbols-outlined" style="font-size: 20px;">check</span>`;
    } else if (!isChecked) {
      actionBtn.innerHTML = `${t('checkAnswer')} <span class="material-symbols-outlined" style="font-size: 20px;">check</span>`;
    } else {
      const isLast = state.currentQuestionIndex === state.questions.length - 1;
      if (isLast) {
        actionBtn.innerHTML = `${t('finishPractice')} <span class="material-symbols-outlined" style="font-size: 20px;">emoji_events</span>`;
      } else {
        actionBtn.innerHTML = `${t('nextQuestion')} <span class="material-symbols-outlined" style="font-size: 20px;">arrow_forward</span>`;
      }
    }
  }

  // Update results screen static elements
  const resultsTitle = document.getElementById('results-title');
  if (resultsTitle) resultsTitle.textContent = t('sessionComplete');
  const resultsSubtitle = document.getElementById('results-subtitle');
  if (resultsSubtitle) resultsSubtitle.textContent = t('resultsSubtitle');
  const strengthsTitle = document.getElementById('strengths-title');
  if (strengthsTitle) strengthsTitle.textContent = t('strengths');
  const improvementsTitle = document.getElementById('improvements-title');
  if (improvementsTitle) improvementsTitle.textContent = t('improvements');

  const practiceMoreBtn = document.getElementById('btn-practice-more');
  if (practiceMoreBtn) {
    practiceMoreBtn.innerHTML = `<span class="material-symbols-outlined">replay</span> ${t('practiceMore')}`;
  }
  const backDashboardBtn = document.getElementById('btn-back-dashboard');
  if (backDashboardBtn) {
    backDashboardBtn.innerHTML = `<span class="material-symbols-outlined">dashboard</span> ${t('backDashboard')}`;
  }

  // Update footer links and copyright
  const footerHelp = document.getElementById('footer-help');
  if (footerHelp) footerHelp.textContent = t('helpCenter');
  const footerPrivacy = document.getElementById('footer-privacy');
  if (footerPrivacy) footerPrivacy.textContent = t('privacyPolicy');
  const footerTerms = document.getElementById('footer-terms');
  if (footerTerms) footerTerms.textContent = t('termsService');
  const footerCopyright = document.getElementById('footer-copyright');
  if (footerCopyright) footerCopyright.textContent = t('copyright');

  // Trigger re-rendering of active dynamic components
  if (state.currentScreen === 'selection') {
    renderTenseSelection();
  } else if (state.currentScreen === 'practice') {
    // Refresh tense indicator
    const indicator = document.getElementById('practice-tense-indicator');
    if (indicator && state.selectedTenseId) {
      indicator.textContent = getTenseTranslation(state.selectedTenseId, 'name');
    }
    // Refresh counter
    const totalQuestions = state.questions.length;
    const currentCount = state.currentQuestionIndex + 1;
    const counterEl = document.getElementById('practice-counter');
    if (counterEl) {
      counterEl.textContent = t('questionCounter', { current: currentCount, total: totalQuestions });
    }
  } else if (state.currentScreen === 'results') {
    renderResultsScreen();
  }
}

function toggleLanguage() {
  state.language = state.language === 'en' ? 'vi' : 'en';
  localStorage.setItem('simmilearning-language', state.language);
  applyTranslations();
}

function loadLanguagePreference() {
  state.language = localStorage.getItem('simmilearning-language') || localStorage.getItem('lingoflow-language') || 'en';
  applyTranslations();
}

// Initialize Application
document.addEventListener("DOMContentLoaded", () => {
  loadThemePreference();
  loadLanguagePreference();
  loadHistory();
  renderTenseSelection();
  setupGlobalEventListeners();
  
  // Show default view
  showScreen('selection');
});

// Setup click and action listeners
function setupGlobalEventListeners() {
  // Theme Toggle Button
  const themeToggleBtn = document.getElementById('theme-toggle-btn');
  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', toggleTheme);
  }

  // Language Toggle Button
  const langToggleBtn = document.getElementById('lang-toggle-btn');
  if (langToggleBtn) {
    langToggleBtn.addEventListener('click', toggleLanguage);
  }

  // Nav Logo click (return to dashboard)
  const logo = document.getElementById('logo-container');
  if (logo) {
    logo.addEventListener('click', (e) => {
      e.preventDefault();
      showScreen('selection');
    });
  }

  // Dashboard Nav Links
  const dashboardLink = document.getElementById('nav-dashboard');
  if (dashboardLink) {
    dashboardLink.addEventListener('click', (e) => {
      e.preventDefault();
      showScreen('selection');
    });
  }

  const practiceLink = document.getElementById('nav-practice');
  if (practiceLink) {
    practiceLink.addEventListener('click', (e) => {
      e.preventDefault();
      // Start default practice or show selection
      showScreen('selection');
    });
  }

  // Hint Button
  const hintBtn = document.getElementById('hint-btn');
  if (hintBtn) {
    hintBtn.addEventListener('click', toggleHint);
  }

  // Check / Next Button
  const actionBtn = document.getElementById('action-btn');
  if (actionBtn) {
    actionBtn.addEventListener('click', handleQuizAction);
  }

  // Result CTA - Practice More
  const practiceMoreBtn = document.getElementById('btn-practice-more');
  if (practiceMoreBtn) {
    practiceMoreBtn.addEventListener('click', () => {
      if (state.selectedTenseId) {
        startPractice(state.selectedTenseId);
      } else {
        showScreen('selection');
      }
    });
  }

  // Result CTA - Back to Dashboard
  const backToDashboardBtn = document.getElementById('btn-back-dashboard');
  if (backToDashboardBtn) {
    backToDashboardBtn.addEventListener('click', () => {
      showScreen('selection');
    });
  }
}

// Router - Switch views with animations
function showScreen(screenId) {
  // Update state
  state.currentScreen = screenId;

  // Deactivate all screens
  const screens = ['selection', 'practice', 'results'];
  screens.forEach(id => {
    const el = document.getElementById(`screen-${id}`);
    if (el) {
      el.classList.remove('active');
      el.style.display = 'none';
    }
  });

  // Activate chosen screen
  const target = document.getElementById(`screen-${screenId}`);
  if (target) {
    target.style.display = 'block';
    // Trigger layout before adding class for smooth transition
    void target.offsetWidth; 
    target.classList.add('active');
  }

  // Update Nav Links styling
  const navDashboard = document.getElementById('nav-dashboard');
  const navPractice = document.getElementById('nav-practice');
  
  if (navDashboard && navPractice) {
    if (screenId === 'selection') {
      navDashboard.classList.add('active');
      navPractice.classList.remove('active');
    } else {
      navDashboard.classList.remove('active');
      navPractice.classList.add('active');
    }
  }

  // Screen specific hooks
  if (screenId === 'selection') {
    renderTenseSelection();
  }
}

// Load and Render selection cards dynamically
function renderTenseSelection() {
  const container = document.getElementById('tense-cards-grid');
  if (!container) return;

  container.innerHTML = '';

  Object.entries(QUESTIONS_DATABASE).forEach(([tenseId, data]) => {
    const card = document.createElement('article');
    card.className = 'glass-card fade-in';
    
    // Check if user has practice score history for this tense
    const record = state.history[tenseId];
    let scoreDisplay = '';
    if (record) {
      scoreDisplay = `
        <div class="card-badge" style="background-color: var(--primary-container); color: var(--on-primary-container);">
          ${t('bestScore', { score: record.score, total: record.total })}
        </div>
      `;
    }

    card.innerHTML = `
      <div class="card-accent-bubble"></div>
      <div class="card-top">
        <div class="card-icon">
          <span class="material-symbols-outlined">${data.icon}</span>
        </div>
        <div style="display: flex; gap: 8px; align-items: center;">
          <span class="card-badge">${getTenseTranslation(tenseId, 'badge')}</span>
          ${scoreDisplay}
        </div>
      </div>
      <h2>${getTenseTranslation(tenseId, 'name')}</h2>
      <p>${getTenseTranslation(tenseId, 'description')}</p>
      <div class="example-quote-card">
        <p>"${data.example}"</p>
      </div>
      <button class="btn-primary" onclick="startPractice('${tenseId}')">
        ${t('startPractice')}
        <span class="material-symbols-outlined" style="font-size: 18px;">arrow_forward</span>
      </button>
    `;

    container.appendChild(card);
  });
}

// Shuffle and select a sample of questions, and shuffle their options
function preparePracticeQuestions(questions, count = 10) {
  // Shuffle and take a sample
  const sampled = [...questions].sort(() => 0.5 - Math.random()).slice(0, count);

  // Shuffle the options of each question and update the correct index
  return sampled.map(q => {
    const optionsWithCorrectness = q.options.map((opt, idx) => ({
      text: opt,
      isCorrect: idx === q.answerIndex
    }));
    
    const shuffled = [...optionsWithCorrectness].sort(() => 0.5 - Math.random());
    
    return {
      question: q.question,
      options: shuffled.map(item => item.text),
      answerIndex: shuffled.findIndex(item => item.isCorrect),
      hint: q.hint
    };
  });
}

// Start quiz session for a tense
window.startPractice = function(tenseId) {
  const tenseData = QUESTIONS_DATABASE[tenseId];
  if (!tenseData) return;

  // Initialize practice state
  state.selectedTenseId = tenseId;
  state.questions = preparePracticeQuestions(tenseData.questions, 10);
  state.currentQuestionIndex = 0;
  state.selectedOptionIndex = null;
  state.isAnswerChecked = false;
  state.score = 0;

  // Update header text
  const indicator = document.getElementById('practice-tense-indicator');
  if (indicator) {
    indicator.textContent = getTenseTranslation(tenseId, 'name');
  }

  // Load first question
  loadQuestion();

  // Navigate
  showScreen('practice');
};

// Load a single question to the layout
function loadQuestion() {
  const currentQ = state.questions[state.currentQuestionIndex];
  if (!currentQ) return;

  // Reset answer states
  state.selectedOptionIndex = null;
  state.isAnswerChecked = false;

  // Hide Hint Panel
  const hintSection = document.getElementById('hint-section');
  if (hintSection) {
    hintSection.classList.remove('visible');
  }

  // Update Counter and Progress Bar
  const totalQuestions = state.questions.length;
  const currentCount = state.currentQuestionIndex + 1;

  const counterEl = document.getElementById('practice-counter');
  if (counterEl) {
    counterEl.textContent = t('questionCounter', { current: currentCount, total: totalQuestions });
  }

  const progressBar = document.getElementById('practice-progress-bar');
  if (progressBar) {
    const percent = ((currentCount - 1) / totalQuestions) * 100;
    progressBar.style.width = `${percent}%`;
  }

  // Render question text
  const questionTitle = document.getElementById('practice-question-text');
  if (questionTitle) {
    questionTitle.textContent = currentQ.question;
  }

  // Render options buttons
  const optionsContainer = document.getElementById('practice-options-container');
  if (optionsContainer) {
    optionsContainer.innerHTML = '';
    currentQ.options.forEach((optText, idx) => {
      const btn = document.createElement('button');
      btn.className = 'option-btn';
      btn.setAttribute('aria-label', `Option ${String.fromCharCode(65 + idx)}: ${optText}`);
      btn.innerHTML = `
        <span class="option-text">${optText}</span>
        <div class="option-circle"></div>
      `;
      btn.addEventListener('click', () => selectOption(idx));
      optionsContainer.appendChild(btn);
    });
  }

  // Reset primary action button text
  const actionBtn = document.getElementById('action-btn');
  if (actionBtn) {
    actionBtn.innerHTML = `
      ${t('checkAnswer')}
      <span class="material-symbols-outlined" style="font-size: 20px;">check</span>
    `;
    actionBtn.setAttribute('disabled', 'true');
    actionBtn.style.opacity = '0.5';
    actionBtn.style.pointerEvents = 'none';
  }
}

// User selects an option
function selectOption(index) {
  if (state.isAnswerChecked) return; // Can't change after checking

  state.selectedOptionIndex = index;

  // Clear selections from all buttons
  const container = document.getElementById('practice-options-container');
  const buttons = container.querySelectorAll('.option-btn');
  buttons.forEach((btn, idx) => {
    if (idx === index) {
      btn.classList.add('selected');
      // Set the inner circle check
      btn.querySelector('.option-circle').innerHTML = '<span class="material-symbols-outlined" style="font-size: 16px; font-weight: bold;">check</span>';
    } else {
      btn.classList.remove('selected');
      btn.querySelector('.option-circle').innerHTML = '';
    }
  });

  // Enable Action Button
  const actionBtn = document.getElementById('action-btn');
  if (actionBtn) {
    actionBtn.removeAttribute('disabled');
    actionBtn.style.opacity = '1';
    actionBtn.style.pointerEvents = 'auto';
  }
}

// Toggle hints container
function toggleHint() {
  const hintSection = document.getElementById('hint-section');
  const currentQ = state.questions[state.currentQuestionIndex];
  
  if (hintSection && currentQ) {
    const isVisible = hintSection.classList.contains('visible');
    
    if (isVisible) {
      hintSection.classList.remove('visible');
    } else {
      const hintTextSpan = document.getElementById('hint-text-content');
      if (hintTextSpan) {
        hintTextSpan.textContent = currentQ.hint;
      }
      hintSection.classList.add('visible');
    }
  }
}

// Check selected option or proceed to next
function handleQuizAction() {
  if (!state.isAnswerChecked) {
    checkAnswer();
  } else {
    advanceQuiz();
  }
}

// Check answers logic
function checkAnswer() {
  if (state.selectedOptionIndex === null || state.isAnswerChecked) return;

  state.isAnswerChecked = true;
  const currentQ = state.questions[state.currentQuestionIndex];
  const isCorrect = state.selectedOptionIndex === currentQ.answerIndex;

  if (isCorrect) {
    state.score++;
    showToast(t('toastCorrect'), true);
  } else {
    showToast(t('toastIncorrect'), false);
  }

  // Update classes on option buttons to reflect feedback
  const container = document.getElementById('practice-options-container');
  const buttons = container.querySelectorAll('.option-btn');
  
  buttons.forEach((btn, idx) => {
    btn.classList.remove('selected');
    const circle = btn.querySelector('.option-circle');
    
    if (idx === currentQ.answerIndex) {
      // Highlight correct answer
      btn.classList.add('correct');
      circle.innerHTML = '<span class="material-symbols-outlined" style="font-size: 16px; font-weight: bold;">check</span>';
    } else if (idx === state.selectedOptionIndex) {
      // Highlight wrong selected answer
      btn.classList.add('incorrect');
      circle.innerHTML = '<span class="material-symbols-outlined" style="font-size: 16px; font-weight: bold;">close</span>';
    } else {
      circle.innerHTML = '';
    }
  });

  // Update check button to say "Next"
  const actionBtn = document.getElementById('action-btn');
  if (actionBtn) {
    const isLast = state.currentQuestionIndex === state.questions.length - 1;
    actionBtn.innerHTML = isLast ? `
      ${t('finishPractice')}
      <span class="material-symbols-outlined" style="font-size: 20px;">emoji_events</span>
    ` : `
      ${t('nextQuestion')}
      <span class="material-symbols-outlined" style="font-size: 20px;">arrow_forward</span>
    `;
  }
}

// Move to next question or finish quiz
function advanceQuiz() {
  const totalQuestions = state.questions.length;
  
  if (state.currentQuestionIndex < totalQuestions - 1) {
    state.currentQuestionIndex++;
    loadQuestion();
  } else {
    // End practice session, save results, display scorecard
    finishPracticeSession();
  }
}

// End session operations
function finishPracticeSession() {
  // Update progress bar to 100% on complete
  const progressBar = document.getElementById('practice-progress-bar');
  if (progressBar) {
    progressBar.style.width = `100%`;
  }

  // Save score to history
  saveTenseResult(state.selectedTenseId, state.score, state.questions.length);

  // Load results metrics
  renderResultsScreen();

  // Navigate to scorecard screen
  showScreen('results');
}

// Display results scorecard
function renderResultsScreen() {
  const scoreDisplay = document.getElementById('results-score-text');
  const percentagePath = document.getElementById('results-circle-progress');
  
  const correctCount = state.score;
  const totalCount = state.questions.length;
  const percentage = Math.round((correctCount / totalCount) * 100);

  // SVG stroke-dasharray styling: value between 0 and 100
  if (percentagePath) {
    percentagePath.style.strokeDasharray = `${percentage}, 100`;
  }

  if (scoreDisplay) {
    scoreDisplay.textContent = `${correctCount}/${totalCount}`;
  }

  // Strengths and Improvements lists
  const strengthsContainer = document.getElementById('strengths-list');
  const improvementsContainer = document.getElementById('improvements-list');

  if (strengthsContainer && improvementsContainer) {
    strengthsContainer.innerHTML = '';
    improvementsContainer.innerHTML = '';

    // Evaluate tenses based on history records
    Object.entries(QUESTIONS_DATABASE).forEach(([tenseId, data]) => {
      const record = state.history[tenseId];
      const localizedName = getTenseTranslation(tenseId, 'name');
      const listItem = document.createElement('li');
      listItem.className = 'breakdown-list-item fade-in';
      listItem.innerHTML = `
        <span class="list-dot"></span>
        <span>${localizedName}</span>
      `;

      if (record) {
        const percent = (record.score / record.total) * 100;
        if (percent >= 80) {
          strengthsContainer.appendChild(listItem);
        } else {
          improvementsContainer.appendChild(listItem);
        }
      } else {
        // Untested tenses can be placed as secondary improvements
        const emptyItem = document.createElement('li');
        emptyItem.className = 'breakdown-list-item fade-in';
        emptyItem.innerHTML = `
          <span class="list-dot" style="background-color: var(--surface-container-highest); border-color: var(--outline);"></span>
          <span style="opacity: 0.7;">${localizedName} (${t('notPracticed')})</span>
        `;
        improvementsContainer.appendChild(emptyItem);
      }
    });

    // Handle empty state lists
    if (strengthsContainer.children.length === 0) {
      strengthsContainer.innerHTML = `
        <li class="breakdown-list-item" style="border:none;">
          <span style="opacity: 0.7; font-style: italic;">${t('noStrengthsYet')}</span>
        </li>
      `;
    }

    if (improvementsContainer.children.length === 0) {
      improvementsContainer.innerHTML = `
        <li class="breakdown-list-item" style="border:none;">
          <span style="opacity: 0.7; font-style: italic;">${t('masteredAll')}</span>
        </li>
      `;
    }
  }
}

// Toast alerts helper
function showToast(message, isSuccess) {
  const container = document.getElementById('toast-feedback');
  if (!container) return;

  const textNode = container.querySelector('.toast-text');
  const iconNode = container.querySelector('.toast-icon');

  if (textNode) textNode.textContent = message;
  
  if (iconNode) {
    iconNode.textContent = isSuccess ? 'check_circle' : 'info';
    iconNode.style.color = isSuccess ? 'var(--primary-container)' : 'var(--error)';
  }

  container.classList.add('visible');

  // Hide toast after 3 seconds
  setTimeout(() => {
    container.classList.remove('visible');
  }, 2500);
}

// Theme controller functions
function toggleTheme() {
  const currentTheme = document.body.getAttribute('data-theme') || 'light';
  const newTheme = currentTheme === 'light' ? 'dark' : 'light';
  
  setTheme(newTheme);
}

function setTheme(theme) {
  state.theme = theme;
  document.body.setAttribute('data-theme', theme);
  localStorage.setItem('simmilearning-theme', theme);
  
  // Update toggle button icon
  const icon = document.querySelector('#theme-toggle-btn span');
  if (icon) {
    icon.textContent = theme === 'light' ? 'dark_mode' : 'light_mode';
  }
}

function loadThemePreference() {
  const savedTheme = localStorage.getItem('simmilearning-theme') || localStorage.getItem('lingoflow-theme');
  if (savedTheme) {
    setTheme(savedTheme);
  } else {
    // Check system preference
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    setTheme(prefersDark ? 'dark' : 'light');
  }
}

// History controllers
function saveTenseResult(tenseId, score, total) {
  // Only save if it improves or initializes record
  const currentBest = state.history[tenseId];
  if (!currentBest || score > currentBest.score) {
    state.history[tenseId] = {
      score: score,
      total: total,
      date: new Date().toISOString()
    };
    localStorage.setItem('simmilearning-history', JSON.stringify(state.history));
  }
}

function loadHistory() {
  const historyString = localStorage.getItem('simmilearning-history') || localStorage.getItem('lingoflow-history');
  if (historyString) {
    try {
      state.history = JSON.parse(historyString);
    } catch (e) {
      console.error("Error loading practice records:", e);
      state.history = {};
    }
  }
}
