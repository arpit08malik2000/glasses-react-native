//having camera intent
import React, { Component } from 'react';
import { Text, View, Platform } from 'react-native';
import { Camera } from 'expo-camera';
import * as Permissions from 'expo-permissions';

export default class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      hasPermission: null,
      camerType: Camera.Constants.Type.front
    }
  }

  componentDidMount() {
    this.getPermissionsAsync()
  }

  getPermissionsAsync = async () => {
    //camera roll permission 
    if (Platform.OS === 'ios') {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL)
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      }
    }
    // Camera Permission
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasPermission: status === 'granted' });
  }

  render () {
    const { hasPermission } = this.state
    if (hasPermission === null) {
      return <View />;
    } else if (hasPermission === false) {
      return <Text>No access to camera</Text>;
    } else {
      return (
          <View style={{ flex: 1 }}>
            <Camera 
              style={{ flex: 1 }} 
              type={this.state.cameraType}  
              ref={ref => {this.camera = ref}} />
        </View>
      );
    }
  }
}