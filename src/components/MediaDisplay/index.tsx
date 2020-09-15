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

interface MediaProps extends MediaInterface {}

const MediaDisplay: React.FunctionComponent = (props: MediaProps) => {
  const Component = MediaBundleDisplayComponents[props.type] ?? null;
  if (!Component) {
    console.error('cannot find component', props);
    throw new Error("Cannot find component for props.type ".concat(props.type));
  }
  return (
    <ErrorBoundary>
      <Component {...props} />
    </ErrorBoundary>
  )
}


export { MediaDisplay as default, MediaBundleDisplayComponents };
