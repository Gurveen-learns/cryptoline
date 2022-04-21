import React,{useState,useEffect} from 'react'
import Image from 'next/image';
import Link from 'next/link'
import {Table} from 'antd';
import "antd/dist/antd.css";
import axios from 'axios'


const ExchangeTable = () => {
  const [exchangeData, setExchangeData] = useState([]);

  useEffect(() => {
    (async function fetchExchanges(){
      const {data} = await axios.get("https://api.coingecko.com/api/v3/exchanges?per_page=5");
      if(data){
        setExchangeData(data);
      }
    })()
  },[])

  const columns = [
    {
      title: "#",
      dataIndex: "trust_score_rank",
      key: "rank"
    },
    {
      title: "",
      dataIndex: "image",
      key: "image",
      render : img => <Image src={img} width={20} height={20} alt=" "/>
    },
    {
      title: "Exchange",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Website",
      dataIndex: "url",
      key: "url",
      render: url => <Link href={url}>{url}</Link>
    },
    {
      title: "Country",
      dataIndex: "country",
      key: "country",
    },
    {
      title: "24h Trade Volume",
      dataIndex: "trade_volume_24h_btc",
      key: "vol",
      render: vol => vol.toFixed(2) + " BTC"
    },
    {
      title: "Trust Score",
      dataIndex: "trust_score",
      key: "trust_score",
    },
  ]
  return (
    <div style={{width: "100vw"}}>
      <Table 
        dataSource={exchangeData} 
        columns={columns}
        pagination={false}
        size="small"
        tableLayout="auto"
        
      />
    </div>
  )
}

export default ExchangeTable;
