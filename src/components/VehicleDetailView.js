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

export default class VehicleDetailView extends Component {
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
          vehicle: responseData,
          loaded: true
        });
      })
      .done();
  };

  render() {
    const getContent = () => {
      if (this.state.loaded) {
        var vehicle = this.state.vehicle;

        return (
          <ScrollableTabView initialPage={0} renderTabBar={() => <SWAPITabBar />}>
            <ScrollView tabLabel='Overview'>
              <KeyValuePair label='Model' value={vehicle.model} />
              <KeyValuePair label='Manufacturer' value={vehicle.manufacturer} />
              <KeyValuePair label='Cost in Credits' value={vehicle.cost_in_credits} />
              <KeyValuePair label='Length' value={vehicle.length} />
              <KeyValuePair label='Max. Atmosphering Speed' value={vehicle.max_atmosphering_speed} />
              <KeyValuePair label='Crew' value={vehicle.crew} />
              <KeyValuePair label='Passengers' value={vehicle.passenger} />
              <KeyValuePair label='Cargo Capacity' value={vehicle.cargo_capacity} />
              <KeyValuePair label='Consumables' value={vehicle.consumables} />
              <KeyValuePair label='Vehicle Class' value={vehicle.vehicle_class} />
            </ScrollView>
            <ScrollView tabLabel='Pilots'>
              <PeopleList
                people={vehicle.pilots}
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
                films={vehicle.films}
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
