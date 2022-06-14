"use strict";
//prettier-ignore
const values = [2,3,4,5,6,7,8,9,10,11,12,13,14]
const suits = ["Hearts", "Diamonds", "Spades", "Clubs"];
//prettier-ignore
const ranks = ['2','3','4','5','6','7','8','9','10','jack','queen','king','Ace']
let deck;
//
//
class Card {
  constructor(suit, rank, value) {
    this.suit = suit;
    this.rank = rank;
    this.value = value;
  }
}
//
class Deck {
  constructor() {
    this.cards = [];
  }
  // HELPER //
  get numberOfCards() {
    return this.cards.length;
  }
  //   _createDeck() {
  //     for (let i = 0; i < suits.length; i++) {
  //       for (let j = 0; j < ranks.length; i++) {
  //         this.cards.push(new Card(suits[i], ranks[j], values[j]));
  //       }
  //     }
  //   }
  //

  _createDeck() {
    return suits.flatMap((suit) => {
      return ranks.map((rank, ind) => {
        return this.cards.push(new Card(suit, rank, values[ind]));
      });
    });
  }

  _shuffle() {
    for (let i = this.cards.length - 1; i > 0; i--) {
      const newIndex = Math.floor(Math.random() * (i + 1));
      const oldValue = this.cards[newIndex];
      this.cards[newIndex] = this.cards[i];
      this.cards[i] = oldValue;
    }
  }
  //
}

//
class Player {
  constructor(name) {
    this.name = name;
    this.playerCards = [];
  }
  _pick() {
    return this.playerCards.splice(
      Math.floor(Math.random() * this.playerCards.length),
      1
    );
  }
}
//
class Board {
  constructor() {
    this.cardsInMiddle = [];
    this.players = [];
  }
  _start(player1Name, player2Name) {
    this.players.push(new Player(player1Name));
    this.players.push(new Player(player2Name));
    deck = new Deck();
    deck._createDeck();
    deck._shuffle();
    this.players[0].playerCards = deck.cards.slice(0, 26);
    this.players[1].playerCards = deck.cards.slice(26, 52);
  }
}
let board = new Board();
board._start("Mario", "Luigi");

////// GAME  LOGIC  ////////
let roundNum = 0;
let gameOn = true;
//
//
while (gameOn) {
  roundNum += 1;
  console.log(`Round: ${roundNum} WAR=PIGS`);
  //
  // CHECK IF GAME OVER
  if (board.players[0].playerCards.length === 0) {
    console.log(
      ` Player 1 ran out of cards. Anyone who opposes Player Two will be destroyed!`
    );
    gameOn = false;
    break;
  }
  //
  else if (board.players[1].playerCards.length === 0) {
    console.log(
      `Player 2 ran out of cards. You must defeat Player One's Dragon Punch to stand a chance!`
    );
    gameOn = false;
    break;
  }
  //
  // BEGIN PLAYING //////////////////////
  let p1Pile = []; // PLAYER 1 CARDS ON TABLE
  let p2Pile = []; // PLAYER 1 CARDS ON TABLE
  let popped1 = board.players[0]._pick(); // GET A RANDOM CARD
  let popped2 = board.players[1]._pick(); // GET A RANDOM CARD
  p1Pile.push(...popped1);
  p2Pile.push(...popped2);
  //
  // JUST TESTING HERE   /////////////////////////
  console.log(p2Pile[0]["value"], p1Pile[0]["value"]);

  // 1st player check win
  if (p1Pile[0]["value"] > p2Pile[0]["value"]) {
    board.players[0].playerCards.push(...p1Pile);
    board.players[0].playerCards.push(...p2Pile);
    p1Pile = [];
    p2Pile = [];
  }
  // 2nd player check win
  else if (p2Pile[0]["value"] > p1Pile[0]["value"]) {
    board.players[1].playerCards.push(...p1Pile);
    board.players[1].playerCards.push(...p2Pile);
    p1Pile = [];
    p2Pile = [];
  } else {
    // WAR WITHIN /////////////
    // WAR WITHIN /////////////
    let atWar = true;
    while (atWar) {
      p1Pile = [];
      p2Pile = [];
      if (board.players[0].playerCards.length < 3) {
        console.log(`Player 1 ran out of cards in war proper.  Player 2 wins!`);
        atWar = false;
        break;
        //
      } else if (board.players[1].playerCards.length < 3) {
        console.log(`Player 2 ran out of cards in war proper.  Player 1 wins!`);
        atWar = false;
        break;
      } else {
        console.log(`War within War`);
        //
        for (let i = 0; i < 3; i++) p1Pile.push(board.players[0]._pick());
        p2Pile.push(board.players[1]._pick());
        // COMPARE ///
        if (p1Pile[0]["value"] > p2Pile[0]["value"]) {
          board.players[0].playerCards.push(...p1Pile);
          board.players[0].playerCards.push(...p2Pile);
          p1Pile = [];
          p2Pile = [];
          atWar = false;
        }
        //
        else if (p2Pile[0]["value"] > p1Pile[0]["value"]) {
          board.players[1].playerCards.push(...p1Pile);
          board.players[1].playerCards.push(...p2Pile);
          p1Pile = [];
          p2Pile = [];
          atWar = false;
        } else {
          continue;
        }

        // console.log(`wwwwww`);
        // console.log(p1Pile, p2Pile);
      }
    }
  }
  //
  // console.log(
  //   board.players[0].playerCards.length,
  //   board.players[1].playerCards.length
  // );
}
