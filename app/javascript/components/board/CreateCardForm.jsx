import React from 'react';
import PropTypes from 'prop-types';

const CreateCardForm = props => {
  const isSelected = props.showAddCardForm() ? 'active-card' : '';

  return (
    <div>
      <div className={`add-dropdown add-bottom ${isSelected}`}>
        <div className="card">
          <div className="card-info"></div>
          <textarea name="add-card" onChange={props.onChange} value={props.title}></textarea>
          <div className="members"></div>
        </div>
        <a onClick={props.onSave} className="button">Add</a>
        <i onClick={props.closeAddCardForm} className="x-icon icon"></i>
        <div className="add-options"><span>...</span></div>
      </div>
      <div
        className="add-card-toggle"
        data-position="bottom"
        onClick={props.openAddCardForm}
        >Add a card...
      </div>
    </div>
  );
}

export default CreateCardForm;
