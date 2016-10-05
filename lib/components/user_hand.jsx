var React = require('react'),
    UserHandStore = require('../stores/user_hand_store'),
    Cards = require('../constants/cards');

var userHand = React.createClass({
  getInitialState(){
    return({
      hand: UserHandStore.getHand(),
      turnOver: false
    })
  },

  componentDidMount(){
    this.handListener = UserHandStore.addListener(this._onHandChange);
  },

  componenentWillUnmount(){
    this.handListener.remove()
  },

  _onHandChange(){
    this.setState({hand: UserHandStore.getHand()})
  },

  renderHand(){
    var hand = this.state.hand
    var toReturn = []
    if(!hand.length){
      return []
    } else {
      hand.forEach(card => {
        var value = card.value
        var suit = card.suit
        var path = './images/cards/' + value + '_of_' + suit + '.png'
        toReturn.push(<img className="card" key={value + " " + suit} src={path} />)
      })
    }
    return toReturn
  },


  render(){
    var hand = this.renderHand()
    return(
      <div>
        <p>UserHand</p>
        <div>{hand}</div>
      </div>
    )
  }
})



module.exports = userHand
