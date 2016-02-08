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
  ToolbarAndroid,
  ScrollView,
  View
} from 'react-native';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import LoadingView from './LoadingView';
import KeyValuePair from './KeyValuePair';
import FilmsList from './FilmsList';
import PeopleList from './PeopleList';
import SWAPITabBar from './SWAPITabBar';

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
          <ScrollableTabView initialPage={0} renderTabBar={() => <SWAPITabBar />}>
            <ScrollView tabLabel='Overview'>
              <KeyValuePair label='Rotation Period' value={planet.rotation_period} />
              <KeyValuePair label='Orbital Period' value={planet.orbital_period} />
              <KeyValuePair label='Diameter' value={planet.diameter} />
              <KeyValuePair label='Climate' value={planet.climate} />
              <KeyValuePair label='Gravity' value={planet.gravity} />
              <KeyValuePair label='Terrain' value={planet.terrain} />
              <KeyValuePair label='Surface Water' value={planet.surface_water} />
              <KeyValuePair label='Population' value={planet.population} />
            </ScrollView>
            <ScrollView tabLabel='Residents'>
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
            </ScrollView>
            <ScrollView tabLabel='Films'>
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
            </ScrollView>
          </ScrollableTabView>
        );
      } else {
        return (
          <LoadingView />
        );
      }
    };

    return (
      <View style={styles.container}>
        <ToolbarAndroid style={styles.toolbar} title={this.props.title} />
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

var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column'
  },
  title: {
    fontSize: 20,
    marginBottom: 8,
    textAlign: 'center'
  },
  toolbar: {
    height: 56,
    backgroundColor: '#e9eaed',
    marginBottom: 0
  }
})
