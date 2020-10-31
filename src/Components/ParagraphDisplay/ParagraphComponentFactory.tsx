import { ParagraphInterface } from "../../DataTypes/Paragraph";
import ParagraphDisplayAuthor from "./ParagraphDisplayAuthor";
import ParagraphDisplayBlock from "./ParagraphDisplayBlock";
import ParagraphDisplayBodyContent from "./ParagraphDisplayBodyContent";
import ParagraphDisplayPullQuote from "./ParagraphDisplayPullQuote";
import ParagraphDisplaySlide from "./ParagraphDisplaySlide";
import ParagraphDisplayTiles from "./ParagraphDisplayTiles";
import { ParagraphDisplayPodcastEpisode } from "./ParagraphDisplayPodcastEpisode";
import ParagraphDisplayProgramDay from "./ParagraphDisplayProgramDay";

/**
 * Create the View Component
 *
 * @param incoming: ParagraphIterface
 */
export const ParagraphComponentFactory = (incoming: ParagraphInterface) => {
  console.debug("Paragraph Component Factory", incoming);
  switch (incoming.type) {
    case "paragraph--author":
      return ParagraphDisplayAuthor;
    case "paragraph--block":
      return ParagraphDisplayBlock;
    case "paragraph--body_content":
      return ParagraphDisplayBodyContent;
    case "paragraph--podcast_episode":
      return ParagraphDisplayPodcastEpisode;
    case "paragraph--pull_quote":
      return ParagraphDisplayPullQuote;
    case "paragraph--slide":
      return ParagraphDisplaySlide;
    case "paragraph--program_day":
      return ParagraphDisplayProgramDay;
    case "paragraph--content_tiles":
    case "paragraph--items_from_an_entityqueue":
    case "paragraph--event_tiles":
    case "paragraph--media_tiles":
    case "paragraph--slide_tiles":
      return ParagraphDisplayTiles;

    default:
      console.error(`missing config for ${incoming.type}`);
      throw new Error(`Missing config for ${incoming.type}`);
  }
};

export default ParagraphComponentFactory;
