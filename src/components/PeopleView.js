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

var REQUEST_URL = SWAPIConfig.baseUrl + SWAPIConfig.peopleEndpoint;

export default class PeopleView extends Component {
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
            renderRow={this.renderPerson}
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
          title='People'
          titleColor='#ffe700'
          />
        {getContent()}
      </View>
    );
  }

  renderPerson = (person) => {
    return (
      <View style={styles.listItem}>
        <Text
          style={styles.title}
          onPress={() => {
            this.props.navigator.push({
              name: 'person-detail',
              title: person.name,
              dataUrl: person.url
            });
          }}
          >
          {person.name}
        </Text>
      </View>
    );
  };
}
