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
    // split gifts and gifts given into two different arrays
    // give button removed
    // if multiple people contribute what to do?
    // what if they dont know each other?
    // do we not have contribute?
    // we'll just not do contribute
    // leave it as one persons name
    // aidan will add a subdomain that is gift.suelynandaidan.wedding
    // redirect to my website from that link
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
          {gifts.map((gift, index) => {
            return (
              <div key={index} className={gift.give ? "gift-given" : "gift"}>
                <div className="gift-attributes">
                  <h3 className="gift-name">{gift.name}</h3>
                  <h3 className="gift-price">
                    ${gift.price}
                    <Link to={`/gifts/${gift.id}/give`}>
                      <button className="btn give">Give</button>
                    </Link>
                    <Link to={`/gifts/${gift.id}/contribute`}>
                      <button className="btn contribute">Contribute</button>
                    </Link>
                  </h3>
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
