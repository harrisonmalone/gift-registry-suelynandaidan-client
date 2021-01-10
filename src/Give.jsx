import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowCircleLeft } from "@fortawesome/free-solid-svg-icons";
import { images } from "./utils/images";

class Give extends React.Component {
  state = {
    gift: null,
    name: "",
    message: "",
    email: "",
    selectedOption: null,
    id: this.props.match.params.id,
  };

  async componentDidMount() {
    const id = this.props.match.params.id;
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/gifts/${id}`
    );
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

  onRadioChange = (e) => {
    this.setState({
      selectedOption: e.target.value,
    });
  };

  onFormSubmit = async (e) => {
    e.preventDefault();
    const id = this.props.match.params.id;
    await fetch(`${process.env.REACT_APP_BACKEND_URL}/gifts/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: this.state.name,
        email: this.state.email,
        selectedOption: this.state.selectedOption,
      }),
    });
    this.setState({
      message: "Successfully gifted! ❤️",
    });
    setTimeout(() => {
      this.props.history.push("/gifts");
    }, 1000);
  };

  render() {
    const { gift, name, message, email, selectedOption, id } = this.state;
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
            <img className="image" alt="gift" src={images[id - 1]} />
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
                <label htmlFor="email">
                  Contributors
                  <span style={{ fontSize: "x-small" }}> *Optional</span>
                </label>
                <div className="radio-group">
                  <input
                    type="radio"
                    name="contributions-wanted"
                    id="contributions-wanted"
                    className="contributions"
                    value="contributions-wanted"
                    onChange={this.onRadioChange}
                    checked={selectedOption === "contributions-wanted"}
                  />
                  <span style={{ marginLeft: "10px" }}>
                    I would like other people (that I might not know) to also
                    contribute to this gift. When you select this your email
                    will be shared publicly at the bottom of the "/gifts" page
                    alongside the item. Those interested in contributing can
                    then reach out to you.
                  </span>
                </div>
                <div className="radio-group">
                  <input
                    type="radio"
                    name="group"
                    id="group"
                    className="contributions"
                    value="group"
                    onChange={this.onRadioChange}
                    checked={selectedOption === "group"}
                  />
                  <span style={{ marginLeft: "10px" }}>
                    I am marking this gift off on behalf of a group of friends
                    or family (people that I already know). Your email won't be
                    shared publicly but you'll be responsible for organizing the
                    purchase of the item amongst people who already have your
                    contact details.
                  </span>
                </div>
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
