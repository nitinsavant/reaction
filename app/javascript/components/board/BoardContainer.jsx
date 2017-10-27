import React from 'react';
import PropTypes from 'prop-types';
import Board from './Board';
import * as actions from '../../actions/BoardActions';
import * as listActions from '../../actions/ListActions';
import * as CardActions from '../../actions/CardActions';
import calculatePosition from '../../lib/PositionCalculator';
import dragula from 'react-dragula';

class BoardContainer extends React.Component {
  state = {
    addFormOpenListId: null,
  }

  static contextTypes = {
    store: PropTypes.object.isRequired
  };

  componentDidMount() {
    const store = this.context.store;
    this.unsubscribe = store.subscribe(() => this.forceUpdate());
    store.dispatch(actions.fetchBoard(this.props.match.params.id));

    // this.listDrake = dragula([document.querySelector('#existing-lists')], {
    //   direction: 'horizontal',
    //   revertOnSpill: true,
    //   invalid: function(el) {
    //     return el.classList.contains('card');
    //   }
    // }).on('drop', this.updateListPosition);

    this.cardDrake = dragula({
      isContainer: function(el) {
        return el.id === 'cards-container';
      },
    }).on('drop', this.updateCardPosition);
  }

  componentWillUnmount() {
    this.unsubscribe();
    this.cardDrake.destroy();
  }

  updateCardPosition = (el, target, source, sibling) => {
    const sourceList = source.dataset.id;
    const targetList = target.dataset.id;
    const targetListId = parseInt(targetList.replace(/[^0-9\.]/g, ''), 10);

    const cards = this.allLists().filter(list => list.id === targetListId)[0].cards;

    let oldCardIndex;
    let siblingIndex;
    let newCardIndex;
    let newCardPosition;

    if (sourceList === targetList) {
      oldCardIndex = +el.dataset.index;

      if (sibling) {
        siblingIndex = +sibling.dataset.index;
        if (siblingIndex > oldCardIndex) {
          newCardIndex = siblingIndex - 1;
        } else {
          newCardIndex = siblingIndex;
        }
      } else {
        newCardIndex = cards.length - 1;
      }
      newCardPosition = calculatePosition(cards, newCardIndex, oldCardIndex);
    } else {
      debugger;
      if (sibling) {
        siblingIndex = +sibling.dataset.index;
        newCardIndex = siblingIndex + 1;
      } else {
        newCardIndex = cards.length;
      }

      newCardPosition = calculatePosition(cards, newCardIndex);
    }

    this.cardDrake.cancel(true);

    const cardId = +el.dataset.cardId;
    this.context.store.dispatch(
      CardActions.updateCard({ position: newCardPosition, id: cardId, list_id: targetListId })
    );
  }

  updateListPosition = (el, target, source, sibling) => {
    const lists = this.allLists();
    const oldIndex = +el.dataset.index;
    let newIndex;

    if (sibling) {
      const siblingIndex = +sibling.dataset.index;
      if (siblingIndex > oldIndex) {
        newIndex = siblingIndex - 1;
      } else {
        newIndex = siblingIndex;
      }
    } else {
      newIndex = lists.length - 1;
    }

    const newPosition = calculatePosition(lists, newIndex, oldIndex);
    const listId = +lists[oldIndex].id;
    this.context.store.dispatch(
      listActions.updateList({ position: newPosition, id: listId })
    );
  }

  allLists = () => {
    const store = this.context.store;
    return store.getState().lists;
  }

  currentBoardTitle = () => {
    const store = this.context.store;
    const id = +this.props.match.params.id;
    const boards = store.getState().boards;
    const board = boards.filter(board => +board.id === id)[0];
    return (board && board.title) || null;
  }

  lastPosition = () => {
    const lists = this.allLists();
    if (lists[lists.length-1]) {
      return lists[lists.length-1].position;
    } else {
      return 0;
    }
  }

  handleOpenAddCardForm = (list_id) => {
    this.setState({ addFormOpenListId: list_id });
  }

  handleCloseAddCardForm = () => {
    this.setState({ addFormOpenListId: null });
  }

  render() {
    return (
      <Board
        lists={this.allLists()}
        title={this.currentBoardTitle()}
        id={+this.props.match.params.id}
        newPosition={this.lastPosition()+100}
        addFormOpenListId={this.state.addFormOpenListId}
        openAddCardForm={this.handleOpenAddCardForm}
        closeAddCardForm={this.handleCloseAddCardForm}
      />
    )
  }
}

export default BoardContainer;
