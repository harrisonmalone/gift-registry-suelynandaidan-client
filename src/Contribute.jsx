import React from "react";
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowCircleLeft } from "@fortawesome/free-solid-svg-icons";

class Contribute extends React.Component {
  state = {
    gift: null,
    name: "",
    message: "",
    amount: ""
  };

  async componentDidMount() {
    const id = this.props.match.params.id;
    const response = await fetch(`http://localhost:3000/gifts/${id}`);
    const gift = await response.json();
    this.setState({
      gift: gift,
    });
  }

  onInputChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value,
    });
  };

  render() {
    const { gift, name, message, amount } = this.state;
    return (
      gift && (
        <>
          <nav className="nav">
            <Link to="/gifts" className="home">
              Back <FontAwesomeIcon icon={faArrowCircleLeft} />
            </Link>
          </nav>
          <div className="give-info">
            <h4>You're contributing to buy: {gift.name}</h4>
            <img className="image" alt="gift" src={gift.image_url} />
          </div>
          <div>
            <h4>We'll just need some details 🎁</h4>
            {message && this.state.message}
            <form className="give-form" onSubmit={this.onFormSubmit}>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  onChange={this.onInputChange}
                  value={name}
                  placeholder="Harrison Malone"
                />
              </div>
              <div className="form-group">
                <label htmlFor="name">Amount</label>
                <input
                  type="number"
                  name="amount"
                  id="amount"
                  onChange={this.onInputChange}
                  value={amount}
                  placeholder="10"
                />
              </div>
              <div className="form-group">
                <input id="submit" type="submit" value="Submit" />
              </div>
            </form>
          </div>
        </>
      )
    );
  }
}

export default Contribute;