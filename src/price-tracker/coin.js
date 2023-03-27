import React, { useState, useEffect } from "react";
import { Container, Table, Row, Col } from "reactstrap";
import axios from "axios";

const Coin = () => {
  const [coins, setCoins] = useState([]);

  useEffect(() => {
    axios
      .get(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=30&page=1&sparkline=false"
      )
      .then((res) => {
        setCoins(res.data);
      })
      .catch((error) => console.error("error"));
  }, []);

  return (
    <div className="Coin">
      <Container>
        <Row>
          <Col md="12">
            <Table dark  className="mt-5">
              <thead>
                <tr>
                  <th className="text-center">Market cap rank</th>
                  <th>Crypto Name</th>
                  <th>Current price</th>
                  <th>Market cap change</th>
                </tr>
              </thead>
              {coins.map((coin) => {
                return (
                  <tbody key={coin.id}>
                    <tr>
                      <td className="text-center" >{coin.market_cap_rank}</td>
                      <td>
                        <img className="crypto-image" src={coin.image} alt="crypto image" />
                        {coin.name}
                      </td>
                      <td>{coin.current_price}</td>
                      {coin.market_cap_change_percentage_24h < 0 ? (
                        <td className="red">
                          {coin.market_cap_change_percentage_24h.toFixed(2)}%
                        </td>
                      ) : (
                        <td className="green">
                          {coin.market_cap_change_percentage_24h.toFixed(2)}%
                        </td>
                      )}
                    </tr>
                  </tbody>
                );
              })}
            </Table>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Coin;
