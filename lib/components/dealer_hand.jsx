var React = require('react'),
    DealerHandStore = require('../stores/dealer_hand_store');


var dealerHand = React.createClass({
  getInitialState(){
    return({
      hand: DealerHandStore.getHand()
    })
  },
  componentDidMount(){
    this.handListener = DealerHandStore.addListener(this._onHandChange);
  },

  componenentWillUnmount(){
    this.handListener.remove()
  },

  _onHandChange(){
      this.setState({hand: DealerHandStore.getHand()})
  },

  render(){
    return(
      <div>Dealers hand</div>
    )
  }
})

module.exports = dealerHand
