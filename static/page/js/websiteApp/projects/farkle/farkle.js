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
    {dice: [1, 0, 0, 0, 0, 0], score: 100, msg: "keep a one"},

    {dice: [0, 0, 0, 0, 1, 0], score: 50, msg: "keep a five"},

    {dice: [3, 0, 0, 0, 0, 0], score: 300, msg: "keep 3 ones"},

    {dice: [0, 3, 0, 0, 0, 0], score: 200, msg: "keep 3 twos"},

    {dice: [0, 0, 3, 0, 0, 0], score: 300, msg: "keep 3 threes"},

    {dice: [0, 0, 0, 3, 0, 0], score: 400, msg: "keep 3 fours"},

    {dice: [0, 0, 0, 0, 3, 0], score: 500, msg: "keep 3 fives"},

    {dice: [0, 0, 0, 0, 0, 3], score: 600, msg: "keep 3 sixes"},

    {dice: [4, 0, 0, 0, 0, 0], score: 1000, msg: "keep 4 ones"},
    {dice: [0, 4, 0, 0, 0, 0], score: 1000, msg: "keep 4 twos"},
    {dice: [0, 0, 4, 0, 0, 0], score: 1000, msg: "keep 4 threes"},
    {dice: [0, 0, 0, 4, 0, 0], score: 1000, msg: "keep 4 fours"},
    {dice: [0, 0, 0, 0, 4, 0], score: 1000, msg: "keep 4 fives"},
    {dice: [0, 0, 0, 0, 0, 4], score: 1000, msg: "keep 4 sixes"},

    {dice: [5, 0, 0, 0, 0, 0], score: 2000, msg: "keep 5 ones"},
    {dice: [0, 5, 0, 0, 0, 0], score: 2000, msg: "keep 5 twos"},
    {dice: [0, 0, 5, 0, 0, 0], score: 2000, msg: "keep 5 threes"},
    {dice: [0, 0, 0, 5, 0, 0], score: 2000, msg: "keep 5 fours"},
    {dice: [0, 0, 0, 0, 5, 0], score: 2000, msg: "keep 5 fives"},
    {dice: [0, 0, 0, 0, 0, 5], score: 2000, msg: "keep 5 sixes"},

    {dice: [6, 0, 0, 0, 0, 0], score: 3000, msg: "keep 6 ones"},
    {dice: [0, 6, 0, 0, 0, 0], score: 3000, msg: "keep 6 twos"},
    {dice: [0, 0, 6, 0, 0, 0], score: 3000, msg: "keep 6 threes"},
    {dice: [0, 0, 0, 6, 0, 0], score: 3000, msg: "keep 6 fours"},
    {dice: [0, 0, 0, 0, 6, 0], score: 3000, msg: "keep 6 fives"},
    {dice: [0, 0, 0, 0, 0, 6], score: 3000, msg: "keep 6 sixes"},

    {dice: [1, 1, 1, 1, 1, 1], score: 1500, msg: "keep a straight of 1-6"},

    {dice: [2, 2, 2, 0, 0, 0], score: 1500, msg: "keep 2 ones, 2 twos and 2 threes"},
    {dice: [2, 2, 0, 2, 0, 0], score: 1500, msg: "keep 2 ones, 2 twos and 2 fours"},
    {dice: [2, 2, 0, 0, 2, 0], score: 1500, msg: "keep 2 ones, 2 twos and 2 fives"},
    {dice: [2, 2, 0, 0, 0, 2], score: 1500, msg: "keep 2 ones, 2 twos and 2 sixes"},
    {dice: [0, 2, 2, 2, 0, 0], score: 1500, msg: "keep 2 twos, 2 threes and 2 fours"},
    {dice: [0, 2, 2, 0, 2, 0], score: 1500, msg: "keep 2 twos, 2 threes and 2 fives"},
    {dice: [0, 2, 2, 0, 0, 2], score: 1500, msg: "keep 2 twos, 2 threes and 2 sixes"},
    {dice: [0, 0, 2, 2, 2, 0], score: 1500, msg: "keep 2 threes, 2 fours and 2 fives"},
    {dice: [0, 0, 2, 2, 0, 2], score: 1500, msg: "keep 2 threes, 2 fours and 2 sixes"},
    {dice: [0, 0, 0, 2, 2, 2], score: 1500, msg: "keep 2 fours, 2 fives and 2 sixes"},

    {dice: [4, 2, 0, 0, 0, 0], score: 1500, msg: "keep 4 ones and 2 twos"},
    {dice: [4, 0, 2, 0, 0, 0], score: 1500, msg: "keep 4 ones and 2 threes"},
    {dice: [4, 0, 0, 2, 0, 0], score: 1500, msg: "keep 4 ones and 2 fours"},
    {dice: [4, 0, 0, 0, 2, 0], score: 1500, msg: "keep 4 ones and 2 fives"},
    {dice: [4, 0, 0, 0, 0, 2], score: 1500, msg: "keep 4 ones and 2 sixes"},
    {dice: [2, 4, 0, 0, 0, 0], score: 1500, msg: "keep 4 twos and 2 ones"},
    {dice: [0, 4, 2, 0, 0, 0], score: 1500, msg: "keep 4 twos and 2 threes"},
    {dice: [0, 4, 0, 2, 0, 0], score: 1500, msg: "keep 4 twos and 2 fours"},
    {dice: [0, 4, 0, 0, 2, 0], score: 1500, msg: "keep 4 twos and 2 fives"},
    {dice: [0, 4, 0, 0, 0, 2], score: 1500, msg: "keep 4 twos and 2 sixes"},
    {dice: [2, 0, 4, 0, 0, 0], score: 1500, msg: "keep 4 threes and 2 ones"},
    {dice: [0, 2, 4, 0, 0, 0], score: 1500, msg: "keep 4 threes and 2 twos"},
    {dice: [0, 0, 4, 2, 0, 0], score: 1500, msg: "keep 4 threes and 2 fours"},
    {dice: [0, 0, 4, 0, 2, 0], score: 1500, msg: "keep 4 threes and 2 fives"},
    {dice: [0, 0, 4, 0, 0, 2], score: 1500, msg: "keep 4 threes and 2 sixes"},
    {dice: [2, 0, 0, 4, 0, 0], score: 1500, msg: "keep 4 fours and 2 ones"},
    {dice: [0, 2, 0, 4, 0, 0], score: 1500, msg: "keep 4 fours and 2 twos"},
    {dice: [0, 0, 2, 4, 0, 0], score: 1500, msg: "keep 4 fours and 2 threes"},
    {dice: [0, 0, 0, 4, 2, 0], score: 1500, msg: "keep 4 fours and 2 fives"},
    {dice: [0, 0, 0, 4, 0, 2], score: 1500, msg: "keep 4 fours and 2 sixes"},
    {dice: [2, 0, 0, 0, 4, 0], score: 1500, msg: "keep 4 fives and 2 ones"},
    {dice: [0, 2, 0, 0, 4, 0], score: 1500, msg: "keep 4 fives and 2 twos"},
    {dice: [0, 0, 2, 0, 4, 0], score: 1500, msg: "keep 4 fives and 2 threes"},
    {dice: [0, 0, 0, 2, 4, 0], score: 1500, msg: "keep 4 fives and 2 fours"},
    {dice: [0, 0, 0, 0, 4, 2], score: 1500, msg: "keep 4 fives and 2 sixes"},
    {dice: [2, 0, 0, 0, 0, 4], score: 1500, msg: "keep 4 sixes and 2 ones"},
    {dice: [0, 2, 0, 0, 0, 4], score: 1500, msg: "keep 4 sixes and 2 twos"},
    {dice: [0, 0, 2, 0, 0, 4], score: 1500, msg: "keep 4 sixes and 2 threes"},
    {dice: [0, 0, 0, 2, 0, 4], score: 1500, msg: "keep 4 sixes and 2 fours"},
    {dice: [0, 0, 0, 0, 2, 4], score: 1500, msg: "keep 4 sixes and 2 fives"},

    {dice: [3, 3, 0, 0, 0, 0], score: 2500, msg: "keep 3 ones and 3 twos"},
    {dice: [3, 0, 3, 0, 0, 0], score: 2500, msg: "keep 3 ones and 3 threes"},
    {dice: [3, 0, 0, 3, 0, 0], score: 2500, msg: "keep 3 ones and 3 fours"},
    {dice: [3, 0, 0, 0, 3, 0], score: 2500, msg: "keep 3 ones and 3 fives"},
    {dice: [3, 0, 0, 0, 0, 3], score: 2500, msg: "keep 3 ones and 3 sixes"},
    {dice: [0, 3, 3, 0, 0, 0], score: 2500, msg: "keep 3 twos and 3 threes"},
    {dice: [0, 3, 0, 3, 0, 0], score: 2500, msg: "keep 3 twos and 3 fours"},
    {dice: [0, 3, 0, 0, 3, 0], score: 2500, msg: "keep 3 twos and 3 fives"},
    {dice: [0, 3, 0, 0, 0, 3], score: 2500, msg: "keep 3 twos and 3 sixes"},
    {dice: [0, 0, 3, 3, 0, 0], score: 2500, msg: "keep 3 threes and 3 fours"},
    {dice: [0, 0, 3, 0, 3, 0], score: 2500, msg: "keep 3 threes and 3 fives"},
    {dice: [0, 0, 3, 0, 0, 3], score: 2500, msg: "keep 3 threes and 3 sixes"},
    {dice: [0, 0, 0, 3, 3, 0], score: 2500, msg: "keep 3 fours and 3 fives"},
    {dice: [0, 0, 0, 3, 0, 3], score: 2500, msg: "keep 3 fours and 3 sixes"},
    {dice: [0, 0, 0, 0, 3, 3], score: 2500, msg: "keep 3 fives and 3 sixes"},
];

const canScore = (roll, scoreOption) => {
    for (let i = 0; i < 6; i++) {
        if (roll[i] < scoreOption.dice[i])
            return false;
    }
    return true;
}

const getScoreOptions = (options, roll, moves, score) => {
    let diceLeft = roll.reduce((acc, a) => {return acc + a;}, 0);
    if (diceLeft === 0)
        diceLeft = 6;
    options.push({score: score, moves: moves, diceLeft: diceLeft});
    for (const scoreOption of possibleScores) {
        if (canScore(roll, scoreOption)) {
            const newRoll = [...roll];
            const newMoves = [...moves];
            newMoves.push(scoreOption.msg);
            for (let i = 0; i < 6; i++) {
                newRoll[i] -= scoreOption.dice[i];
            }
            getScoreOptions(options, newRoll, newMoves, score + scoreOption.score);
        }
    }
}

const getAllScoreOptions = (roll, currentScore) => {
    const options = [];
    getScoreOptions(options, roll, [], currentScore);
    return options;
}

const getOptionValue = (scoreOption) => {
    switch (scoreOption.score) {
        case 0:
            switch (scoreOption.diceLeft) {
                case 6:
                    return 548.858;
            }
        case 50:
            switch (scoreOption.diceLeft) {
                case 5:
                    return 363.834;
            }
        case 100:
            switch (scoreOption.diceLeft) {
                case 4:
                    return 274.776;
                case 5:
                    return 399.911;
            }
        case 150:
            switch (scoreOption.diceLeft) {
                case 3:
                    return 227.968;
                case 4:
                    return 307.673;
            }
        case 200:
            switch (scoreOption.diceLeft) {
                case 2:
                    return 221.706;
                case 3:
                    return 257.584;
                case 4:
                    return 343.800;
            }
        case 250:
            switch (scoreOption.diceLeft) {
                case 1:
                    return 274.669;
                case 2:
                    return 250;
                case 3:
                    return 293.400;
            }
        case 300:
            switch (scoreOption.diceLeft) {
                case 1:
                case 2:
                    return 300;
                case 3:
                    return 329.228;
                case 6:
                    return 802.000;
            }
        case 350:
            switch (scoreOption.diceLeft) {
                case 1:
                case 2:
                    return 350;
                case 5:
                    return 596.220;
                case 6:
                    return 846.014;
            }
        case 400:
            switch (scoreOption.diceLeft) {
                case 1:
                case 2:
                    return 400;
                case 3:
                    return 400.947;
                case 4:
                    return 498.2;
                case 5:
                    return 638.291;
                case 6:
                    return 890.036;
            }
        case 450:
            switch (scoreOption.diceLeft) {
                case 1:
                case 2:
                case 3:
                    return 450;
                case 4:
                    return 540.176;
                case 5:
                    return 680.368;
                case 6:
                    return 934.065;
            }
        case 500:
            switch (scoreOption.diceLeft) {
                case 1:
                case 2:
                case 3:
                    return 500;
                case 4:
                    return 582.157;
                case 5:
                    return 722.453;
                case 6:
                    return 978.099;
            }
        case 550:
            switch (scoreOption.diceLeft) {
                case 1:
                case 2:
                case 3:
                    return 550;
                case 4:
                    return 624.144;
                case 5:
                    return 764.545;
                case 6:
                    return 1022.666;
            }
        case 600:
            switch (scoreOption.diceLeft) {
                case 1:
                case 2:
                case 3:
                    return 600;
                case 4:
                    return 666.139;
                case 5:
                    return 806.642;
                case 6:
                    return 1067.891;
            }
        case 650:
            switch (scoreOption.diceLeft) {
                case 1:
                case 2:
                case 3:
                    return 650;
                case 4:
                    return 708.139;
                case 5:
                    return 849.953;
                case 6:
                    return 1113.281;
            }
        case 700:
            switch (scoreOption.diceLeft) {
                case 1:
                case 2:
                case 3:
                    return 700;
                case 4:
                    return 750.142;
                case 5:
                    return 893.894;
                case 6:
                    return 1158.674;
            }
        case 750:
            switch (scoreOption.diceLeft) {
                case 1:
                case 2:
                case 3:
                    return 750;
                case 4:
                    return 792.147;
                case 5:
                    return 937.847;
                case 6:
                    return 1204.068;
            }
        case 800:
            switch (scoreOption.diceLeft) {
                case 1:
                case 2:
                case 3:
                    return 800;
                case 4:
                    return 834.154;
                case 5:
                    return 981.801;
                case 6:
                    return 1249.464;
            }
        case 850:
            switch (scoreOption.diceLeft) {
                case 1:
                case 2:
                case 3:
                    return 850;
                case 4:
                    return 876.162;
                case 5:
                    return 1025.756;
                case 6:
                    return 1295.174;
            }
        case 900:
            switch (scoreOption.diceLeft) {
                case 1:
                case 2:
                case 3:
                    return 900;
                case 4:
                    return 918.17;
                case 5:
                    return 1069.711;
                case 6:
                    return 1341.411;
            }
        case 950:
            switch (scoreOption.diceLeft) {
                case 1:
                case 2:
                case 3:
                    return 950;
                case 4:
                    return 960.178;
                case 5:
                    return 1114.429;
                case 6:
                    return 1387.917;
            }
        case 1000:
            switch (scoreOption.diceLeft) {
                case 1:
                case 2:
                case 3:
                    return 1000;
                case 4:
                    return 1002.188;
                case 5:
                    return 1160.198;
                case 6:
                    return 1434.468;
            }
        case 1050:
            switch (scoreOption.diceLeft) {
                case 1:
                case 2:
                case 3:
                case 4:
                    return 1050;
                case 5:
                    return 1206.254;
                case 6:
                    return 1481.147;
            }
        default:
            switch (scoreOption.diceLeft) {
                case 1:
                case 2:
                case 3:
                case 4:
                    return scoreOption.score;
                case 5:
                    return scoreOption.score + 150;
                case 6:
                    return scoreOption.score + 420;
            }
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

    console.log(`Found ${scoreOptions.length} score options`);

    if (scoreOptions.length === 1) {
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
    moveAdviseElement.innerHTML = bestScoreOption.moves.join(", ");
    moveAdviseElement.innerHTML += ` for ${bestScoreOption.score} points`;
    moveAdviseElement.innerHTML += `<br>Expected score for this turn: ${bestScoreOptionValue.toFixed(3)}`;
    if (bestScoreOptionValue > bestScoreOption.score || (gettingOnBoardCheck.checked && bestScoreOption.score < 500)) {
        moveAdviseElement.innerHTML += "<br>Keep rolling!";
        if (bestScoreOption.diceLeft === 6) {
            moveAdviseElement.innerHTML += " Hot dice!";
        }
    }
    else {
        moveAdviseElement.innerHTML += "<br>Stop rolling"
    }
}

currentScoreElement.addEventListener("change", updateAdvise);
gettingOnBoardCheck.addEventListener("change", updateAdvise);

updateAdvise();