import React from 'react';
import { StyleSheet, Text, TouchableHighlight, View, WebView } from 'react-native';
import Expo from 'expo';

const { Asset, AppLoading, Audio } = Expo;


export default class App extends React.Component {
  state = {
    isReady: false,
  };

  componentWillMount() {
    this._cacheResourcesAsync();
  }

  render() {
    if (!this.state.isReady) {
      return <AppLoading />;
    }

    return (
      <CatSoundsVideoBoard />
        );
  }

  async _cacheResourcesAsync() {
    await Promise.all([
      Asset.fromModule(require('./assets/1.mp4')).downloadAsync(),
      Asset.fromModule(require('./assets/2.mp4')).downloadAsync(),            
      Asset.fromModule(require('./assets/3.mp4')).downloadAsync(),
      Asset.fromModule(require('./assets/4.mp4')).downloadAsync(),
      Asset.fromModule(require('./assets/5.mp4')).downloadAsync(),
      Asset.fromModule(require('./assets/6.mp4')).downloadAsync(),
      Asset.fromModule(require('./assets/7.mp4')).downloadAsync(),
      Asset.fromModule(require('./assets/8.mp4')).downloadAsync(),
      Asset.fromModule(require('./assets/9.mp4')).downloadAsync(),
    ]);

    this.setState({isReady: true});
  }
}


class CatSoundsVideoBoard extends React.Component {
  componentDidMount() {
    Audio.setAudioModeAsync({
            allowsRecordingIOS: false,
      interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX, // TODO(Abi): Switch back to INTERRUPTION_MODE_IOS_DO_NOT_MIX
      playsInSilentModeIOS: true, // config.muteVideo ? false : true,
      shouldDuckAndroid: true, // TODO(Abi): Is this the common behavior on Android?
      interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX

    })
  }
  render() {
    return (
      <View style={styles.container}>
              <WebView
        source={{uri: 'https://expo.io/'}}
        style={{marginTop: 20, width: 100, height: 100,}}
      />

        <Text style={{
          fontSize: 20,
          color: 'white',
        }}>Hack Reactor</Text>
        <Text style={{
          fontSize: 45,
          color: '#ffcc00',
        }}>Cat Sounds</Text>
        <View style={{
          flexDirection: 'row'
        }}>
                <VideoBoardButton source={require('./assets/1.mp4')}        />
        <VideoBoardButton source={require('./assets/2.mp4')}        />
        <VideoBoardButton source={require('./assets/3.mp4')}        />
        </View>

                <View style={{
          flexDirection: 'row'
        }}>

        <VideoBoardButton source={require('./assets/4.mp4')}        />
        <VideoBoardButton source={require('./assets/5.mp4')}        />
                <VideoBoardButton source={require('./assets/6.mp4')}        />

        </View>
                <View style={{
          flexDirection: 'row'
        }}>
                <VideoBoardButton source={require('./assets/7.mp4')}        />
        <VideoBoardButton source={require('./assets/8.mp4')}        />
        <VideoBoardButton source={require('./assets/9.mp4')}        />


</View>

      </View>
    );
  }
}

class VideoBoardButton extends React.Component {

  async playAsync() {
    await this._video.playFromPositionAsync(0);

  }

  async resetPositionAsync() {
    await this._video.stopAsync();
    await this._video.setPositionAsync(0);
  }

  render() {
    return (
      <TouchableHighlight
        onPress={() => {
          console.log("You pressed the video!!");
          this.playAsync();
        }}>
        <View style={{
          margin: 10,
        }}>
          <Expo.Video
          ref={(video) => { this._video = video; }}
          source={this.props.source}
          rate={2.0}
          volume={1.0}
          muted={false}
          resizeMode="cover"
          shouldPlay
          isLooping={false}
          style={{ width: 100, height: 100 }}
          callback={(playbackStatus) => {
            if (playbackStatus.didJustFinish) {
              this.resetPositionAsync();
            }
          }}
        />
        </View>
      </TouchableHighlight>


    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'blue',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
