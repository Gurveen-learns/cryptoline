import React,{useState} from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Layout, Menu } from 'antd';
import { Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';

import LoginDrawer from './LoginDrawer'

const { Header } = Layout;
const NavBar = () => {
  const [showLoginDrawer, setShowLoginDrawer] = useState(false)
  const toggleDrawer = () => {
    setShowLoginDrawer(prev => !prev);
  }
  return (
    <Layout>
      <Header>
        <div className="mt-8 flex items-center">
          <div className="nav-logo">
            <Image src="/logo.png" width={45} height={60} alt="coinmarket"/>
          </div>
          <Link href="/" className="">
              <span className="text-white ml-8 text-4xl font-bold hover:cursor-pointer">CryptoLine</span>
          </Link>
        </div>
        <div className="flex items-end gap-2">
          <Menu mode="horizontal">
            <Menu.Item><Link href="/news">News</Link></Menu.Item>
          </Menu>
          {/* <Avatar
          onClick={toggleDrawer}
            style={{
              backgroundColor: '#3FB8D5',
              display: "grid",
              placeItems : "center"
            }}
            icon={<UserOutlined />}
          /> */}
        </div>
        </Header>
        {/* <LoginDrawer visible={showLoginDrawer} toggleDrawer={toggleDrawer}/> */}
    </Layout>
  )
}

export default NavBar

//  {/* <Menu.Item><Link href="#">Market Cap</Link></Menu.Item> */}
//  <Menu.Item><Link href="#">Trending</Link></Menu.Item>
//  <Menu.Item><Link href="#">About Us</Link></Menu.Item>
//  {/* <Menu.Item><Link href="#">Contact Us</Link></Menu.Item> */}
