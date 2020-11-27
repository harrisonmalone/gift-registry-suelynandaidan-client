import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowCircleLeft } from "@fortawesome/free-solid-svg-icons";

class Gifts extends React.Component {
  state = {
    gifts: null,
  };

  async componentDidMount() {
    const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/gifts`);
    const gifts = await response.json();
    this.setState({
      gifts: gifts,
    });
  }

  render() {
    const { gifts } = this.state;
    return (
      gifts && (
        <>
          <nav className="nav">
            <a href="https://suelynandaidan.wedding/" className="home">
              Back to wedding <FontAwesomeIcon icon={faArrowCircleLeft} />
            </a>
          </nav>
          <h1>Gifts 🎁</h1>
          {gifts[0].length < 1 ? <h2>All gifts given 😀</h2> : gifts[0].map((gift, index) => {
            return (
              <div key={index} className="gift">
                <div className="gift-attributes">
                  <h3 className="gift-name">{gift.name}</h3>
                  <h3 className="gift-price">
                    ${gift.price}
                    <Link to={`/gifts/${gift.id}/give`}>
                      <button className="btn give">Give</button>
                    </Link>
                  </h3>
                </div>
                <img className="image" alt="gift" src={gift.image_url} />
              </div>
            );
          })}
          <hr style={{marginTop: "30px"}} />
          <h1>Givens given ❤️</h1>
          {gifts[1].length < 1 ? <h2>No gifts given 😿</h2> : gifts[1].map((gift, index) => {
            return (
              <div key={index} className="gift-given">
                <div className="gift-attributes">
                  <h3 className="gift-name">{gift.name}</h3>
                  <h3 className="gift-price">
                    ${gift.price}
                  </h3>
                  <p>Reach out to {gift.user.name} at {gift.user.email} if you'd like to also contribute!</p>
                </div>
                <img className="image" alt="gift" src={gift.image_url} />
              </div>
            );
          })}
        </>
      )
    );
  }
}

export default Gifts;
