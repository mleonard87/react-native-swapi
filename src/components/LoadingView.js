/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';
import React, {
  Component,
  ProgressBarAndroid,
  StyleSheet,
  View
} from 'react-native';

export default class LoadingView extends Component {
  render() {
    return (
      <View style={styles.loadingContainer}>
        <ProgressBarAndroid styleAttr='Horizontal' style={styles.progressBar} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    padding: 0,
    margin: 0,
  },
  progressBar: {
    marginTop: -7,
    padding: 0,
    color: '#ffe700',
  }
});
