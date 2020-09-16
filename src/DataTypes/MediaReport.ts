import Media, { MediaInterface } from './Media';


interface MediaReportInterface extends MediaInterface {

}

class MediaReport extends Media implements MediaReportInterface {

}

export {MediaReport as default, MediaReportInterface}