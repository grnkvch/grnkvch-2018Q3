export default class SessionParser {
  constructor() {
    this.results = null;
  }

  parse(sessionData, activeSessionIndex, userData) {
    const resultsArr = [];
    const participantsKeys = Object.keys(sessionData[activeSessionIndex].participants);

    resultsArr[0] = {
      rounds: [],
    };
    sessionData[activeSessionIndex].puzzles.forEach((item) => {
      resultsArr[0].rounds.push(item.name);
    });

    participantsKeys.forEach((key) => {
      const userResult = {};
      userResult.userId = key;
      userResult.name = userData[key];
      userResult.rounds = [];
      let totalTime = 0;
      sessionData[activeSessionIndex].rounds.forEach((item, i) => {
        let time = 0;
        if (item.solutions[key]) {
          if (item.solutions[key].correct === 'Correct') time = parseInt(item.solutions[key].time.$numberLong);
          else {
            time = parseInt(sessionData[activeSessionIndex]
              .puzzles[parseInt(item.puzzleIndex.$numberLong)]
              .options.timeLimit.$numberLong);
          }
          totalTime += time;
          userResult.rounds[i] = time;
        } else userResult.rounds[i] = ' - ';
      });
      userResult.totalTime = totalTime;
      resultsArr.push(userResult);
    });
    this.results = resultsArr.slice();
    return this.results;
  }

  renderPrep() {
    const tableMatrix = [[]];
    this.results.forEach((item, i) => {
      if (i === 0) {
        tableMatrix[0].push('Name');
        this.results[0].rounds.forEach((roundItem) => {
          tableMatrix[0].push(roundItem);
        });
        tableMatrix[0].push('Total time');
        tableMatrix[0].push('Comparison');
      } else {
        tableMatrix.push([]);
        tableMatrix[i].push(item.name);
        this.results[i].rounds.forEach((roundItem) => {
          tableMatrix[i].push(roundItem);
        });
        tableMatrix[i].push(item.totalTime);
        tableMatrix[i].push(`<input type="checkbox">`);
      }
    });
    return tableMatrix;
  }
}
