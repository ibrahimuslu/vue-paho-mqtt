import type { Qos, TypedArray } from 'paho-mqtt';
export * from './../index';

export interface PahoMqttPluginOptions {
  showNotifications?: boolean;
  autoConnect?: boolean;
}

export interface MainOptions {
  PluginOptions: PahoMqttPluginOptions;
  MqttOptions: MqttOptions;
}

export type MqttMode = 'B' | 'F' | 'Q' | 'Qr' | 'Br' | 'Fnr';

export type MqttStatus =
  | 'connected'
  | 'disconnected'
  | 'connecting'
  | 'error'
  | 'lost'
  | null;

export type MqttState = Record<MqttMode, { qos: Qos; ret: boolean }>;

export type MsgHandler = Record<string, ((payloadString: string ,payloadBytes: ArrayBuffer | TypedArray) => unknown)[]>;

export interface MqttOptions {
  host: string;
  port: number;
  clientId: string;
  useSSL?: boolean;
  mainTopic?: string;
  enableMainTopic?: boolean;
  watchdogTimeout?: number;
  reconnectTimeout?: number;
  username?: string;
  password?: string;
}
