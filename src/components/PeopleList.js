/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';
import React, {
  AppRegistry,
  Component,
  ListView,
  StyleSheet,
  Text,
  ScrollView,
  View,
  ProgressBarAndroid
} from 'react-native';
import LoadingView from './LoadingView';
import KeyValuePair from './KeyValuePair';
import styles from '../styles';

export default class PeopleList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      people: [],
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2
      })
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData = () => {
    for (var f in this.props.people) {
      fetch(this.props.people[f])
        .then((response) => response.json())
        .then((responseData) => {
          var people = this.state.people
          people.push(responseData);
          this.setState({
            people: people,
            dataSource: this.state.dataSource.cloneWithRows(people)
          });
        })
        .done();
    }
  };

  render() {
    if (this.props.people.length !== this.state.people.length) {
      return (
        <LoadingView />
      );
    }

    return (
      <View>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this.renderPerson}
          />
      </View>
    );
  }

  renderPerson = (person) => {
    return (
      <View style={styles.listItem}>
        <Text
          key={person.name}
          style={styles.title}
          onPress={() => {
            this.props.onPress(person.name, person.url);
          }}
          >
          {person.name}
        </Text>
      </View>
    );
  };
}
