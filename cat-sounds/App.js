import React from "react";
import { StyleSheet, Text, TouchableHighlight, View } from "react-native";

import Expo from "expo";

const { AppLoading, Asset, Audio, Font, Video } = Expo;

const GREEN = "#477009";
const YELLOW = "#FCD602";

const BUTTON_SIZE = 160;

export default class App extends React.Component {
  state = {
    isReady: false
  };

  componentWillMount() {
    this._cacheResourcesAsync();
  }

  render() {
    if (!this.state.isReady) {
      return <AppLoading />;
    }

    return <CatSoundsApp />;
  }

  async _cacheResourcesAsync() {
    await Promise.all([
      Font.loadAsync({
        // cooperBlack: require("./assets/fonts/caslonia.ttf")
        cooperBlack: require("./assets/fonts/CooperBlackRegular.ttf")
      }),
      Asset.fromModule(require('./assets/clips/1.mp4')),
      Asset.fromModule(require('./assets/clips/2.mp4')),
      Asset.fromModule(require('./assets/clips/3.mp4')),
      Asset.fromModule(require('./assets/clips/4.mp4')),
      Asset.fromModule(require('./assets/clips/5.mp4')),
      Asset.fromModule(require('./assets/clips/6.mp4')),
      Asset.fromModule(require('./assets/clips/8.mp4')),
      Asset.fromModule(require('./assets/clips/9.mp4')),
    ]);

    this.setState({ isReady: true });
  }
}

class CatSoundsApp extends React.Component {
  componentDidMount() {
    Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
      interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX, // TODO(Abi): Switch back to INTERRUPTION_MODE_IOS_DO_NOT_MIX
      playsInSilentModeIOS: true, // config.muteVideo ? false : true,
      shouldDuckAndroid: true, // TODO(Abi): Is this the common behavior on Android?
      interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Expo.Video
          source={require("./assets/clips/1.mp4")}
          rate={1.0}
          volume={1.0}
          muted={false}
          resizeMode="cover"
          shouldPlay
          isLooping={false}
          style={{ width: 300, height: 300 }}
          ref={() => { console.log("Ref called"); }}
        />
        <Text
          style={{
            fontFamily: "cooperBlack",
            fontSize: 42,
            color: "white"
          }}
        >
          Cat Sounds
        </Text>

        <BoardButton
          source={require("./assets/clips/1.mp4")}
          size={BUTTON_SIZE}
        />

        <BoardButton
          source={require("./assets/clips/2.mp4")}
          size={BUTTON_SIZE}
        />

        <BoardButton
          source={require("./assets/clips/3.mp4")}
          size={BUTTON_SIZE}
        />

      </View>
    );
  }
}

class BoardButton extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {};
  }

  componentDidMount() {
    console.log("Good morning!");
  }

  async playAsync() {
    await this._playbackInstance.playFromPositionAsync(0);
  }

  async resestPositionAsync() {
    await this._playbackInstance.stopAsync();
    await this._playbackInstance.setPositionAsync(0);
  }

  render() {
    console.log("render  being called");
    return (
      <View
        style={{
          borderColor: "red", borderWidth: 0, borderStyle: "solid",
          margin: 10,
        }}
      >
        <TouchableHighlight onPress={() => {
          console.log("Pressed");
          this.playAsync();
        }}>
          <View>
            <Expo.Video
              source={this.props.source}
              callback={(playbackStatus) => {
                if (playbackStatus.didJustFinish) {
                  console.log("finished");
                  this.resestPositionAsync();
                }
              }}
              ref={(component) => {
                this._playbackInstance = component;
                console.log("ref called on ", '' + component);
              }}
              style={{ width: this.props.width || this.props.size || 100, height: this.props.width || this.props.size || 100, }}
              isLooping={false}
              shouldPlay={true}
              resizeMode="cover"
              volume={1.0}
              rate={1.0}
            />
          </View>
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: GREEN,
    alignItems: "center",
    justifyContent: "center"
  }
});
