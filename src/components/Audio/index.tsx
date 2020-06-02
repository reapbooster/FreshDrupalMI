import React from 'react';
import Loading from "../Loading";
import EntityComponentBase from "../../DataTypes/EntityComponentBase";


class Audio extends EntityComponentBase {

  include = "&include=field_media_audio_file";

  componentDidMount(): void {
    if (this.state.loading == false && this.state.loaded == false) {
      console.log("Component did mount: now, get data for component");
      this.getDataForComponent(this.include);
    }
  }

  render() {
    console.log("Rendering Audio: ", this);
    if (this.state.attributes?.field_media_audio_file?.uri?.url) {
      return (
        <>
          <audio controls src={this.state.attributes?.field_media_audio_file?.uri?.url} style={{ width: "100%", marginBottom: "2em", }}/>
        </>
      );
    }
    return (
      <>
        <Loading/>
      </>
    );
  }
}


export default Audio;
