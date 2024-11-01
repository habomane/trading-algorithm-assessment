import { Placeholder } from "../placeholder";
import { MarketDepthRow, useMarketDepthData } from "./useMarketDepthData";
import "./MarketDepth.css";
import { useState, useEffect } from "react";
import { schemas } from "../../data/algo-schemas";

// prettier-ignore
const testData: MarketDepthRow[] = [
  { symbolLevel:"1230", level: 0, bid: 1000, bidQuantity: 500, offer: 1010, offerQuantity: 700 },
  { symbolLevel:"1231", level: 1, bid: 990, bidQuantity: 700, offer: 1012, offerQuantity: 400 },
  { symbolLevel:"1232", level: 2, bid: 985, bidQuantity: 1200, offer: 1013, offerQuantity: 800 },
  { symbolLevel:"1233", level: 3, bid: 984, bidQuantity: 1300, offer: 1018, offerQuantity: 750 },
  { symbolLevel:"1234", level: 4, bid: 970, bidQuantity: 800, offer: 1021, offerQuantity: 900 },
  { symbolLevel:"1235", level: 5, bid: 969, bidQuantity: 700, offer: 1026, offerQuantity: 1500 },
  { symbolLevel:"1236", level: 6, bid: 950, bidQuantity: 750, offer: 1027, offerQuantity: 1500 },
  { symbolLevel:"1237", level: 7, bid: 945, bidQuantity: 900, offer: 1029, offerQuantity: 2000 },
  { symbolLevel:"1238", level: 8, bid: 943, bidQuantity: 500, offer: 1031, offerQuantity: 500 },
  { symbolLevel:"1239", level: 9, bid: 940, bidQuantity: 200, offer: 1024, offerQuantity: 800 },
];

/**
 * TODO
 */
export const MarketDepthFeature = () => {
  const data = useMarketDepthData(schemas.prices);
  const [highestQuantity, setHighestQuantity] = useState<number>(0);

  const arrowDirection = (direction: boolean) => {
    if (direction) {
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          shape-rendering="geometricPrecision"
          text-rendering="geometricPrecision"
          image-rendering="optimizeQuality"
          fill-rule="evenodd"
          clip-rule="evenodd"
          viewBox="0 0 463.96 512"
        >
          <path
            fill-rule="nonzero"
            d="M332.67 512V268.5h92.3c15.48-.68 26.47-5.77 32.82-15.42 17.21-25.8-5.25-52.31-22.6-69.25L261.61 14.33c-17.29-19.11-41.93-19.11-59.22 0L24.42 188.72C8.03 204.78-9.67 229.27 6.21 253.08c6.35 9.65 17.34 14.74 32.81 15.42h92.31V512h201.34z"
          />
        </svg>
      );
    } else {
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          shape-rendering="geometricPrecision"
          text-rendering="geometricPrecision"
          image-rendering="optimizeQuality"
          fill-rule="evenodd"
          clip-rule="evenodd"
          viewBox="0 0 464 512.05"
        >
          <path
            fill-rule="nonzero"
            d="M332.7 0v243.52h92.31c15.47.69 26.46 5.78 32.82 15.43 17.21 25.8-5.25 52.31-22.6 69.25l-173.6 169.52c-17.29 19.1-41.93 19.1-59.22 0L24.42 323.32C8.03 307.26-9.67 282.76 6.21 258.95c6.35-9.65 17.34-14.74 32.82-15.43h92.31V0H332.7z"
          />
        </svg>
      );
    }
  };
  useEffect(() => {
    const max = data.reduce(
      (acc, item) => Math.max(acc, item.bidQuantity, item.offerQuantity),
      0
    );
    setHighestQuantity(max);
  }, []);

  console.log(data);
  return (
      <table>
        <tr>
          <th></th>
          <th colSpan={2}>Bid</th>
          <th colSpan={2}>Asks</th>
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

                  <div className="arrow">{arrowDirection(false)}</div>
                </div>
              </td>
              <td>
                {" "}
                <div className="ask-cell">
                  {item.offer}

                  <div className="arrow">{arrowDirection(true)}</div>
                </div>
              </td>
              <td>
                <div className="ask-quantity ">
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
      </table>
  );
};
