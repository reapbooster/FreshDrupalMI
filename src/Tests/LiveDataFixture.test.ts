import "@testing-library/jest-dom/extend-expect";
import LiveDataFixture from "../Utility/LiveDataFixture";

test("LiveDataFixture testing", () => {
  ["media--image", "file--file", "node--article"].forEach((value) => {
    const liveDataFixture = new LiveDataFixture(value);
    expect(liveDataFixture).toBeInstanceOf(LiveDataFixture);
    liveDataFixture.getFixtureData().then((fixtureData) => {
      expect(fixtureData.data).not.toBe(null);
      expect(fixtureData.data).not.toBe(undefined);
      expect(fixtureData.data).toBeInstanceOf(Array);
    });
  });
});
