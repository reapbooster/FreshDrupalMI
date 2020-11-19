// import dependencies
import "@testing-library/jest-dom/extend-expect";
import MediaImage from "../DataTypes/MediaImage";

import ImageFile from "../DataTypes/ImageFile";
import LiveDataFixture from "../Utility/LiveDataFixture";
const v4 = new RegExp(
  /^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i
);

const fixtureData = new LiveDataFixture("file--file");
const expectedINcludeString = "";

test("ImageFile DataType Testing", (done) => {
  fixtureData
    .getFixtureData(expectedINcludeString)
    .then((mockResponse) => {
      for (const key in mockResponse.data) {
        const origData = mockResponse.data[key];
        const systemUnderTest = new ImageFile(origData);
        expect(systemUnderTest.type).toEqual(
          expect.stringMatching("file--file")
        );
        expect(systemUnderTest.id).toEqual(expect.stringMatching(v4));
        expect(systemUnderTest.getIncluded()).toEqual(
          expect.stringMatching(expectedINcludeString)
        );
        expect(systemUnderTest.hasData()).toBe(true);
        expect(systemUnderTest.constructor.name).toBe("ImageFile");
        expect(systemUnderTest._image_style_uri).toBeDefined();
        expect(systemUnderTest.created).toBeDefined();
        expect(typeof systemUnderTest.uri.url).toBe("string");
      }
    })
    .then(() => {
      done();
    });
});
