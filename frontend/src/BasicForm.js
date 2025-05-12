import React from 'react';
import ReactDOM from 'react-dom/client';

class BasicForm extends React.Component {
  static displayName = "basic-input";
  state = { names: [] }; // <-- initial state

  onFormSubmit = (evt) => {
    const name = this.refs.name.value;
    const names = [ ...this.state.names, name ];
    this.setState({ names: names });
    this.refs.name.value = '';
    evt.preventDefault();
  };

  render() {
    return (
      <div>
        <h1>Sign Up Sheet</h1>

        <form onSubmit={this.onFormSubmit}>
          <input
            placeholder='Name'
            ref='name'
          />

          <input type='submit' />
        </form>

        <div>
          <h3>Names</h3>
          <ul>
            { this.state.names.map((name, i) => <li key={i}>{name}</li>) }
          </ul>
        </div>
      </div>
    );
  }
};

export default BasicForm;
// ReactDOM.render(
//   <BasicForm />,
//   document.getElementById("root")
// );