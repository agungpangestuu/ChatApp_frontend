import {fetchJson} from '../utils/fetchJson';

export default async function joinRoomApi(payload) {
  try {
    const result = await fetchJson('POST', 'users/join', payload);
    return result;
  } catch (error) {
    throw error;
  }
}

export async function deleteUserApi(username) {
  try {
    const result = await fetchJson('DELETE', `users/${username}`);
    return result;
  } catch (error) {
    throw error;
  }
}
