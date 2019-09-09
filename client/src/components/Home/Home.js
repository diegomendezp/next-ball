import React, { Component } from 'react'
import MatchService from '../../services/MatchService'

class Home extends Component {
  state = {
    matches: null
  }

  componentDidMount() {
    MatchService.getMatches()
    .then(matches => this.setState({...this.state, matches}))
  }
  
  render() {
    return (
      <div>
      </div>
    )
  }
}

export default Home;