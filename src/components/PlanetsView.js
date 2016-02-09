import React, {
  AppRegistry,
  Component,
  ListView,
  StyleSheet,
  Text,
  ToolbarAndroid,
  View,
  Navigator
} from 'react-native';
import LoadingView from './LoadingView';
import SWAPIConfig from '../config/swapi';
import styles from '../styles';

var REQUEST_URL = SWAPIConfig.baseUrl + SWAPIConfig.planetsEndpoint;

export default class PlanetsView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2
      }),
      loaded: false
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
    fetch(REQUEST_URL)
      .then((response) => response.json())
      .then((responseData) => {
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(responseData.results),
          loaded: true
        });
      })
      .done();
  }

  render() {
    const getContent = () => {
      if (this.state.loaded) {
        return (
          <ListView
            dataSource={this.state.dataSource}
            renderRow={this.renderPlanet}
            />
        );
      } else {
        return (
          <LoadingView />
        );
      }
    };

    return (
      <View>
        <ToolbarAndroid
          style={styles.toolbar}
          title='Planets'
          titleColor='#ffe700'
          />
        {getContent()}
      </View>
    );
  }

  renderPlanet = (planet) => {
    return (
      <View style={styles.listItem}>
        <Text
          style={styles.title}
          onPress={() => {
            this.props.navigator.push({
              name: 'planet-detail',
              title: planet.name,
              dataUrl: planet.url
            });
          }}
          >
          {planet.name}
        </Text>
      </View>
    );
  };
}
