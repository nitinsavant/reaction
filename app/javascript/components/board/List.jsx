import React from 'react';
import PropTypes from 'prop-types';

import CardTile from './CardTile';

import * as actions from '../../actions/BoardActions';

const List = (props) => {
  const cardComponents = props.cards.map(card => <CardTile card={card} key={card.id} />);
  const renderTitle = () => {
    if (props.editing) {
      return (
        <input
          className="list-title edit-title"
          value={props.title}
          autoFocus={true}
          onChange={props.onChange}
          onBlur={props.onBlur}
        />
        );
    } else {
      return (<p className="list-title">{props.title}</p>);
    }
  };

  return (
    <div className="list-background">
        <div className="list">
          <a className="more-icon sm-icon" href=""></a>
          <div onClick={props.onClick}>
              {renderTitle()}
          </div>
          <div className="add-dropdown add-top">
              <div className="card"></div><a className="button">Add</a><i className="x-icon icon"></i>
              <div className="add-options"><span>...</span>
              </div>
          </div>

          <div id="cards-container" data-id={`list-${props.id}-cards`}>
            {cardComponents}
          </div>

          <div className={`add-dropdown add-bottom${props.active ? ' active-card' : ''}`}>
              <div className="card">
                <div className="card-info"></div>
                <textarea onChange={props.onCardChange} name="add-card" value={props.cardTitle}></textarea>
                <div className="members"></div>
              </div>
              <a onClick={props.onAddCard} className="button">Add</a>
              <i onClick={props.onCloseForm} className="x-icon icon"></i>
              <div className="add-options"><span>...</span></div>
          </div>
          <div
            onClick={props.onOpenForm}
            className="add-card-toggle"
            data-position="bottom"
          >
          Add a card...</div>
        </div>
    </div>

  );
};

export default List;
