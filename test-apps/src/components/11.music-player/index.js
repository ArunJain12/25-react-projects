import { useEffect, useRef, useState } from "react";
import "./music.css";

const tracks = [
  {
    title: "Track 1",
    source: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    image: "https://via.placeholder.com/150",
  },
  {
    title: "Track 2",
    source: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
    image: "https://via.placeholder.com/150",
  },
  // Add more tracks as needed
];

function MusicPlayer() {
  const audioRef = useRef();
  const [ currentMusicTrack, setCurrentMusicTrack ] = useState(0);
  const [ isPlaying, setIsPlaying ] = useState(false);
  const [ trackProgress, setTrackProgess ] = useState(0);

  useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(() => {
        setTrackProgess(
          (audioRef.current.currentTime / audioRef.current.duration) * 100
        )
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [isPlaying]);

  function handleSkipDirection(direction) {
    if (direction === 'backward') {
      setCurrentMusicTrack(prevMusicTrack => (prevMusicTrack - 1 + tracks.length) % tracks.length)
    }
    else
      setCurrentMusicTrack(prevMusicTrack => (prevMusicTrack + 1) % tracks.length);
    setTrackProgess(0);
    setIsPlaying(false);
  }

  function handlePauseAndPlay() {
    if (isPlaying) audioRef.current.pause();
    else audioRef.current.play();
    setIsPlaying(prevIsPlaying => !prevIsPlaying);
  }

  return (
    <div className="music-player">
      <h1>Music Player</h1>
      <h2>{tracks[currentMusicTrack].title}</h2>
      <img 
        src={tracks[currentMusicTrack].image || './150.png'}
        alt={tracks[currentMusicTrack].title}
      />
      <audio ref={audioRef} src={tracks[currentMusicTrack].source} />
      <div className="progress-bar">
        <div
          className="progress"
          style={{ 
            width: `${trackProgress}%`,
            height: '15px',
            background: isPlaying ? '#3498db' : '#a43636'
          }}
        ></div>
      </div>
      <div className="track-controls">
        <button onClick={() => handleSkipDirection('backward')}>Backward</button>
        <button onClick={handlePauseAndPlay}>{isPlaying ? 'Pause' : 'Play'}</button>
        <button onClick={() => handleSkipDirection('forward')}>Forward</button>
      </div>
    </div>
  );
}

export default MusicPlayer;
