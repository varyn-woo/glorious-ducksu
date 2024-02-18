const submitQuestionBtn = document.getElementById('submit-question');
const questionBox = document.getElementById('question-box');

function submitQuestion() {
    "use strict";
    const question = document.getElementById('question').value;
    questionBox.innerHTML += question;
}

submitQuestionBtn.addEventListener('click', submitQuestion);