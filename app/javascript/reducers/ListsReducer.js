export default function listsReducer(state = [], action) {
  if (action.type === 'FETCH_BOARD_SUCCESS') {
    const { lists } = action.board;
    return lists.sort((a, b) => a.position - b.position);
  } else if (action.type === 'CREATE_LIST_SUCCESS') {
    return state.concat(action.list);
  } else if (action.type === 'UPDATE_LIST_SUCCESS') {
    const newList = action.list;
    return state.map(list => {
      if (list.id === newList.id) {
        return newList
      } else {
        return list;
      }
    }).sort((a, b) => a.position - b.position);
  } else {
    return state;
  }
}
