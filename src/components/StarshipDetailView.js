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
import FilmsList from './FilmsList';
import PeopleList from './PeopleList';
import SWAPITabBar from './SWAPITabBar';
import styles from '../styles';

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
          <View style={styles.container}>
            <ScrollableTabView initialPage={0} renderTabBar={() => <SWAPITabBar />}>
              <View tabLabel='Overview'>
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
              </View>
              <View tabLabel='Pilots'>
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
              </View>
              <View tabLabel='Films'>
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
