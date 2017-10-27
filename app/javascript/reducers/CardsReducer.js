export default function cardsReducer(state = [], action) {
  if (action.type === 'FETCH_BOARD_SUCCESS') {
    const { lists } = action.board;
    return lists.reduce((acc, list) => {
      return acc.concat(list.cards.sort((a, b) => a.position - b.position));
    }, []);
  } else if (action.type === 'CREATE_CARD_SUCCESS') {
    return state.concat(action.card);
  } else if (action.type === 'UPDATE_CARD_SUCCESS') {
    const newCard = action.card;
    return state.map(card => {
      if (card.id === newCard.id) {
        return newCard
      } else {
        return card;
      }
    });
  } else {
    return state;
  }
}
