import { StyleSheet } from 'react-native';

var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fff',
  },
  tabContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  listItem: {
    padding: 5,
  },
  title: {
    fontSize: 20,
    marginBottom: 8
  },
  toolbar: {
    height: 56,
    backgroundColor: '#000',
    marginBottom: 0
  },
  row: {
    flex: 1,
    flexDirection: 'row'
  },
  label: {
    fontWeight: 'bold'
  },
  tile: {
    width: 50,
  }
});

export default styles;
