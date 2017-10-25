export default function statusReducer(state, action) {
  if (action.type === 'FETCH_BOARDS_REQUEST') {
    return 'FETCHING_BOARDS';
  } else if (action.type === 'FETCH_BOARD_REQUEST') {
    return 'FETCHING_BOARD';
  } else if (action.type === 'FETCH_BOARD_SUCCESS') {
    return 'BOARD_FETCHED_SUCCESSFULLY';
  } else if (action.type === 'FETCH_BOARDS_SUCCESS') {
    return 'BOARDS_FETCHED_SUCCESSFULLY';
  } else if (action.type === 'CREATE_BOARD_REQUEST') {
    return 'CREATING_BOARD';
  } else if (action.type === 'CREATE_BOARD_SUCCESS') {
    return 'BOARD_CREATED_SUCCESSFULLY';
  } else if (action.type === 'CREATE_LIST_REQUEST') {
    return 'CREATING_LIST';
  } else if (action.type === 'CREATE_LIST_SUCCESS') {
    return 'LIST_CREATED_SUCCESSFULLY';
  } else if (action.type === 'UPDATE_LIST_REQUEST') {
    return 'UPDATING_LIST';
  } else if (action.type === 'UPDATE_LIST_SUCCESS') {
    return 'LIST_UPDATED_SUCCESSFULLY';
  } else if (action.type === 'CREATE_CARD_REQUEST') {
    return 'CREATING_CARD';
  } else if (action.type === 'CREATE_CARD_SUCCESS') {
    return 'CARD_CREATED_SUCCESSFULLY';
  } else if (action.type === 'UPDATE_CARD_REQUEST') {
    return 'UPDATING_CARD';
  } else if (action.type === 'UPDATE_CARD_SUCCESS') {
    return 'CARD_UPDATED_SUCCESSFULLY';
  } else {
    return state;
  }
};
