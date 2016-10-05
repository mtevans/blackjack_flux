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

  renderCards(){
    var cards = this.state.hand
    var toReturn = []
    if(!cards.length){
      return []
    } else {
      cards.forEach(card => {
        var value = card.value
        var suit = card.suit
        var path = './images/cards/' + value + '_of_' + suit + '.png'
        toReturn.push(<img className="card" key={value + " " + suit} src={path} />)
      })
    }
    return toReturn
  },

  render(){
    var cards = this.renderCards()
    return(
      <div>
        <p>DealerHand</p>
        <div>{cards}</div>
      </div>
    )
  }
})

module.exports = dealerHand
