import React from 'react';
import { FinishMessageCustom } from "../bonde-webpage";
import PhoneWidget from '../bonde-webpage/plugins/Phone';
import PhoneTellAFriend from '../bonde-webpage/plugins/Phone/TellAFriend';
import Utils from '../Utils';


const PhoneWidgetConnected = (props: any) => (
  <PhoneWidget
    {...props}
    overrides={{
      FinishCustomMessage: { component: FinishMessageCustom },
      FinishDefaultMessage: {
        component: PhoneTellAFriend,
        props: {
          imageUrl: Utils.imageUrl,
          href: Utils.getSharedPath(props.mobilization),
        },
      },
    }}
  />
)

export default PhoneWidgetConnected