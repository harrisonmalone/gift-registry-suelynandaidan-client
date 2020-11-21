import React from "react";
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowCircleLeft } from "@fortawesome/free-solid-svg-icons";

class Give extends React.Component {
  state = {
    gift: null,
    name: "",
    message: ""
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

  onFormSubmit = async (e) => {
    e.preventDefault();
    const id = this.props.match.params.id;
    await fetch(`http://localhost:3000/gifts/${id}`, {
      method: "PUT",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name: this.state.name, give: true })
    });
    this.setState({
      message: "Successfully added gift! ❤️"
    })
    setTimeout(() => {
      this.props.history.push("/gifts")
    }, 2000)
  };

  render() {
    const { gift, name, message } = this.state;
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