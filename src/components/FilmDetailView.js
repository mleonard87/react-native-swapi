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
import styles from '../styles';

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
          <View style={styles.container}>
            <ScrollableTabView initialPage={0} renderTabBar={() => <SWAPITabBar />}>
              <View tabLabel='Overview'>
                <KeyValuePair label='Episode' value={film.episode_id} />
                <KeyValuePair label='Director' value={film.director} />
                <KeyValuePair label='Producer' value={film.producer} />
                <Text style={styles.label}>Opening Crawl: </Text>
                <Text>{film.opening_crawl}</Text>
              </View>
              <View tabLabel='Characters'>
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
              </View>
              <View tabLabel='Planets'>
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
              </View>
              <View tabLabel='Starships'>
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
              </View>
              <View tabLabel='Vehicles'>
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
              </View>
              <View tabLabel='Species'>
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
    }



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
}
