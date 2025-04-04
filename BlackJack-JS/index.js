let plCards = [];
let dlCards = [];
let plSum = 0;
let dlSum = 0;
let plHasBlackJack = false;
let dlHasBlackJack = false;
let plIsAlive = false;
let dlIsAlive = false;
let stayActive = false;
let betActive = false;
let message = "";
let messageEl = document.querySelector("#message-el");
let sumEl = document.querySelector("#sum-el");
let plCardsEl = document.querySelector("#pl-cards-el");
let dlCardsEl = document.querySelector("#dl-cards-el");
let playerFunds = 200;
let fundsEl = document.querySelector("#funds-el");
let betEl = document.querySelector("#bet-el");
let bet = 0;

fundsEl.textContent = " $ " + playerFunds;

betEl.textContent = " $ " + bet;

function getRandomCard() {
    let randomCard = Math.floor(Math.random() * 13) + 1;
    if (randomCard === 1) {
        return 11;
    } else if (randomCard > 10) {
        return 10;
    } else {
        return randomCard;
    }
}

function startGame() {
    if (betActive === true) {
    // Reset game state
        plCards = [];
        dlCards = [];
        plSum = 0;
        dlSum = 0;
        plHasBlackJack = false;
        dlHasBlackJack = false;
        plIsAlive = false;
        dlIsAlive = false;
        stayActive = false;

        let plFirstCard = getRandomCard();
        let plSecondCard = getRandomCard();
        plSum = plFirstCard + plSecondCard;
        plCards = [plFirstCard, plSecondCard];
        plIsAlive = true;

        let dlFirstCard = getRandomCard();
        let dlSecondCard = getRandomCard();
        dlSum = dlFirstCard + dlSecondCard;
        dlCards = [dlFirstCard, dlSecondCard];
        dlIsAlive = true;

        renderGame();
    } else {
        messageEl.textContent = "Please place a bet before starting the game!";
    };
};

function renderGame() {
    plCardsEl.textContent = "Player Cards: ";
    dlCardsEl.textContent = "Dealer Cards: ";

    for (let i = 0; i < plCards.length; i++) {
        plCardsEl.textContent += " + " + plCards[i];
    }

    if (stayActive) {
        for (let i = 0; i < dlCards.length; i++) {
            dlCardsEl.textContent += " + " + dlCards[i];
        }
    } else {
        dlCardsEl.textContent += " + " + dlCards[0] + " + ?";
    }

    sumEl.textContent = "Sum: " + plSum;

    if (plSum <= 20) {
        message = "Do you want to draw another Card?";
    } else if (plSum === 21) {
        message = "Black Jack ! ! !";
        plHasBlackJack = true;
        compareSum(); // Calculate winnings immediately for Blackjack
    } else {
        message = "You're busted ....";
        plIsAlive = false;
        compareSum(); // Calculate winnings immediately for bust
    }

    messageEl.textContent = message;
}

function compareSum() {
    if (plIsAlive === false) {
        playerFunds = playerFunds;
        message = "You busted! Dealer wins!";
    } else if (plHasBlackJack) {
        playerFunds += bet * 2.5;
        message = "Black Jack! You win!";
    } else if (stayActive) {
        if (plSum === dlSum) {
            playerFunds += bet;
            message = "It's a tie!";
        } else if (plSum > dlSum && plSum <= 21) {
            playerFunds += bet * 2;
            message = "Your sum is higher! You win!";
        } else if (dlSum > plSum && dlSum <= 21) {
            playerFunds = playerFunds;
            message = "Dealer's sum is higher! Dealer wins!";
        } else if (dlSum > 21) {
            playerFunds += bet * 2;
            message = "Dealer busted! You win!";
        };
    };

    fundsEl.textContent = " $ " + playerFunds;
    messageEl.textContent = message;
    bet = 0;
    betEl.textContent = bet;
    betActive = false;
    stayActive = false;
};

function addBet10() {
    if (playerFunds >= 10) {
        betActive = true;
        bet += 10;
        playerFunds -= 10;
        fundsEl.textContent = " $ " + playerFunds;
        betEl.textContent = " $ " + bet;
    };
};

function addBet50() {
    if (playerFunds >= 50) {
        betActive = true;
        bet += 50;
        playerFunds -= 50;
        fundsEl.textContent = " $ " + playerFunds;
        betEl.textContent = " $ " + bet;
    };
};

function addBet100() {
    if (playerFunds >= 100) {
        betActive = true;
        bet += 100;
        playerFunds -= 100;
        fundsEl.textContent = " $ " + playerFunds;
        betEl.textContent = " $ " + bet;
    };
};

function drawCard() {
    if (plIsAlive === true && plHasBlackJack === false) {
        let card = getRandomCard();
        plSum += card;
        plCards.push(card);
        renderGame();
    }
}

function stay() {
    if (stayActive === false) {
        stayActive = true;

        while (dlSum <= 17) {
            let card = getRandomCard();
            dlSum += card;
            dlCards.push(card);
        }

        renderGame(); // Update display before comparing sums
        compareSum();
    }
}



