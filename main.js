let divBoard = document.getElementById('divBoard');
let resetBtn = document.getElementById('resetBtn');
let counter = document.getElementById('counter');
let timer = document.getElementById('timer');
let startTime;
let timerInterval;

game();
resetBtn.onclick = game;

function game() {
    const numbers = [1,10,20,30,40,51,60,70,80,90,99,55,45,65,35,49];
    const cardsList = [];
    const imgList = [];
    const maxClickedSet = 2;
    let clickedCount = 0;
    let clickCell = 0;
    let matches = 0;
    let firstCardIndex, secondCardIndex;
    let firstCardValue, secondCardValue;
    let beenFlipped = false;

    stopTimer();
    divBoard.innerHTML = "";
    counter.innerHTML = "Yours moves:" + parseInt(clickCell);
    timer.innerHTML = "00:00:00";
    
    for(let i=0; i<16; i++) {
        cardsList.push(document.createElement('div'));
        cardsList[i].className = 'cell';
        divBoard.appendChild(cardsList[i]);//makes the board 
        const randomIndex = Math.floor(Math.random() * numbers.length);//גורם לעירבוב בקלפים
        const card = numbers[randomIndex];//גורם לעירבוב בקלפים
        numbers.splice(randomIndex, 1);//גורם לעירבוב בקלפים
        imgList.push(document.createElement('img'));
        imgList[i].src = "images/num-"+card+".jpg";
        


        cardsList[i].onclick = (ev)=> {
            if(clickedCount == maxClickedSet) {
                return;
            }
            if(!beenFlipped) {
                beenFlipped = true;
                firstCardIndex = i;
                cardsList[i].appendChild(imgList[i]);
                firstCardValue = parseInt(card);
                clickedCount++;
                clickCell++;
            }else if( i !== firstCardIndex) {
                beenFlipped = false;
                secondCardIndex = i;
                cardsList[i].appendChild(imgList[i]);
                secondCardValue = parseInt(card);
                clickedCount++;
                clickCell++;
            }
            if(firstCardValue && secondCardValue &&(firstCardValue + secondCardValue != 100)) {
                setTimeout(()=> {
                cardsList[firstCardIndex].removeChild(imgList[firstCardIndex]);
                cardsList[secondCardIndex].removeChild(imgList[secondCardIndex]);
                firstCardValue = null;
                secondCardValue = null;
                clickedCount = 0;   
            }, 850); 
            }     
            if(firstCardValue + secondCardValue == 100) {
                imgList[firstCardIndex].style.visibility = 'visible';
                imgList[secondCardIndex].style.visibility = 'visible';
                cardsList[firstCardIndex] = null;
                cardsList[secondCardIndex] = null;
                firstCardValue = null;
                secondCardValue = null;
                clickedCount = 0;
                matches++; 
            }
            if(matches == 8) {
                alert("u won");
                stopTimer();
            }
            counter.innerHTML = "Yours moves:" + parseInt(clickCell);
            if(clickCell == 1) {
                startTimer()
            }
        }//onclick
    }//for
}//game

function startTimer() {
    startTime = Date.now();
    timerInterval = setInterval(updateTimer, 1000);
}

function stopTimer() {
    clearInterval(timerInterval);
}

function updateTimer() {
    const currentTime = Date.now();
    const elapsedTime = currentTime - startTime;
    const formattedTime = formatTime(elapsedTime);
    timer.innerHTML = formattedTime;
}

function formatTime(milliseconds) {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return (
        String(hours).padStart(2, "0") +
        ":" +
        String(minutes).padStart(2, "0") +
        ":" +
        String(seconds).padStart(2, "0")
    );
}

