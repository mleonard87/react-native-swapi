import React, {
  Component,
  StyleSheet,
  Text,
  View
} from 'react-native';
import styles from '../styles';

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
