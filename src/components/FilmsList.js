import React, {
  AppRegistry,
  Component,
  ListView,
  StyleSheet,
  Text,
  ToolbarAndroid,
  ScrollView,
  View,
  ProgressBarAndroid
} from 'react-native';
import LoadingView from './LoadingView';
import KeyValuePair from './KeyValuePair';
import styles from '../styles';

export default class FilmsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      films: [],
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2
      })
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
    for (var f in this.props.films) {
      fetch(this.props.films[f])
        .then((response) => response.json())
        .then((responseData) => {
          var films = this.state.films;
          films.push(responseData);
          this.setState({
            films: films,
            dataSource: this.state.dataSource.cloneWithRows(films)
          });
        })
        .done();
    }
  }

  render() {
    if (this.props.films.length !== this.state.films.length) {
      return (
        <LoadingView />
      );
    }

    return (
      <View>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this.renderFilm}
          />
      </View>
    );
  }

  renderFilm = (film) => {
    return (
      <View style={styles.listItem}>
        <Text
          key={film.title}
          style={styles.title}
          onPress={() => {
            this.props.onPress(film.title, film.url);
          }}
          >
          {film.title}
        </Text>
      </View>
    );
  };
}
