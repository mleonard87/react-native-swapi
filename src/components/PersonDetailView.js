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
import FilmsList from './FilmsList';
import SpeciesList from './SpeciesList';
import VehiclesList from './VehiclesList';
import StarshipsList from './StarshipsList';
import PlanetsList from './PlanetsList';
import SWAPITabBar from './SWAPITabBar';

export default class PersonDetailView extends Component {
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
          person: responseData,
          loaded: true
        });
      })
      .done();
  };

  render() {
    const getContent = () => {
      if (this.state.loaded) {
        return (
          <ScrollableTabView initialPage={0} renderTabBar={() => <SWAPITabBar />}>
            <ScrollView tabLabel='Overview'>
              <KeyValuePair label='Height' value={person.height} />
              <KeyValuePair label='Mass' value={person.mass} />
              <KeyValuePair label='Hair Colour' value={person.hair_color} />
              <KeyValuePair label='Skin Colour' value={person.skin_color} />
              <KeyValuePair label='Eye Colour' value={person.eye_color} />
              <KeyValuePair label='Birth Year' value={person.birth_year} />
              <KeyValuePair label='Gender' value={person.gender} />
              <View>
                <KeyValuePair label='Homeworld' value='' />
                <PlanetsList
                  planets={[person.homeworld]}
                  onPress={(title, dataUrl) => {
                    this.props.navigator.push({
                      name: 'planet-detail',
                      title: title,
                      dataUrl: dataUrl
                    })
                  }}
                  />
              </View>
            </ScrollView>
            <ScrollView tabLabel='Species'>
              <SpeciesList
                species={person.species}
                onPress={(title, dataUrl) => {
                  this.props.navigator.push({
                    name: 'species-detail',
                    title: title,
                    dataUrl: dataUrl
                  })
                }}
                />
            </ScrollView>
            <ScrollView tabLabel='Vehicles'>
              <VehiclesList
                vehicles={person.vehicles}
                onPress={(title, dataUrl) => {
                  this.props.navigator.push({
                    name: 'vehicle-detail',
                    title: title,
                    dataUrl: dataUrl
                  })
                }}
                />
            </ScrollView>
            <ScrollView tabLabel='Films'>
              <FilmsList
                films={person.films}
                onPress={(title, dataUrl) => {
                  this.props.navigator.push({
                    name: 'film-detail',
                    title: title,
                    dataUrl: dataUrl
                  })
                }}
                />
            </ScrollView>
            <ScrollView tabLabel='Starships'>
              <StarshipsList
                starships={person.starships}
                onPress={(title, dataUrl) => {
                  this.props.navigator.push({
                    name: 'starship-detail',
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

    var person = this.state.person;

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
  }
})
