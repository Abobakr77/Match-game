// function for type yourname and start play 

document.querySelector(".starting-game span").onclick = function(){

    let registerYourName = prompt("Please type your name  😉");

    if(registerYourName == null || registerYourName == "" || registerYourName == isNaN){
        return false;
    }else{
        document.querySelector(".name span").innerHTML = registerYourName;
        }
        
        document.querySelector(".starting-game").remove();

        document.querySelector("#start").play();
         setInterval(countDown, 1000);
        
}


// declear the element that will use them to start the game 

let duration = 1000;

let containerBlock = document.querySelector(".control-Allblocks");

// take containerBlock's children and put them in array

let blocks = Array.from(containerBlock.children);

// here we need to take blocks index and put then in array 

let orderRange = Array.from(Array(blocks.length).keys());
shuffle(orderRange);

blocks.forEach((block, index) => {
    block.style.order = orderRange[index];

    block.addEventListener("click", function(){
        filpped(block);
    });

});

// function to mix block with different index 
function shuffle(array){
    let current = array.length;
    let temporaryValue;
    let random;

    while(current > 0){
        random = Math.floor(Math.random() * current);
        current--;

        temporaryValue = array[current];
        array[current] = array[random];
        array[random] =  temporaryValue; 
    }

    return array;
}


// filpped function 

function filpped(selectBlock){
    selectBlock.classList.add("is-flipped");

    let filppedAllBlock = blocks.filter(filppedBlock => filppedBlock.classList.contains("is-flipped"));

    if(filppedAllBlock.length == 2){
        // stop clicking 
       
        stopClicking();
        hasMatched(filppedAllBlock[0],filppedAllBlock[1]);
    }
}




// stop clicking function

function stopClicking() {

    containerBlock.classList.add("no-clicking");

    setTimeout(()=> {
        containerBlock.classList.remove("no-clicking");
    },duration)

}

// check matched block 
function hasMatched(first,second){
    let tries = document.querySelector(".tries span");
    let winer = document.querySelector(".wine span");

    if(first.dataset.technology === second.dataset.technology){
        
        first.classList.remove("is-flipped");
        second.classList.remove("is-flipped");

        first.classList.add("matched");
        second.classList.add("matched");
        winer.innerHTML = parseInt(winer.innerHTML) + 1;
        document.querySelector("#success").play();
    }else{
        tries.innerHTML = parseInt(tries.innerHTML) + 1;

        setTimeout(()=> {
            first.classList.remove("is-flipped");
            second.classList.remove("is-flipped");
        },duration);
        document.querySelector("#fail").play();

    }

}

var countMins = 2;
let times = countMins * 60;

function countDown(){
    let mins = Math.floor(times / 60);
    let seconds = times % 60;

    document.querySelector(".time span").innerHTML = mins + ":" + seconds;
    times--;

    if(mins <= 0 && seconds <= 0){
        window.location.href="../gameover.html";
    }
}


