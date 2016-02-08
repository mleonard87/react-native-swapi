/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';
import React, {
  Component,
  StyleSheet,
  Text,
  View
} from 'react-native';

export default class KeyValuePair extends Component {
  render() {
    return (
      <View style={styles.row}>
        <Text style={styles.label}>{this.props.label}: </Text>
        <Text style={styles.value}>{this.props.value}</Text>
      </View>
    );
  }
}

var styles = StyleSheet.create({
  row: {
    flex: 1,
    flexDirection: 'row'
  },
  label: {
    fontWeight: 'bold'
  }
})
