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

  newGame(){
    Dispatcher.dispatch({
      actionType: CardConstants.RESETGAME
    });
  }

}



module.exports = cardActions
