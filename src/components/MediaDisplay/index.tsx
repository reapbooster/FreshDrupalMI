import * as MediaDatatype from '../../DataTypes/Media';
import MediaDisplayImage from './MediaDisplayImage';
import MediaDisplayVideo from "./MediaDisplayVideo";
import MediaDisplayReport from "./MediaDisplayReport";
import MediaDisplayPodcast from "./MediaDisplayPodcast";
import ErrorBoundary from '../../Utility/ErrorBoundary';
import {MediaInterface} from '../../DataTypes/Media';

const MediaBundleDisplayComponents = {
  "media--video": MediaDisplayVideo,
  "media--image": MediaDisplayImage,
  "media--report": MediaDisplayReport,
  "media--podcast": MediaDisplayPodcast,
}

interface MediaDisplayProps {
  data: MediaInterface;
  view_mode: string;
}

const MediaDisplay: React.FunctionComponent = (props: MediaDisplayProps) => {
  const {mediaData, setMediaData} = useState(MediaDatatype.default.factory(props.data));

  if (!mediaData.hasData()) {
    const ecp = new EntityComponentProps(mediaData);
    ecp.getData(mediaData.getIncluded())
    .then(res => res.json())
    .then((remoteData) => {
      console.debug("Media Remote Data", remoteData);
      setMediaData(MediaDatatype.default.factory(remoteData.data));
    });
    return (
      <div>
        <Loading />
      </div>
    )
  }
  const Component = MediaBundleDisplayComponents[props.type] ?? null;
  if (!Component) {
    console.error('cannot find component', props);
    throw new Error("Cannot find component for props.type ".concat(props.type));
  }
  return (
    <ErrorBoundary>
      <Component data={mediaData} />
    </ErrorBoundary>
  )
}


export { MediaDisplay as default, MediaDisplayProps, MediaBundleDisplayComponents };
