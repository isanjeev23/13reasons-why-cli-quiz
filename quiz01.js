const readlineSync = require('readline-sync');
const fs = require('fs');


// quiz question 
const arrOfobj = [
  {
    question: "Who does Clay take a Walkman from?",
    options: ["Tony", "Sheri", "Alex", "Hannah"],
    ans: "Tony"
  },

  {
    question: "Who is the subject of the first tape?",
    options: ["Jessica", "Justin", "Courtney", "Clay"],
    ans: "Justin"
  },

  {
    question: "What song do Hannah and Clay dance to at the Winter Formal?",
    options: ["The night we met", "Fassination Street"],
    ans: "The night we met"
  },

  {
    question: "Who dies after Sheri hits the stop sign?",
    options: ["Jeff", "Brice", "Courtney"],
    ans: "Jeff"
  },

  {
    question: "Where do Clay and Hannah Work ?",
    options: ["pizza place", "Movie Theater"],
    ans: "Movie Theater"
  }
];



// reading existing Data 
let scoreJSON = fs.readFileSync("data.json", 'utf-8');

let scoreArrOfObj = JSON.parse(scoreJSON);

function mimicDATA(userObj) {



  scoreArrOfObj.push(userObj);

  let updatedJSON = JSON.stringify(scoreArrOfObj)

  fs.writeFileSync("data.json", updatedJSON, 'utf-8');

  fs.readFile("data.json", 'utf-8', (err, json) => {
    if (err) {
      console.log(err);
    } else {
      scoreArrOfObj = JSON.parse(json);
    }

    console.log('Check out the High scorer\'s  ');

    //console.log(scoreArrOfObj);

    scoreArrOfObj.sort((obj1, obj2) => obj2.score - obj1.score)

    scoreArrOfObj.forEach(obj => {
      console.log(obj.name + " : " + obj.score);
    })

  });

}



let userName;


function welcome() {
  userName = readlineSync.question("What's your name ? ");
  console.log(`Welcome ${userName.toLocaleUpperCase()}, let's see the how well do you know 13 Reasons Why Series.\n`);

 

}



let score = 0;
function play() {

  console.log("Only Write the option no : \n");


  arrOfobj.forEach(element => {
    console.log(element.question + "\n");

    let no = 1;


    element.options.forEach(options => {
      console.log(`${no} ${options} `);
      no++;
    });

    let answer = readlineSync.question("write option no : ");

    if ((answer >= 0 && answer <= element.options.length) && element.options[answer - 1] === element.ans) {
      score++;
      console.log('\ncorrect!');
      console.log(`your current score is ${score}\n`);
      console.log("-----------------------------------------");
    }

    else {
      console.log('\nwrong!');
      console.log(`correct ans was  ${element.ans}\n`);
      console.log("-----------------------------------------");
    }





  });

  let obj = { name: userName.trim(), score: score };

  mimicDATA(obj);
}



function checkHighScore() {
  let max = 0;

  scoreArrOfObj.forEach(elem => {
    if (max < elem.score) {
      max = elem.score;
    }
  });

  if (score >= max) {
    console.log("YOU GOT HIGHEST SCORE ");
  }
  else {
    console.log("YAY! You SCORED: ", score);
  }
}




console.log("A Fun quiz CLI App about popular Netflix Series - 13 Reasons Why !");


// driver code 


let flag = readlineSync.question("Do you want to play(type yes or no)?").toUpperCase();

//console.log(flag) ;

if (flag === "YES") {
  welcome();
  play();
  checkHighScore(score);

}
else {
  console.log("Thankyou for your time!");
}







