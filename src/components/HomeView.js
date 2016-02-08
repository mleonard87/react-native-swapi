/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';
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

export default class HomeView extends Component {
  render() {
    return (
      <View style={styles.container}>
        <ToolbarAndroid style={styles.toolbar} title='Star Wars API' />
        <View style={styles.row}>
          <View>
            <Text
              style={styles.title}
              onPress={() => {
                this.props.navigator.push({name: 'planets'})
              }}
              >
                Planets
              </Text>
          </View>
          <View>
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
          <View>
            <Text
              style={styles.title}
              onPress={() => {
                this.props.navigator.push({name: 'vehicles'})
              }}
              >
              Vehicles
            </Text>
          </View>
          <View>
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
          <View>
            <Text
              style={styles.title}
              onPress={() => {
                this.props.navigator.push({name: 'films'})
              }}
              >
              Films
            </Text>
          </View>
          <View>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#F5FCFF'
  },
  row: {
    flex: 1,
    justifyContent: 'space-around',
    flexDirection: 'row'
  },
  title: {
    fontSize: 20,
    borderWidth: 1
  },
  toolbar: {
    height: 56,
    backgroundColor: '#e9eaed',
    marginBottom: 0
  }
});
