
import { useMarketDepthData } from "./useMarketDepthData";
import "./MarketDepth.css";
import { useState, useEffect } from "react";
import { schemas } from "../../data/algo-schemas";
import { ShowDirection } from "./ShowDirection";

// prettier-ignore
// const testData: MarketDepthRow[] = [
//   { symbolLevel:"1230", level: 0, bid: 1000, bidQuantity: 500, offer: 1010, offerQuantity: 700 },
//   { symbolLevel:"1231", level: 1, bid: 990, bidQuantity: 700, offer: 1012, offerQuantity: 400 },
//   { symbolLevel:"1232", level: 2, bid: 985, bidQuantity: 1200, offer: 1013, offerQuantity: 800 },
//   { symbolLevel:"1233", level: 3, bid: 984, bidQuantity: 1300, offer: 1018, offerQuantity: 750 },
//   { symbolLevel:"1234", level: 4, bid: 970, bidQuantity: 800, offer: 1021, offerQuantity: 900 },
//   { symbolLevel:"1235", level: 5, bid: 969, bidQuantity: 700, offer: 1026, offerQuantity: 1500 },
//   { symbolLevel:"1236", level: 6, bid: 950, bidQuantity: 750, offer: 1027, offerQuantity: 1500 },
//   { symbolLevel:"1237", level: 7, bid: 945, bidQuantity: 900, offer: 1029, offerQuantity: 2000 },
//   { symbolLevel:"1238", level: 8, bid: 943, bidQuantity: 500, offer: 1031, offerQuantity: 500 },
//   { symbolLevel:"1239", level: 9, bid: 940, bidQuantity: 200, offer: 1024, offerQuantity: 800 },
// ];

/**
 * TODO
 */

// Price style price, state of price 
export const MarketDepthFeature = () => {
  const data = useMarketDepthData(schemas.prices);
  const [highestQuantity, setHighestQuantity] = useState<number>(0);


  useEffect(() => {
    const max = data.reduce(
      (acc, item) => Math.max(acc, item.bidQuantity, item.offerQuantity),
      0
    );
    setHighestQuantity(max);
  }, []);

  return (
      <table>
        <tbody>
        <tr>
          <th></th>
          <th colSpan={2}>Bid</th>
          <th colSpan={2}>Ask</th>
        </tr>

        <tr>
          <th></th>
          <th>Quantity</th>
          <th>Price</th>
          <th>Price</th>
          <th>Quantity</th>
        </tr>

        {data.map((item, key) => {
          return (
            <tr key={key}>
              <td className="key">{item.level}</td>
              <td>
                <div className="bid-quantity">
                  <div
                    style={{
                      width: `${Math.ceil(
                        (item.bidQuantity / highestQuantity) * 100
                      )}%`,
                    }}
                  >
                    {item.bidQuantity}
                  </div>
                </div>
              </td>
              <td>
                <div className="bid-cell">
                  {item.bid}

                  <div className="arrow"><ShowDirection value={item.bid}/></div>
                </div>
              </td>
              <td>
                {" "}
                <div className="offer-cell">
                  {item.offer}
                  <div className="arrow"><ShowDirection value={item.offer}/></div>
                </div>
              </td>
              <td>
                <div className="offer-quantity ">
                  <div
                    style={{
                      width: `${Math.ceil(
                        (item.offerQuantity / highestQuantity) * 100
                      )}%`,
                      backgroundColor: "#e23434",
                      color: "white",
                    }}
                  >
                    {item.offerQuantity}
                  </div>
                </div>
              </td>
            </tr>
          );
        })}
        </tbody>
      </table>
  );
};
