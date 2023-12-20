import { TypedArray } from 'paho-mqtt';
import { msgHandlers } from '~/utils/msgHandlers';

export const onMessageArrivedCallback = (message: {
  payloadString: String;
  payloadBytes: ArrayBuffer | TypedArray;
  destinationName: string;
}): void => {
  const topic = message.destinationName;
  const payloadString = message.payloadString.toString().replace(/\0.*$/g, '').trim();
  const payloadBytes = message.payloadBytes
  if (msgHandlers[topic]) {
    msgHandlers[topic].forEach((handler) => {
      if (handler) handler(payloadString, payloadBytes);
    });
  } else {
    console.warn('Unhandled topic!', topic, payloadString);
  }
};
