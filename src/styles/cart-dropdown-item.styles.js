import { makeStyles } from '@mui/styles';

export default makeStyles (() => ({
  cartItemContainer: {
    width: '100%',
    display: 'flex',
    height: '80px',
    marginBottom: '15px',
    cursor: 'pointer',
    '&:hover': 'backgroundColor: #E5E5E6 !important',
  },

  img: {
    // height: 'auto',
    width: '30%',
    backgroundPosition: 'center',
  },

  itemDetails: {
    width: '70%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flexstart',
    justifyContent: 'center',
    padding: '10px 20px',
  },
  name: {
    fontSize: '16px',
  }
}));