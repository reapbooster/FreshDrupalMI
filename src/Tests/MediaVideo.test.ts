// import dependencies
import "@testing-library/jest-dom/extend-expect";
import MediaVideo from "../DataTypes/MediaVideo";

import ImageFile from "../DataTypes/ImageFile";
import LiveDataFixture from "../Utility/LiveDataFixture";
const v4 = new RegExp(
  /^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i
);

const fixtureData = new LiveDataFixture("media--video");
const expectedIncludeString = "&include=thumbnail";

test("MediaVideo DataType Testing", (done) => {
  fixtureData
    .getFixtureData(expectedIncludeString)
    .then((mockResponse) => {
      for (const key in mockResponse.data) {
        const origData = mockResponse.data[key];
        const systemUnderTest = new MediaVideo(mockResponse.data[key]);
        expect(systemUnderTest.type).toEqual(
          expect.stringMatching("media--video")
        );
        expect(systemUnderTest.id).toEqual(expect.stringMatching(v4));
        expect(systemUnderTest.getIncluded()).toEqual(
          expect.stringMatching(expectedIncludeString)
        );
        expect(systemUnderTest.hasData()).toEqual(true);
        if (origData.thumbnail !== undefined) {
          expect(systemUnderTest.thumbnail).not.toBeNull;
          expect(systemUnderTest.thumbnail).not.toBeUndefined();
          const thumbnail = systemUnderTest.getThumbnail();
          expect(thumbnail).not.toBeNull();
          expect(thumbnail).not.toBeUndefined();
          expect(thumbnail.id).not.toBeUndefined();
          expect(thumbnail.type).not.toBeUndefined();
          expect(thumbnail.id).toEqual(expect.stringMatching(v4));
          expect(thumbnail.type).toEqual(expect.stringContaining("file--"));
          const styleObject = thumbnail.imageStyleObject;
          expect(styleObject).not.toBe(null);
          expect(typeof styleObject.srcSet).toBe("string");
        }
        if (
          origData.field_media_file !== undefined &&
          origData.field_media_file?.data === undefined
        ) {
          const imageFile = systemUnderTest.field_media_file;
          expect(imageFile).not.toBeNull();
          expect(imageFile).not.toBeUndefined();
          expect(imageFile.id).toEqual(expect.stringMatching(v4));
          expect(imageFile.type).toEqual(expect.stringContaining("file--"));
          expect(imageFile.hasData()).toBe(true);
          const styleObject = imageFile.imageStyleObject;
          expect(styleObject).not.toBe(null);
          expect(typeof styleObject.srcSet).toBe("string");
        }
      }
    })
    .then(() => {
      done();
    });
});
