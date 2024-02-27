const SETTING_TIME = 5;
let words = [];
let time;
let isReady = false;   //준비가 필요한시간 설정
let isPlaying = false;
let score = 0;
let timeInterval;

const url = "https://random-word-api.herokuapp.com/word?number=100"
const wordDisplay = document.querySelector(".word-display");
const wordInput =  document.querySelector(".word-input");
const scoreDisplay =  document.querySelector(".score");
const timeDisplay =  document.querySelector(".time");
const button =  document.querySelector(".button");


//functions
runToast = (text) => {
    const option = {
        text: text,
        duration: 3000,
        newWindow: true,
        gravity: 'top',
        position: 'left',
        background: "linear-gradient(to right, #fff)"
    }
    Toastify(option).showToast()
}

const getWords = () => {
    axios.get(url).then(res=> {
        words = res.data.filter(word=> word.length < 8)  //이건 단어가 8글자 아래인것만 출력되게 만드는법 
        button.innerText = 'Game Start'
        button.classList.remove('loading');
        isReady = true; //게임이 정상적으로 불러오게 되면 트루로 되라
    }).catch(err => console.log(err))
}

const init = () => {
    time = SETTING_TIME;
    getWords();
}

//functions
const countDown = () => {
    if (time > 0){   //카운트다운 0까지 하는법
        time--;
        } else {
            clearInterval(timeInterval) //시간이끝나면 종료가 되게끔 하는법
            isPlaying = false;
        }
    timeDisplay.innerText = time;
}

const run = () => {
    clearInterval(timeInterval)
    if(isReady === false) {
        return;
    }
    timeInterval = setInterval(countDown, 1000) //run이 시작되면 카운트다운 시작
    wordInput.value = ""
    score= 0;
    time = SETTING_TIME
    scoreDisplay.innerText = score;
    isPlaying = true;
}

//functions
const checkMatch = () => {
    if(!isPlaying) {
        return;}

    if (wordInput.value.toLowerCase() === wordDisplay.innerText.toLowerCase()){
        score++
        runToast(wordDisplay.innerText)
        time = SETTING_TIME
        wordInput.value = ""
        const randomIndex = Math.floor(Math.random() * words.length);
        wordDisplay.innerText = words[randomIndex];
    }
    //console.log(Math.floor(Math.random() * words.length))  //random하게 나오게 하는건데 소주점을 잘라주는것 (random index)
    scoreDisplay.innerText = score;
    
}

//event handler
wordInput.addEventListener("input", checkMatch)

//getting ready
init()
