const cards = [
  { name: 'aquaman', img: 'aquaman.jpg' },
  { name: 'batman', img: 'batman.jpg' },
  { name: 'captain america', img: 'captain-america.jpg' },
  { name: 'fantastic four', img: 'fantastic-four.jpg' },
  { name: 'flash', img: 'flash.jpg' },
  { name: 'green arrow', img: 'green-arrow.jpg' },
  { name: 'green lantern', img: 'green-lantern.jpg' },
  { name: 'ironman', img: 'ironman.jpg' },
  { name: 'spiderman', img: 'spiderman.jpg' },
  { name: 'superman', img: 'superman.jpg' },
  { name: 'the avengers', img: 'the-avengers.jpg' },
  { name: 'thor', img: 'thor.jpg' },
  { name: 'aquaman', img: 'aquaman.jpg' },
  { name: 'batman', img: 'batman.jpg' },
  { name: 'captain america', img: 'captain-america.jpg' },
  { name: 'fantastic four', img: 'fantastic-four.jpg' },
  { name: 'flash', img: 'flash.jpg' },
  { name: 'green arrow', img: 'green-arrow.jpg' },
  { name: 'green lantern', img: 'green-lantern.jpg' },
  { name: 'ironman', img: 'ironman.jpg' },
  { name: 'spiderman', img: 'spiderman.jpg' },
  { name: 'superman', img: 'superman.jpg' },
  { name: 'the avengers', img: 'the-avengers.jpg' },
  { name: 'thor', img: 'thor.jpg' }
];

const memoryGame = new MemoryGame(cards);


window.addEventListener('load', (event) => {

  memoryGame.shuffleCards();

  let html = '';

  memoryGame.cards.forEach((pic) => {
    html += `
      <div class="card" data-card-name="${pic.name}">
        <div class="back" name="${pic.img}"></div>
        <div class="front" style="background: url(img/${pic.img}) no-repeat"></div>
      </div>
    `;
  });

  // Add all the divs to the HTML
  document.querySelector('#memory-board').innerHTML = html;

  let pairsClicked = 0;
  let pairsGuessed = 0;
  let flippedCards = [];

  // Bind the click event of each element to a function
  document.querySelectorAll('.card').forEach((card) => {

 card.addEventListener('click', () => {

  if (flippedCards.length >= 2) {
    return;
  }

  card.classList.add('turned');

  const cardName = card.getAttribute('data-card-name');

  memoryGame.pickedCards.push(cardName);

  flippedCards.push(card);

  if (flippedCards.length === 2) {

    const card1 = memoryGame.pickedCards[0];
    const card2 = memoryGame.pickedCards[1];
    const isPair = memoryGame.checkIfPair(card1, card2);

    pairsClicked++;


    if (isPair) {
      pairsGuessed++;

      flippedCards.forEach((flippedCard) => {
        flippedCard.classList.add('blocked');
      });

      flippedCards = [];
    } 
    else {
      setTimeout(() => {
        flippedCards.forEach((flippedCard) => {
          flippedCard.classList.remove('turned');
        });
        
        flippedCards = [];
      }, 1000);
    }

    memoryGame.pickedCards = [];

    if (memoryGame.checkIfFinished()) {
      alert('You won!!!');
    }
  }

  document.querySelector('#pairs-clicked').textContent = pairsClicked;
  document.querySelector('#pairs-guessed').textContent = pairsGuessed;
  });
 });
});
