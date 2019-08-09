import {
  StyleSheet,
  Dimensions
} from 'react-native';
const {
  width,
  height
} = Dimensions.get('screen');

export default StyleSheet.create({
  container: {
    display: 'flex',
    alignContent: 'center',
    backgroundColor: '#fff',
  },
  subtitle: {
    flexDirection: 'column',
    padding: 10,
    paddingTop: 5,
  },
  viewInfos: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%'
  },
  viewIcon: {
    display: 'flex',
    flexDirection: 'row'
  },
  listItem: {
    width: width,
    borderBottomLeftRadius: 45,
    height: height * 0.15,
    alignItems: 'center',
    justifyContent: 'center'
  },
  avatarContainer: {
    backgroundColor: '#fff',
    borderColor: '#4790ED',
    borderWidth: 2
  },
});