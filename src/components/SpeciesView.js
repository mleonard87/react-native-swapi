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

var REQUEST_URL = SWAPIConfig.baseUrl + SWAPIConfig.speciesEndpoint;

export default class SpeciesView extends Component {
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
            renderRow={this.renderSpecies}
            style={styles.listView}
            />
        );
      } else {
        return (
          <LoadingView />
        );
      }
    }

    return (
      <View>
        <ToolbarAndroid
          style={styles.toolbar}
          title='Species'
          titleColor='#ffe700'
          />
        {getContent()}
      </View>
    );
  }

  renderSpecies = (species) => {
    return (
      <View style={styles.listItem}>
        <Text
          style={styles.title}
          onPress={() => {
            this.props.navigator.push({
              name: 'species-detail',
              title: species.name,
              dataUrl: species.url
            });
          }}
          >
          {species.name}
        </Text>
      </View>
    );
  };
}
