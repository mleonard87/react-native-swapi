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

export default class SpeciesList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      species: [],
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2
      })
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData = () => {
    for (var f in this.props.species) {
      fetch(this.props.species[f])
        .then((response) => response.json())
        .then((responseData) => {
          var species = this.state.species
          species.push(responseData);
          this.setState({
            species: species,
            dataSource: this.state.dataSource.cloneWithRows(species)
          });
        })
        .done();
    }
  };

  render() {
    if (this.props.species.length !== this.state.species.length) {
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
          renderRow={this.renderSpecies}
          />
      </View>
    );
  }

  renderSpecies = (species) => {
    return (
      <View style={styles.container}>
        <Text
          key={species.name}
          style={styles.title}
          onPress={() => {
            this.props.onPress(species.name, species.url);
          }}
          >
          {species.name}
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
