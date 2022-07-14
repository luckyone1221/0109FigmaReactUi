import React from "react";

class Input extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      //date: new Date()
    };
  }
  render() {
    return (
      <div className={this.props.data.parentClasses}>
        <label className="sMain__label">
          {this.props.data.labelTxt && (
            <span className="sMain__title">{this.props.data.labelTxt}</span>
          )}
          {/*input*/}
          {this.props.data.htmlEl === 'input' && (
            <input
              className={`form-control ${this.props.data.addClasses ? this.props.data.addClasses : ''}`}
              type={this.props.data.type}
              name={this.props.data.name}
              value={this.props.value}
              onChange={(e) => this.props.handleInputChange(e, this.props.data.bannerIndex, this.props.data.index)}
            />
          )}
          {/*select*/}
          {this.props.data.htmlEl === 'select' && (
            <select
              className={`form-select ${this.props.data.addClasses ? this.props.data.addClasses : ''}`}
              name={this.props.data.name}
              value={this.props.value}
              onChange={(e) => this.props.handleInputChange(e, this.props.data.bannerIndex, this.props.data.index)}
            >
              {this.props.options.map((option) =>
                <option value={option}>{option}</option>
              )}
            </select>
          )}
        </label>
      </div>
    );
  }
}

export default Input;