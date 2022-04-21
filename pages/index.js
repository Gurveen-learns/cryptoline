import React,{useState} from 'react'
import Image from 'next/image'
import axios from 'axios'
import { useRouter } from 'next/router'
import {Table,Button,Modal,Collapse,InputNumber} from 'antd'
import "antd/dist/antd.css";
import {FilterOutlined, CaretRightOutlined} from '@ant-design/icons'
import Ticker from '../components/Ticker'
import NavBar from '../components/NavBar'


const {Panel} = Collapse;
const Home = ({data}) => {
  const router = useRouter();
  const defaultFilter = {
    price: {min: null, max: null},
    market_cap: {min: null, max: null},
    percent_change: {min: null, max: null},
    volume: {min: null, max: null},
  };
  const [filterData, setFilterData] = useState(data);
  const [showFilterModal, setShowFilterModal]  = useState(false);
  const [filters, setFilters] = useState(defaultFilter);
  const columns = [
    {
      title: "#",
      dataIndex: "market_cap_rank",
      sorter: (a,b) => Number(a.market_cap_rank) - Number(b.market_cap_rank),
      key: "rank"
    },
    {
      title: "",
      dataIndex: "image",
      key: "image",
      render : img => <Image src={img} width={20} height={20} alt=" "/>
    },
    {
      title: "Coin",
      dataIndex: "name",
      key: "name"
    },
    {
      title: "Price",
      dataIndex: "current_price",
      key: "current_price",
      sorter: (a,b) => Number(a.current_price) - Number(b.current_price),
      render: price => Number(price) > 0.01 ? new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(price) : <p>&#8377;{price}</p>
    },
    {
      title: "24h Price",
      dataIndex: "price_change_24h",
      key: "price_change_24h",
      sorter: (a,b) => Number(a.price_change_24h) - Number(b.price_change_24h),
      render: pc => <p style={{color: pc<0 ? "#F65F45" : "#4CC678", margin : "auto 0"}}>{pc.toFixed(4)}</p>
    },
    {
      title: "24h %",
      dataIndex: "price_change_percentage_24h",
      key: "price_change_percentage_24h",
      sorter: (a,b) => Number(a.price_change_percentage_24h) - Number(b.price_change_percentage_24h),
      render: pc => <p style={{color: pc<0 ? "#F65F45" : "#4CC678", margin : "auto 0"}}>{pc.toFixed(4)+"%"}</p>
    },
    {
      title: "Market Cap",
      dataIndex: "market_cap",
      key: "market_cap",
      sorter: (a,b) => Number(a.market_cap) - Number(b.market_cap),
      render: mc => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(mc)
    },
    {
      title: "Market Cap %",
      dataIndex: "market_cap_change_percentage_24h",
      key: "market_cap_change_percentage_24h",
      sorter: (a,b) => Number(a.market_cap_change_percentage_24h) - Number(b.market_cap_change_percentage_24h),
      render: mc => <p style={{color: mc<0 ? "#F65F45" : "#4CC678", margin : "auto 0"}}>{mc.toFixed(4)+"%"}</p>
    },
    {
      title: "Volume",
      dataIndex: "total_volume",
      key: "total_volume",
      sorter: (a,b) => Number(a.total_volume) - Number(b.total_volume),
      render: vol => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(vol)
    }
  ]

  //Handle apply filters
  const handleApplyFilters = () => {
    let newData = [...data];
    Object.keys(filters).forEach(filterKey => {
      switch (filterKey){
        case 'price': 
        newData = newData.filter(coin => {
            let {min, max} = filters['price'];
            if(min !== null && max !== null){
              return coin.current_price >= min && coin.current_price <= max;
            }else if(min !== null && !max){
              return coin.current_price >= min; 
            }else if(!min && max !== null) {
              return coin.current_price <= max;
            }else return true;
          })
        case 'market_price':
          newData = newData.filter(coin => {
            let {min, max} = filters['market_cap'];
            if(min !== null && max !== null){
              return coin.market_cap >= min && coin.market_cap <= max;
            }else if(min !== null && !max){
              return coin.market_cap >= min; 
            }else if(!min && max !== null) {
              return coin.market_cap <= max;
            }else return true;
          })
        case 'volume': 
        newData = newData.filter(coin => {
          let {min, max} = filters['volume'];
          if(min !== null && max !== null){
            return coin.total_volume >= min && coin.total_volume <= max;
          }else if(min !== null && !max){
            return coin.total_volume >= min; 
          }else if(!min && max !== null) {
            return coin.total_volume <= max;
          }else return true;
        })
        case 'percent_change': 
          newData = newData.filter(coin => {
            let {min, max} = filters['percent_change'];
            if(min !== null && max !== null){
              return coin.price_change_percentage_24h >= min && coin.price_change_percentage_24h <= max;
            }else if(min !== null && !max){
              return coin.price_change_percentage_24h >= min; 
            }else if(!min && max !== null) {
              return coin.price_change_percentage_24h <= max;
            }else return true;
          })
          break;
        default: break;
        }
    })
    setFilterData(newData);
  } 

  //Handle Filter Input Button 
  const handleButtonInput = (field,min,max) => {
    const copyFilters = {...filters};
    const copyField = {...copyFilters[field]};
    copyField["min"] = min;
    copyField["max"] = max;
    copyFilters[field] = copyField;
    setFilters(copyFilters);
  }

  //Handle Filter Input Change
  const handleFilterInputChange = (filterField, minmax, inputVal) => {
    const copyFilters = {...filters};
    const copyField = {...copyFilters[filterField]};
    copyField[minmax] = inputVal;
    copyFilters[filterField] = copyField;
    setFilters(copyFilters);
  }

  return (
    <>
      {/* Ticker */}
      {data && data.length !== 0 && <Ticker data={data}/>}
      {/* Navigation Bar */}
      <NavBar />
      {/* Filter Button */}
      <div className="float-right mr-8 mt-16 mb-4">
          <Button
            type="primary"
            icon={<FilterOutlined />          
            }
            onClick={() => {setShowFilterModal(true)}}
            className="filter-btn"
            >
              Filters
          </Button>
      </div>
      {/* Filter Modal */}
      <Modal 
        className="filter-modal"
        title="Select Filters"
        visible={showFilterModal} 
        onCancel={() => {
          setFilters(defaultFilter);
          setShowFilterModal(false);
        }}
        footer={[
          <Button key="back" onClick={() => {
            setFilters(defaultFilter);
            setShowFilterModal(false);
          }}>
            Cancel
          </Button>,
          <Button key="clear" onClick={() => {
            setFilters(defaultFilter);
          }}>
            Clear Filters
          </Button>,
          <Button key="submit" className="apply-filter-btn" onClick={() => {
            setShowFilterModal(false);
            handleApplyFilters();
          }}>
            Apply Filters
          </Button>]}>
          <Collapse 
            accordion
            bordered={false} 
            expandIconPosition="right"
            expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
            >
            <Panel header="Price" key="1">
              <p>Price Range</p>
              <InputNumber 
                placeholder="0" 
                value={filters.price.min} 
                onChange={(val) => handleFilterInputChange("price","min", val)}
              />
              <span className="mx-4">to</span>
              <InputNumber 
                placeholder="9,99,999" 
                value={filters.price.max}
                onChange={(val) => handleFilterInputChange("price","max", val)}
              />
              <p className="mt-4">Most searched ranges</p>
              <div className="flex justify-between">
                <Button shape="round" onClick={() => {handleButtonInput("price",0,100)}}>
                  &#8377;0 - &#8377;100
                </Button>
                <Button shape="round" onClick={() => {handleButtonInput("price",100,1000)}}>
                  &#8377;100 - &#8377;1000
                </Button>
                <Button shape="round" onClick={() => {handleButtonInput("price",1000,5000)}}>
                  &#8377;1000 - &#8377;5000
                </Button>
                <Button shape="round" onClick={() => {handleButtonInput("price",10000,null)}}>
                  &#8377;10000 +
                </Button>
              </div>
            </Panel>
            <Panel header="Market Cap" key="2">
              <p>Market Cap Range</p>
              <InputNumber 
                placeholder="0" 
                value={filters.market_cap.min}
                onChange={(val) => handleFilterInputChange("market_cap","min",val)}
              />
              <span className="mx-4">to</span>
              <InputNumber 
                placeholder="99,99,99,999" 
                value={filters.market_cap.max}
                onChange={(val) => handleFilterInputChange("market_cap","max",val)}             
              />
              <p className="mt-4">Most searched ranges</p>
              <div className="flex wrap justify-between">
                <Button shape="round" onClick={() => {handleButtonInput("market_cap",1000000000000,null)}}>
                  &gt; &#8377;1T
                </Button>
                <Button shape="round" onClick={() => {handleButtonInput("market_cap",500000000000,1000000000000)}}>
                  &#8377;500B - &#8377;1000B
                </Button>
                <Button shape="round" onClick={() => {handleButtonInput("market_cap",100000000000,500000000000)}}>
                  &#8377;100B - &#8377;500B
                </Button>
                <Button shape="round" onClick={() => {handleButtonInput("market_cap",0,100000000000)}}>
                  &lt; &#8377;100B
                </Button>
              </div>
            </Panel>
            <Panel header="Volume" key="3">
              <p>Volume Range</p>
              <InputNumber 
                placeholder="0" 
                value={filters.volume.min}
                onChange={(val) => handleFilterInputChange("volume","min",val)}
              />
              <span className="mx-4">to</span>
              <InputNumber 
                placeholder="99,99,99,999" 
                value={filters.volume.max}
                onChange={(val) => handleFilterInputChange("volume","max",val)}               
              />
              <p className="mt-4">Most searched ranges</p>
              <div className="flex wrap justify-between">
                <Button shape="round" onClick={() => {handleButtonInput("volume",1000000000000,null)}}>
                  &gt; &#8377;1T
                </Button>
                <Button shape="round" onClick={() => {handleButtonInput("volume",500000000000,1000000000000)}}>
                  &#8377;500B - &#8377;1000B
                </Button>
                <Button shape="round" onClick={() => {handleButtonInput("volume",100000000000,500000000000)}}>
                  &#8377;100B - &#8377;500B
                </Button>
                <Button shape="round" onClick={() => {handleButtonInput("volume",0,100000000000)}}>
                  &lt; &#8377;100B
                </Button>
              </div>
            </Panel>
            <Panel header="% Change" key="4">
              <p>Change Range</p>
              <InputNumber 
                placeholder="-100%" 
                value={filters.percent_change.min}
                onChange={(val) => handleFilterInputChange("percent_change","min",val)}
              />
              <span className="mx-4">to</span>
              <InputNumber 
                placeholder="1000%" 
                value={filters.percent_change.max}
                onChange={(val) => handleFilterInputChange("percent_change","max",val)}
                />
              <p className="mt-4">Most searched ranges</p>
              <div className="flex wrap justify-between">
                <Button shape="round" onClick={() => {handleButtonInput("percent_change",50,100)}}>
                  +50%
                </Button>
                <Button shape="round" onClick={() => {handleButtonInput("percent_change",10,50)}}>
                  10% to 50%
                </Button>
                <Button shape="round" onClick={() => {handleButtonInput("percent_change",0,10)}}>
                  0% to 10%
                </Button>
                <Button shape="round" onClick={() => {handleButtonInput("percent_change",-10,0)}}>
                  -10% to 0%
                </Button>
                <Button shape="round" onClick={() => {handleButtonInput("percent_change",-50,-10)}}>
                  -50% to -10%
                </Button>
              </div>
            </Panel>
          </Collapse>
      </Modal>
      {/* Coin Table */}
      <Table 
        dataSource={filterData} 
        columns={columns}
        pagination={{position: ["bottomCenter"]}}
        onRow={(record,rowIndex) => {
          return {
            onClick : e => {
              router.push(`/coin/${record.id}`)
            }
          }    
        }}
      />
  </>
     
  )
}

export default Home

export async function getServerSideProps(context) {
  const {data : pageOne} = await axios.get("https://api.coingecko.com/api/v3/coins/markets?vs_currency=inr&order=market_cap_desc&per_page=250&page=1&sparkline=false");
  const {data : pageTwo} = await axios.get("https://api.coingecko.com/api/v3/coins/markets?vs_currency=inr&order=market_cap_desc&per_page=250&page=2&sparkline=false");
  const {data : pageThree} = await axios.get("https://api.coingecko.com/api/v3/coins/markets?vs_currency=inr&order=market_cap_desc&per_page=250&page=3&sparkline=false");
  const {data : pageFour} = await axios.get("https://api.coingecko.com/api/v3/coins/markets?vs_currency=inr&order=market_cap_desc&per_page=250&page=4&sparkline=false");
  if (!pageOne || !pageTwo || !pageThree || !pageFour) {
    return {
      notFound: true,
    }
  }
  const data = [...pageOne, ...pageTwo, ...pageThree, ...pageFour]
  return {
    props: {data}, // will be passed to the page component as props
  }
}