import React, { useState } from "react";
import { Staff, StaffInterface } from "../../DataTypes/Staff";
import EntityComponentProps from "../../DataTypes/EntityComponentProps";
import { SocialMediaLinkInterface } from "../../Fields/SocialMediaLink";
import ImageFileDisplay from "../FileDisplay/ImageFileDisplay";

export interface PeopleDisplayProps {
  data: StaffInterface;
  key?: string;
  view_mode: string;
}

// TODO: support more than one bundle of people. Currently only supports "staff".
export const PeopleDisplay = (props: PeopleDisplayProps) => {
  const { data, key, view_mode } = props;
  const DataObject = new Staff(data);
  const [staffData, staffSetData] = useState(DataObject);
  if (!DataObject.hasData()) {
    const ecp = new EntityComponentProps(DataObject);
    ecp
      .getData(DataObject.getIncluded())
      .then((res) => res.json())
      .then((ajaxData) => {
        const newDO = new Staff(ajaxData.data);
        staffSetData(newDO);
      });
  }
  console.debug("Component should have data by now:", staffData);
  return (
    <div>
      <h1>People Display</h1>
      <h5>field_biotext</h5>
      <p>{staffData.field_biotext}</p>
      <h5>field_email</h5>
      <p>{staffData.field_email}</p>
      <h5>field_first_name</h5>
      <p>{staffData.field_first_name}</p>
      <h5>field_pgtitle</h5>
      <p>{staffData.field_pgtitle}</p>
      <h5>field_social_media</h5>
      <p>
        {staffData.field_social_media.length
          ? staffData.field_social_media.map(
              (item: SocialMediaLinkInterface, key: number) => {
                return (
                  <div key={key}>
                    <h5>
                      Network:
                      {item.key}
                    </h5>
                    <p>
                      Hande:
                      {item.value}
                    </p>
                  </div>
                );
              }
            )
          : "Field has no value"}
      </p>
      <h5>Field Event</h5>
      <p>{staffData.field_event}</p>
      <h5>Field Photo</h5>
      <p>
        <ImageFileDisplay data={staffData.field_photo} view_mode="thumbnail" />
      </p>
    </div>
  );
};
