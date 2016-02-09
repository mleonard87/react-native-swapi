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

export default class PlanetsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      planets: [],
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2
      })
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData = () => {
    for (var f in this.props.planets) {
      fetch(this.props.planets[f])
        .then((response) => response.json())
        .then((responseData) => {
          var planets = this.state.planets
          planets.push(responseData);
          this.setState({
            planets: planets,
            dataSource: this.state.dataSource.cloneWithRows(planets)
          });
        })
        .done();
    }
  };

  render() {
    if (this.props.planets.length !== this.state.planets.length) {
      return (
        <LoadingView />
      );
    }

    return (
      <View>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this.renderPlanet}
          />
      </View>
    );
  }

  renderPlanet = (planet) => {
    return (
      <View style={styles.listItem}>
        <Text
          key={planet.name}
          style={styles.title}
          onPress={() => {
            this.props.onPress(planet.name, planet.url);
          }}
          >
          {planet.name}
        </Text>
      </View>
    );
  };
}
