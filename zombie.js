const tanker = document.querySelector(".tank");
const zombieSticker = ["stickers/pngegg\ \(5\).png","stickers/pngegg\ \(6\).png","stickers/img1.png"]
tanker.style.position="absolute";
tanker.style.top="150px";
const areaForFiringBullets = document.querySelector(".forBullets");
const pointsZombie = document.querySelector(".zombieKilled")
const zombieCrossed = document.querySelector(".zombiesCrossed .numbers");
let canAccess = true;
document.body.addEventListener("keyup",(keys)=>{
    if(canAccess){
        switch(keys.keyCode){
            case 38:
                if(parseInt(tanker.style.top) > 0)
                    tanker.style.top = `${parseInt(tanker.style.top)-50}px`;
               break;
            case 40:
                if(parseInt(tanker.style.top) < 480)
                    tanker.style.top = `${parseInt(tanker.style.top)+50}px`;
                break;
        }
    }
})
function firingBullet (bullets){
    for(let i=0; i<bullets.length; i++){
        let idForFiring = setInterval(()=>{
            if(parseInt(bullets[i].style.left) < 1400){
                bullets[i].style.left = `${parseInt(bullets[i].style.left)+2}px`;
            }else{
                clearInterval(idForFiring)
            }
            checkWhetherBulletShot();
        },5)
    }
}
//================= Producing Bullets

function bulletFired(n){
    let bullets = document.getElementsByClassName("bullet");
    bullets[n].style.position="absolute";
    bullets[n].style.left="120px";
    bullets[n].style.top = `${parseInt(tanker.style.top)+65}px`;
    n++;
    firingBullet(bullets);
    return n;
}
let numberOfBulletsFromStart=0;
let numberOfBullets=0;
document.body.addEventListener("keypress",(keys)=>{
    if(canAccess){
        if(keys.keyCode == 13 ){            
            let bulletFire = new Audio("sounds/gun shot sound.mp3");
            bulletFire.play();
        }
        if(keys.keyCode == 13 && numberOfBullets <=15 ){
            areaForFiringBullets.innerHTML += `<img class="bullet" src="stickers/bullet.png"></img>`;
            numberOfBullets = bulletFired(numberOfBullets);
        }
        if(numberOfBullets > 15 && keys.keyCode == 13){
            numberOfBulletsFromStart = parseInt(numberOfBulletsFromStart%15);
            ++numberOfBulletsFromStart;
            bulletFired(numberOfBulletsFromStart);
            console.log(numberOfBulletsFromStart)
        }
    }
})
//============ Zombies on Floor =============
const floors = document.getElementsByClassName("floor");


//=========== Walking of Zombies ===========

const zombieContainer = document.getElementById("zombie");
let randomImage,zombieFromTop,zombiesDOM,numberOfZombies = -1;

//============= defining function to decide position of zombies
function zombieFunctionStartingPoint(number){
    randomImage = Math.floor(Math.random()*3);
    zombieFromTop = Math.floor(Math.random()*400);
    zombiesDOM[number].style.left="1280px";//1280px
    zombiesDOM[number].style.position="absolute";
    zombiesDOM[number].style.top=`${zombieFromTop}px`;    
    zombiesDOM[number].style.backgroundImage = `url("${zombieSticker[randomImage]}")`;
}
//============== producing zombies =============
function producingZombiesFunc(){
    zombiesDOM = document.getElementsByClassName("zombies");
    zombieContainer.innerHTML += `<div class="zombies"></div>`;
    numberOfZombies++;
    zombieFunctionStartingPoint(numberOfZombies);
}
producingZombiesFunc();
let producingZombieId = setInterval(()=>{    
    producingZombiesFunc();
},3000)

let countMissed=0,sound;

function playSound(){
    sound = new Audio("sounds/Zombie sound.mp3");
    sound.play();
    sound.volume = .2;
}
playSound();
let idForCreatingZombieSound = setInterval(()=>{
    playSound();
},31000)

let idForZombiesMovingLeft =  setInterval(()=>{    
    for(i=0; i<zombiesDOM.length; i++){
        zombiesDOM[i].style.left = `${parseInt(zombiesDOM[i].style.left)-1}px`;
        if(parseInt(zombiesDOM[i].style.left)<= -70){
            zombieFunctionStartingPoint(i);
            zombieCrossed.innerText = ++countMissed;
        }
        switch (countMissed){
            case 1:
                zombieContainer.style.background="radial-gradient(rgba(0, 0, 0, 0),rgba(0, 0, 0, 0),rgba(0, 0, 0, 0),rgba(0, 0, 0, 0),rgba(0, 0, 0, 0),rgba(255, 0, 0, 0.808))";
                break;
            case 2:
                zombieContainer.style.background="radial-gradient(rgba(0, 0, 0, 0),rgba(0, 0, 0, 0),rgba(0, 0, 0, 0),rgba(0, 0, 0, 0),rgba(255, 0, 0, 0.808))";
                break;
            case 3:
                zombieContainer.style.background="radial-gradient(rgba(0, 0, 0, 0),rgba(0, 0, 0, 0),rgba(0, 0, 0, 0),rgba(255, 0, 0, 0.808))";
                break;            
            case 4:
                zombieContainer.style.background="radial-gradient(rgba(0, 0, 0, 0),rgba(0, 0, 0, 0),rgba(0, 0, 0, 0),rgba(255, 0, 0))";
                break;          
            case 5:
                zombieContainer.style.background="radial-gradient(rgba(0, 0, 0, 0),rgba(0, 0, 0, 0),rgba(255, 0, 0))";
                break;
        }
        if(countMissed >= 5 )
            checkingGameover();
    }
},5)

//============ falling zombies
let fallingFromTop;
function checkingWhetherZombiesOnFloor(){
    for(i=0; i<zombiesDOM.length; i++){
        let zombieFromTopFalling = (parseInt(zombiesDOM[i].style.top)+(130));
        let zombieFromLeftFalling = parseInt(zombiesDOM[i].style.left);

        if(zombieFromTopFalling == parseInt(floors[0].offsetTop) && zombieFromLeftFalling+65 >= parseInt(floors[0].offsetLeft) && zombieFromLeftFalling+50 <= parseInt(floors[0].offsetLeft) + parseInt( floors[0].offsetWidth)){
            clearInterval(fallingFromTop)
        }else if(zombieFromTopFalling == parseInt(floors[1].offsetTop) && zombieFromLeftFalling+65 >= parseInt(floors[1].offsetLeft) && zombieFromLeftFalling+50 <= parseInt(floors[1].offsetLeft) + parseInt( floors[1].offsetWidth) ) {
            clearInterval(fallingFromTop)
        }else if(zombieFromTopFalling == parseInt(floors[2].offsetTop)){
            clearInterval(fallingFromTop)
        }else if(zombieFromTopFalling == parseInt(floors[3].offsetTop) && zombieFromLeftFalling+65 >= parseInt(floors[3].offsetLeft) && zombieFromLeftFalling+50 <= parseInt(floors[3].offsetLeft) + parseInt( floors[3].offsetWidth)){
            clearInterval(fallingFromTop)
        }else{
            zombiesDOM[i].style.top = `${parseInt(zombiesDOM[i].style.top)+1}px`;
        }
    }
}
let idForFallingZombie = setInterval(()=>{
    fallingFromTop = setInterval(()=>{
        checkingWhetherZombiesOnFloor();
    },5)
    if(numberOfZombies >= 5)
        clearInterval(producingZombieId);
},10)

//============== Bullets Hitting to zombies
let point=0;
let checkWhetherBulletShot = ()=>{
    let bullets = document.getElementsByClassName("bullet");
    for(i=0; i<=numberOfZombies; i++){
        for(let j=0; j<bullets.length; j++){
            let zombieFromTop = parseInt(zombiesDOM[i].style.top); //126
            let zombieFromLeft = parseInt(zombiesDOM[i].style.left); // 76
            let bulletFromTop = parseInt(bullets[j].style.top);
            let bulletFromLeft = parseInt(bullets[j].style.left);

            if(bulletFromLeft > zombieFromLeft && bulletFromLeft < zombieFromLeft+76 && bulletFromTop > zombieFromTop-40 && bulletFromTop < zombieFromTop+100){         
                zombiesDOM[i].style.top=`${Math.floor(Math.random()*400)}px`;
                zombiesDOM[i].style.left="1400px";  //1280px
                bullets[j].style.left="1700px";
                if(point<10)
                    pointsZombie.innerText = `0${++point}`;
                else
                    pointsZombie.innerText = ++point;
            }
        }
    }
}
//=============== Gameover condition ==========

function checkingGameover(){
    let gameOverSound = new Audio("sounds/Game Over sound.mp3");
    gameOverSound.play();
    gameOverSound.volume = .2;
    sound.pause();
    canAccess=false;
    let gameover = document.querySelector(".gameover");
    let gameoverBox = document.querySelector(".gameoverBox");
    gameoverBox.style.transform="translateY(0px)";
    clearInterval(idForFallingZombie);
    clearInterval(fallingFromTop);
    clearInterval(producingZombieId);
    clearInterval(idForZombiesMovingLeft);
    clearInterval(idForCreatingZombieSound)
}
let restart = document.querySelector(".restart")
let closeGame = document.querySelector(".close");
restart.addEventListener("click",()=>{
    window.location.reload();
})
closeGame.addEventListener("click",()=>{
    window.close();
})

//================== creating ladder with the help of canvas

function ladder(){
    let ladderImg = document.getElementById("ladder").getContext("2d");
    ladderImg.strokeStyle="rgb(39, 38, 38)"
    ladderImg.moveTo(190,0);
    ladderImg.lineTo(190,650);
    ladderImg.lineWidth=20;
    ladderImg.stroke();
    ladderImg.fillStyle = "rgb(39, 38, 38)";
    ladderImg.fillRect(0,50,200,10)
    ladderImg.fillRect(0,100,200,10)
    ladderImg.fillRect(0,150,200,10)
    ladderImg.fillRect(0,200,200,10)
    ladderImg.fillRect(0,250,200,10)
    ladderImg.fillRect(0,300,200,10)
    ladderImg.fillRect(0,350,200,10)
    ladderImg.fillRect(0,400,200,10)
    ladderImg.fillRect(0,450,200,10)
    ladderImg.fillRect(0,500,200,10)
    ladderImg.fillRect(0,550,200,10)
    ladderImg.fillRect(0,600,200,10)
    ladderImg.fillRect(0,650,200,10)
    
}
ladder();





