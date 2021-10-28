/* eslint-disable react-hooks/exhaustive-deps */
import {useEffect} from 'react';
import {connect} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

export function OfflineGate(props) {
  const {triggerGetData} = props;

  const syncData = async () => {
    const chatData = await AsyncStorage.getItem('@chats');
    const usernameData = await AsyncStorage.getItem('@username');
    const roomIdData = await AsyncStorage.getItem('@roomId');
    const payload = {
      chats: JSON.parse(chatData),
      username: usernameData,
      roomId: roomIdData,
    };
    triggerGetData(payload);
  };

  useEffect(() => {
    syncData();
  }, []);

  return props.children;
}

function mapStateToProps(state) {
  return {
    state,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    triggerGetData: payload => dispatch({type: 'INIT_STATE', payload}),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(OfflineGate);
