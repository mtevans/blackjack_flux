const React = require('react');
const Store = require('flux/utils').Store;
const Dispatcher = require('../dispatcher/dispatcher.js');
const CardConstants = require('../constants/card_constants.js')


var _userHand = [];

const UserStore = new Store(Dispatcher);

UserStore.__onDispatch = function(payload){
  switch (payload.actionType) {
    case CardConstants.DEALUSER:
        _handleDeal(payload.card);
        this.__emitChange();
      break;

    case CardConstants.RESETGAME:
        _handleReset();
        this.__emitChange();
      break;

    case CardConstants.FIRSTDEAL:
        _handleDeal(payload.cards.userCard);
        this.__emitChange();
      break;
  }
}

const _handleReset = function(){
  _userHand = [];
}


const _handleDeal = function(card){
  _userHand.push(card)
}

UserStore.getHand = function(){
  return _userHand
}


module.exports = UserStore
