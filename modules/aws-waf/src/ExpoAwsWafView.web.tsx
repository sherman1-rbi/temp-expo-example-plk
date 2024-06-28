import * as React from 'react';

import { ExpoAwsWafViewProps } from './ExpoAwsWaf.types';

export default function ExpoAwsWafView(props: ExpoAwsWafViewProps) {
  return (
    <div>
      <span>{props.name}</span>
    </div>
  );
}
