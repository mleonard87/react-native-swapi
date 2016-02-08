/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';
import React, {
  AppRegistry,
  BackAndroid,
  Component,
  StyleSheet,
  Navigator,
  ToolbarAndroid,
  View
} from 'react-native';
import HomeView from './src/components/HomeView';
import PlanetsView from './src/components/PlanetsView';
import PlanetDetailView from './src/components/PlanetDetailView';
import StarshipsView from './src/components/StarshipsView';
import StarshipDetailView from './src/components/StarshipDetailView';
import VehiclesView from './src/components/VehiclesView';
import VehicleDetailView from './src/components/VehicleDetailView';
import PeopleView from './src/components/PeopleView';
import PersonDetailView from './src/components/PersonDetailView';
import FilmsView from './src/components/FilmsView';
import FilmDetailView from './src/components/FilmDetailView';
import SpeciesView from './src/components/SpeciesView';
import SpeciesDetailView from './src/components/SpeciesDetailView';

var _navigator;

BackAndroid.addEventListener('hardwareBackPress', () => {
  if (_navigator && _navigator.getCurrentRoutes().length > 1) {
    _navigator.pop();
    return true;
  }
  return false;
});

var RouteMapper = function(route, navigationOperations, onComponentRef) {
  _navigator = navigationOperations;

  switch (route.name) {
    case 'home':
      return <HomeView navigator={navigationOperations} />
    case 'planets':
      return <PlanetsView navigator={navigationOperations} />
    case 'planet-detail':
      return <PlanetDetailView navigator={navigationOperations} title={route.title} dataUrl={route.dataUrl} />
    case 'starships':
      return <StarshipsView navigator={navigationOperations} />
    case 'starship-detail':
      return <StarshipDetailView navigator={navigationOperations} title={route.title} dataUrl={route.dataUrl} />
    case 'vehicles':
      return <VehiclesView navigator={navigationOperations} />
    case 'vehicle-detail':
      return <VehicleDetailView navigator={navigationOperations} title={route.title} dataUrl={route.dataUrl} />
    case 'people':
      return <PeopleView navigator={navigationOperations} />
    case 'person-detail':
      return <PersonDetailView navigator={navigationOperations} title={route.title} dataUrl={route.dataUrl} />
    case 'films':
      return <FilmsView navigator={navigationOperations} />
    case 'film-detail':
      return <FilmDetailView navigator={navigationOperations} title={route.title} dataUrl={route.dataUrl} />
    case 'species':
      return <SpeciesView navigator={navigationOperations} />
    case 'species-detail':
      return <SpeciesDetailView navigator={navigationOperations} title={route.title} dataUrl={route.dataUrl} />
  }
};

class SWAPI extends Component {
  render() {
    var initialRoute = {name: 'home'};
    return (
      <View style={styles.container}>
        <Navigator
          style={styles.navigationContainer}
          initialRoute={initialRoute}
          renderScene={RouteMapper}
          />
      </View>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column'
  },
  navigationContainer: {
    flex: 1,
  },
  toolbar: {
    height: 56,
    backgroundColor: '#e9eaed',
    marginBottom: 0
  }
});

AppRegistry.registerComponent('SWAPI', () => SWAPI);
