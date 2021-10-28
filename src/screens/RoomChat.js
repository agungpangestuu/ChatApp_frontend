/* eslint-disable react-hooks/exhaustive-deps */
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useRef, useEffect, useState} from 'react';
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {connect} from 'react-redux';

import Chat from '../components/Chat';
import getChats, {sendMessage} from '../stores/actions/chatAction';
import {deleteUser} from '../stores/actions/userAction';

import colors from '../utils/colors';

const RoomChat = ({navigation, getChat, deleteUser, sendMessage, chatList}) => {
  const scrollViewRef = useRef();
  const [username, setUsername] = useState('');
  const [roomId, setRoomId] = useState('');
  const [message, setMessage] = useState('');
  const [chats, setChats] = useState(chatList);

  useEffect(() => {
    AsyncStorage.getItem('@roomId').then(item => {
      setRoomId(item);
      getChat(item);
    });
    AsyncStorage.getItem('@username').then(item => setUsername(item));

    if (scrollViewRef) {
      scrollViewRef.current.scrollToEnd({animated: true});
    }
  }, []);

  useEffect(() => {
    if (chatList.length > 0) {
      setChats(chatList);
    }
  }, [chatList]);

  const onSendMessage = () => {
    if (message.length > 0) {
      const payload = {
        message,
        sender: username,
        roomId: roomId,
      };
      sendMessage(payload);
      setMessage('');
      setChats([
        ...chats,
        {
          ...payload,
          id: Math.random().toString(36).substr(2, 9),
        },
      ]);
    }
  };

  const handleBack = () => {
    navigation.goBack();
    deleteUser(username);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerBack} onPress={handleBack}>
        Exit
      </Text>
      <View style={styles.wrapperHeaderText}>
        <Text style={styles.headerText}>{roomId}</Text>
      </View>
      <ScrollView
        ref={scrollViewRef}
        onContentSizeChange={() =>
          scrollViewRef.current.scrollToEnd({animated: true})
        }
        style={styles.flex}>
        {chats.map(v => (
          <Chat
            key={v.id}
            text={v.message}
            username={v.sender}
            fromSender={v.sender === username}
          />
        ))}
      </ScrollView>
      <View style={styles.wrapperInput}>
        <TextInput
          style={styles.input}
          onChangeText={setMessage}
          onSubmitEditing={onSendMessage}
          value={message}
          placeholder="Message here..."
          placeholderTextColor={'#BDBDBD'}
        />
        <TouchableOpacity
          style={[
            styles.wrapperIcon,
            message.length === 0 && {
              backgroundColor: colors.grey91,
              borderColor: colors.grey91,
            },
          ]}
          disabled={message.length === 0}
          onPress={onSendMessage}>
          <Icon
            name="arrow-up-outline"
            size={20}
            color={message.length === 0 ? colors.grey91 : 'white'}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  container: {
    marginHorizontal: 16,
    flex: 1,
  },
  wrapperHeaderText: {
    alignItems: 'center',
  },
  headerBack: {
    position: 'absolute',
    top: 12,
    left: 0,
    color: colors.green,
    fontSize: 16,
    fontWeight: '500',
  },
  headerText: {
    fontWeight: '600',
    fontSize: 30,
    color: colors.black,
    textAlign: 'center',
    marginBottom: 13,
  },
  input: {color: colors.black, flex: 1},
  wrapperInput: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    marginVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 100,
    borderColor: '#DEDEDF',
    backgroundColor: colors.grey91,
  },
  wrapperIcon: {
    borderWidth: 1,
    borderColor: colors.green,
    borderRadius: 30,
    backgroundColor: colors.green,
    padding: 8,
  },
});

function mapStateToProps(state) {
  return {
    ...state.chat,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    deleteUser: payload => dispatch(deleteUser(payload)),
    getChat: payload => dispatch(getChats(payload)),
    sendMessage: payload => dispatch(sendMessage(payload)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(RoomChat);
