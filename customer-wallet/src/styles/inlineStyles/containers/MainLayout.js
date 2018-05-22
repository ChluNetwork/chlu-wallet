import { mainColor } from 'context/palette'

export default {
  circularProgressStyle: {
    root: { margin: '20px auto' }
  },
  AppBarStyle: {
    root: { background: mainColor }
  },
  switchUser: {
    iconStyle: {
      root: {
        color: 'white',
        cursor: 'pointer'
      }
    },
    menuItemStyle: {
      root: {
        backgroundColor: 'inherit'
      },
      active: {
        backgroundColor: 'rgb(229,229,229)'
      }
    }
  }
}
