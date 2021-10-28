/* eslint-disable prettier/prettier */
import React from 'react';
import {View, StyleSheet, Text} from 'react-native';

import colors from '../utils/colors';

const Chat = ({text, fromSender, username = 'test', key}) => {
  return (
    <View key={key} style={fromSender ? styles.wrapperRigth : styles.wrapperLeft}>
      {!fromSender && <Text style={styles.text}>{username}</Text>}
      <View
        style={
          fromSender ? styles.containerChatRigth : styles.containerChatLeft
        }>
        <Text style={[styles.text, fromSender && {color: colors.white}]}>
          {text}
        </Text>
      </View>
      <View
        style={fromSender ? styles.triangleChatRigth : styles.triangleChatLeft}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapperRigth: {
    alignItems: 'flex-end',
  },
  wrapperLeft: {
    alignItems: 'flex-start',
    paddingVertical: 6,
  },
  text: {
    color: colors.black,
  },
  containerChatRigth: {
    width: 235,
    height: 60,
    backgroundColor: colors.green,
    borderTopEndRadius: 10,
    borderTopStartRadius: 10,
    borderBottomLeftRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 16,
  },
  triangleChatRigth: {
    width: 0,
    height: 0,
    borderLeftWidth: 16,
    borderLeftColor: 'transparent',
    borderTopWidth: 16,
    borderTopColor: colors.green,
  },
  containerChatLeft: {
    width: 235,
    height: 60,
    backgroundColor: colors.grey91,
    borderTopEndRadius: 10,
    borderTopStartRadius: 10,
    borderBottomRightRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 15,
  },
  triangleChatLeft: {
    width: 0,
    height: 0,
    borderRightWidth: 16,
    borderRightColor: 'transparent',
    borderTopWidth: 16,
    borderTopColor: colors.grey91,
  },
});

export default Chat;
