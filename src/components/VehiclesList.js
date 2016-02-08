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
  ScrollView,
  View,
  ProgressBarAndroid
} from 'react-native';
import LoadingView from './LoadingView';
import KeyValuePair from './KeyValuePair';

export default class VehiclesList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      vehicles: [],
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2
      })
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData = () => {
    for (var f in this.props.vehicles) {
      fetch(this.props.vehicles[f])
        .then((response) => response.json())
        .then((responseData) => {
          var vehicles = this.state.vehicles
          vehicles.push(responseData);
          this.setState({
            vehicles: vehicles,
            dataSource: this.state.dataSource.cloneWithRows(vehicles)
          });
        })
        .done();
    }
  };

  render() {
    if (this.props.vehicles.length !== this.state.vehicles.length) {
      return (
        <View>
          <ProgressBarAndroid styleAttr='Horizontal' />
        </View>
      );
    }

    return (
      <View>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this.renderVehicle}
          />
      </View>
    );
  }

  renderVehicle = (vehicle) => {
    return (
      <View style={styles.container}>
        <Text
          key={vehicle.name}
          style={styles.title}
          onPress={() => {
            this.props.onPress(vehicle.name, vehicle.url);
          }}
          >
          {vehicle.name}
        </Text>
      </View>
    );
  };

}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column'
  },
  title: {
    fontSize: 20,
    marginBottom: 8
  }
})
