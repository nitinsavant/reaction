import React from 'react';
import PropTypes from 'prop-types';
import List from './List';
import * as ListActions from '../../actions/ListActions';
import * as CardActions from '../../actions/CardActions';
import Dragula from 'react-dragula';
import PositionCalculator from '../../lib/PositionCalculator'

class ListContainer extends React.Component {
  static contextTypes = {
    store: PropTypes.object
  };

  state = {
    title: this.props.list.title,
    editing: false,
  };

  allTheseCards = () => {
    const store = this.context.store;
    const cards = store.getState().cards;
    return cards.filter(card => card.list_id === this.props.list.id).sort((a, b) => a.position - b.position);
  };

  handleClick = () => {
    this.setState({ editing: true });
  };

  handleBlur = () => {
    const editedList = {
      title: this.state.title,
      id: this.props.list.id
    };

    this.context.store.dispatch(
      ListActions.updateList(editedList, () => {
        this.setState({ editing: false });
      })
    );
  };

  handleChange = (e) => {
    this.setState({ title: e.target.value });
  };

  showAddCardForm = () => {
    return this.props.addFormOpenListId === this.props.list.id;
  }

  render() {
    const isAddCardFormOpen = this.showAddCardForm() ? 'add-dropdown-active' : '';

    return (
      <div className={`list-wrapper ${isAddCardFormOpen}`} data-index={this.props.idx}>
        <List
          cards={this.allTheseCards()}
          title={this.state.title}
          id={this.props.list.id}
          editing={this.state.editing}
          onClick={this.handleClick}
          onBlur={this.handleBlur}
          onChange={this.handleChange}
          showAddCardForm={this.showAddCardForm}
          openAddCardForm={this.props.openAddCardForm}
          closeAddCardForm={this.props.closeAddCardForm}
        />
      </div>
    )
  }
}

export default ListContainer;
