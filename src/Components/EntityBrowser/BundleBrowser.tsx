import React from "react";
import { EntityTypeInterface } from "../../DataTypes/EntityType";

export interface BundleBrowserProps {
  bundle: EntityTypeInterface;
}

export const BundleBrowser = (props: BundleBrowserProps) => {
  return (
    <div>
      <h1>Bundle browser</h1>
    </div>
  );
};

export default BundleBrowser;
