const React = require('react');
const Store = require('flux/utils').Store;
const Dispatcher = require('../dispatcher/dispatcher.js');
const CardConstants = require('../constants/card_constants.js')

var _dealerHand = [];

const DealerStore = new Store(Dispatcher);

DealerStore.__onDispatch = function(payload){
  switch (payload.actionType) {
    case CardConstants.DEALDEALER:
        handleDeal(payload.card);
        this.__emitChange();
      break;

    case CardConstants.RESETGAME:
        handleReset();
        this.__emitChange();
      break;

    case CardConstants.FIRSTDEAL:
        handleDeal(payload.cards.dealerCard);
        this.__emitChange();
      break;
  }
}

const handleReset = function(){
  _dealerHand = [];
}


const handleDeal = function(card){
  _dealerHand.push(card)
}

DealerStore.getHand = function(){
  return _dealerHand
}

module.exports = DealerStore
