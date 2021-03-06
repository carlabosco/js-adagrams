import { truncate } from "fs";
import { getConsoleOutput } from "@jest/console";

const letters = ['A','B','C','D','E','F','G','H',
'I','J','K','L','M','N','O','P','Q','R','S',
'T','U','V','W','X','Y','Z'];

const weights = [9, 2, 2, 4, 12, 2, 3, 2, 9, 1, 1, 4,
2, 6, 8, 2, 1, 6, 4, 6, 4, 2, 2, 1, 2, 1];

const randomLetter = () => {
  let totalWeigth = 0;

  for (let i = 0; i < weights.length; i += 1) {
    totalWeigth += weights[i];
  }

  let random = Math.floor(Math.random() * totalWeigth);

  for (let i = 0; i < letters.length; i += 1) {
    random -= weights[i];

    if (random < 0) {
      return letters[i];
    }
  }
}

const Adagrams = {
  drawLetters() {
    const drawn = [];
    let i = 0;
    while (i < 10) {
      drawn.push(randomLetter());
      i += 1;
    };
    return drawn;
  },

  usesAvailableLetters(input, lettersInHand) {
    input = input.split('');

    for (let i = 0; i < lettersInHand.length; i += 1) {
      if (!input.includes(lettersInHand[i])) {
        return false;
      } else {
        let matchIndex = input.indexOf(lettersInHand[i]);
        if (matchIndex !== null) {
              input.splice(matchIndex, 1);
            } 
          }
        if (input.length === 0) {
        return true;
      } 
    }
  },

  scoreWord(word) {
    let points = 0;
    word = word.toUpperCase();

    for (let i = 0; i < word.length; i +=1) {
      switch (word[i]) {
        case 'A': case 'E': case 'I': case 'O': case 'U': case 'L': case 'N': case 'R': case 'S': case 'T':
          points += 1;
          break;
        case 'D': case 'G':
          points += 2;
          break;
        case 'B': case 'C': case 'M': case 'P':
          points += 3;
          break;
        case 'F': case 'H': case 'V': case 'W': case 'Y':
          points += 4
          break;
        case 'K':
          points += 5;
          break;
        case 'J': case 'X':
          points += 8;
          break;
        case 'Q': case 'Z':
          points += 10;
          break;
      };
    };

    if (word.length >= 7 && word.length <= 10) {
      points += 8;
    };
    return points;
  },

  highestScoreFrom(words) {
    let highestScore = 0;
    let winningWord = '';
    let winner = {};

    words.forEach(word => {
      let score = this.scoreWord(word);

      if (score > highestScore) {
        highestScore = score;
        winningWord = word;
      } else if (score === highestScore) {
        if (winningWord.length === 10) {
          winningWord = winningWord;
        } else if (word.length === 10) {
          winningWord = word;
        } else if (word.length < winningWord.length) {
          winningWord = word;
        }
      }
    });
    
    winner['word'] = winningWord;
    winner['score'] = highestScore;
    return winner;
  }
};

// Do not remove this line or your tests will break!
export default Adagrams;
