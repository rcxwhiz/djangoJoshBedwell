const dice = [];

for (const diceElement of document.getElementsByClassName("dice")) {
    dice.push({element: diceElement, value: 1});
}

for (const die of dice) {
    die.element.addEventListener("click", (event) => {
        die.value++;
        die.value %= 7;
        die.element.src = `/static/img/dice/dice-${die.value}.svg`;
        updateAdvise();
    });
    die.element.addEventListener("contextmenu", (event) => {
        event.preventDefault();
        die.value += 6;
        die.value %= 7;
        die.element.src = `/static/img/dice/dice-${die.value}.svg`;
        updateAdvise();
    });
}

const possibleScores = [
    {dice: [1, 0, 0, 0, 0, 0], score: 100, msg: "a one"},

    {dice: [0, 0, 0, 0, 1, 0], score: 50, msg: "a five"},

    {dice: [3, 0, 0, 0, 0, 0], score: 300, msg: "3 ones"},

    {dice: [0, 3, 0, 0, 0, 0], score: 200, msg: "3 twos"},

    {dice: [0, 0, 3, 0, 0, 0], score: 300, msg: "3 threes"},

    {dice: [0, 0, 0, 3, 0, 0], score: 400, msg: "3 fours"},

    {dice: [0, 0, 0, 0, 3, 0], score: 500, msg: "3 fives"},

    {dice: [0, 0, 0, 0, 0, 3], score: 600, msg: "3 sixes"},

    {dice: [4, 0, 0, 0, 0, 0], score: 1000, msg: "4 ones"},
    {dice: [0, 4, 0, 0, 0, 0], score: 1000, msg: "4 twos"},
    {dice: [0, 0, 4, 0, 0, 0], score: 1000, msg: "4 threes"},
    {dice: [0, 0, 0, 4, 0, 0], score: 1000, msg: "4 fours"},
    {dice: [0, 0, 0, 0, 4, 0], score: 1000, msg: "4 fives"},
    {dice: [0, 0, 0, 0, 0, 4], score: 1000, msg: "4 sixes"},

    {dice: [5, 0, 0, 0, 0, 0], score: 2000, msg: "5 ones"},
    {dice: [0, 5, 0, 0, 0, 0], score: 2000, msg: "5 twos"},
    {dice: [0, 0, 5, 0, 0, 0], score: 2000, msg: "5 threes"},
    {dice: [0, 0, 0, 5, 0, 0], score: 2000, msg: "5 fours"},
    {dice: [0, 0, 0, 0, 5, 0], score: 2000, msg: "5 fives"},
    {dice: [0, 0, 0, 0, 0, 5], score: 2000, msg: "5 sixes"},

    {dice: [6, 0, 0, 0, 0, 0], score: 3000, msg: "6 ones"},
    {dice: [0, 6, 0, 0, 0, 0], score: 3000, msg: "6 twos"},
    {dice: [0, 0, 6, 0, 0, 0], score: 3000, msg: "6 threes"},
    {dice: [0, 0, 0, 6, 0, 0], score: 3000, msg: "6 fours"},
    {dice: [0, 0, 0, 0, 6, 0], score: 3000, msg: "6 fives"},
    {dice: [0, 0, 0, 0, 0, 6], score: 3000, msg: "6 sixes"},

    {dice: [1, 1, 1, 1, 1, 1], score: 1500, msg: "a straight of 1-6"},

    {dice: [2, 2, 2, 0, 0, 0], score: 1500, msg: "2 ones, 2 twos and 2 threes"},
    {dice: [2, 2, 0, 2, 0, 0], score: 1500, msg: "2 ones, 2 twos and 2 fours"},
    {dice: [2, 2, 0, 0, 2, 0], score: 1500, msg: "2 ones, 2 twos and 2 fives"},
    {dice: [2, 2, 0, 0, 0, 2], score: 1500, msg: "2 ones, 2 twos and 2 sixes"},
    {dice: [2, 0, 2, 2, 0, 0], score: 1500, msg: "2 ones, 2 threes and 2 fours"},
    {dice: [2, 0, 2, 0, 2, 0], score: 1500, msg: "2 ones, 2 threes and 2 fives"},
    {dice: [2, 0, 2, 0, 0, 2], score: 1500, msg: "2 ones, 2 threes and 2 sixes"},
    {dice: [2, 0, 0, 2, 2, 0], score: 1500, msg: "2 ones, 2 fours and 2 fives"},
    {dice: [2, 0, 0, 2, 0, 2], score: 1500, msg: "2 ones, 2 fours and 2 sixes"},
    {dice: [2, 0, 0, 0, 2, 2], score: 1500, msg: "2 ones, 2 fives and 2 sixes"},
    {dice: [0, 2, 2, 2, 0, 0], score: 1500, msg: "2 twos, 2 threes and 2 fours"},
    {dice: [0, 2, 2, 0, 2, 0], score: 1500, msg: "2 twos, 2 threes and 2 fives"},
    {dice: [0, 2, 2, 0, 0, 2], score: 1500, msg: "2 twos, 2 threes and 2 sixes"},
    {dice: [0, 2, 0, 2, 2, 0], score: 1500, msg: "2 twos, 2 fours and 2 fives"},
    {dice: [0, 2, 0, 2, 0, 2], score: 1500, msg: "2 twos, 2 fours and 2 sixes"},
    {dice: [0, 2, 0, 0, 2, 2], score: 1500, msg: "2 twos, 2 fives and 2 sixes"},
    {dice: [0, 0, 2, 2, 2, 0], score: 1500, msg: "2 threes, 2 fours and 2 fives"},
    {dice: [0, 0, 2, 2, 0, 2], score: 1500, msg: "2 threes, 2 fours and 2 sixes"},
    {dice: [0, 0, 2, 0, 2, 2], score: 1500, msg: "2 threes, 2 fives and 2 sixes"},
    {dice: [0, 0, 0, 2, 2, 2], score: 1500, msg: "2 fours, 2 fives and 2 sixes"},

    {dice: [4, 2, 0, 0, 0, 0], score: 1500, msg: "4 ones and 2 twos"},
    {dice: [4, 0, 2, 0, 0, 0], score: 1500, msg: "4 ones and 2 threes"},
    {dice: [4, 0, 0, 2, 0, 0], score: 1500, msg: "4 ones and 2 fours"},
    {dice: [4, 0, 0, 0, 2, 0], score: 1500, msg: "4 ones and 2 fives"},
    {dice: [4, 0, 0, 0, 0, 2], score: 1500, msg: "4 ones and 2 sixes"},
    {dice: [2, 4, 0, 0, 0, 0], score: 1500, msg: "4 twos and 2 ones"},
    {dice: [0, 4, 2, 0, 0, 0], score: 1500, msg: "4 twos and 2 threes"},
    {dice: [0, 4, 0, 2, 0, 0], score: 1500, msg: "4 twos and 2 fours"},
    {dice: [0, 4, 0, 0, 2, 0], score: 1500, msg: "4 twos and 2 fives"},
    {dice: [0, 4, 0, 0, 0, 2], score: 1500, msg: "4 twos and 2 sixes"},
    {dice: [2, 0, 4, 0, 0, 0], score: 1500, msg: "4 threes and 2 ones"},
    {dice: [0, 2, 4, 0, 0, 0], score: 1500, msg: "4 threes and 2 twos"},
    {dice: [0, 0, 4, 2, 0, 0], score: 1500, msg: "4 threes and 2 fours"},
    {dice: [0, 0, 4, 0, 2, 0], score: 1500, msg: "4 threes and 2 fives"},
    {dice: [0, 0, 4, 0, 0, 2], score: 1500, msg: "4 threes and 2 sixes"},
    {dice: [2, 0, 0, 4, 0, 0], score: 1500, msg: "4 fours and 2 ones"},
    {dice: [0, 2, 0, 4, 0, 0], score: 1500, msg: "4 fours and 2 twos"},
    {dice: [0, 0, 2, 4, 0, 0], score: 1500, msg: "4 fours and 2 threes"},
    {dice: [0, 0, 0, 4, 2, 0], score: 1500, msg: "4 fours and 2 fives"},
    {dice: [0, 0, 0, 4, 0, 2], score: 1500, msg: "4 fours and 2 sixes"},
    {dice: [2, 0, 0, 0, 4, 0], score: 1500, msg: "4 fives and 2 ones"},
    {dice: [0, 2, 0, 0, 4, 0], score: 1500, msg: "4 fives and 2 twos"},
    {dice: [0, 0, 2, 0, 4, 0], score: 1500, msg: "4 fives and 2 threes"},
    {dice: [0, 0, 0, 2, 4, 0], score: 1500, msg: "4 fives and 2 fours"},
    {dice: [0, 0, 0, 0, 4, 2], score: 1500, msg: "4 fives and 2 sixes"},
    {dice: [2, 0, 0, 0, 0, 4], score: 1500, msg: "4 sixes and 2 ones"},
    {dice: [0, 2, 0, 0, 0, 4], score: 1500, msg: "4 sixes and 2 twos"},
    {dice: [0, 0, 2, 0, 0, 4], score: 1500, msg: "4 sixes and 2 threes"},
    {dice: [0, 0, 0, 2, 0, 4], score: 1500, msg: "4 sixes and 2 fours"},
    {dice: [0, 0, 0, 0, 2, 4], score: 1500, msg: "4 sixes and 2 fives"},

    {dice: [3, 3, 0, 0, 0, 0], score: 2500, msg: "3 ones and 3 twos"},
    {dice: [3, 0, 3, 0, 0, 0], score: 2500, msg: "3 ones and 3 threes"},
    {dice: [3, 0, 0, 3, 0, 0], score: 2500, msg: "3 ones and 3 fours"},
    {dice: [3, 0, 0, 0, 3, 0], score: 2500, msg: "3 ones and 3 fives"},
    {dice: [3, 0, 0, 0, 0, 3], score: 2500, msg: "3 ones and 3 sixes"},
    {dice: [0, 3, 3, 0, 0, 0], score: 2500, msg: "3 twos and 3 threes"},
    {dice: [0, 3, 0, 3, 0, 0], score: 2500, msg: "3 twos and 3 fours"},
    {dice: [0, 3, 0, 0, 3, 0], score: 2500, msg: "3 twos and 3 fives"},
    {dice: [0, 3, 0, 0, 0, 3], score: 2500, msg: "3 twos and 3 sixes"},
    {dice: [0, 0, 3, 3, 0, 0], score: 2500, msg: "3 threes and 3 fours"},
    {dice: [0, 0, 3, 0, 3, 0], score: 2500, msg: "3 threes and 3 fives"},
    {dice: [0, 0, 3, 0, 0, 3], score: 2500, msg: "3 threes and 3 sixes"},
    {dice: [0, 0, 0, 3, 3, 0], score: 2500, msg: "3 fours and 3 fives"},
    {dice: [0, 0, 0, 3, 0, 3], score: 2500, msg: "3 fours and 3 sixes"},
    {dice: [0, 0, 0, 0, 3, 3], score: 2500, msg: "3 fives and 3 sixes"},
];

const canScore = (roll, scoreOption) => {
    for (let i = 0; i < 6; i++) {
        if (roll[i] < scoreOption.dice[i])
            return false;
    }
    return true;
}

const getScoreOptions = (options, roll, moves, score, diceUsed) => {
    let diceLeft = roll.reduce((acc, a) => {return acc + a;}, 0);
    if (diceLeft === 0)
        diceLeft = 6;
    options.push({score: score, moves: moves, diceLeft: diceLeft, diceUsed: diceUsed});
    for (const scoreOption of possibleScores) {
        if (canScore(roll, scoreOption)) {
            const newRoll = [...roll];
            const newMoves = [...moves];
            newMoves.push(scoreOption.msg);
            const newDiceUsed = [...diceUsed];
            for (let i = 0; i < 6; i++) {
                newRoll[i] -= scoreOption.dice[i];
                newDiceUsed[i] += scoreOption.dice[i];
            }
            getScoreOptions(options, newRoll, newMoves, score + scoreOption.score, newDiceUsed);
        }
    }
}

const getAllScoreOptions = (roll, currentScore) => {
    const options = [];
    getScoreOptions(options, roll, [], currentScore, [0, 0, 0, 0, 0, 0]);
    return options;
}

const getOptionValue = (scoreOption) => {
    switch (scoreOption.diceLeft) {
        case 1:
            if (scoreOption.score < 300)
                return 1.13361 * scoreOption.score - 3.353;
            else
                return scoreOption.score;
        case 2:
            if (scoreOption.score < 250)
                return 1.16192 * scoreOption.score - 15.43057;
            else
                return scoreOption.score;
        case 3:
            if (scoreOption.score < 450)
                return 0.69828 * scoreOption.score + 120.27386;
            else
                return scoreOption.score;
        case 4:
            if (scoreOption.score < 1050)
                return 0.81633 * scoreOption.score + 180.15206;
            else
                return scoreOption.score;
        case 5:
            return 0.84692 * scoreOption.score + 305.43795;
        case 6:
            return 0.89449 * scoreOption.score + 534.98335;
    }
}

const moveAdviseElement = document.getElementById("moveAdvise");
const currentScoreElement = document.getElementById("currentScore");
const gettingOnBoardCheck = document.getElementById("gettingOnBoard");

const updateAdvise = () => {
    const roll = [0, 0, 0, 0, 0, 0];
    for (const die of dice) {
        if (die.value !== 0) {
            roll[die.value - 1]++;
        }
    }

    console.log(`Roll: ${roll}`);

    const scoreOptions = getAllScoreOptions(roll, parseInt(currentScoreElement.value));
    scoreOptions.shift();

    console.log(`Found ${scoreOptions.length} score options`);

    if (scoreOptions.length === 0) {
        for (const die of dice)
            die.element.src = `/static/img/dice/dice-${die.value}-red.svg`;
        moveAdviseElement.innerText = "This is a farkle!";
        return;
    }
    let bestScoreOption = scoreOptions[0];
    let bestScoreOptionValue = getOptionValue(bestScoreOption);
    for (const option of scoreOptions) {
        if (getOptionValue(option) > bestScoreOptionValue)
        {
            bestScoreOption = option;
            bestScoreOptionValue = getOptionValue(bestScoreOption);
        }
    }
    moveAdviseElement.innerHTML = "Keep "
    moveAdviseElement.innerHTML += bestScoreOption.moves.join(", ");
    moveAdviseElement.innerHTML += ` for <strong>${bestScoreOption.score} points</strong>`;
    moveAdviseElement.innerHTML += `<br>Expected score for this turn: ${bestScoreOptionValue.toFixed(3)}`;
    if (bestScoreOptionValue > bestScoreOption.score || (gettingOnBoardCheck.checked && bestScoreOption.score < 500)) {
        moveAdviseElement.innerHTML += "<br>Keep rolling!";
        if (bestScoreOption.diceLeft === 6) {
            moveAdviseElement.innerHTML += " <strong>Hot dice!</strong>";
        }
    }
    else {
        moveAdviseElement.innerHTML += "<br>Stop rolling"
    }
    for (const die of dice)
        die.element.src = `/static/img/dice/dice-${die.value}.svg`;
    console.log(`Going to set these to green: ${bestScoreOption.diceUsed}`);
    for (let i = 0; i < 6; i++) {
        for (let j = 0; j < bestScoreOption.diceUsed[i]; j++) {
            for (const die of dice) {
                if (die.value === i + 1 && die.element.src.endsWith(`dice-${die.value}.svg`)) {
                    die.element.src = `/static/img/dice/dice-${die.value}-green.svg`;
                    break;
                }
            }
        }
    }
}

currentScoreElement.addEventListener("change", updateAdvise);
gettingOnBoardCheck.addEventListener("change", updateAdvise);

updateAdvise();