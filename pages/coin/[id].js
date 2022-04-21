import React, { useEffect, useState,useRef } from 'react'
import axios from 'axios'
import Image from 'next/image'
import Link from 'next/link'
import {Typography,Row,Col,Input,Radio,Select,Button} from 'antd'
import {SwapOutlined} from '@ant-design/icons'
import LineChart from '../../components/LineChart';
import ExchangeTable from '../../components/ExchangeTable';
import TrendingCoins from '../../components/TrendingCoins'
import NavBar from '../../components/NavBar'

const {Paragraph} = Typography;
const {Option} = Select;


const CoinDetail = (props) => {
  const {data} = props;
  const [loading, setLoading] = useState(true);
  const [history, setHistory] = useState({})
  const [timePeriod, setTimePeriod] = useState(7);
  const [cryptoPrice,setCryptoPrice] = useState(1);
  const [currenyPrice,setCurrenyPrice] = useState();
  const [calcCurrency, setCalcCurrency] = useState("inr");
  const [detailEllipsis, setDetailEllipsis] = useState(true);

  useEffect(() => {
    fetchCoinHistory(data?.id);
    setCurrenyPrice(data?.market_data?.current_price?.inr)
  },[data,timePeriod])

  //Calculate New Price on Currency Change
  useEffect(() => {
    handleCalculation(cryptoPrice,"crypto");
  },[calcCurrency])

  const fetchCoinHistory = async(coinId) => {
    const {data} = await axios.get(`https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=inr&days=${timePeriod}`);
    setHistory(data);
    setLoading(false);
  }

  const timeChangeHandler = (e) => {
    setTimePeriod(e.target.value);
  }

  const handleCurrencyChange = (e) => {
    setCalcCurrency(e);
    handleCalculation(cryptoPrice,"crypto")
  }

  //Handle Calculator computation
  const handleCalculation = (value,mode) => {
   let inputPrice = value; 
   if(mode === "crypto"){
     setCryptoPrice(inputPrice);
     let newCurrencyPrice = inputPrice * data.market_data.current_price[calcCurrency];
     if(newCurrencyPrice > 1){
       newCurrencyPrice = newCurrencyPrice.toFixed(2);
     }
     setCurrenyPrice(newCurrencyPrice);
   }else{
     setCurrenyPrice(inputPrice);
     let newCryptoPrice = inputPrice / data.market_data.current_price[calcCurrency];
     if(newCryptoPrice > 1){
      newCryptoPrice = newCryptoPrice.toFixed(2);
    }
     setCryptoPrice(newCryptoPrice);
   }
  }


  return (
    <>
      <NavBar />
      <div className="mx-6 mt-16">
        <Row gutter={32}>
          <Col span={16}>
            <span className="text-sm bg-[#1f2937] py-1 px-4 rounded-full">Rank #{data.market_data.market_cap_rank}</span>
            <div className="flex gap-x-2 items-center mt-2">
                <Image className="" alt={data.name} height={50} width={50} src={data.image.small} />
                <h1 className="text-6xl font-bold m-0 text-[#fff]">{data.name} ({data.symbol.toUpperCase()})</h1>
            </div>
            <div className="mt-2">
              <span className="text-4xl mr-4">&#8377;{data.market_data.current_price.inr}</span>
              <span className={data.market_data.price_change_percentage_24h > 0  ? "text-[#4CC678] text-xl" : "text-[#F65F45] text-xl"}>
                {data.market_data.price_change_percentage_24h}%
              </span>
            </div>
            <div className="grid grid-cols-2 gap-x-8 mt-4">
                <div className="detail-item">
                  <div className="detail-item-header">Market Cap</div>
                  <div>&#8377;{data.market_data.market_cap.inr}</div>
                </div>
                <div className="detail-item">
                  <div className="detail-item-header">Circulating Supply</div>
                  <div>{data.market_data.circulating_supply}</div>
                </div>
                <div className=" detail-item">
                  <div className="detail-item-header">Total Volume</div>
                  <div>&#8377;{data.market_data.total_volume.inr}</div>
                </div>
                <div className=" detail-item">
                  <div className="detail-item-header">Total Supply</div>
                  <div>{data.market_data.total_supply}</div>
                </div>
                <div className=" detail-item">
                  <div className="detail-item-header">Fully Diluted</div>
                  <div>&#8377;{data.market_data.fully_diluted_valuation.inr}</div>
                </div>
                <div className=" detail-item">
                  <div className="detail-item-header">Max Supply</div>
                  <div>{data.market_data.max_supply}</div>
                </div>
            </div>
          </Col>
          <Col span={8} className="mt-24">
            <h3 className="text-3xl text-white font-bold">Info</h3>
            <div className="flex justify-between text-lg my-3">
              <div className="detail-item-header">Website</div>
              <div className="w-3/4">
                <Link href={data.links.homepage[0]}>
                  <a className="detail-link">{data.links.homepage[0]}</a>
                </Link>
              </div>
            </div>
            <div className="flex justify-between text-xl">
              <div className="detail-item-header">Explorers</div>
              <div className="flex flex-wrap-reverse gap-3 w-3/4">
                {data.links.blockchain_site.map((site,i) => {
                 { return site.trim() !== "" && <span key={i}>
                    <Link  href={site}>
                      <a className="detail-link">{site}</a>
                    </Link>
                  </span>}
              })}
              </div>
            </div>
          </Col>
        </Row>
        <div className="bg-[#293044] py-6 my-16 flex justify-center">
          <div className="flex gap-4 items-center">
            <Input
              addonBefore={data.symbol.toUpperCase()}
              onChange={(e) => handleCalculation(e.target.value,"crypto")}
              value={cryptoPrice}
            />
            <SwapOutlined className="text-4xl"/>
            <Input.Group >
              <Select
                defaultValue="inr"
                value={calcCurrency}
                onSelect={handleCurrencyChange}
              >
                {Object.keys(data.market_data.current_price).map(currency => (
                  <Option value={currency} key={currency}>{currency.toUpperCase()}</Option>
                ))}
              </Select>
              <Input
                onChange={(e) => handleCalculation(e.target.value,"currency")}
                value={currenyPrice}
              />
            </Input.Group>
          </div>
        </div>
        <Row gutter={32}>
          <Col span={16}>
            <div>
              <h3 className="text-[#25B8D5] text-2xl font-bold mb-4">[<span className="px-4">{`${data.name} (${data.symbol}) Price Chart`.toUpperCase()}</span>]</h3>
              <Radio.Group onChange={timeChangeHandler} value={timePeriod} optionType="button" buttonStyle="solid">
                  <Radio.Button value={1}>24 Hours</Radio.Button>
                  <Radio.Button value={7}>7 Days</Radio.Button>
                  <Radio.Button value={30}>30 Days</Radio.Button>
                  <Radio.Button value={90}>3 Months</Radio.Button>
                  <Radio.Button value={365}>12 Months</Radio.Button>
              </Radio.Group>
              {!loading && (
                <LineChart
                  coinHistory={history}
                />)
              }
            </div>
          </Col>
          <Col span={8}>
            <div className="bg-[#293044] p-4 rounded">
              <h3 className="text-[#25B8D5] text-2xl font-bold">[<span className="p-4">{`${data.symbol} Price and market stats`.toUpperCase()}</span>]</h3>
              <div className="detail-item">
                <div className="detail-item-header">Price</div>
                <div>&#8377;{data.market_data.current_price.inr}</div>
              </div>
              <div className=" detail-item">
                <div className="detail-item-header">Market Cap</div>
                <div>&#8377;{data.market_data.market_cap.inr}</div>
              </div>
              <div className=" detail-item">
                <div className="detail-item-header">Total Volume</div>
                <div>&#8377;{data.market_data.total_volume.inr}</div>
              </div>
              <div className=" detail-item">
                <div className="detail-item-header">Market Cap Rank</div>
                <div>#{data.market_cap_rank}</div>
              </div>
              <div className=" detail-item">
                <div className="detail-item-header">Volume / Market Cap</div>
                <div>
                &#8377;{(data.market_data.total_volume.inr / data.market_data.market_cap.inr)
                  .toFixed(4)}
                  </div>
              </div>
              <div className=" detail-item">
                <div className="detail-item-header">24h Low / 24h High </div>
                  <div className="w-1/2 text-right">
                  &#8377;{data.market_data.low_24h.inr} / &#8377;{data.market_data.high_24h.inr}
                  </div>
              </div>
            </div>
          </Col>
        </Row>
        <div className="border-b-2 border-[#fff] my-8"></div>
        <Row>
          <Col>
              <div className="text-5xl text-[#fff]">
                {data.name} Price and Market data
              </div>
              <p className="mt-4">{`${data.name} price today is `}&#8377;{`${data.market_data.current_price.inr} with a 24-hour market change of `}&#8377;{`${data.market_data.market_cap_change_24h_in_currency.inr}. ${data.symbol.toUpperCase()} price is up ${data.market_data.price_change_percentage_24h}% in the last 24 hours. It has a circulating supply of ${data.market_data.circulating_supply} ${data.symbol.toUpperCase()} coins and a total supply of ${data.market_data.total_supply} coins.`}</p>
              <Paragraph ellipsis={detailEllipsis} className="coin-detail-para">
                <div dangerouslySetInnerHTML={{__html: data.description.en}} />
              </Paragraph>
              <Button className="read-more" size="small" onClick={() => {setDetailEllipsis(prev => !prev)}}>
                {!detailEllipsis ? "Show Less" : "Read More"}
              </Button>
          </Col>
        </Row>
        <Row>
          <Col>
          <h3 className="text-[#25B8D5] text-2xl font-bold mb-4 bg-[#293044] inline-block px-1 my-16">[<span className="px-4">{`${data.name.toUpperCase()} MARKETS`}</span>]</h3>
          <ExchangeTable/>
          </Col>
        </Row>
        <Row >
          <Col span={24}>
          <h3 className="text-[#25B8D5] text-2xl font-bold mb-4 bg-[#293044] inline-block px-1 my-16">[<span className="px-4">TRENDING COINS</span>]</h3>
          <TrendingCoins />
          </Col>
        </Row>
      </div>
    </>
  )
}

export default CoinDetail;


export async function getServerSideProps({params}) {
  const {id} = params;
  const {data} = await axios.get(`https://api.coingecko.com/api/v3/coins/${id}`);
  if (!data) {
    return {
      notFound: true,
    }
  }
  
  return {
    props: {data}, // will be passed to the page component as props
  }
}