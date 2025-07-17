

const score = JSON.parse( localStorage.getItem('score')) || {
  wins: 0,
  losses: 0,
  ties: 0
};

updateScoreElement();

let isAutoPlaying = false;
let intervalId;

function autoPlay() {
  if (!isAutoPlaying) {
    intervalId = setInterval(() => {
      const playerMove = pickComputerMove();
      playGame(playerMove);
    }, 1000);
    isAutoPlaying = true;
    document.querySelector('.autoo').innerHTML = 'Stop Playing';
  }else {
    clearInterval(intervalId);
    isAutoPlaying = false;
    document.querySelector('.autoo').innerHTML = 'Auto Play';
  }
}
document.querySelector('.autoo').addEventListener('click', () => {
  autoPlay();
});

document.querySelector('.js-rock-button').addEventListener('click', () => {
  playGame('rock');
});

document.querySelector('.js-paper-button').addEventListener('click', () => {
  playGame('paper');
});

document.querySelector('.js-scissors-button').addEventListener('click', () => {
  playGame('scissors');
});

document.body.addEventListener('keydown', (event) => {
  if (event.key === 'r') {
    playGame('rock');
  }else if (event.key === 'p') {
    playGame('paper');
  }else if (event.key === 's'){
    playGame('scissors');
  }else if (event.key === 'a') {
    autoPlay();
  }else if (event.key === 'Backspace'){
    showConf();
  }
});

function playGame(playerMove) {
  const computerMove = pickComputerMove();

  let result = '';

  if (playerMove === 'scissors') {
    if (computerMove === 'rock') {
      result = 'You lose.';
    } else if (computerMove === 'paper') {
      result = 'You win.';
    } else if (computerMove === 'scissors') {
      result = 'Tie.';
    }

  } else if (playerMove === 'paper') {
    if (computerMove === 'rock') {
      result = 'You win.';
    } else if (computerMove === 'paper') {
      result = 'Tie.';
    } else if (computerMove === 'scissors') {
      result = 'You lose.';
    }
    
  } else if (playerMove === 'rock') {
    if (computerMove === 'rock') {
      result = 'Tie.';
    } else if (computerMove === 'paper') {
      result = 'You lose.';
    } else if (computerMove === 'scissors') {
      result = 'You win.';
    }
  }

  if(result === 'You win.') {
    score.wins++;
  } else if(result === 'You lose.') {
    score.losses++;
  } else if(result === 'Tie.') {
    score.ties++;
  }

  localStorage.setItem('score', JSON.stringify(score));

  document.querySelector('.js-result').innerHTML = `${result}`;

  document.querySelector('.js-moves').innerHTML = `You 
  <img class="move-icon" src="./images/${playerMove}-emoji.png">
  <img class="move-icon" src="./images/${computerMove}-emoji.png">
  Computer.`;
  updateScoreElement();
}

function updateScoreElement(){
  document.querySelector('.js-score').innerHTML = `
    Score: Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
}

function pickComputerMove() {
  const randomNumber = Math.random();

  let computerMove = '';

  if (randomNumber >= 0 && randomNumber < 1 / 3) {
    computerMove = 'rock';
  } else if (randomNumber >= 1 / 3 && randomNumber < 2 / 3) {
    computerMove = 'paper';
  } else if (randomNumber >= 2 / 3 && randomNumber < 1) {
    computerMove = 'scissors';
  }

  return computerMove;
}

function resetScore() {
  score.wins = 0;
  score.losses = 0;
  score.ties = 0;
  localStorage.removeItem('score');
  updateScoreElement();
}

document.querySelector('.reset').addEventListener('click', () => {
  showConf();
});

function showConf () {
  document.querySelector('.js-reset-confirmation').innerHTML = `
    Are you sure you want to reset the score?
    <br>
    <div>
      <button class="reset-confirm">Yes</button>
      <button class="reset-cancel">No</button>
    </div>
  `;

  document.querySelector('.reset-confirm').addEventListener('click', () => {
    resetScore();
    document.querySelector('.js-reset-confirmation').innerHTML = '';
  });

  document.querySelector('.reset-cancel').addEventListener('click', () => {
    document.querySelector('.js-reset-confirmation').innerHTML = '';
  });
}