import { NativeModulesProxy, EventEmitter, Subscription } from 'expo-modules-core';

// Import the native module. On web, it will be resolved to ExpoAwsWaf.web.ts
// and on native platforms to ExpoAwsWaf.ts
import ExpoAwsWafModule from './src/ExpoAwsWafModule';
import ExpoAwsWafView from './src/ExpoAwsWafView';
import { ChangeEventPayload, ExpoAwsWafViewProps } from './src/ExpoAwsWaf.types';

// Get the native constant value.
export const PI = ExpoAwsWafModule.PI;

export function hello(): string {
  return ExpoAwsWafModule.hello();
}

export async function setValueAsync(value: string) {
  return await ExpoAwsWafModule.setValueAsync(value);
}

const emitter = new EventEmitter(ExpoAwsWafModule ?? NativeModulesProxy.ExpoAwsWaf);

export function addChangeListener(listener: (event: ChangeEventPayload) => void): Subscription {
  return emitter.addListener<ChangeEventPayload>('onChange', listener);
}

export { ExpoAwsWafView, ExpoAwsWafViewProps, ChangeEventPayload };
