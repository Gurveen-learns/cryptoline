import React from 'react'
import Marquee from "react-fast-marquee";
import {CaretUpOutlined, CaretDownOutlined} from '@ant-design/icons'
const Ticker = ({data}) => {
  return (
    <>
      <Marquee
        gradient={false}
        style={{
          background: "#151C2B",
          boxShadow: "0 0 3px rgb(255 255 255 / 15%)"
        }}
      >
        {data.slice(0,11).map(coin => (
          <div key={coin.id} className="ticker-item">
            {coin?.price_change_24h < 0 ?
             <CaretDownOutlined style={{color: "#F65F45"}}/> :
              <CaretUpOutlined style={{color: "#4CC678"}}/>}                      
            <span>{coin.symbol.toUpperCase()}</span>
            <span 
              className="ticker-price"
              style={{color: coin?.price_change_24h < 0 ? "#F65F45" : "#00C896"}}
            >
              &#8377;{coin.current_price} ({coin.price_change_percentage_24h.toFixed(2)}%)
            </span>
          </div>
        ))}
      </Marquee>
      <style jsx>
        {`
          .ticker-item {
            padding: 0.5em 1em;
            color: #fff;
            display : flex;
            align-items : center;
            justify-content: space-between;
          }

          .ticker-price {
            margin-left: 0.5em;
          }
        `}
      </style>
    </>
  )
}

export default Ticker
