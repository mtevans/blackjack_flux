var React = require('react'),
    Deck = require('./deck'),
    UserHand = require('./user_hand'),
    DealerHand = require('./dealer_hand'),
    CardActions = require('../actions/cards_actions'),
    Cards = require('../constants/cards');


var Blackjack = React.createClass({
  newGame(){
    CardActions.newGame()
  },

  render(){
    return(
      <div>
        Welcome to Blackjack
        <Deck newGame={this.newGame}/>
        <UserHand/>
        <DealerHand/>
      </div>
    )
  }
})

module.exports = Blackjack
