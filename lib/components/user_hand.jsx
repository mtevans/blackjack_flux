var React = require('react'),
    UserHandStore = require('../stores/user_hand_store');

var userHand = React.createClass({
  getInitialState(){
    return({
      hand: UserHandStore.getHand()
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

  render(){
    return(
      <div>Users hand</div>
    )
  }
})



module.exports = userHand
