import React from 'react';

export default class AddNoteButton extends React.Component {
  constructor(props) {
    super(props);

    this.input = React.createRef();
  }

  addNote = () => {
    const value = this.input.current.value;

    if (value) {
      this.props.createNote({
        date: this.props.currentDate,
        title: value,
      });
      this.input.current.value = '';
    }
  };

  saveByKey = e => {
    if (e.key === 'Enter') {
      this.addNote();
    }
  };

  render() {
    return (
      <div className="notes__item notes__item-container">
        <input type="text" className="notes__item-input" ref={this.input} onKeyPress={this.saveByKey} />
        <button className="notes__item-button" onClick={this.addNote}>
          Add
        </button>
      </div>
    );
  }
}
