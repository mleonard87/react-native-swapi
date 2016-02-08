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
  Navigator,
  View
} from 'react-native';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import LoadingView from './LoadingView';
import KeyValuePair from './KeyValuePair';
import VehiclesList from './VehiclesList';
import PeopleList from './PeopleList';
import PlanetsList from './PlanetsList';
import StarshipsList from './StarshipsList';
import SpeciesList from './SpeciesList';
import SWAPITabBar from './SWAPITabBar';

export default class FilmDetailView extends Component {
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
          film: responseData,
          loaded: true
        });
      })
      .done();
  };

  render() {
    const getContent = () => {
      if (this.state.loaded) {
        var film = this.state.film;

        return (
          <ScrollableTabView initialPage={0} renderTabBar={() => <SWAPITabBar />}>
            <ScrollView tabLabel='Overview'>
              <KeyValuePair label='Episode' value={film.episode_id} />
              <KeyValuePair label='Director' value={film.director} />
              <KeyValuePair label='Producer' value={film.producer} />
              <Text style={styles.label}>Opening Crawl: </Text>
              <Text>{film.opening_crawl}</Text>
            </ScrollView>
            <ScrollView tabLabel='Characters'>
              <PeopleList
                people={film.characters}
                onPress={(title, dataUrl) => {
                  this.props.navigator.push({
                    name: 'person-detail',
                    title: title,
                    dataUrl: dataUrl
                  })
                }}
                />
            </ScrollView>
            <ScrollView tabLabel='Planets'>
              <PlanetsList
                planets={film.planets}
                onPress={(title, dataUrl) => {
                  this.props.navigator.push({
                    name: 'planet-detail',
                    title: title,
                    dataUrl: dataUrl
                  })
                }}
                />
            </ScrollView>
            <ScrollView tabLabel='Starships'>
              <StarshipsList
                starships={film.starships}
                onPress={(title, dataUrl) => {
                  this.props.navigator.push({
                    name: 'starship-detail',
                    title: title,
                    dataUrl: dataUrl
                  })
                }}
                />
            </ScrollView>
            <ScrollView tabLabel='Vehicles'>
              <VehiclesList
                vehicles={film.vehicles}
                onPress={(title, dataUrl) => {
                  this.props.navigator.push({
                    name: 'vehicle-detail',
                    title: title,
                    dataUrl: dataUrl
                  })
                }}
                />
            </ScrollView>
            <ScrollView tabLabel='Species'>
              <SpeciesList
                species={film.species}
                onPress={(title, dataUrl) => {
                  this.props.navigator.push({
                    name: 'species-detail',
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
    }



    return (
      <View style={styles.container}>
        <ToolbarAndroid style={styles.toolbar} title={this.props.title} />
        {getContent()}
      </View>
    );
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
  },
  label: {
    fontWeight: 'bold'
  }
})
