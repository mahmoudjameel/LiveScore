import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  Dimensions,
  Image,
  StyleSheet,
  Button,
  FlatList,
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import axios from 'axios';
import TopScorers from '../../components/TopScorers/TopScorers';

function ScorersScreen({route}) {
  const [topScorers, setTopScorers] = useState([]);
  const {item} = route.params;
  var id = item.league.id;

  useEffect(() => {
    function fetchScorers() {
      const options = {
        method: 'GET',
        url: 'https://api-football-v1.p.rapidapi.com/v3/players/topscorers',
        params: {league: id, season: '2021'},
        headers: {
          'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com',
          'X-RapidAPI-Key':
            'ce6bac21c0msh1cf35c640efaa7bp1d9d40jsn0a53353d6030',
        },
      };

      axios
        .request(options)
        .then(function (response) {
          console.log(response.data);
          setTopScorers(response.data.response);
        })
        .catch(function (error) {
          console.error(error);
        });
    }
    fetchScorers();
  }, [id]);

  const renderScorers = ({item}) => <TopScorers data={item} />;

  return (
    <View style={styles.container}>
      <View style={styles.inner_container}>
        <View style={styles.team_info}>
          <Image style={styles.image} source={{uri: item.teams.home.logo}} />
          <Text style={styles.score}>{item.goals.home}</Text>
        </View>
        <Text style={styles.score}>-</Text>
        <View style={styles.team_info}>
          <Text style={styles.score}>{item.goals.away}</Text>
          <Image style={styles.image} source={{uri: item.teams.away.logo}} />
        </View>
      </View>
      <View style={styles.name_container}>
        <Text style={styles.text}>{item.teams.home.name}</Text>
        <Text style={styles.text}>{item.teams.away.name}</Text>
      </View>
      <View>
        <FlatList data={topScorers} renderItem={renderScorers} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  inner_container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'green',
  },
  image: {
    height: Dimensions.get('window').height / 10,
    width: Dimensions.get('window').width / 5,
    margin: 10,
  },
  team_info: {
    overflow: 'hidden',
    flexDirection: 'row',
  },
  score: {
    fontSize: 50,
    paddingRight: 20,
    paddingLeft: 20,
    marginTop: 10,
  },
  name_container: {
    backgroundColor: 'green',
    flexDirection: 'row',
    justifyContent: 'space-between',
    fontSize: 20,
  },
  text: {
    fontSize: 20,
    padding: 5,
    marginRight: 10,
    marginLeft: 10,
  },
  flag_image: {
    height: Dimensions.get('window').height / 30,
    width: Dimensions.get('window').width / 15,
    marginRight: 10,
    marginLeft: 10,
  },
  detail_text: {
    color: 'black',
    padding: 10,
    borderBottomWidth: 1,
    borderTopWidth: 1,
    borderColor: 'gray',
  },
  detail_container: {
    padding: 10,
  },
});

export default ScorersScreen;
