import React from "react";
import { Ring } from 'react-spinners-css';


class Loader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true
    };
  }

  render() {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <p>
        <Ring
          size={88}         
          color={"#09357B"}
          loading={this.state.loading}
        />
        </p>     
      </div>
    );
  }
}

export default Loader;