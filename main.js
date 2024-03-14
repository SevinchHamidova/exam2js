const elTemplate = document.querySelector(".js-template-ans");
const elTemplateQues = document.querySelector(".js-template-question");
const btnRight = document.querySelector(".js-btn-right");
// Selecting the container elements correctly
const elWrap = document.querySelector(".question-in");
const elGameList = document.querySelector(".game-answer-list");
const gameType = document.querySelector('.game-type');
let gameImages; // global o'zgaruvchi
let questions;
if (gameType === 'oddiy') {
    questions = roadSymbol.slice(0, 10);
} else if (gameType === 'orta') {
    questions = roadSymbol.slice(0, 15);
} else if (gameType === 'qiyin') {
    questions = roadSymbol.slice(0, 20);
}

function checkAnswer(selectedAlt, correctTitle) {
    if (selectedAlt === correctTitle) {
        console.log('To\'g\'ri javob!');
    } else {
        console.log('Noto\'g\'ri javob!');
    }
}

function renderQuestion(roadSymbol) {
    elWrap.innerHTML = ""; // Avvalgi kontentni tozalash
    // Random savolni tanlash
    const randomIndex = Math.floor(Math.random() * roadSymbol.length);
    const question = roadSymbol[randomIndex];
    // Savolni chiqarish
    const questionClone = elTemplateQues.content.cloneNode(true);
    questionClone.querySelector('.game-question').textContent = question.symbol_title;
    elWrap.appendChild(questionClone);
    
    // Imgning alt qiymatini savol bilan solishtirish
    gameImages = document.querySelectorAll('.game-img'); // global o'zgaruvchiga qiymat berish
    gameImages.forEach(image => {
        image.addEventListener('click', function() {
            console.log('Savol:', question.symbol_title, ', Img alt:', this.alt);
            const selectedAlt = this.alt;
            const correctTitle = question.symbol_title;
            checkAnswer(selectedAlt, correctTitle);
        });
    });
}
// console.log(renderQuestion());
// Funksiya o'yinlarni chiqarish uchun
function renderGame(roadSymbol) {
    elGameList.innerHTML = ""; // Avvalgi kontentni tozalash
    roadSymbol.forEach(game => {
        const clone = elTemplate.content.cloneNode(true);
        clone.querySelector('.game-img').src = game.symbol_img;
        clone.querySelector('.game-img').alt = game.symbol_title;
        elGameList.appendChild(clone);
    });
}

// Vazifaga ko'ra o'yin yaratish va chiqarish
function createGame(roadSymbol) {
    renderQuestion(roadSymbol); // Birinchi savolni chiqarish
    renderGame(roadSymbol); // O'yinlarni chiqarish
}

// Yangi savolga o'tish uchun tugmasini tekshirish
btnRight.addEventListener("click", () => createGame(roadSymbol));

// O'yin boshlang'ich ekranga chiqarish
createGame(roadSymbol);
