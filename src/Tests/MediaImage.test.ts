// import dependencies
import "@testing-library/jest-dom/extend-expect";
import MediaImage from "../DataTypes/MediaImage";
import ImageFile from "../DataTypes/ImageFile";
import LiveDataFixture from "../Utility/LiveDataFixture";
import { ImageStyleObject } from "../DataTypes/ImageStyleObject";
import EntityComponentProps from "../DataTypes/EntityComponentProps";
const v4 = new RegExp(
  /^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i
);

const fixtureData = new LiveDataFixture("media--image");
const expectedIncludeString = "&include=field_media_image,thumbnail";

test("MediaImage testing", (done) => {
  fixtureData
    .getFixtureData(expectedIncludeString)
    .then((mockResponse) => {
      for (const key in mockResponse.data) {
        const origData = mockResponse.data[key];
        const systemUnderTest = new MediaImage(origData);
        expect(systemUnderTest.type).toEqual(
          expect.stringMatching("media--image")
        );
        expect(systemUnderTest.id).toEqual(expect.stringMatching(v4));
        expect(systemUnderTest.getIncluded()).toEqual(
          expect.stringMatching(expectedIncludeString)
        );
        expect(systemUnderTest.hasData()).toBe(true);
        if (
          origData.thumbnail !== undefined &&
          origData.thumbnail.data === undefined
        ) {
          expect(systemUnderTest.thumbnail).not.toBe(null);
          expect(systemUnderTest.thumbnail).not.toBe(undefined);
          const thumbnail = systemUnderTest.thumbnail;
          expect(thumbnail).not.toBeNull();
          expect(thumbnail.id).not.toBeUndefined();
          expect(thumbnail.type).not.toBeUndefined();
          expect(thumbnail.id).toEqual(expect.stringMatching(v4));
          expect(thumbnail.type).toEqual(expect.stringContaining("file--"));
          const styleObject = thumbnail.imageStyleObject;
          expect(styleObject).not.toBe(null);
          expect(styleObject.constructor.name).toBe("ImageStyleObject");
          expect(typeof styleObject.srcSet).toBe("string");
        }

        if (
          origData.field_media_image !== undefined &&
          origData.field_media_image?.data === undefined
        ) {
          const imageFile = systemUnderTest.field_media_image;
          expect(imageFile).not.toBeNull();
          expect(imageFile).not.toBeUndefined();
          expect(imageFile.id).toEqual(expect.stringMatching(v4));
          expect(imageFile.type).toEqual(expect.stringContaining("file--"));
          expect(imageFile.hasData()).toBe(true);
          const styleObject = imageFile.imageStyleObject;
          expect(styleObject).not.toBeNull();
          expect(styleObject).not.toBeUndefined();
          expect(styleObject.constructor.name).toBe("ImageStyleObject");
          expect(typeof styleObject.srcSet).toBe("string");
        }
      }
    })
    .then(() => {
      done();
    });
});