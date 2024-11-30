const questions = [
    {
        question: "What are the three core principles of cybersecurity?",
        answer: [
            { text: "Confidentiality, Availability, Integrity", correct: true},
            { text: "Authentication, Encryption, Firewall", correct: false},
            { text: "Privacy, Malware, Patch Management", correct: false},
            { text: "Cryptography, Security, Management", correct: false},
        ]
    },
    {
        question: "Which of the following is a common web application vulnerability?",
        answer: [
            { text: "SQL Injection.", correct: false},
            { text: "Cross-Site Scripting (XSS).", correct: false},
            { text: "Broken Authentication", correct: false},
            { text: "All of the above", correct: true},
        ]
    },
    {
        question: "Why is web application security important?",
        answer: [
            { text: "To improve aesthetics", correct: false},
            { text: "To protect sensitive data and maintain trust", correct: true},
            { text: "To increase website speed", correct: false},
            { text: "To make more money", correct: false},
        ]
    },
    {
        question: "Which security measure helps protect against Cross-Site Request Forgery (CSRF) attacks?",
        answer: [
            { text: "Anti-virus software.", correct: false},
            { text: "Input validation.", correct: false},
            { text: "Anti-CSRF tokens.", correct: true},
            { text: "Strong passwords.", correct: false},
        ]
    },
    {
        question: "What does the term encryption mean in the context of web application security?",
        answer: [
            { text: "Hiding sensitive data in plain sight.", correct: false},
            { text: "Making data unreadable without a decryption key.", correct: true},
            { text: "Storing data in a secure location.", correct: false},
            { text: "Backing up data regularly.", correct: false},
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const progressBar = document.getElementById("progress-bar");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    updateProgressBar();
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answer.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Answer again";
    nextButton.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
    updateProgressBar();
}

function updateProgressBar(){
    const progressPercentage = ((currentQuestionIndex / questions.length) * 100) + "%";
    progressBar.style.width = progressPercentage;
}

nextButton.addEventListener("click", () => {
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
});

startQuiz();
