import React from 'react'
import { Grid, Button } from '@material-ui/core';

function ClaimReputation(props) {
    return <Grid container spacing={24}>
        <Grid item container xs={12} spacing={0}>
            <Grid item xs={3}>
                <Button fullWidth variant='raised' color='primary'>Freelancer</Button>
            </Grid>
            <Grid item xs={3}>
                <Button fullWidth variant='raised' color='primary'>Restaurant</Button>
            </Grid>
            <Grid item xs={3}>
                <Button fullWidth variant='raised' color='primary'>Hotel</Button>
            </Grid>
            <Grid item xs={3}>
                <Button fullWidth variant='raised' color='primary'>Product</Button>
            </Grid>
        </Grid>
    </Grid>
}

export default ClaimReputation