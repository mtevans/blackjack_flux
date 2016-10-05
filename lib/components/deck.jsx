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
      gameOver: false,
      start: true,
    }
  },
  // listen for changes to various hands
  componentDidMount(){
    this.userHandListener = UserHandStore.addListener(this._onUserHandChange);
    this.dealerHandListener = DealerHandStore.addListener(this._onDealerHandChange);
  },
  // no need for componenentWillUnmount as this component always showing
  _onUserHandChange(){
    var newHand = UserHandStore.getHand();
    var userScore = this.generateScore(newHand);
    var newHold = false;
    if (userScore > 21){ // if UserScore is over 21, imitate hold move which will trigger dealer moves
      newHold = true;
    }
    this.setState({
        userHand: newHand,
        UserScore: userScore,
        hold: newHold,
        start: false
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
    return score;
  },


  dealCards(){
      var deckInProgress = [];
      Cards.suits.forEach(suit => {
        Cards.values.forEach(value =>{
          deckInProgress.push({suit: suit, value: value});
        })
      })
    return this.shuffleCards(deckInProgress);
  },

  shuffleCards(deck){  // fisher-yates shuffle (https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle)
    for (var i = 0; i < deck.length; i++) {
      var random = Math.floor((Math.random() * (deck.length - i)) + i);
      if(i > random){ console.log("shuffle not working") }
      var hold = deck[i];
      deck[i] = deck[random];
      deck[random] = hold;
    }
    return deck;
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
      start: true
    })
  },

  dealCard(id){
      var card = this.state.cards.pop();
      this.state.dealt.push(card);
      CardsActions.dealCard(card, id);
  },

  dealUserCard(){
    this.dealCard("USER");
  },

  newGame(){
    this.props.newGame();
    this.reset();
  },

  firstDeal(){
    this.dealCard("USER");
    this.dealCard("DEALER");
  },

  hold(){
    this.dealCard("DEALER");
    this.setState({hold: true});
  },

  isDealersTurn(){ // dealer must take card if less than 17
    var UserScore = this.state.UserScore;
    var DealerScore = this.state.DealerScore;
    if(DealerScore < 17 ){
      return true;
    } else {
      return false;
    }
  },

  findWinner(){
    var UserScore = this.state.UserScore;
    var DealerScore = this.state.DealerScore;
    if((UserScore > 21 && DealerScore > 21) || UserScore === DealerScore){
      return "There is no Winner";
    } else if (DealerScore < 21 && UserScore > 21){
      return "You Lose";
    }else if((UserScore <= 21 && DealerScore > 21) || UserScore > DealerScore){
      return "Congratulations, You WON";
    } else {
      return "You Lose";
    }
  },

  renderButtons(){
    if(this.state.gameOver){
      return (<div><button onClick={this.newGame}>NewGame</button></div>)
    } else if(this.state.start){
      return(<div><button onClick={this.firstDeal}>Start Game</button></div>)
    } else if(this.state.hold){
      return(<div><button onClick={this.newGame}>NewGame</button></div>)
    } else {
      return( <div><button onClick={this.dealUserCard}>Hit Me !!</button>,
              <button onClick={this.newGame}>NewGame</button>,
              <button onClick={this.hold}>Hold</button></div> )
    }
  },
  
  render(){
    var message = "";
    if(this.isDealersTurn() && this.state.hold){
      setTimeout(()=>{ this.dealCard("DEALER")}, 750) // the timeout is for suspense
    } else if (this.state.hold){
      this.state.gameOver = true;
      message = this.findWinner();
    }
    var buttons = this.renderButtons()
    return(
      <div>
        <p>DealerScore = {this.state.DealerScore}</p>
        <p>UserScore = {this.state.UserScore}</p>
        {buttons}
        {message}
      </div>
    )
  }
})

module.exports = Deck
