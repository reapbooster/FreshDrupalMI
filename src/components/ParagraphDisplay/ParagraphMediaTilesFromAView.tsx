import React from 'react';
import EntityComponentBase from '../../DataTypes/EntityComponentBase';

class ParagraphMediaTilesFromAView extends EntityComponentBase {

  include = '&include=field_view';

  static defaultProps = {
    view_mode: "card"
  }

  render(): React.ReactNode {
    return (
      <div>
        <h1>Paragraph media Tiles From A View</h1>
      </div>
    )
  }
}

export default ParagraphMediaTilesFromAView;
