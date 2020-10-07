import TestRenderer from "react-test-renderer";
import VideosBrowser from "../Components/VideosBrowser";
import MediaDisplayVideo from "../Components/MediaDisplay/MediaDisplayVideo";

const testRenderSource = {
  id: "VideosBrowser",
  url:
    "https://live-freshdrupalmi.pantheonsite.io/jsonapi/media/video?jsonapi_include=true",
  entityTypeId: "media",
  bundle: "video",
  view_mode: "card",
};

const testRenderer = TestRenderer.create(
  <VideosBrowser source={testRenderSource} view_mod={"card"} />
);
const testInstance = testRenderer.root;

expect(testInstance.findAllByType(MediaDisplayVideo).length).toBeGreaterThan(0);
