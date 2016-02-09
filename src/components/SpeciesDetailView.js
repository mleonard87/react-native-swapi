import React, {
  AppRegistry,
  Component,
  ProgressBarAndroid,
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
import FilmsList from './FilmsList';
import PeopleList from './PeopleList';
import PlanetsList from './PlanetsList';
import SWAPITabBar from './SWAPITabBar';
import styles from '../styles';

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
        var species = this.state.species;

        return (
          <View style={styles.container}>
            <ScrollableTabView initialPage={0} renderTabBar={() => <SWAPITabBar />}>
              <View tabLabel='Overview'>
                <KeyValuePair label='Classification' value={species.classification} />
                <KeyValuePair label='Designation' value={species.designation} />
                <KeyValuePair label='Average Height' value={species.average_height} />
                <KeyValuePair label='Skin Colours' value={species.skin_colors} />
                <KeyValuePair label='Hair Colours' value={species.hair_colors} />
                <KeyValuePair label='Eye Colours' value={species.eye_colors} />
                <KeyValuePair label='Average Lifespan' value={species.average_lifespan} />
                <View style={styles.row}>
                  <Text style={styles.label}>Homeworld: </Text>
                  {this.renderHomeworld()}
                </View>
                <KeyValuePair label='Language' value={species.language} />
              </View>
              <View tabLabel='People'>
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
              </View>
              <View tabLabel='Films'>
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
