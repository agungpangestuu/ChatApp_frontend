/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  Alert,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {connect} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

import colors from '../utils/colors';
import joinRoom from '../stores/actions/userAction';

const HomeScreen = ({navigation, onJoin, isLoading, roomId, error}) => {
  const [username, setUsername] = useState('');
  const [room, setRoom] = useState('');

  const getData = async () => {
    const user = await AsyncStorage.getItem('@username');
    const idRoom = await AsyncStorage.getItem('@roomId');
    if (user && idRoom) {
      navigation.push('Room');
    }
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if (roomId) {
      navigation.push('Room');
    }
  }, [navigation, roomId]);

  useEffect(() => {
    if (error?.message) {
      Alert.alert('Error', error.message);
    }
  }, [error]);

  const onHandleJoin = () => {
    const payload = {
      username,
      roomId: room,
    };
    onJoin(payload);
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <Text style={styles.headerText}>Join Chatroom</Text>
        <View>
          <TextInput
            style={styles.input}
            onChangeText={setUsername}
            value={username}
            placeholder="Username"
            placeholderTextColor={'#BDBDBD'}
          />
          <TextInput
            style={styles.input}
            onChangeText={setRoom}
            value={room}
            placeholder="RoomId"
            placeholderTextColor={'#BDBDBD'}
          />
        </View>
      </ScrollView>
      <TouchableOpacity
        onPress={onHandleJoin}
        style={styles.buttonJoin}
        disabled={isLoading}
      >
        <Text style={styles.textButton}>JOIN</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 16,
    position: 'relative',
    flex: 1,
  },
  headerText: {
    fontWeight: '600',
    fontSize: 30,
    color: colors.black,
    textAlign: 'center',
    marginBottom: 32,
  },
  input: {
    height: 50,
    borderWidth: 1,
    marginVertical: 8,
    padding: 10,
    borderRadius: 8,
    borderColor: '#DEDEDF',
    backgroundColor: colors.grey91,
    color: colors.black,
  },
  buttonJoin: {
    backgroundColor: colors.green,
    borderRadius: 100,
    height: 50,
    width: '100%',
    position: 'absolute',
    bottom: 10,
    justifyContent: 'center',
  },
  textButton: {
    color: colors.white,
    textAlign: 'center',
    fontSize: 16,
  },
});

function mapStateToProps(state) {
  return {
    ...state.user,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onJoin: payload => dispatch(joinRoom(payload)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
