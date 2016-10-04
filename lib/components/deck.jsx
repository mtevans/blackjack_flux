var React = require('react')
var Cards = require('../constants/cards')


var Deck = React.createClass({
  getInitialState(){
    return{
      cards: this.dealCards(),
      dealt: []
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
    })
  },

  dealCard(){
      console.log('handle deal')
      var card = this.state.cards.pop()
      this.state.dealt.push(card)
  },

  resetGame(){
    console.log('reset game')
    this.reset()
  },

  hold(){
    console.log("holding")
  },

  render(){
    return(
      <div>
        <button onClick={this.dealCard}>Deal</button>
        <button onClick={this.resetGame}>NewGame</button>
        <button onClick={this.hold}>Hold</button>
      </div>

    )
  }
})

module.exports = Deck
