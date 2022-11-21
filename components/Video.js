import {View, Text} from 'react-native';
import React from 'react';
import VideoPlayer from 'react-native-video-controls';

const Video = ({setIsOpen, navigation}) => {
  const onClose = () => {
    setIsOpen(false);
  };

  return (
    <VideoPlayer
      source={{uri: 'https://vjs.zencdn.net/v/oceans.mp4'}}
      onBack={onClose}
      onEnd={onClose}
      fullscreenOrientation="all"
      navigation={navigation}
    />
  );
};

export default Video;
