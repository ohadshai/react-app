import React, { Component } from "react";

class Counter extends Component {
  state = {  
      count: 0,
  };
  render() {
    return (
      <React.Fragment>
        <span className="badge badge-primary m-2">{this.formatCount()}</span>
        <button>Increment</button>
      </React.Fragment>
    );
  }

  formatCount(){
      const { count } = this.state
      return count === 0 ? "Zero": count;
}
}

export default Counter;
