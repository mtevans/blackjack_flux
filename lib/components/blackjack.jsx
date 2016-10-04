var React = require('react'),
    Deck = require('./deck'),
    UserHand = require('./user_hand'),
    DealerHand = require('./dealer_hand'),
    Card_Actions = require('../actions/cards_actions')


var Blackjack = React.createClass({
  render(){
    return(
      <div>
        Welcome to Blackjack
        <Deck/>
        <UserHand/>
        <DealerHand/>
      </div>
    )
  }
})

module.exports = Blackjack
