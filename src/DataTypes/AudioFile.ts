import { FileInterface } from "./File";
import { LinkListInterface } from "./LinkList";
import { UserInterface } from "./User";




interface AudioFileInterface extends FileInterface {


}

class AudioFile extends File implements AudioFileInterface {
  


}

export { AudioFile as default, AudioFileInterface }