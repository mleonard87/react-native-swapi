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

export default class StarshipsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      starships: [],
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2
      })
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData = () => {
    for (var f in this.props.starships) {
      fetch(this.props.starships[f])
        .then((response) => response.json())
        .then((responseData) => {
          var starships = this.state.starships
          starships.push(responseData);
          this.setState({
            starships: starships,
            dataSource: this.state.dataSource.cloneWithRows(starships)
          });
        })
        .done();
    }
  };

  render() {
    if (this.props.starships.length !== this.state.starships.length) {
      return (
        <LoadingView />
      );
    }

    return (
      <View>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this.renderStarship}
          />
      </View>
    );
  }

  renderStarship = (starship) => {
    return (
      <View style={styles.listItem}>
        <Text
          key={starship.name}
          style={styles.title}
          onPress={() => {
            this.props.onPress(starship.name, starship.url);
          }}
          >
          {starship.name}
        </Text>
      </View>
    );
  };

}
