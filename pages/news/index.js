import React from 'react'
import NavBar from '../../components/NavBar'
import { FEEDS, getFeed } from '../../utils/feed'


const News = ({items}) => {
  return (
    <>
      <NavBar />
      <h1 className="text-white text-4xl mt-16 ml-6">Crypto News</h1>
      <div className="grid grid-cols-3 gap-x-4 gap-y-8 mx-6">
        {items.map((item) => (
          <div key={item.link} className="max-w-md border border-gray-200 hover:border-gray-500 rounded-lg p-4">
            <a
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="font-bold">{item.title}</div>
              <div dangerouslySetInnerHTML={{__html : item["content"]}}></div>
            </a>
          </div>
        ))}
    </div>
    </>
  )
}

export async function getServerSideProps() {
  let detailedFeed = [];
  for(let i = 0; i < FEEDS.length; i++){
    let feedRes = await getFeed(FEEDS[i]);
    detailedFeed = detailedFeed.concat(feedRes.items);
  }

  return {
    props: {
      items: detailedFeed
    }
  };
}

export default News
