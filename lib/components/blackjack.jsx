var React = require('react'),
    Deck = require('./deck.jsx'),
    UserHand = require('./user_hand.jsx'),
    DealerHand = require('./dealer_hand.jsx');


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
