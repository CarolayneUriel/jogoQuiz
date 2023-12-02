const question = document.querySelector(".question");
const answers = document.querySelector(".answers");
const spnQtd = document.querySelector(".spnQtd");
const textfinish = document.querySelector(".finish span");
const content = document.querySelector(".content");
const contentfinishi = document.querySelector(".finish");
const btnRestart = document.querySelector(".finish button");
const startButton = document.querySelector(".start-button");

import questions from "./questions.js";

let currentIndex = 0;
let questionsCorrect = 0;

startButton.onclick = () => {
    startButton.style.display = "none"; // Esconde o botão de início
    content.style.display = "flex"; // Mostra a área de perguntas
    loadQuestion();
};

btnRestart.onclick = () => {
    content.style.display = "flex";
    contentfinishi.style.display = "none";

    currentIndex = 0;
    questionsCorrect = 0;
    loadQuestion ();
}

function nextQuestion(e) {
    const selectedAnswer = e.target;
    const isCorrect = selectedAnswer.getAttribute("data-correct") === "true";

    // Desativa os eventos de clique após a escolha
    document.querySelectorAll(".answer").forEach((item) => {
        item.removeEventListener("click", nextQuestion);
    });

    // Adiciona a lógica de mudança de cor
    if (isCorrect) {
        selectedAnswer.style.backgroundColor = "green";
        questionsCorrect++;
    } else {
        selectedAnswer.style.backgroundColor = "red";
        // Mostra a resposta correta em verde
        document.querySelector('.answer[data-correct="true"]').style.backgroundColor = "green";
    }

    // Avança para a próxima pergunta ou conclui o questionário após um intervalo de tempo
    setTimeout(() => {
        if (currentIndex < questions.length - 1) {
            currentIndex++;
            loadQuestion();
        } else {
            finish();
        }
    }, 1000); // Espera 1 segundo antes de carregar a próxima pergunta ou mostrar a tela de conclusão
}

function finish(){
    textfinish.innerHTML = `você acertou ${questionsCorrect} de ${questions.length}`;
    content.style.display = "none";
    contentfinishi.style.display = "flex";
}


function loadQuestion(){
    spnQtd.innerHTML = `${currentIndex + 1}/${questions.length}`;
    const item = questions[currentIndex];
    answers.innerHTML = "";
    question.innerHTML = item.question;

    item.answers.forEach((answer) => {
       const div = document.createElement("div");
       
       div.innerHTML =`
       <button class="answer" data-correct="${answer.correct}">
        ${answer.option}
       </button>
       `;
        
       answers.appendChild(div);
    });
    
    document.querySelectorAll(".answer").forEach((item) =>{
        item.addEventListener("click", nextQuestion);
        
    })
    
}


loadQuestion();