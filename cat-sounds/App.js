import React from "react";
import { StyleSheet, Text, TouchableHighlight, View } from "react-native";

import Expo from "expo";

const { AppLoading, Asset, Audio, Font, Video } = Expo;

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
    await Font.loadAsync({
      // caslonia: require("./assets/fonts/caslonia.ttf")
      cooperBlack: require("./assets/fonts/CooperBlackRegular.ttf")
    });

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
        {/* <Expo.Video
          source={require("./assets/clips/1.mp4")}
          rate={1.0}
          volume={1.0}
          muted={false}
          resizeMode="cover"
          shouldPlay
          isLooping={false}
          style={{ width: 300, height: 300 }}
        />
 */}
        <Text
          style={{
            fontFamily: "cooperBlack",
            fontSize: 42,
            color: "#333333"
          }}
        >
          Cat Sounds
        </Text>

        <BoardButton
          source={require("./assets/clips/2.mp4")}
          height={200}
          width={200}
        />

        <BoardButton
          source={require("./assets/clips/2.mp4")}
          height={200}
          width={200}
        />

        <BoardButton
          source={require("./assets/clips/2.mp4")}
          height={200}
          width={200}
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

  componentDidMount() {}

  async playAsync() {
    // console.log("this=", "" + this);
    window._BoardButton = this;
    console.log(this);
    console.log("_playbackInstance=", this._playbackInstance);
    await this._playbackInstance.playFromPositionAsync(0);
  }

  render() {
    return (
      <View
        style={{ borderColor: "red", borderWidth: 5, borderStyle: "solid" }}
      >
        <TouchableHighlight
          onPress={() => {
            this.playAsync();
          }}
        >
          <Expo.Video
            source={this.props.source}
            ref={video => {
              this._playbackInstance = video;
              /* console.log("video=", video); */
            }}
            style={{ width: this.props.width, height: this.props.width }}
            isLooping={false}
            shouldPlay={true}
            resizeMode="cover"
            volume={1.0}
            rate={1.0}
          />
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
