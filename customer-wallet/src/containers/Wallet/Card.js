import React from 'react'
import { withStyles, Card } from '@material-ui/core';


const style = {
    root: {
        margin: '30px'
    }
}

function WalletCard ({ children, ...props }) {
    return <Card {...props}>{children}</Card>
}

export default withStyles(style)(WalletCard)