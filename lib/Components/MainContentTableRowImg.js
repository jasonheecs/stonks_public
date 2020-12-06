import { plusMinus } from "../utils";
import RedditSVG from "./RedditSVG";

function MainContentTableRowEmoji({ totalSentiment }) {
  const scale = {
    "100": "🤩",
    "90": "😍",
    "80": "🥰",
    "70": "🤗",
    "60": "😊",
    "50": "😁",
    "40": "😄",
    "30": "😃",
    "20": "😀",
    "10": "🙂",
    "0": "😐",
    "-10": "🙁",
    "-20": "😞",
    "-30": "😣",
    "-40": "😖",
    "-50": "😩",
    "-60": "😫",
    "-70": "😤",
    "-80": "😠",
    "-90": "😡",
    "-100": "🤬",
  };

  const title = "Total sentiment score: " + plusMinus(totalSentiment);

  const limitedScore =
    Math.ceil(Math.min(Math.max(totalSentiment, -100), 100) / 10) * 10;

  const emoji = totalSentiment > 100 ? "🚀" : scale[`${limitedScore}`];

  return <span title={title}>{emoji}</span>;
}

function MainContentTableRowImg({
  getLength,
  showPostToggle,
  hasPosts,
  showPosts,
  totalSentiment,
}) {
  const components = [
    () => (
      <td onClick={showPostToggle}>
        <RedditSVG fill={hasPosts && showPosts ? "#f54602" : ""} />
      </td>
    ),
    () => (
      <td onClick={showPostToggle}>
        <MainContentTableRowEmoji totalSentiment={totalSentiment} />
      </td>
    ),
  ];

  return getLength
    ? components.length
    : components.map((Component, index) => <Component key={index} />);
}

export default MainContentTableRowImg;
