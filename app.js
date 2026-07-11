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
      },
      "grade-5-exam": {
        name: "Grade 5 Final Exam",
        badge: "Comprehensive 45'",
        description: "Comprehensive English Exam for Grade 5 (Global Success): Pronunciation, Vocabulary, Grammar & Reading."
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
      },
      "grade-5-exam": {
        name: "Đề Thi Khảo Sát Lớp 5",
        badge: "Đề Thi 45 Phút",
        description: "Đề thi tổng hợp Tiếng Anh lớp 5 (Global Success): Phát âm, Từ vựng, Ngữ pháp & Đọc hiểu."
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

  const navLessons = document.getElementById('nav-lessons');
  if (navLessons) {
    navLessons.addEventListener('click', (e) => {
      e.preventDefault();
      showScreen('lessons');
    });
  }

  const continueUnitBtn = document.getElementById('btn-continue-unit-4');
  if (continueUnitBtn) {
    continueUnitBtn.addEventListener('click', (e) => {
      e.preventDefault();
      showUnitDetails(CURRICULUM_UNITS[3]);
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
  const screens = ['selection', 'lessons', 'unit-details', 'practice', 'results'];
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
  const navLessons = document.getElementById('nav-lessons');
  const navPractice = document.getElementById('nav-practice');
  
  if (navDashboard && navLessons && navPractice) {
    navDashboard.classList.remove('active');
    navLessons.classList.remove('active');
    navPractice.classList.remove('active');
    if (screenId === 'selection') {
      navDashboard.classList.add('active');
    } else if (screenId === 'lessons') {
      navLessons.classList.add('active');
    } else if (screenId === 'practice') {
      navPractice.classList.add('active');
    }
  }

  // Screen specific hooks
  if (screenId === 'selection') {
    renderTenseSelection();
  } else if (screenId === 'lessons') {
    renderLessonsOverview();
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
      <div style="display: flex; gap: 8px; flex-wrap: wrap;">
        <button class="btn-primary" onclick="startPractice('${tenseId}')" style="flex: 1;">
          ${t('startPractice')}
          <span class="material-symbols-outlined" style="font-size: 18px;">arrow_forward</span>
        </button>
        ${tenseId === 'grade-5-exam' ? `
          <a href="grade5_exam.html" target="_blank" class="btn-secondary" style="display: inline-flex; align-items: center; justify-content: center; gap: 6px; padding: 10px 14px; border-radius: var(--rounded-md); text-decoration: none; font-weight: 600; border: 1px solid var(--primary); color: var(--primary);">
            <span class="material-symbols-outlined" style="font-size: 18px;">description</span>
            Full Exam Paper
          </a>
        ` : ''}
      </div>
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
  const questionCount = tenseId === 'grade-5-exam' ? 30 : 10;
  state.selectedTenseId = tenseId;
  state.questions = preparePracticeQuestions(tenseData.questions, questionCount);
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
  currentQ.userAnswerIndex = state.selectedOptionIndex;
  currentQ.isCorrect = isCorrect;

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

  // Render clean, scroll-minimizing examination review section
  renderExaminationReview();
}

let currentReviewFilter = 'all';
let selectedReviewIndex = 0;

function renderExaminationReview() {
  const section = document.getElementById('results-review-section');
  if (!section || !state.questions || state.questions.length === 0) return;

  section.style.display = 'block';

  let correctCount = 0;
  let incorrectCount = 0;
  state.questions.forEach(q => {
    if (q.isCorrect) correctCount++;
    else incorrectCount++;
  });

  const elAll = document.getElementById('count-all');
  const elInc = document.getElementById('count-incorrect');
  const elCor = document.getElementById('count-correct');
  if (elAll) elAll.textContent = state.questions.length;
  if (elInc) elInc.textContent = incorrectCount;
  if (elCor) elCor.textContent = correctCount;

  currentReviewFilter = 'all';
  updateReviewFilterButtons();
  renderReviewPills();

  selectedReviewIndex = 0;
  if (incorrectCount > 0) {
    const firstInc = state.questions.findIndex(q => q.isCorrect === false);
    if (firstInc !== -1) selectedReviewIndex = firstInc;
  }
  showReviewQuestionDetail(selectedReviewIndex);
}

window.filterReview = function(filterType) {
  currentReviewFilter = filterType;
  updateReviewFilterButtons();
  renderReviewPills();

  let firstMatch = state.questions.findIndex(q => matchReviewFilter(q));
  if (firstMatch !== -1) {
    showReviewQuestionDetail(firstMatch);
  }
};

function matchReviewFilter(q) {
  if (currentReviewFilter === 'incorrect') return q.isCorrect === false;
  if (currentReviewFilter === 'correct') return q.isCorrect === true;
  return true;
}

function updateReviewFilterButtons() {
  ['all', 'incorrect', 'correct'].forEach(type => {
    const btn = document.getElementById(`filter-btn-${type}`);
    if (btn) {
      if (type === currentReviewFilter) btn.classList.add('active');
      else btn.classList.remove('active');
    }
  });
}

function renderReviewPills() {
  const grid = document.getElementById('review-pills-grid');
  if (!grid) return;
  grid.innerHTML = '';

  state.questions.forEach((q, idx) => {
    if (!matchReviewFilter(q)) return;

    const pill = document.createElement('div');
    pill.className = `review-pill ${q.isCorrect ? 'correct' : 'incorrect'} ${idx === selectedReviewIndex ? 'active' : ''}`;
    pill.innerHTML = `
      <span>#${idx + 1}</span>
      <span class="material-symbols-outlined" style="font-size: 14px; font-weight: bold;">
        ${q.isCorrect ? 'check' : 'close'}
      </span>
    `;
    pill.onclick = () => showReviewQuestionDetail(idx);
    grid.appendChild(pill);
  });
}

function showReviewQuestionDetail(index) {
  const card = document.getElementById('review-detail-card');
  if (!card || !state.questions[index]) return;

  selectedReviewIndex = index;
  renderReviewPills();

  const q = state.questions[index];
  const userOpt = q.userAnswerIndex !== undefined && q.userAnswerIndex !== null ? q.options[q.userAnswerIndex] : 'No answer selected';
  const correctOpt = q.options[q.answerIndex];
  const isCorrect = q.isCorrect;

  card.innerHTML = `
    <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 8px; margin-bottom: 12px;">
      <div style="display: flex; align-items: center; gap: 8px;">
        <span style="font-weight: 800; font-size: 16px; color: var(--on-surface);">Question #${index + 1}</span>
        <span class="review-answer-badge ${isCorrect ? 'correct-badge' : 'incorrect-badge'}">
          <span class="material-symbols-outlined" style="font-size: 16px;">${isCorrect ? 'check_circle' : 'cancel'}</span>
          ${isCorrect ? 'Correct' : 'Incorrect'}
        </span>
      </div>
      <div style="display: flex; gap: 6px;">
        <button class="btn-secondary" onclick="navigateReviewQuestion(-1)" style="padding: 4px 10px; min-height: 32px; font-size: 12px;">
          <span class="material-symbols-outlined" style="font-size: 16px;">arrow_back</span> Prev
        </button>
        <button class="btn-secondary" onclick="navigateReviewQuestion(1)" style="padding: 4px 10px; min-height: 32px; font-size: 12px;">
          Next <span class="material-symbols-outlined" style="font-size: 16px;">arrow_forward</span>
        </button>
      </div>
    </div>

    <p style="font-size: 16px; font-weight: 600; color: var(--on-surface); margin-bottom: 14px; line-height: 1.5;">
      ${q.question}
    </p>

    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 10px; margin-bottom: 12px;">
      <div style="background: ${isCorrect ? 'rgba(46, 125, 50, 0.08)' : 'rgba(211, 47, 47, 0.08)'}; border: 1px solid ${isCorrect ? 'rgba(46, 125, 50, 0.3)' : 'rgba(211, 47, 47, 0.3)'}; padding: 10px 14px; border-radius: var(--rounded-sm);">
        <div style="font-size: 11px; font-weight: 700; text-transform: uppercase; color: var(--on-surface-variant); margin-bottom: 4px;">Your Answer</div>
        <div style="font-weight: 600; color: ${isCorrect ? '#2e7d32' : '#d32f2f'};">${userOpt}</div>
      </div>
      ${!isCorrect ? `
        <div style="background: rgba(46, 125, 50, 0.08); border: 1px solid rgba(46, 125, 50, 0.3); padding: 10px 14px; border-radius: var(--rounded-sm);">
          <div style="font-size: 11px; font-weight: 700; text-transform: uppercase; color: var(--on-surface-variant); margin-bottom: 4px;">Correct Answer</div>
          <div style="font-weight: 600; color: #2e7d32;">${correctOpt}</div>
        </div>
      ` : ''}
    </div>

    ${q.hint ? `
      <div style="display: flex; gap: 8px; align-items: flex-start; background: var(--surface); border: 1px solid var(--outline-variant); padding: 10px 14px; border-radius: var(--rounded-sm); font-size: 13px; color: var(--on-surface-variant);">
        <span class="material-symbols-outlined" style="font-size: 18px; color: var(--primary); flex-shrink: 0;">lightbulb</span>
        <div><strong>Explanation:</strong> ${q.hint}</div>
      </div>
    ` : ''}
  `;
}

window.navigateReviewQuestion = function(delta) {
  const total = state.questions.length;
  let nextIdx = (selectedReviewIndex + delta + total) % total;
  for (let i = 0; i < total; i++) {
    if (matchReviewFilter(state.questions[nextIdx])) {
      showReviewQuestionDetail(nextIdx);
      return;
    }
    nextIdx = (nextIdx + delta + total) % total;
  }
};

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

// Tiếng Anh 8 Global Success Curriculum Data
const CURRICULUM_UNITS = [
  { unit: 1, semester: 'sem1', title: "Leisure time", topics: "free-time activities hobbies family friends study balance", grammar: "Verbs of liking + V-ing / to V", status: "Completed", progress: 100, targetTense: "simple-present", desc: "Explore different free-time activities, hobbies, spending quality time with family and friends, and balancing leisure with academic life." },
  { unit: 2, semester: 'sem1', title: "Life in the countryside", topics: "rural life farming activities comparing city country lifestyles nature", grammar: "Comparative forms of adverbs of manner", status: "Completed", progress: 100, targetTense: "present-continuous", desc: "Learn about rural life, farming activities, traditional folk games, and comparing city and countryside lifestyles." },
  { unit: 3, semester: 'sem1', title: "Teenagers", topics: "teen pressure school life clubs social media youth navigation", grammar: "Simple sentences and compound sentences", status: "Completed", progress: 100, targetTense: "simple-past", desc: "Discuss teen issues, school pressures, after-school clubs, social media habits, and navigating youth challenges." },
  { unit: 4, semester: 'sem1', title: "Ethnic groups of Vietnam", topics: "life culture traditions customs ethnic minorities vietnam diversity", grammar: "Yes/No & Wh-questions; Countable and uncountable nouns", status: "In Progress", progress: 40, targetTense: "simple-past", isCurrent: true, desc: "Discover the traditional cultures, customs, costumes, and festivals of 54 ethnic minority groups across Vietnam." },
  { unit: 5, semester: 'sem1', title: "Our customs and traditions", topics: "family customs traditional festivals table manners etiquette lifestyle", grammar: "Zero conditional; Articles: a, an, the, zero article", status: "Not Started", progress: 0, targetTense: "present-perfect", desc: "Learn about Vietnamese family customs, traditional festivals, table manners, and respecting heritage in modern society." },
  { unit: 6, semester: 'sem1', title: "Lifestyles", topics: "traditional modern lifestyles healthy living habits global culture", grammar: "Future simple with 'will'; First conditional", status: "Not Started", progress: 0, targetTense: "simple-present", desc: "Compare traditional and modern lifestyles, explore healthy daily routines, and examine how habits differ around the globe." },
  { unit: 7, semester: 'sem2', title: "Environmental protection", topics: "environmental problems endangered species eco friendly habits conservation recycling", grammar: "Complex sentences with adverbial clauses of time, cause, and concession", status: "Not Started", progress: 0, targetTense: "present-continuous", desc: "Investigate environmental challenges, endangered species protection, conservation efforts, and practicing eco-friendly daily habits." },
  { unit: 8, semester: 'sem2', title: "Shopping", topics: "types of shops shopping habits online shopping smart consumerism sales", grammar: "Adverbs of frequency; Present simple for future meaning (schedules)", status: "Not Started", progress: 0, targetTense: "simple-present", desc: "Explore types of traditional and modern shops, online shopping trends, smart consumer habits, and navigating sales and promotions." },
  { unit: 9, semester: 'sem2', title: "Natural disasters", topics: "earthquakes floods storms volcanic eruptions natural disasters safety rescue", grammar: "Past continuous tense; Past simple vs. Past continuous", status: "Not Started", progress: 0, targetTense: "simple-past", desc: "Understand natural phenomena like earthquakes, floods, and storms, and learn essential emergency preparedness and rescue safety." },
  { unit: 10, semester: 'sem2', title: "Communication in the future", topics: "modern future communication social networks telepathy holography tech", grammar: "Prepositions of place and time; Possessive pronouns", status: "Not Started", progress: 0, targetTense: "present-perfect", desc: "Explore futuristic communication methods, holography, telepathy, virtual reality, and the evolution of digital social networks." },
  { unit: 11, semester: 'sem2', title: "Science and technology", topics: "technological advances ai smart homes future inventions benefits drawbacks tech", grammar: "Reported speech (statements); Pronouns in reported speech", status: "Not Started", progress: 0, targetTense: "simple-present", desc: "Examine breakthrough technological advances, artificial intelligence, smart homes, and weigh the benefits and drawbacks of automation." },
  { unit: 12, semester: 'sem2', title: "Life on other planets", topics: "space exploration ufos aliens living on mars exoplanets astronomy", grammar: "May / Might for future possibility; Second conditional", status: "Not Started", progress: 0, targetTense: "simple-past", desc: "Journey into space exploration, investigate exoplanets and UFO phenomena, and speculate on conditions for extraterrestrial life on Mars." }
];

let currentLessonTab = 'all';
let currentLessonSearch = '';

function renderLessonsOverview() {
  const sem1Container = document.getElementById('app-lessons-grid-sem1');
  const sem2Container = document.getElementById('app-lessons-grid-sem2');
  if (!sem1Container || !sem2Container) return;

  sem1Container.innerHTML = '';
  sem2Container.innerHTML = '';

  let visibleCount = 0;
  let sem1Visible = 0;
  let sem2Visible = 0;

  CURRICULUM_UNITS.forEach(u => {
    // Check tab match
    const matchesTab = (currentLessonTab === 'all') || 
                     (currentLessonTab === 'sem1' && u.semester === 'sem1') || 
                     (currentLessonTab === 'sem2' && u.semester === 'sem2');

    // Check search match
    const query = currentLessonSearch.toLowerCase().trim();
    const matchesSearch = !query || 
                        u.title.toLowerCase().includes(query) || 
                        u.topics.toLowerCase().includes(query) || 
                        u.grammar.toLowerCase().includes(query) || 
                        String(u.unit) === query ||
                        `unit ${u.unit}`.includes(query);

    if (!matchesTab || !matchesSearch) return;

    visibleCount++;
    if (u.semester === 'sem1') sem1Visible++;
    if (u.semester === 'sem2') sem2Visible++;

    const card = document.createElement('article');
    card.className = `glass-card fade-in ${u.isCurrent ? 'current-target' : ''}`;
    if (u.isCurrent) {
      card.style.borderColor = 'var(--primary)';
      card.style.borderWidth = '2px';
      card.style.boxShadow = 'var(--shadow-level2)';
    }

    let statusBadge = '';
    if (u.status === 'Completed') {
      statusBadge = `<span style="display: inline-flex; align-items: center; gap: 4px; font-size: 12px; font-weight: 700; color: #006b71; background: var(--secondary-container); padding: 2px 10px; border-radius: var(--rounded-full);"><span class="material-symbols-outlined" style="font-size: 14px; font-variation-settings: 'FILL' 1;">check_circle</span>Completed</span>`;
    } else if (u.status === 'In Progress') {
      statusBadge = `<span style="display: inline-flex; align-items: center; gap: 4px; font-size: 12px; font-weight: 700; color: #004f53; background: rgba(114, 245, 255, 0.6); padding: 2px 10px; border-radius: var(--rounded-full);"><span class="material-symbols-outlined" style="font-size: 14px;">pending</span>In Progress</span>`;
    } else {
      statusBadge = `<span style="display: inline-flex; align-items: center; gap: 4px; font-size: 12px; font-weight: 600; color: var(--on-surface-variant); background: var(--surface-variant); padding: 2px 10px; border-radius: var(--rounded-full);"><span class="material-symbols-outlined" style="font-size: 14px;">lock_open</span>Not Started</span>`;
    }

    const currentBadge = u.isCurrent ? `<div style="position: absolute; top: 0; right: 0; background: var(--primary); color: var(--on-primary); font-size: 10px; font-weight: 800; text-transform: uppercase; padding: 4px 12px; border-bottom-left-radius: var(--rounded-md); letter-spacing: 0.5px;">Current Target</div>` : '';

    card.innerHTML = `
      ${currentBadge}
      <div style="display: flex; flex-direction: column; justify-content: space-between; height: 100%;">
        <div>
          <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 16px;">
            <span style="padding: 4px 12px; border-radius: var(--rounded-full); background: rgba(0, 105, 111, 0.12); color: var(--primary); font-weight: 700; font-size: 12px; border: 1px solid rgba(0, 105, 111, 0.2);">Unit ${u.unit}</span>
            ${statusBadge}
          </div>
          <h3 style="font-size: 20px; font-weight: 700; color: var(--on-surface); margin-bottom: 8px; font-family: var(--font-display);">${u.title}</h3>
          <p style="font-size: 14px; color: var(--on-surface-variant); line-height: 1.5; margin-bottom: 20px;">${u.desc}</p>
        </div>
        
        <div>
          <div style="background: ${u.isCurrent ? 'rgba(114, 245, 255, 0.2)' : 'var(--surface-container-low)'}; border-radius: var(--rounded-md); padding: 14px; border: 1px solid ${u.isCurrent ? 'rgba(0, 105, 111, 0.3)' : 'var(--outline-variant)'}; margin-bottom: 20px;">
            <div style="display: flex; align-items: center; gap: 6px; font-size: 12px; font-weight: 700; color: var(--primary); margin-bottom: 4px;">
              <span class="material-symbols-outlined" style="font-size: 16px;">menu_book</span>
              <span>Grammar Focus</span>
            </div>
            <p style="font-size: 13px; font-weight: 600; color: var(--on-surface-variant); margin: 0;">${u.grammar}</p>
          </div>
          
          <div style="display: flex; justify-content: space-between; align-items: center; padding-top: 16px; border-top: 1px solid rgba(132, 148, 149, 0.2);">
            <div style="display: flex; align-items: center; gap: 6px;">
              <div style="width: 64px; background: var(--surface-variant); height: 6px; border-radius: var(--rounded-full); overflow: hidden;">
                <div style="background: var(--primary); height: 100%; width: ${u.progress}%; border-radius: var(--rounded-full);"></div>
              </div>
              <span style="font-size: 12px; font-weight: 700; color: ${u.progress > 0 ? 'var(--primary)' : 'var(--on-surface-variant)'};">${u.progress}%</span>
            </div>
            <button class="btn-unit-action" data-target="${u.targetTense}" style="background: ${u.isCurrent ? 'var(--primary)' : 'transparent'}; color: ${u.isCurrent ? 'var(--on-primary)' : 'var(--primary)'}; border: ${u.isCurrent ? 'none' : 'none'}; padding: 6px 12px; border-radius: var(--rounded-default); font-weight: 700; font-size: 13px; display: inline-flex; align-items: center; gap: 4px; cursor: pointer; transition: all 0.2s;">
              <span>${u.isCurrent ? 'Continue Unit' : (u.progress === 100 ? 'Review Unit' : 'Start Unit')}</span>
              <span class="material-symbols-outlined" style="font-size: 16px;">${u.isCurrent ? 'play_arrow' : 'arrow_forward'}</span>
            </button>
          </div>
        </div>
      </div>
    `;

    // Bind action button
    const actionBtn = card.querySelector('.btn-unit-action');
    if (actionBtn) {
      actionBtn.addEventListener('click', () => {
        showUnitDetails(u);
      });
    }

    if (u.semester === 'sem1') {
      sem1Container.appendChild(card);
    } else {
      sem2Container.appendChild(card);
    }
  });

  // Handle visibility of section headers and no-results
  const sem1Sec = document.getElementById('app-sem1-container');
  const sem2Sec = document.getElementById('app-sem2-container');
  const noResultsSec = document.getElementById('app-lessons-no-results');

  if (sem1Sec) sem1Sec.style.display = (sem1Visible > 0 || (currentLessonTab === 'sem1' && visibleCount === 0)) ? 'block' : 'none';
  if (sem2Sec) sem2Sec.style.display = (sem2Visible > 0 || (currentLessonTab === 'sem2' && visibleCount === 0)) ? 'block' : 'none';
  
  if (noResultsSec) {
    if (visibleCount === 0) {
      noResultsSec.style.display = 'block';
      if (sem1Sec) sem1Sec.style.display = 'none';
      if (sem2Sec) sem2Sec.style.display = 'none';
    } else {
      noResultsSec.style.display = 'none';
    }
  }

  // Setup listeners for search and filters if not already attached
  setupLessonsFiltersOnce();
}

let lessonsFiltersSetup = false;
function setupLessonsFiltersOnce() {
  if (lessonsFiltersSetup) return;
  lessonsFiltersSetup = true;

  const searchInput = document.getElementById('app-curriculum-search');
  const clearBtn = document.getElementById('app-clear-search');
  const resetBtn = document.getElementById('app-reset-search');
  const tabButtons = document.querySelectorAll('.app-lesson-tab');

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      currentLessonSearch = e.target.value;
      if (clearBtn) clearBtn.style.display = currentLessonSearch.trim() ? 'block' : 'none';
      renderLessonsOverview();
    });
  }

  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      if (searchInput) searchInput.value = '';
      currentLessonSearch = '';
      clearBtn.style.display = 'none';
      renderLessonsOverview();
      if (searchInput) searchInput.focus();
    });
  }

  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      if (searchInput) searchInput.value = '';
      currentLessonSearch = '';
      if (clearBtn) clearBtn.style.display = 'none';
      currentLessonTab = 'all';
      updateLessonTabStyles();
      renderLessonsOverview();
    });
  }

  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      currentLessonTab = btn.getAttribute('data-filter') || 'all';
      updateLessonTabStyles();
      renderLessonsOverview();
    });
  });

  function updateLessonTabStyles() {
    tabButtons.forEach(btn => {
      if (btn.getAttribute('data-filter') === currentLessonTab) {
        btn.style.background = 'var(--primary)';
        btn.style.color = 'var(--on-primary)';
        btn.style.fontWeight = '700';
      } else {
        btn.style.background = 'transparent';
        btn.style.color = 'var(--on-surface-variant)';
        btn.style.fontWeight = '600';
      }
    });
  }
}

function showUnitDetails(unitData) {
  // Populate placeholders
  const badge = document.getElementById('ud-sidebar-badge');
  const unitNum = document.getElementById('ud-sidebar-unit-num');
  const sidebarTitle = document.getElementById('ud-sidebar-title');
  const mainTitle = document.getElementById('ud-main-title');
  const mainDesc = document.getElementById('ud-main-desc');
  const learningPoints = document.getElementById('ud-learning-points');
  const btnContinue = document.getElementById('ud-btn-continue');
  
  if (badge) badge.textContent = `U${unitData.unit}`;
  if (unitNum) unitNum.textContent = unitData.unit;
  if (sidebarTitle) sidebarTitle.textContent = unitData.title;
  
  // Set main title in Vietnamese/English
  if (mainTitle) mainTitle.textContent = `Tổng quan bài học: ${unitData.title}`;
  if (mainDesc) mainDesc.textContent = unitData.desc;
  
  // Update learning points dynamically based on topics and grammar
  if (learningPoints) {
    learningPoints.innerHTML = `
      <li style="display: flex; align-items: flex-start; gap: 16px;">
        <span class="material-symbols-outlined" style="color: var(--primary); font-size: 20px; margin-top: 2px;">radio_button_unchecked</span>
        <span style="font-size: 15px; color: var(--on-surface); line-height: 1.5;">Từ vựng chủ đề: ${unitData.topics.split(' ').slice(0, 5).join(', ')} và hơn thế nữa.</span>
      </li>
      <li style="display: flex; align-items: flex-start; gap: 16px;">
        <span class="material-symbols-outlined" style="color: var(--primary); font-size: 20px; margin-top: 2px;">radio_button_unchecked</span>
        <span style="font-size: 15px; color: var(--on-surface); line-height: 1.5;">Ngữ pháp trọng tâm: ${unitData.grammar}</span>
      </li>
      <li style="display: flex; align-items: flex-start; gap: 16px;">
        <span class="material-symbols-outlined" style="color: var(--primary); font-size: 20px; margin-top: 2px;">radio_button_unchecked</span>
        <span style="font-size: 15px; color: var(--on-surface); line-height: 1.5;">Kỹ năng giao tiếp thực tế và ứng dụng từ vựng vào đời sống.</span>
      </li>
    `;
  }
  
  // Bind continue button to start practice
  if (btnContinue) {
    // Clone node to clear previous event listeners
    const newBtn = btnContinue.cloneNode(true);
    btnContinue.parentNode.replaceChild(newBtn, btnContinue);
    newBtn.addEventListener('click', () => {
      startPractice(unitData.targetTense);
    });
  }
  
  showScreen('unit-details');
}
