import React from 'react'
import { withStyles, Paper } from '@material-ui/core';


const style = {
    root: {
        display: 'block',
        margin: '30px',
        padding: '30px'
    }
}

function WalletPaper ({ children, ...props }) {
    return <Paper {...props}>{children}</Paper>
}

export default withStyles(style)(WalletPaper)