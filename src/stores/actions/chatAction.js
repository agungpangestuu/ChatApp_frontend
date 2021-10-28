import AsyncStorage from '@react-native-async-storage/async-storage';
import getChatApi, {addMessageApi} from '../../api/chat';

export default function getChats(payload) {
  return async dispatch => {
    dispatch({
      type: 'FETCH_CHATS_REQUEST',
    });

    try {
      const result = await getChatApi(payload);
      if (result.status !== 200) {
        dispatch({
          type: 'FETCH_CHATS_FAILED',
          error: result,
        });
      } else {
        AsyncStorage.setItem('@chats', JSON.stringify(result.data));
        dispatch({
          type: 'FETCH_CHATS_SUCCESS',
          payload: result.data,
        });
      }
    } catch (error) {
      dispatch({
        type: 'FETCH_CHATS_FAILED',
        error,
      });
    }
  };
}

export function sendMessage(payload) {
  return async dispatch => {
    dispatch({
      type: 'FETCH_SEND_MESSAGE_REQUEST',
    });

    try {
      const result = await addMessageApi(payload);
      if (result.status !== 201) {
        dispatch({
          type: 'FETCH_SEND_MESSAGE_FAILED',
          error: result,
        });
      } else {
        dispatch({
          type: 'FETCH_SEND_MESSAGE_SUCCESS',
          // payload: result.data,
        });
      }
    } catch (error) {
      dispatch({
        type: 'FETCH_SEND_MESSAGE_FAILED',
        error,
      });
    }
  };
}
