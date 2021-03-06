import scrapefrom from "scrapefrom";

const wsb = ({ flair, t, sort }) => ({
  api: {
    url: "https://ns.reddit.com/r/wallstreetbets/search/",
    params: {
      t,
      sort,
      q: "flair:" + flair,
      restrict_sr: "on",
    },
  },
  selector: {
    container: "div.contents div.search-result",
    text: {
      title: "a.search-title",
      flair: "span.linkflairlabel",
      score: "span.search-score",
      author: "a.author",
      text: "div.search-result-body",
    },
    attr: {
      timestamp: {
        selector: "span.search-time time",
        attr: "datetime",
      },
      postLink: {
        selector: "a.search-title",
        attr: "href",
      },
      authorLink: {
        selector: "a.author",
        attr: "href",
      },
    },
  },
});

export const stonkScraper = (query) =>
  new Promise((resolve, reject) =>
    scrapefrom(wsb(query))
      .then(resolve)
      .catch(reject)
  );
