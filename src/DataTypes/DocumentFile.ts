import File, { FileInterface } from "./File";

export type DocumentFileInterface = FileInterface;

export default class DocumentFile
  extends File
  implements DocumentFileInterface {
  hasData(): boolean {
    return this.uri !== undefined && this.uri !== null;
  }

  public static getIncluded(): string {
    return "";
  }
}
