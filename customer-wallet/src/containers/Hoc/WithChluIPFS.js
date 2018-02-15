import React, { Component } from 'react'
import CircularProgress from 'material-ui/CircularProgress';
import { getChluIPFS } from '../../helpers/ipfs';

export default function WithChluIPFS(type, WrappedComponent) {
    return class ChluIPFSWrappedComponent extends Component {
        constructor(props) {
            super(props)
            this.state = {
                ready: false
            }
        }

        componentDidMount() {
            getChluIPFS(type).then(chluIpfs => {
                this.setState({ ready: true })
            })
        }

        render () {
            if (this.state.ready) return <WrappedComponent {...this.props} />
            else return <CircularProgress size={80} style={{ display:'block', margin:'2rem auto' }} />
        }
    }
}