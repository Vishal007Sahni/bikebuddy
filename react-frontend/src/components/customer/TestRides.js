import React, { Component } from "react";

class TestRides extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rides: [],
    };
  }

  componentDidMount() {
    const storedRides = sessionStorage.getItem("rides");
    if (storedRides) {
      this.setState({ rides: JSON.parse(storedRides) });
    }
  }

  render() {
    const { rides } = this.state;

    return (
      <div>
        {rides.length > 0 ? (
          rides.map((ride, index) => (
            <div key={index}>
              <p>
                Source: {ride.source}, Destination: {ride.dest}
              </p>
            </div>
          ))
        ) : (
          <p>No rides available</p>
        )}
      </div>
    );
  }
}

export default TestRides;
