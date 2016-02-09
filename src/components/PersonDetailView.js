import React, {
  AppRegistry,
  Component,
  ListView,
  ProgressBarAndroid,
  StyleSheet,
  Text,
  ToolbarAndroid,
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
import styles from '../styles';

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
        this.fetchHomeworldData(responseData.homeworld);
      })
      .done();
  };

  fetchHomeworldData = (url) => {
    fetch(url)
      .then((response) => response.json())
      .then((responseData) => {
        this.setState({
          person: this.state.person,
          homeworld: responseData,
          loaded: this.state.loaded
        });
      })
      .done();
  };

  renderHomeworld = () => {
    if (this.state.homeworld) {
      return (
        <Text>{this.state.homeworld.name}</Text>
      );
    } else {
      return (
        <ProgressBarAndroid styleAttr='Small' />
      );
    }
  };

  render() {
    const getContent = () => {
      if (this.state.loaded) {
        return (
          <View style={styles.container}>
            <ScrollableTabView initialPage={0} renderTabBar={() => <SWAPITabBar />}>
              <View tabLabel='Overview'>
                <KeyValuePair label='Height' value={person.height} />
                <KeyValuePair label='Mass' value={person.mass} />
                <KeyValuePair label='Hair Colour' value={person.hair_color} />
                <KeyValuePair label='Skin Colour' value={person.skin_color} />
                <KeyValuePair label='Eye Colour' value={person.eye_color} />
                <KeyValuePair label='Birth Year' value={person.birth_year} />
                <KeyValuePair label='Gender' value={person.gender} />
                <View style={styles.row}>
                  <Text style={styles.label}>Homeworld: </Text>
                  {this.renderHomeworld()}
                </View>
              </View>
              <View tabLabel='Species'>
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
              </View>
              <View tabLabel='Vehicles'>
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
              </View>
              <View tabLabel='Films'>
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
              </View>
              <View tabLabel='Starships'>
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

    var person = this.state.person;

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
