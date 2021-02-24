import React, { useState, useEffect } from "react";

export function Database() {
  const [gifts, setGifts] = useState([]);
  useEffect(() => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/gifts`)
      .then((res) => res.json())
      .then((gifts) => {
        const giftsWithUser = gifts
          .map((gift) => ("user" in gift ? gift : null))
          .filter((gift) => gift !== null);
        setGifts(giftsWithUser);
      });
  }, []);
  return (
    <div>
      <h1>Database</h1>
      <table>
        <tbody>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Gift</th>
          </tr>
          {gifts.map((gift, index) => {
            return (
              <tr key={index}>
                <td>{gift.user.name}</td>
                <td>{gift.user.email}</td>
                <td>{gift.name}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
