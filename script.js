const gameBoard = document.getElementById('game-board');
const message = document.getElementById('message');
let cards = [];
let flippedCards = [];
let matchedCards = 0;

function startGame() {
    gameBoard.innerHTML = '';
    message.textContent = '';
    flippedCards = [];
    matchedCards = 0;

    cards = generateCards();

    cards = shuffle(cards);

    cards.forEach((number, index) => {
        const cardElement = document.createElement('div');
        cardElement.classList.add('card');
        cardElement.dataset.index = index;
        cardElement.dataset.number = number;
        cardElement.addEventListener('click', flipCard);
        gameBoard.appendChild(cardElement);
    });
}

function generateCards() {
    // Create an array with two same numbers and other different numbers
    const numbers = [1, 1, 2, 3, 4, 5, 6, 7];
    return numbers;
}

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function flipCard(event) {
    const cardElement = event.target;
    const index = cardElement.dataset.index;

    if (flippedCards.length < 2 && !flippedCards.includes(index)) {
        cardElement.textContent = cards[index];
        cardElement.classList.add('flipped');
        flippedCards.push(index);

        if (flippedCards.length === 2) {
            setTimeout(checkMatch, 1000);
        }
    }
}

function checkMatch() {
    const [index1, index2] = flippedCards;
    const card1 = gameBoard.children[index1];
    const card2 = gameBoard.children[index2];

    if (cards[index1] === cards[index2]) {
        card1.classList.add('matched');
        card2.classList.add('matched');
        message.textContent = 'Hurrey, it\'s matched!';
        matchedCards += 2;
        if (matchedCards === cards.length) {
            message.textContent = 'Congratulations, you matched all cards!';
        }
    } else {
        card1.textContent = '';
        card2.textContent = '';
        card1.classList.remove('flipped');
        card2.classList.remove('flipped');
    }

    flippedCards = [];
}

startGame();

