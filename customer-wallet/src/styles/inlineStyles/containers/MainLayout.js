import { mainColor } from 'context/palette'

export default {
  circularProgressStyle: {
    style: { margin: '20px auto' }
  },
  AppBarStyle: {
    style: { background: mainColor },
    titleStyle: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    }
  },
  switchUser: {
    iconStyle: {
      iconStyle: {
        color: 'white',
        cursor: 'pointer'
      }
    },
    getStyle: isActive => ({
      backgroundColor: isActive ? 'rgb(229,229,229)': 'inherit'
    })
  }
}
