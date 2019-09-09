import React, { Component } from 'react'
import MatchService from '../../services/MatchService'
import CardWrapper from '../Card'

class Home extends Component {
  state = {
    matches: null
  }

  componentDidMount() {
    MatchService.getMatches()
    .then(matches => this.setState({...this.state, matches}))
  }
  
  displayMatches = () => {
    const { matches } = this.state;
    return matches.map((match, i) => {
      return (
        <CardWrapper {...match}>

        </CardWrapper>
      )
    })
  }
  render() {
    const { matches } = this.state;
    return (
      <React.Fragment>
        {matches && this.displayMatches()}
      </React.Fragment>
    )
  }
}

export default Home;