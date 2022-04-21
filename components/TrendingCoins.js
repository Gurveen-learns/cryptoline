import React ,{useState,useEffect} from 'react'
import {Card,Row,Col} from 'antd';
import axios from 'axios'
import "antd/dist/antd.css";
import Link from 'next/link'
import Image from 'next/image';
import {SearchOutlined} from '@ant-design/icons'


const TrendingCoins = () => {
  const [coins,setCoins] = useState([]);
  const [exchangeRates, setExchangeRates] = useState({});
  useEffect(() => {
    (async function fetchInitialData(){
      const {data : coinData} = await axios.get("https://api.coingecko.com/api/v3/search/trending");
      if(coinData){
        setCoins(coinData.coins);
      }

      const {data : exchangeData} = await axios.get("https://api.coingecko.com/api/v3/exchange_rates");
      if(exchangeData){
        setExchangeRates(exchangeData.rates);
      }
    })()
  },[])

  return (
    <div>
      <Row gutter={[{ xs: 8, sm: 16, md: 16, lg: 16 },{ xs: 8, sm: 16, md: 16, lg: 16 }]}>
        {coins.map(coin => (
          <Col key={coin.item.id} span={6}>
            <Link href={`/coin/${coin.item.id}`} passHref>
              <Card hoverable size="small">
                <Image src={coin.item.small} alt={coin.item.name} width={30} height={30}/>
                <h4 className="text-[#25B8D5] text-2xl">{coin.item.name} ({coin.item.symbol})</h4>
                <p>{exchangeRates?.inr?.unit}
                  {(exchangeRates?.inr?.value * coin.item.price_btc).toFixed(8)}
                </p>
              </Card>
            </Link>
          </Col>
        ))}
        <Col 
          span={6} 
        >
        <Card hoverable className="more-card">
          <SearchOutlined />
          <span>More Coins</span>
        </Card>
        </Col>
      </Row>
    </div>
  )
}

export default TrendingCoins
