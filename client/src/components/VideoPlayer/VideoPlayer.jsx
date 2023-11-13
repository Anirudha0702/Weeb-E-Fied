import "./VideoPlayer.css";
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import ReactPlayer from 'react-player';
import Spinner from "../Loaders/Spinner/Spinner";
import { useStream } from "../../hooks/useHooks";
const VideoPlayer = ({episodeId,isLoading}) => {
  const [videoUrl, setVideoUrl] = useState("");
  const [quality, setQuality] = useState('default');
  const stream=useStream(episodeId); 
console.log(stream.data)
  useEffect(() => {
    if(stream.data){
      const url=stream.data?.find((file)=>file.quality===quality)?.url;
      setVideoUrl(url);
    }
  }, [quality, stream.data]);
  if(isLoading || stream.data===undefined) {
    <Spinner/>
  }
  return (
    <>
    <ReactPlayer url={videoUrl} controls={true} width='100%' height="90%"/>
    <div className="quality__wrapper" style={{color:"#fff"}}>
      <div className="quality__title">Quality : </div>
      <span className="quality__buttons">
          {
          stream.data?.map((file, idx) => (
            <button
              onClick={() => setQuality(file.quality)}
              className={`quality__button ${file.quality === quality && "active"}`}
              key={idx}
            >
              {file.quality}
            </button>
           ))
          }
      </span>
      </div>
    </>
  )
}

VideoPlayer.propTypes = {
  episodeId: PropTypes.string.isRequired,
  isLoading: PropTypes.bool.isRequired
};

export default VideoPlayer