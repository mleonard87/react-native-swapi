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
import SWAPITabBar from './SWAPITabBar';

export default class StarshipDetailView extends Component {
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
          starship: responseData,
          loaded: true
        });
      })
      .done();
  };

  render() {
    const getContent = () => {
      if (this.state.loaded) {
        var starship = this.state.starship;

        return (
          <ScrollableTabView initialPage={0} renderTabBar={() => <SWAPITabBar />}>
            <ScrollView tabLabel='Overview'>
              <KeyValuePair label='Model' value={starship.model} />
              <KeyValuePair label='Manufacturer' value={starship.manufacturer} />
              <KeyValuePair label='Cost in Credits' value={starship.cost_in_credits} />
              <KeyValuePair label='Length' value={starship.length} />
              <KeyValuePair label='Max. Atmosphering Speed' value={starship.max_atmosphering_speed} />
              <KeyValuePair label='Crew' value={starship.crew} />
              <KeyValuePair label='Passengers' value={starship.passenger} />
              <KeyValuePair label='Cargo Capacity' value={starship.cargo_capacity} />
              <KeyValuePair label='Consumables' value={starship.consumables} />
              <KeyValuePair label='Hyperdrive Rating' value={starship.hyperdrive_rating} />
              <KeyValuePair label='MGLT' value={starship.MGLT} />
              <KeyValuePair label='Starship Class' value={starship.starship_class} />
            </ScrollView>
            <ScrollView tabLabel='Pilots'>
              <PeopleList
                people={starship.pilots}
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
                films={starship.films}
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
