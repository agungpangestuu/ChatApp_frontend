const defaultState = {
  username: '',
  roomId: '',
  isLoading: false,
  error: {},
};

export default (state = defaultState, action = {}) => {
  switch (action.type) {
    case 'FETCH_JOIN_ROOM_REQUEST': {
      return {
        ...defaultState,
        isLoading: true,
      };
    }
    case 'FETCH_JOIN_ROOM_SUCCESS': {
      return {
        ...defaultState,
        ...action.payload,
        isLoading: false,
      };
    }
    case 'FETCH_JOIN_ROOM_FAILED': {
      return {
        ...defaultState,
        isLoading: false,
        error: action?.payload || action.error,
      };
    }
    case 'FETCH_DElETE_USER_SUCCESS': {
      return {
        ...defaultState,
        ...action.payload,
      };
    }
    case 'INIT_STATE': {
      return {
        ...defaultState,
        username: action.payload.username,
        roomId: action.payload.roomId,
      };
    }
    default:
      return state;
  }
};
