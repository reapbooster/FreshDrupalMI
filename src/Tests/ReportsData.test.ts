// import dependencies
import React from "react";
import fs from "fs";
import "@testing-library/jest-dom/extend-expect";
import MediaReport from "../DataTypes/MediaReport";
import EntityComponentProps from "DataTypes/EntityComponentProps";
import { instanceOf } from "prop-types";
import ImageFile, { ImageFileInterface } from "../DataTypes/ImageFile";
const v4 = new RegExp(
  /^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i
);

const mockResponse = fs.readFileSync(
  "./src/Tests/fixtures/media--report.mock.json"
);

describe("Initial Instantiation", () => {
  test("Mock Data being tested", () => {
    for (const key in mockResponse.data) {
      const systemUnderTest = new MediaReport(mockResponse.data[key]);
      expect(systemUnderTest.type).toBe("media--report");
      expect(systemUnderTest.id).toBe.stringMatching(v4);
      expect(systemUnderTest.getIncluded()).toBe.stringMatching(
        "&include=thumbnail,field_cover,field_media_file"
      );
      expect(systemUnderTest.hasData()).toBe(true);
      expect(systemUnderTest.thumbnail).not.tobe.null;
      expect(systemUnderTest.thumbnail).not.tobe(undefined);
      const thumbnail = systemUnderTest.getThumbnail();
      console.debug("thumbnail", thumbnail);
      expect(thumbnail).not.toBe.null;
      const documentFile = systemUnderTest.field_media_file;
      console.debug("document file", documentFile);
      expect(documentFile).not.toBe.null;
      expect(documentFile.hasData()).toBe(true);
    }
  });
});
