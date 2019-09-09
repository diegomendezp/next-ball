import React, { Component } from 'react'
import MatchService from '../../services/MatchService'

class Home extends Component {

  componentDidMount() {
    MatchService.getMatches()
    .then(matches => console.log(matches))
  }
  
  render() {
    return (
      <div>
        
      </div>
    )
  }
}

export default Home;