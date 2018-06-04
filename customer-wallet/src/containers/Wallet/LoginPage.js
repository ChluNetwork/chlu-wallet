
import React from 'react'
// helpers
import replace from 'helpers/replace'
// components
import { Grid, CardContent } from '@material-ui/core';
import WalletCard from './Card'
import Button from '@material-ui/core/Button'
// assets
import chluLogo from 'images/svg/chlu-1.svg'

function LoginPage() {

  const logoStyle = {
    display: 'block',
    margin: 'auto',
    maxWidth: '300px'
  }

  return (
    <WalletCard>
      <CardContent>
        <Grid container spacing={24}>
          <Grid item xs={12}>
            <img src={chluLogo} style={logoStyle} alt='Chlu' />
          </Grid>
          <Grid item xs={12} md={6}>
            <Button fullWidth variant='raised' color='primary' onClick={() => replace('/setup/import')}>
              Import Identity
            </Button>
          </Grid>
          <Grid item xs={12} md={6}>
            <Button fullWidth variant='raised' color='secondary' onClick={() => replace('/setup/create')}>
              Create new Identity
            </Button>
          </Grid>
        </Grid>
      </CardContent>
    </WalletCard>
  )
}

export default LoginPage