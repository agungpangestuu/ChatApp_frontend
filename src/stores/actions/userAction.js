import AsyncStorage from '@react-native-async-storage/async-storage';

import joinRoomApi, {deleteUserApi} from '../../api/user';

export default function joinRoom(payload) {
  return async dispatch => {
    dispatch({
      type: 'FETCH_JOIN_ROOM_REQUEST',
    });

    try {
      const result = await joinRoomApi(payload);
      if (result.status !== 201) {
        dispatch({
          type: 'FETCH_JOIN_ROOM_FAILED',
          error: result,
        });
      } else {
        AsyncStorage.setItem('@username', payload.username);
        AsyncStorage.setItem('@roomId', payload.roomId);

        dispatch({
          type: 'FETCH_JOIN_ROOM_SUCCESS',
          payload: result.data,
        });
      }
    } catch (error) {
      dispatch({
        type: 'FETCH_JOIN_ROOM_FAILED',
        error,
      });
    }
  };
}

export function deleteUser(payload) {
  return async dispatch => {
    dispatch({
      type: 'FETCH_DElETE_USER_REQUEST',
    });

    try {
      const result = await deleteUserApi(payload);
      if (result.status !== 200) {
        dispatch({
          type: 'FETCH_DElETE_USER_FAILED',
          error: result,
        });
      } else {
        AsyncStorage.clear();
        dispatch({
          type: 'FETCH_DElETE_USER_SUCCESS',
          payload: result,
        });
      }
    } catch (error) {
      dispatch({
        type: 'FETCH_DElETE_USER_FAILED',
        error,
      });
    }
  };
}
