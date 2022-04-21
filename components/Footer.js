import React from 'react'
import {RightOutlined, HeartFilled,FacebookOutlined,LinkedinOutlined,InstagramOutlined,GithubOutlined,ArrowUpOutlined} from '@ant-design/icons'
import Link from 'next/link'
const Footer = () => {

  const handleScrollTop = () => {
    window.scrollTo({
      top: 0, 
      behavior: 'smooth'
    });
  }

  return (
     <div  className="bg-[#101822] pt-12 mt-12">
       <div className="bg-[#101822] grid grid-cols-3 mx-16 gap-4 justify-items-center text-lg">
         <div className="col mb-8">
            <div className="text-3xl mb-8">CryptoLine</div>
            <p className="text-[#adb5bd] w-3/4">With CryptoLine Trade, you can be sure your trading skills are matched with excellent service.</p>
            <div className="footer-icons flex gap-4 w-3/4">
            <FacebookOutlined />
            <LinkedinOutlined />
            <InstagramOutlined />
            <GithubOutlined />
            </div>
         </div>
         <div className="col grid grid-cols-2 justify-self-stretch">
           <div className="sub-col">
             <div className="footer-title">Company</div>
              <ul>
                <li className="footer-list-item"><RightOutlined style={{fontSize : "12px"}}/><span>About Us</span></li>
                <li className="footer-list-item"><RightOutlined style={{fontSize : "12px"}}/><span><Link href="/news">News</Link></span></li>
                <li className="footer-list-item"><RightOutlined style={{fontSize : "12px"}}/><span>Get in touch</span></li>
                <li className="footer-list-item"><RightOutlined style={{fontSize : "12px"}}/><span>FAQs</span></li>
              </ul>
           </div>
           <div className="sub-col">
             <div className="footer-title">Products</div>
              <ul>
                <li className="footer-list-item"><RightOutlined style={{fontSize : "12px"}}/><span>Exchange</span></li>
                <li className="footer-list-item"><RightOutlined style={{fontSize : "12px"}}/><span>Academy</span></li>
                <li className="footer-list-item"><RightOutlined style={{fontSize : "12px"}}/><span>Card</span></li>
              </ul>
           </div>
         </div>
         {/* <div className="col">
          <div className="footer-title">Start trading with CryptoLine</div>
          <div className="grid grid-cols-2 gap-1">
            <img src="/app-store.png" alt="" />
            <img src="/google-play.png" alt="" />
          </div>
         </div> */}
       </div>
       <div className="border-t-2 border-[#182534] pb-1 flex justify-between items-center">
         <p className="text-[#adb5bd] text-lg ml-16 mt-3 flex items-center gap-1">© {new Date().getFullYear()} CryptoLine. Design with <HeartFilled style={{color: "#F66648"}}/> by Yashika.</p>
         <button onClick={handleScrollTop} className="mr-16 rounded-full w-8 h-8 bg-[#3FB8D5]"><ArrowUpOutlined /></button>
       </div>
     </div>
  )
}

export default Footer
