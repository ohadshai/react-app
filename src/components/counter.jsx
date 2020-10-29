import React, { Component } from "react";

class Counter extends Component {
  state = {
    value: this.props.value,
    tags: ["tag1", "tag2", "tag3"],
  };

//   constructor(){
//     binding methods in constructor  
//     super();
//     this.handleIncrement = this.handleIncrement.bind(this); 

//   }

  render() {
    console.log('props', this.props)
    return (
      <React.Fragment>
          
        <span className={this.getBadgeClasses()}>{this.formatCount()}</span>
        <button
          onClick={this.handleIncrement}
          className="btn btn-secondary btn-sm"
        >
          Increment
        </button><br/>
        {/* {this.renderTgas()} */}
      </React.Fragment>
    );
  }

  handleIncrement = () => {
    // console.log("Increment Clicked", this)
    this.setState({value: this.state.value + 1});
  }

  renderTgas() {
    return this.state.tags.length === 0 ? (
      <p>
        <b>"There are no tags!"</b>
      </p>
    ) : (
      <ul>
        {this.state.tags.map((tag) => (
          <li key={tag}>{tag}</li>
        ))}
      </ul>
    );
  }

  getBadgeClasses() {
    let classes = "badge m-2 badge-";
    classes += this.state.value === 0 ? "warning" : "primary";
    return classes;
  }

  formatCount() {
    const { value } = this.state;
    return value === 0 ? "Zero" : value;
  }
}

export default Counter;
