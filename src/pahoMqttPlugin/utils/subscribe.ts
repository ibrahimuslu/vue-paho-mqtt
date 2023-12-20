import { getClient } from '~/config/client';
import { getMqttOptions } from '~/config/options';
import { msgHandlers, queueMsgHandlers } from './msgHandlers';
import { TypedArray } from 'paho-mqtt';

/**
 * @description used to subscribe to the topic specified
 * @param topic mqtt topic
 * @param onMessage callback function to be called when a message is received
 * @param useMainTopic if true, MqttOptions.mainTopic will be prepended to the topic (default: true)
 * @throws {Error} if the client is not connected
 * @returns {void} - returns void
 */
export const subscribe = (
  topic: string,
  onMessage: (dataString: string, dataBytes: ArrayBuffer | TypedArray, ...args: unknown[]) => unknown,
  useMainTopic = true,
): void => {
  const MqttOptions = getMqttOptions();
  const client = getClient();

  topic =
    useMainTopic && MqttOptions.enableMainTopic
      ? `${MqttOptions.mainTopic}/${topic}`
      : topic;
  try {
    if (client && client.isConnected()) {
      if (!msgHandlers[topic]) {
        msgHandlers[topic] = [];
      }
      msgHandlers[topic].push(onMessage);
      client.subscribe(topic);
    } else if (client && !client.isConnected()) {
      if (!queueMsgHandlers[topic]) {
        queueMsgHandlers[topic] = [];
      }
      queueMsgHandlers[topic].push(onMessage);
    }
  } catch (err: unknown) {
    if (err instanceof Error) console.error(err.message);
  }
};
