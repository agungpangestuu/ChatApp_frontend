import {fetchJson} from '../utils/fetchJson';

export default async function getChatApi(roomId) {
  try {
    const result = await fetchJson('GET', `chats/${roomId}`);
    return result;
  } catch (error) {
    throw error;
  }
}

export async function addMessageApi(payload) {
  try {
    const result = await fetchJson('POST', 'chats', payload);
    return result;
  } catch (error) {
    throw error;
  }
}
