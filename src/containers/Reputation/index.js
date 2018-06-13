import React, { Component } from 'react'
// components
import Reviews from 'containers/Reviews'
// redux
import { readMyReputation } from 'store/modules/data/reputation'
import { connect } from 'react-redux'

class Reputation extends Component {

    componentDidMount() {
        this.props.readMyReputation()
    }

    render() {
        return <div style={{ color:'white' }}>
            This is supposed to be the page where you see your reputation
            <br/>Review widget demo:
            <br/><Reviews/>    
        </div>
    }
}

const mapStateToProps = state => ({
    reputation: state.data.reputation.reputation
})

const mapDispatchToProps = {
    readMyReputation
}

export default connect(mapStateToProps, mapDispatchToProps)(Reputation)