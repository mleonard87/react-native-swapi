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
import PeopleList from './PeopleList';
import PlanetsList from './PlanetsList';
import SWAPITabBar from './SWAPITabBar';

export default class SpeciesDetailView extends Component {
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
          species: responseData,
          loaded: true
        });
      })
      .done();
  };

  render() {
    const getContent = () => {
      if (this.state.loaded) {
        var species = this.state.species;

        return (
          <ScrollableTabView initialPage={0} renderTabBar={() => <SWAPITabBar />}>
            <ScrollView tabLabel='Overview'>
              <KeyValuePair label='Classification' value={species.classification} />
              <KeyValuePair label='Designation' value={species.designation} />
              <KeyValuePair label='Average Height' value={species.average_height} />
              <KeyValuePair label='Skin Colours' value={species.skin_colors} />
              <KeyValuePair label='Hair Colours' value={species.hair_colors} />
              <KeyValuePair label='Eye Colours' value={species.eye_colors} />
              <KeyValuePair label='Average Lifespan' value={species.average_lifespan} />
              <View>
                <KeyValuePair label='Homeworld' value='' />
                <PlanetsList
                  planets={[species.homeworld]}
                  onPress={(title, dataUrl) => {
                    this.props.navigator.push({
                      name: 'planet-detail',
                      title: title,
                      dataUrl: dataUrl
                    })
                  }}
                  />
              </View>
              <KeyValuePair label='Language' value={species.language} />
            </ScrollView>
            <ScrollView tabLabel='People'>
              <PeopleList
                people={species.people}
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
                films={species.films}
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
  }
})
