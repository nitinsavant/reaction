import React from 'react';
import PropTypes from 'prop-types';

import * as CardActions from '../../actions/CardActions';
import calculatePosition from '../../lib/PositionCalculator';

import CreateCardForm from './CreateCardForm';

class CreateCardContainer extends React.Component {
  state = {
    title: '',
  }

  static contextTypes = {
    store: PropTypes.object
  };

  handleChange = (e) => {
    this.setState({
      title: e.target.value
    });
  }

  handleSave = (e) => {
    if (this.state.title === '') {
      return;
    }

    const newCard = {
      title: this.state.title,
      list_id: this.props.id,
      position: calculatePosition(this.props.cards, this.props.cards.length),
    };

    this.context.store.dispatch(
      CardActions.createCard(newCard, () => {
        this.setState({ title: ''});
      })
    );

    this.props.closeAddCardForm();
  }

  handleOpenAddCardForm = () => {
    this.props.openAddCardForm(this.props.id);
  }

  render() {
    return (
      <CreateCardForm
        title={this.state.title}
        onSave={this.handleSave}
        showAddCardForm={this.props.showAddCardForm}
        openAddCardForm={this.handleOpenAddCardForm}
        closeAddCardForm={this.props.closeAddCardForm}
        onChange={this.handleChange}
      />
    );
  }
}

export default CreateCardContainer;
