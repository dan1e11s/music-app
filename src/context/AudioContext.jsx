import { createContext, useState } from 'react';
import tracksList from '../assets/tracksList';

const audio = new Audio();

export const AudioContext = createContext({});

const AudioProviderContext = ({ children }) => {
  const [currentTrack, setCurrentTrack] = useState(tracksList[0]);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleToggleAudio = (track) => {
    if (currentTrack.id !== track.id) {
      setCurrentTrack(track);
      setIsPlaying(true);

      audio.src = track.src;
      audio.currentTime = 0;
      audio.play();

      return;
    }

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play();
      setIsPlaying(true);
    }
  };

  const value = { currentTrack, isPlaying, handleToggleAudio, audio };

  return (
    <AudioContext.Provider value={value}>{children}</AudioContext.Provider>
  );
};

export default AudioProviderContext;
