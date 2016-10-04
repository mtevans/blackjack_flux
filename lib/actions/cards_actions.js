const React = require('react');
const CardConstants = require('../constants/card_constants.js');
const Dispatcher = require('../dispatcher/dispatcher.js');


const cardActions = {
  dealCard(card, id){
    if(id === "USER"){
      var actionType = CardConstants.DEALUSER;
    } else {
      var actionType = CardConstants.DEALDEALER;
    }

    Dispatcher.dispatch({
      actionType: actionType,
      card: card
    });
  },

  firsDeal(cards){
    Dispatcher.dispatch({
      actionType: CardConstants.FIRSTDEAL,
      cards: cards
    });
  },

  resetGame(){
    Dispatcher.dispatch({
      actionType: CardConstants.RESETGAME,
      card: card
    });
  }

}



module.exports = cardActions
