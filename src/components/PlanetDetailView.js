import React, {
  AppRegistry,
  Component,
  ListView,
  StyleSheet,
  Text,
  ToolbarAndroid,
  View
} from 'react-native';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import LoadingView from './LoadingView';
import KeyValuePair from './KeyValuePair';
import FilmsList from './FilmsList';
import PeopleList from './PeopleList';
import SWAPITabBar from './SWAPITabBar';
import styles from '../styles';

export default class PlanetDetailView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData = () => {
    fetch(this.props.dataUrl)
      .then((response) => response.json())
      .then((responseData) => {
        this.setState({
          planet: responseData,
          loaded: true
        });
      })
      .done();
  };

  render() {
    const getContent = () => {
      if (this.state.loaded) {
        var planet = this.state.planet;

        return (
          <View style={styles.container}>
            <ScrollableTabView initialPage={0} renderTabBar={() => <SWAPITabBar />}>
              <View tabLabel='Overview'>
                <KeyValuePair label='Rotation Period' value={planet.rotation_period} />
                <KeyValuePair label='Orbital Period' value={planet.orbital_period} />
                <KeyValuePair label='Diameter' value={planet.diameter} />
                <KeyValuePair label='Climate' value={planet.climate} />
                <KeyValuePair label='Gravity' value={planet.gravity} />
                <KeyValuePair label='Terrain' value={planet.terrain} />
                <KeyValuePair label='Surface Water' value={planet.surface_water} />
                <KeyValuePair label='Population' value={planet.population} />
              </View>
              <View tabLabel='Residents'>
                <PeopleList
                  people={planet.residents}
                  onPress={(title, dataUrl) => {
                    this.props.navigator.push({
                      name: 'person-detail',
                      title: title,
                      dataUrl: dataUrl
                    })
                  }}
                  />
              </View>
              <View tabLabel='Films'>
                <FilmsList
                  films={planet.films}
                  onPress={(title, dataUrl) => {
                    this.props.navigator.push({
                      name: 'film-detail',
                      title: title,
                      dataUrl: dataUrl
                    })
                  }}
                  />
              </View>
            </ScrollableTabView>
          </View>
        );
      } else {
        return (
          <View>
            <LoadingView />
          </View>
        );
      }
    };

    return (
      <View style={styles.container}>
        <ToolbarAndroid
          style={styles.toolbar}
          title={this.props.title}
          titleColor='#ffe700'
          />
          {getContent()}
      </View>
    );
  }

  renderResidents(residents) {
    return residents.map((r) => {
      return (
        <Text key={r.name}>{r}</Text>
      );
    });
  }
}
