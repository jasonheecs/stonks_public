import { APP } from "../constants";
import { prettyDate, plusMinus } from "../utils";

const anchorLinkProps = ({ href, ...rest }) => ({
  href: "https://www.reddit.com" + href.split(".com")[1],
  target: "_blank",
  ...rest,
});

const MainContentTableRowPosts = ({ posts }) => (
  <ul className="posts">
    {posts.map((post, index) => (
      <li key={index} className="post">
        <a {...anchorLinkProps({ title: post.text, href: post.postLink })}>
          {post.title}
        </a>
        <span>
          Posted {prettyDate(post.timestamp)} by{" "}
          <a {...anchorLinkProps({ href: post.authorLink })}>{post.author}</a> (
          {[
            post.flair,
            post.score,
            "sentiment score: " + plusMinus(post.sentiment),
          ]
            .filter(Boolean)
            .join(", ")}
          ).
        </span>
      </li>
    ))}
  </ul>
);

export default MainContentTableRowPosts;
