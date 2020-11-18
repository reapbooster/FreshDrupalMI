// import dependencies
import "@testing-library/jest-dom/extend-expect";
import MediaReport from "../DataTypes/MediaReport";
import ImageFile from "../DataTypes/ImageFile";
import LiveDataFixture from "../Utility/LiveDataFixture";
import { ImageStyleObject } from "../DataTypes/ImageStyleObject";
const v4 = new RegExp(
  /^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i
);

const fixtureData = new LiveDataFixture("media--report");
const expectedIncludeString = "&include=thumbnail,field_cover,field_media_file";

test("MediaReport testing", (done) => {
  fixtureData.getFixtureData(expectedIncludeString).then((mockResponse) => {
    for (const key in mockResponse.data) {
      const origData = mockResponse.data[key];
      const systemUnderTest = new MediaReport(origData);
      expect(systemUnderTest.type).toEqual(
        expect.stringMatching("media--report")
      );
      expect(systemUnderTest.id).toEqual(expect.stringMatching(v4));
      expect(systemUnderTest.getIncluded()).toEqual(
        expect.stringMatching(expectedIncludeString)
      );
      expect(systemUnderTest.hasData()).toBe(true);
      if (origData.thumbnail !== undefined) {
        expect(systemUnderTest.thumbnail).not.toBe(null);
        expect(systemUnderTest.thumbnail).not.toBe(undefined);
        const thumbnail = systemUnderTest.getThumbnail();
        expect(thumbnail).not.toBe(null);
        expect(thumbnail.id).not.toBeUndefined();
        expect(thumbnail.type).not.toBeUndefined();
        expect(thumbnail.id).toEqual(expect.stringMatching(v4));
        expect(thumbnail.type).toEqual(expect.stringContaining("file--"));
        const styleObject = thumbnail.imageStyleObject;
        expect(styleObject).not.toBe(null);
        expect(typeof styleObject.srcSet).toBe("string");
      }
      if (
        origData.field_cover !== undefined &&
        origData.field_cover?.data === undefined
      ) {
        const coverImage = systemUnderTest.field_cover;
        expect(coverImage.id).toEqual(expect.stringMatching(v4));
        expect(coverImage.type).toEqual(expect.stringContaining("file--"));
      }
      if (
        origData.field_media_file !== undefined &&
        origData.field_media_file?.data === undefined
      ) {
        const documentFile = systemUnderTest.field_media_file;
        expect(documentFile).not.toBe(null);
        expect(documentFile).not.toBeUndefined();
        expect(documentFile.id).toEqual(expect.stringMatching(v4));
        expect(documentFile.type).toEqual(expect.stringContaining("file--"));
        expect(documentFile.hasData()).toBe(true);
      }
    }
    done();
  });
});
