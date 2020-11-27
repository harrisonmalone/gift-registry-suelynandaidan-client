import React from "react";
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowCircleLeft } from "@fortawesome/free-solid-svg-icons";

class Give extends React.Component {
  state = {
    gift: null,
    name: "",
    message: "",
    email: ""
  };

  async componentDidMount() {
    const id = this.props.match.params.id;
    const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/gifts/${id}`);
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

  onFormSubmit = async (e) => {
    e.preventDefault();
    const id = this.props.match.params.id;
    await fetch(`${process.env.REACT_APP_BACKEND_URL}/gifts/${id}`, {
      method: "PUT",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name: this.state.name, email: this.state.email })
    });
    this.setState({
      message: "Successfully gifted! ❤️"
    })
    setTimeout(() => {
      this.props.history.push("/gifts")
    }, 1000)
  };

  render() {
    const { gift, name, message, email } = this.state;
    return (
      gift && (
        <>
          <nav className="nav">
            <Link to="/gifts" className="home">
              Back <FontAwesomeIcon icon={faArrowCircleLeft} />
            </Link>
          </nav>
          <div className="give-info">
            <h4>You're giving: {gift.name}</h4>
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
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  onChange={this.onInputChange}
                  value={email}
                  placeholder="harrison.malone@gmail.com"
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

export default Give;
