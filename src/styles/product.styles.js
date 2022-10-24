import { makeStyles } from '@mui/styles';

export default makeStyles(() => ({
  root: {
    height: '100%',
    maxWidth: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  cardActions: {
    justifyContent: 'flex-end',
    alignItems: ['flex-end', '!important'],
    flexGrow: 1,
  },
}));
