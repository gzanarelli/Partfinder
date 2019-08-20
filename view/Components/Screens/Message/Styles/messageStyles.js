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
  viewInfos: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%'
  },
  listItem: {
    width: width,
    borderBottomLeftRadius: 45,
    height: height * 0.15,
    alignItems: 'center',
    justifyContent: 'center',
    display: 'flex',
    flexDirection: 'row'
  },
  avatarContainer: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderColor: '#4790ED',
    borderWidth: 2
  },
});