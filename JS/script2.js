// Таймер + счет
var seconds = 10;
let score = 0;

// Вызов таймера, чтобы не нажимать кнопку
timer = setInterval(countSeconds, 1000);

var p = document.createElement('p');
p.classList.add('.pp')
var button = document.querySelector('.button');

const buttons = document.querySelectorAll('.btn');
// Счет 

function countSeconds() {
    seconds--;
    p.textContent = 'Время: ' + seconds;
    if (seconds == 0) {
        clearInterval(timer);
        for(i of buttons){
          i.style.display = 'none'
        }
    }
}

button.addEventListener('click', () => {
    if (timer) {
        clearInterval(timer);
    }
    timer = setInterval(countSeconds, 1000);
});

button.appendChild(p); 

function printEquations() {
    // Выводим уравнение на экран
    span = document.querySelector('.equation span')
    numberOfEquation = Math.floor(Math.random() * equations.equation.length)
    span.textContent = equations.equation[numberOfEquation]
}

function generateRandomButton() {
    // Получаем кнопки
    const buttons = document.querySelectorAll('.btn');
    
    // Генерируем случайный индекс
    const randomIndex = Math.floor(Math.random() * buttons.length);
    // Делаем случайную кнопку верной (добавляем класс "correct")
    buttons[randomIndex].classList.add('correct');
    for (let i = 0; i < buttons.length; i++) {
        if (!buttons[i].classList.contains('correct')) {
            buttons[i].textContent = equations.wrongAnswer[Math.floor(Math.random() * equations.wrongAnswer.length)]
        }else{
            buttons[i].textContent = equations.rightAnswer[numberOfEquation]
        }
      }
  }


// Добавляем обработчик клика для каждой кнопки
buttons.forEach(btn => {
  btn.addEventListener('click', () => {
    // Находим верную кнопку
    const correctButton = document.querySelector('.correct');
    // Проверяем, является ли кнопка верной
    if (btn.classList.contains('correct')) {
      // Увеличиваем счетчик на 1 очко
      incrementScore();
      correctButton.classList.remove('correct');
      printEquations()
    }else{
      decrementScore();
      correctButton.classList.remove('correct');
      printEquations()
    }
    
    // Генерируем новую случайную кнопку
    generateRandomButton();
  });
});


function incrementScore() {
  score++;
  updateScore();
}
function decrementScore() {
    score--;
    updateScore();
  }

function updateScore() {
  const scoreElem = document.getElementById('score');
  scoreElem.innerHTML = `Счет: ${score}`;
}









// Объект с уравнениями и ответами
equations = {
    equation: [],
    rightAnswer: [],
    wrongAnswer: []
}

// Алгоритм обработки файла с данными
var xhr = new XMLHttpRequest();
xhr.open('GET', 'file.txt', true); // укажите имя файла в кавычках
xhr.onreadystatechange = function() {
    if (this.readyState === 4 && this.status === 200) {
        var text = this.responseText; // строка из файла
        var words = text.split(',')
        for(i in words){
            if(i % 5 == 0){
                equations.equation.push(words[i])
            }else if(i % 5 == 1){
                equations.rightAnswer.push(words[i])
            }else if(i % 5 == 2 || i % 5 == 3 || i % 5 == 4){
                equations.wrongAnswer.push(words[i])
            }
        }
        // Отображение уравнения
        numberOfEquation = Math.floor(Math.random() * equations.equation.length)
        printEquations()
        generateRandomButton()
        console.log(equations)
    }  
};
xhr.send(); 


