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
      <View style={styles.container}>
        <ProgressBarAndroid />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
