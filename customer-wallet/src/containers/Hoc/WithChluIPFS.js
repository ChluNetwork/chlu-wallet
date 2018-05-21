import React, { Component } from 'react'
import CircularProgress from 'material-ui/core/CircularProgress';
import { getChluIPFS } from '../../helpers/ipfs';

export default function WithChluIPFS(type) {
    return function (WrappedComponent) {
        return class ChluIPFSWrappedComponent extends Component {
            constructor(props) {
                super(props)
                this.state = {
                    ready: true
                }
            }

            componentDidMount() {
                getChluIPFS(type).then(chluIpfs => {
                    this.setState({ ready: true })
                }).catch(err => {
                    console.log(err)
                    // TODO - retry or inform user things are busted
                })
            }

            render () {
                if (this.state.ready) return <WrappedComponent {...this.props} />
                else return <CircularProgress size={80} style={{ display:'block', margin:'2rem auto' }} />
            }
        }
    }
}
