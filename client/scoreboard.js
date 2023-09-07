class WordScoreBoard {
  constructor() {
    this.words = [];
  }

  // TODO #8: Save the word score to the server
  async saveWordScore(name, word, score) {
    let data = {
      name: name,
      word: word,
      score: score,
    };
    this.words.push(data);
    await fetch('/wordScore', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        // Check the response status code to ensure the request was successful
        if (response.ok) {
          console.log('Success saving word score');
        } else {
          console.log('Failed to save word score');
        }
      })
      .then(data => console.log(data)) // Handle the response data
      .catch((error) => {
        console.log(error);
      });
  }

  render(element) {
    console.log(this.words);
    let html = '<h1>Word Scores</h1>';
    html += '<table>';
    this.words.forEach((word) => {
      html += `
        <tr>
          <td>${word.name}</td>
          <td>${word.word}</td>
          <td>${word.score}</td>
        </tr>
      `;
    });
    html += '</table>';
    element.innerHTML = html;
  }
}

class GameScoreBoard {
  constructor() {
    this.game = [];
  }

  render(element) {
    let html = '<h1>Game Score</h1>';
    html += '<table>';
    this.game.forEach((word) => {
      html += `
        <tr>
          <td>${word.name}</td>
          <td>${word.score}</td>
        </tr>
      `;
    });
    html += '</table>';
    element.innerHTML = html;
  }

  // TODO #9: Save the game score to the server
  async saveGameScore(name, score) {
     let data = {
      name: name,
      score: score,
    };
    this.game.push(data);
    await fetch('/gameScore', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    .then((response) => {
      // Check the response status code to ensure the request was successful
      if (response.ok) {
        console.log('Success saving game score!');
      } else {
        console.log('Failed to save game score');
      }
    })
    .then(data => console.log(data))
    .catch((error) => {
      console.log(error);
    });
  }
}

class TopWordAndGameScoreBoard {
  // TODO #10: Render the top word and game scores
  async render(element) {
    element.innerHTML = "";

    // fetch highest word scores
    const word_data = await fetch('/highestWordScores');
    let words = await word_data.json();
    console.log(words);

    // render highest word scores
    let html = '<h1>Top 10 Word Scores</h1>';
    html += '<table>';
    html += `<th>Player Name</th>
            <th>Player Word</>
            <th>Player Score</th>`;
    words.forEach(word => {
      html += `
        <tr>
          <td>${word.name}</td>
          <td>${word.word}</td>
          <td>${word.score}</td>
        </tr>
      `;
    });
    html += '</table>';
    element.innerHTML += html;

    // fetch highest game scores
    const game_data = await fetch('/highestGameScores');
    let games = await game_data.json();
    console.log(games);

    // render highest game scores
    let html2 = '<h1>Top 10 Game Scores</h1>';
    html2 += '<table>';
    html2 += `<th>Player Name</th>
            <th>Player Score</th>`;
    games.forEach(g => {
      html2 += `
        <tr>
          <td>${g.name}</td>
          <td>${g.score}</td>
        </tr>
      `;
    });
    html2 += '</table>';
    element.innerHTML += html2;
  }
}
export const wordScoreBoard = new WordScoreBoard();
export const gameScoreBoard = new GameScoreBoard();
export const topWordAndGameScoreBoard = new TopWordAndGameScoreBoard();
