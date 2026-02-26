/**
 * QA Academy - Dynamic Quiz Engine v2.0
 * Professional quiz system with start screen, question selection, timer
 */

class QuizEngine {
    constructor(containerId, quizData) {
        this.container = document.getElementById(containerId);
        
        if (!this.container) {
            console.error('Quiz container not found:', containerId);
            return;
        }
        
        // Ensure container is always visible
        this.container.style.opacity = '1';
        this.container.style.transform = 'none';
        
        this.quizData = quizData;
        this.settings = quizData.settings || {};
        this.allQuestions = [...quizData.questions]; // Keep all questions
        this.questions = [];
        this.selectedCount = 10; // Default
        this.currentIndex = 0;
        this.score = 0;
        this.answers = [];
        this.timeLeft = 0;
        this.timerInterval = null;
        this.isAnswered = false;
        this.quizStarted = false;
        
        console.log('QuizEngine initialized with', this.allQuestions.length, 'total questions');
        
        this.init();
    }
    
    init() {
        this.renderStartScreen();
    }
    
    shuffleArray(array) {
        const shuffled = [...array];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    }
    
    renderStartScreen() {
        const counts = [5, 10, 15, 20];
        const maxQuestions = Math.min(this.allQuestions.length, 20);
        const availableCounts = counts.filter(c => c <= this.allQuestions.length);
        
        this.container.innerHTML = `
            <div class="quiz-start-screen">
                <div class="quiz-start-header">
                    <div class="quiz-start-icon">🎯</div>
                    <h2>${this.quizData.title || 'Knowledge Check'}</h2>
                    <p class="quiz-start-desc">${this.quizData.description || 'Test your understanding of this topic'}</p>
                </div>
                
                <div class="quiz-start-stats">
                    <div class="quiz-stat">
                        <span class="quiz-stat-num">${this.allQuestions.length}</span>
                        <span class="quiz-stat-label">Total Questions</span>
                    </div>
                    <div class="quiz-stat">
                        <span class="quiz-stat-num">${this.settings.timeLimit ? Math.floor(this.settings.timeLimit / 60) : 10}</span>
                        <span class="quiz-stat-label">Minutes</span>
                    </div>
                    <div class="quiz-stat">
                        <span class="quiz-stat-num">${this.settings.passingScore || 70}%</span>
                        <span class="quiz-stat-label">To Pass</span>
                    </div>
                </div>
                
                <div class="quiz-question-select">
                    <label>Select number of questions:</label>
                    <div class="quiz-count-options">
                        ${availableCounts.map(count => `
                            <button class="quiz-count-btn ${count === this.selectedCount ? 'active' : ''}" 
                                    data-count="${count}">
                                ${count}
                            </button>
                        `).join('')}
                    </div>
                </div>
                
                <button class="btn btn-primary btn-lg quiz-start-btn" id="startQuizBtn">
                    Start Quiz
                </button>
                
                <div class="quiz-start-info">
                    <p>📝 Questions will be randomly selected</p>
                    <p>⏱️ Timer starts when you begin</p>
                    <p>📊 Get ${this.settings.passingScore || 70}% or higher to pass</p>
                </div>
            </div>
        `;
        
        // Add event listeners
        this.container.querySelectorAll('.quiz-count-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.selectedCount = parseInt(e.target.dataset.count);
                this.container.querySelectorAll('.quiz-count-btn').forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');
            });
        });
        
        document.getElementById('startQuizBtn').addEventListener('click', () => this.startQuiz());
    }
    
    startQuiz() {
        this.questions = this.shuffleArray(this.allQuestions).slice(0, this.selectedCount);
        this.currentIndex = 0;
        this.score = 0;
        this.answers = [];
        this.timeLeft = this.questions.length * 30; // 30 seconds per question
        this.isAnswered = false;
        this.quizStarted = true;
        
        console.log('Quiz started with', this.questions.length, 'questions');
        
        this.renderQuiz();
    }
    
    renderQuiz() {
        if (this.currentIndex >= this.questions.length) {
            this.showResults();
            return;
        }
        
        const question = this.questions[this.currentIndex];
        this.isAnswered = false;
        
        this.container.innerHTML = `
            <div class="quiz-container">
                <div class="quiz-header">
                    <div class="quiz-progress">
                        <div class="quiz-progress-text">
                            <span>Question ${this.currentIndex + 1} of ${this.questions.length}</span>
                            <span class="quiz-score">Score: ${this.score}/${this.currentIndex}</span>
                        </div>
                        <div class="quiz-progress-bar">
                            <div class="quiz-progress-fill" style="width: ${((this.currentIndex) / this.questions.length) * 100}%"></div>
                        </div>
                    </div>
                    <div class="quiz-timer" id="quizTimer">
                        ${this.formatTime(this.timeLeft)}
                    </div>
                </div>
                
                <div class="quiz-fade-in">
                    <div class="quiz-question">
                        <span class="quiz-difficulty ${question.difficulty || 'easy'}">
                            ${question.difficulty || 'Easy'} Question
                        </span>
                        ${question.question}
                    </div>
                    
                    <div class="quiz-options">
                        ${question.options.map((option, idx) => `
                            <div class="quiz-option" data-index="${idx}" data-id="${option.id}">
                                <span class="quiz-option-letter">${String.fromCharCode(65 + idx)}</span>
                                <span class="quiz-option-text">${option.text}</span>
                            </div>
                        `).join('')}
                    </div>
                    
                    <div id="quizExplanation" class="quiz-explanation" style="display: none;"></div>
                    
                    <div class="quiz-navigation">
                        <button class="btn btn-secondary" id="quizPrev" ${this.currentIndex === 0 ? 'disabled' : ''}>
                            ← Previous
                        </button>
                        <button class="btn btn-primary" id="quizNext" style="display: none;">
                            ${this.currentIndex === this.questions.length - 1 ? 'See Results →' : 'Next Question →'}
                        </button>
                    </div>
                </div>
            </div>
        `;
        
        this.attachEventListeners();
        this.startTimer();
    }
    
    attachEventListeners() {
        document.querySelectorAll('.quiz-option').forEach(option => {
            option.addEventListener('click', () => this.selectOption(option));
        });
        
        const nextBtn = document.getElementById('quizNext');
        if (nextBtn) {
            nextBtn.addEventListener('click', () => this.nextQuestion());
        }
        
        const prevBtn = document.getElementById('quizPrev');
        if (prevBtn) {
            prevBtn.addEventListener('click', () => this.prevQuestion());
        }
    }
    
    startTimer() {
        if (this.timerInterval) clearInterval(this.timerInterval);
        
        this.timerInterval = setInterval(() => {
            this.timeLeft--;
            const timerEl = document.getElementById('quizTimer');
            if (timerEl) {
                timerEl.textContent = this.formatTime(this.timeLeft);
                
                if (this.timeLeft <= 30) {
                    timerEl.classList.add('danger');
                } else if (this.timeLeft <= 60) {
                    timerEl.classList.add('warning');
                }
            }
            
            if (this.timeLeft <= 0) {
                this.handleTimeUp();
            }
        }, 1000);
    }
    
    formatTime(seconds) {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    }
    
    handleTimeUp() {
        clearInterval(this.timerInterval);
        this.answers.push({
            question: this.questions[this.currentIndex],
            selected: null,
            correct: false,
            timeUp: true
        });
        
        this.showExplanation(false, "Time's up! The correct answer was: " + this.questions[this.currentIndex].correctAnswer);
    }
    
    selectOption(optionEl) {
        if (this.isAnswered) return;
        
        this.isAnswered = true;
        clearInterval(this.timerInterval);
        
        const selectedId = optionEl.dataset.id;
        const question = this.questions[this.currentIndex];
        const isCorrect = selectedId === question.correctAnswer;
        
        if (isCorrect) {
            this.score++;
            optionEl.classList.add('correct');
        } else {
            optionEl.classList.add('incorrect');
            document.querySelectorAll('.quiz-option').forEach(opt => {
                if (opt.dataset.id === question.correctAnswer) {
                    opt.classList.add('correct');
                }
            });
        }
        
        document.querySelectorAll('.quiz-option').forEach(opt => {
            opt.classList.add('disabled');
        });
        
        this.answers.push({
            question: question,
            selected: selectedId,
            correct: isCorrect
        });
        
        this.showExplanation(isCorrect, question.explanation);
    }
    
    showExplanation(isCorrect, explanation) {
        const explanationEl = document.getElementById('quizExplanation');
        if (explanationEl) {
            explanationEl.innerHTML = `
                <div class="quiz-explanation ${isCorrect ? 'correct' : 'incorrect'}">
                    <div class="quiz-explanation-title">
                        ${isCorrect ? '✓ Correct!' : '✗ Incorrect'}
                    </div>
                    <p>${explanation}</p>
                </div>
            `;
            explanationEl.style.display = 'block';
        }
        
        const nextBtn = document.getElementById('quizNext');
        if (nextBtn) {
            nextBtn.style.display = 'inline-flex';
        }
    }
    
    nextQuestion() {
        this.currentIndex++;
        this.renderQuiz();
    }
    
    prevQuestion() {
        if (this.currentIndex > 0) {
            this.currentIndex--;
            this.renderQuiz();
        }
    }
    
    showResults() {
        clearInterval(this.timerInterval);
        
        const percentage = Math.round((this.score / this.questions.length) * 100);
        const passingScore = this.settings.passingScore || 70;
        const isPassing = percentage >= passingScore;
        
        const correctCount = this.answers.filter(a => a.correct).length;
        const incorrectCount = this.answers.filter(a => !a.correct && !a.timeUp).length;
        const timeUpCount = this.answers.filter(a => a.timeUp).length;
        
        this.container.innerHTML = `
            <div class="quiz-container">
                <div class="quiz-results">
                    <div class="quiz-results-icon">
                        ${isPassing ? '🎉' : '📚'}
                    </div>
                    <div class="quiz-results-score">${percentage}%</div>
                    <div class="quiz-results-message ${isPassing ? 'quiz-results-pass' : 'quiz-results-fail'}">
                        ${isPassing ? 'Congratulations! You Passed!' : 'Keep Learning! Try Again!'}
                    </div>
                    
                    <div class="quiz-results-details">
                        <div class="quiz-results-stat">
                            <div class="quiz-results-stat-value" style="color: var(--success);">${correctCount}</div>
                            <div class="quiz-results-stat-label">Correct</div>
                        </div>
                        <div class="quiz-results-stat">
                            <div class="quiz-results-stat-value" style="color: var(--danger);">${incorrectCount}</div>
                            <div class="quiz-results-stat-label">Incorrect</div>
                        </div>
                        <div class="quiz-results-stat">
                            <div class="quiz-results-stat-value" style="color: var(--warning);">${timeUpCount}</div>
                            <div class="quiz-results-stat-label">Time Up</div>
                        </div>
                    </div>
                    
                    <div class="quiz-results-actions">
                        <button class="btn btn-primary" onclick="location.reload()">
                            🔄 Take Another Quiz
                        </button>
                        <a href="tutorials.html" class="btn btn-secondary">
                            Back to Tutorials
                        </a>
                    </div>
                </div>
            </div>
        `;
        
        if (isPassing) {
            this.triggerConfetti();
        }
    }
    
    triggerConfetti() {
        const colors = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4'];
        
        for (let i = 0; i < 50; i++) {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.style.cssText = `
                position: fixed;
                width: 10px;
                height: 10px;
                background: ${colors[Math.floor(Math.random() * colors.length)]};
                left: ${Math.random() * 100}vw;
                top: -10px;
                opacity: ${Math.random() * 0.7 + 0.3};
                border-radius: ${Math.random() > 0.5 ? '50%' : '0'};
                animation: confettiFall ${Math.random() * 2 + 2}s linear forwards;
                z-index: 9999;
            `;
            document.body.appendChild(confetti);
            
            setTimeout(() => confetti.remove(), 4000);
        }
        
        // Add confetti animation
        if (!document.getElementById('confetti-style')) {
            const style = document.createElement('style');
            style.id = 'confetti-style';
            style.textContent = `
                @keyframes confettiFall {
                    to {
                        transform: translateY(100vh) rotate(720deg);
                    }
                }
            `;
            document.head.appendChild(style);
        }
    }
}

// Auto-initialize when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    // Quiz will be initialized by the page's inline script
});
