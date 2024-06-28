import { requireNativeViewManager } from 'expo-modules-core';
import * as React from 'react';

import { ExpoAwsWafViewProps } from './ExpoAwsWaf.types';

const NativeView: React.ComponentType<ExpoAwsWafViewProps> =
  requireNativeViewManager('ExpoAwsWaf');

export default function ExpoAwsWafView(props: ExpoAwsWafViewProps) {
  return <NativeView {...props} />;
}
