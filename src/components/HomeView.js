import React, {
  AppRegistry,
  Component,
  Image,
  StyleSheet,
  Text,
  ToolbarAndroid,
  View,
  Navigator
} from 'react-native';
import corestyles from '../styles';

export default class HomeView extends Component {
  render() {
    return (
      <View style={corestyles.container}>
        <ToolbarAndroid
          style={corestyles.toolbar}
          title='Star Wars API'
          titleColor='#ffe700'
          />
        <View style={styles.row}>
          <View style={styles.tile}>
            <Text
              style={styles.title}
              onPress={() => {
                this.props.navigator.push({name: 'planets'})
              }}
              >
              Planets
            </Text>
          </View>
          <View style={styles.tile}>
            <Text
              style={styles.title}
              onPress={() => {
                this.props.navigator.push({name: 'starships'})
              }}
              >
                Starships
              </Text>
          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.tile}>
            <Text
              style={styles.title}
              onPress={() => {
                this.props.navigator.push({name: 'vehicles'})
              }}
              >
              Vehicles
            </Text>
          </View>
          <View style={styles.tile}>
            <Text
              style={styles.title}
              onPress={() => {
                this.props.navigator.push({name: 'people'})
              }}
              >
              People
            </Text>
          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.tile}>
            <Text
              style={styles.title}
              onPress={() => {
                this.props.navigator.push({name: 'films'})
              }}
              >
              Films
            </Text>
          </View>
          <View style={styles.tile}>
            <Text
              style={styles.title}
              onPress={() => {
                this.props.navigator.push({name: 'species'})
              }}
              >
              Species
            </Text>
          </View>
        </View>
      </View>
    );
  }
}

var styles = StyleSheet.create({
  row: {
    flex: 1,
    flexDirection: 'row',
  },
  tile: {
    flex: 1,
    padding: 5,
  },
  title: {
    flex: 1,
    backgroundColor: '#000',
    color: '#ffe700',
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'center'
  }
});
