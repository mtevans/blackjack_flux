var React = require('react'),
    Cards = require('../constants/cards'),
    CardsActions = require('../actions/cards_actions'),
    UserHandStore = require('../stores/user_hand_store'),
    DealerHandStore = require('../stores/dealer_hand_store');

var Deck = React.createClass({
  getInitialState(){
    return{
      cards: this.dealCards(),
      dealt: [],
      UserScore: 0,
      DealerScore: 0,
      hold: false,
      gameOver: false
    }
  },
  // listen for changes to various hands
  componentDidMount(){
    this.userHandListener = UserHandStore.addListener(this._onUserHandChange);
    this.dealerHandListener = DealerHandStore.addListener(this._onDealerHandChange);
  },
  // no need for componenentWillUnmount as this component always showing
  _onUserHandChange(){
    var newHand = UserHandStore.getHand()
    var userScore = this.generateScore(newHand)
    var newHold = false
    if (userScore > 21){ // if player is over 21, make hold true and trigger dealer moves
      newHold = true
    }
    this.setState({
        userHand: newHand,
        UserScore: userScore,
        hold: newHold,
    })
  },

  _onDealerHandChange(){
    var newHand = DealerHandStore.getHand()
    var dealerScore = this.generateScore(newHand)
    this.setState({
        dealerHand: newHand,
        DealerScore: dealerScore
    })
  },

  isDealersTurn(){
    var UserScore = this.state.UserScore
    var DealerScore = this.state.DealerScore
    if(UserScore > 21 && DealerScore < 16 ){
      return true
    } else if(UserScore <= 21 && DealerScore < UserScore){
      return true
    } else {
      return false
    }
  },

  dealCards(){
      var deckInProgress = [];
      Cards.suits.forEach(suit => {
        Cards.values.forEach(value =>{
          deckInProgress.push({suit: suit, value: value})
        })
      })
    return this.shuffleCards(deckInProgress)
  },

  generateScore(hand){
    var score = 0;
    var aceCount = 0;
    hand.forEach(card => {
      if(card.value === "ace"){
        score += 11;
        aceCount += 1; // count aces, if over 21, will change value of ace value to 1 later.
      } else if(Cards.royals[card.value]){
        score += 10;
      } else {
        score += parseInt(card.value)
      }
    })
    while(score > 21 && aceCount > 0){ // if hand has aces, if count aces as 1 will get under 21
      score -= 10;
      aceCount -= 1;
    }
    return score
  },


  shuffleCards(deck){  // fisher-yates shuffle (https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle)
    for (var i = 0; i < deck.length; i++) {
      var random = Math.floor((Math.random() * (deck.length - i)) + i)
      if(i > random){ console.log("shuffle not working") }
      var hold = deck[i]
      deck[i] = deck[random]
      deck[random] = hold
    }
    return deck
  },

  reset(){
    var newDeck = this.state.cards.concat(this.state.dealt)
    this.setState({
      cards: this.shuffleCards(newDeck),
      dealt: [],
      UserScore: 0,
      DealerScore: 0,
      gameOver: false,
      hold: false,
    })
  },

  dealCard(id){
      var card = this.state.cards.pop()
      this.state.dealt.push(card)
      CardsActions.dealCard(card, id)
  },

  dealUserCard(){
    this.dealCard("USER")
  },

  newGame(){
    this.props.newGame()
    this.reset()
  },

  firstDeal(){
    this.dealCard("USER")
    this.dealCard("DEALER")
  },

  hold(){
    this.dealCard("DEALER")
    this.setState({hold: true})
  },

  findWinner(){
    var UserScore = this.state.UserScore
    var DealerScore = this.state.DealerScore
    if((UserScore > 21 && DealerScore > 21) || UserScore === DealerScore){
      return "There is no Winner"
    } else if(UserScore > DealerScore){
      return "Congratulations, You WON"
    } else {
      return "You Lose"
    }
  },

  render(){
    var message = ""
    if(this.isDealersTurn() && this.state.hold){
      setTimeout(()=>{ this.dealCard("DEALER")}, 750)
    } else if (this.state.hold){
      message = this.findWinner()
    }

    return(
      <div>
        <p>DealerScore = {this.state.DealerScore}</p>
        <p>UserScore = {this.state.UserScore}</p>
        <button onClick={this.firstDeal}>Start Game</button>
        <button onClick={this.dealUserCard}>Hit Me !!</button>
        <button onClick={this.newGame}>NewGame</button>
        <button onClick={this.hold}>Hold</button>
        {message}
      </div>
    )
  }
})

module.exports = Deck
