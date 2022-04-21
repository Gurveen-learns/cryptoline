import Parser from 'rss-parser'

export const FEEDS = [
  "https://blockchain.News/RSS/",
  "https://news.bitcoin.com/feed/",
  "https://coinquora.com/news/feed/",
  "https://zycrypto.com/feed/",
  "https://coinpedia.org/feed/",
  "https://blockonomi.com/feed/",
  "https://bitcoinik.com/feed/",
  // "https://usethebitcoin.com/feed/",
  // "https://cryptosrus.com/feed/",
  // "https://coinidol.com/rss2/",
  // "https://nowpayments.io/blog/feed",
  // "https://ciphertrace.com/feed/",
  // "https://bitcoinexchangeguide.com/feed/",
  // "https://nulltx.com/feed/",
  // "https://www.coolwallet.io/news/feed/",
  // "https://komodoplatform.com/en/blog/rss/",
  // "https://feeds.feedburner.com/coinspeaker",
  // "https://coinfunda.com/feed/",
  // "https://blog-eu.bitflyer.com/rss/",
  // "https://cryptocurrencyfacts.com/blog/feed/",
  // "https://coinjournal.net/feed/",
  // "https://insidebitcoins.com/feed",
  // "https://bravenewcoin.com/news/rss",
  // "https://www.cryptoground.com/feeds.xml?format=xml",
  // "https://dailycoin.com/feed/",
  // "https://simpleswap.io/blog/feed",
  // "https://blog.aragon.org/rss/",
  // "https://coindoo.com/feed/",
  // "https://www.tronweekly.com/feed/",
  // "https://www.news18.com/rss/cryptocurrency.xml",
  // "https://hnrss.org/newest?q=crypto",
  // "https://bitcoinist.com/feed/",
  // "https://thenewscrypto.com/feed/",
  // "https://feeds.feedburner.com/neironix-en",
  // "https://www.crypto-news-flash.com/feed/",
  // "https://cryptoticker.io/en/feed/",
  // "https://zebpay.com/feed/",
  // "https://coinsutra.com/blog/feed/",
  // "https://changelly.com/blog/feed/",
  // "https://www.reddit.com/r/bitcoin/.rss",
  // "https://bitcoinmagazine.com/.rss/full/",
  // "https://www.cryptonewsz.com/feed/",
  // "https://coincheckup.com/blog/feed/",
  // "https://blog.liquid.com/rss.xml",
  // "https://cryptocurrencynews.com/feed/",
  // "https://coinstats.app/blog/feed/",
  // "https://u.today/rss",
  // "https://wazirx.com/blog/feed/"
  // "https://www.cryptoglobe.com/rss/feed.xml",
  // "https://medium.com/feed/@nikita-monastyrskiy",
  // "https://www.financemagnates.com/cryptocurrency/feed/",
  // "https://blog.coinbase.com/feed",
  // "https://buyucoin.com/crypto-labs/feed",
  // "https://cryptoninjas.net/feed",
  // "https://newsbtc.com/feed",
  // "https://cointelegraph.com/rss" , 
  // "https://coinjournal.net/news/feed/",
  // "https://cryptoslate.com/feed/",
  // "https://99bitcoins.com/feed/",
  // "https://cryptobriefing.com/feed/",
];

export async function getFeed(feedUrl) {
  let parser = new Parser();

  let feed = await parser.parseURL(feedUrl);

  return feed;
}