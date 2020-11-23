import React from "react";
import renderer from "react-test-renderer";
import MediaDisplayImage from "../Components/MediaDisplay/MediaDisplayImage";
import LiveDataFixture from "../Utility/LiveDataFixture";

const fixtureData = new LiveDataFixture("media--image");
const expectedIncludeString = "&include=field_media_image,thumbnail";

test("MediaImageDisplay basic render test", (done) => {
  console.info("Running Test:", process.env);

  fixtureData
    .getFixtureData(expectedIncludeString)
    .then((mockResponse) => {
      for (const key in mockResponse.data) {
        const origData = mockResponse.data[key];
        const systemUnderTest = renderer.create(
          <MediaDisplayImage data={origData} view_mode="full" />
        );
        const tree = systemUnderTest.toJSON();
        console.log("tree", tree);
      }
    })
    .then(() => {
      done();
    });
});
