import React, { Component } from 'react';
import {
  Text,
  View,
  TextInput,
  StyleSheet,
  Platform,
  StatusBar,
  SafeAreaView,
  Alert,
} from 'react-native';
import { WebView } from 'react-native-webview';

export default class StarMapScreen extends Component {
  constructor() {
    super();
    this.state = {
      longitude: '',
      latitude: '',
    };
  }

  handleWebViewLoad = () => {
    const { longitude, latitude } = this.state;

    if (this.isValidNumber(longitude) && this.isValidNumber(latitude)) {
      const path = `https://virtualsky.lco.global/embed/index.html?longitude=${longitude}&latitude=${latitude}&constellations=true&constellationlabels=true&showstarlabels=true&gridlines_az=true&live=true&projection=stereo&showdate=false&showposition=false`;

      this.webviewRef.reload();
    } else {
      Alert.alert('Error', 'Longitude and latitude should be valid numbers.');
    }
  };

  isValidNumber = (value) => {
    return !isNaN(parseFloat(value));
  };

  render() {
    const { longitude, latitude } = this.state;
    const path = `https://virtualsky.lco.global/embed/index.html?longitude=${longitude}&latitude=${latitude}&constellations=true&constellationlabels=true&showstarlabels=true&gridlines_az=true&live=true&projection=stereo&showdate=false&showposition=false`;

    return (
      <View style={{ flex: 1, backgroundColor: '#1a0023' }}>
        <SafeAreaView style={styles.droidSafeArea} />
        <View style={{ flex: 0.3, marginTop: 20, alignItems: 'center' }}>
          <Text style={styles.titleText}>Star Map</Text>
          <Text style={styles.lesserText}>No need for degrees!</Text>
          <TextInput
            style={styles.inputStyle}
            placeholder="Enter your longitude"
            placeholderTextColor="white"
            onChangeText={(text) => {
              this.setState({
                longitude: text,
              });
            }}
          />
          <TextInput
            style={styles.inputStyle}
            placeholder="Enter your latitude"
            placeholderTextColor="white"
            onChangeText={(text) => {
              this.setState({
                latitude: text,
              });
            }}
            keyboardType="numeric"
          />
          <View style={{ marginTop: 10 }}>
            <Text style={{ color: 'red' }}>
              {this.isValidNumber(longitude) && this.isValidNumber(latitude)
                ? ''
                : 'Longitude and latitude should be valid numbers.'}
            </Text>
          </View>
        </View>
        <WebView
          scalesPageToFit={true}
          source={{ uri: path }}
          style={{ marginTop: 20, marginBottom: 20 }}
          ref={(ref) => (this.webviewRef = ref)}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  droidSafeArea: {
    marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  titleText: {
    fontSize: 35,
    fontWeight: 'bold',
    color: 'white',
    justifyContent: 'center',
    alignContent: 'center',
  },
  lesserText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: 'white',
    justifyContent: 'center',
    alignContent: 'center',
    marginTop: 10,
  },
  inputStyle: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 20,
    marginTop: 20,
    marginRight: 20,
    marginLeft: 20,
    textAlign: 'center',
    color: 'white',
    width: 200,
  },
});
