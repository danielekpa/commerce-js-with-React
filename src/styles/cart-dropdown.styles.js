import { makeStyles } from '@mui/styles';

export default makeStyles(() => ({
  cartDropDownContainer: {
    position: 'absolute',
    width: '240px !important',
    height: '360px',
    display: 'flex !important',
    flexDirection: 'column',
    padding: '16px !important',
    border: '1px solid black',
    backgroundColor: 'white',
    top: '90px',
    right: '40px',
    zIndex: 5,
  },

  emptyMessage: {
    fontSize: '18px',
    margin: '50px auto',
  },
  cartItems: {
    height: '255px',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'scroll',
  },
  button: {
    marginTop: 'auto !important',
    justifySelf: 'flex-end !important',
    // flexGrow: 1,
  },
}));
