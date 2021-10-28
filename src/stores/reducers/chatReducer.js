const defaultState = {
  chatList: [],
  isLoading: false,
  error: {},
};

export default (state = defaultState, action = {}) => {
  switch (action.type) {
    case 'FETCH_CHATS_REQUEST': {
      return {
        ...defaultState,
        isLoading: true,
      };
    }
    case 'FETCH_CHATS_SUCCESS': {
      return {
        ...defaultState,
        chatList: action.payload,
        isLoading: false,
      };
    }
    case 'FETCH_CHATS_FAILED': {
      return {
        ...defaultState,
        isLoading: false,
      };
    }
    case 'INIT_STATE': {
      return {
        ...defaultState,
        chatList: action.payload?.chats || [],
      };
    }
    default:
      return state;
  }
};
