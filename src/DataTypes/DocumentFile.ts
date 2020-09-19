import File, {FileInterface} from './File';

interface DocumentFileInterface extends FileInterface {


}

class DocumentFile extends File implements DocumentFileInterface {

  hasData(): boolean {
    return true;
  }
  getIncluded(): string {
    return "";
  }

}

export {DocumentFile as default, DocumentFileInterface}