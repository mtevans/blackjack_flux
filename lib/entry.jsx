var React = require ('react'),
    ReactDOM = require('react-dom'),
    Blackjack = require('./blackjack');


document.addEventListener('DOMContentLoaded', function(){
  ReactDOM.render(<Blackjack/>, document.getElementById('root'))
})
