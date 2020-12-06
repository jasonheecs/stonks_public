import { useState, Fragment } from "react";
import { filters } from "../constants";
import MainContentTableRowImg from "./MainContentTableRowImg";
import MainContentTableConfigs from "./MainContentTableConfigs";
import MainContentTableRowPosts from "./MainContentTableRowPosts";

function MainContentTableRow({ stonk, params }) {
  const [showPosts, setShowPosts] = useState(false);

  const showPostToggle = () => setShowPosts((currShowPosts) => !currShowPosts);

  const hasPosts = stonk.posts && stonk.posts.length;

  const openExternalLink = () =>
    window.open(
      filters
        .find((i) => i.key === "external")
        .options.find((i) => i.value === params.external)
        .link(stonk.stonk)
    );

  return (
    <Fragment>
      <tr className="row-main">
        <MainContentTableRowImg
          showPostToggle={showPostToggle}
          hasPosts={hasPosts}
          showPosts={showPosts}
          weightedSentiment={stonk.weightedSentiment}
        />
        {MainContentTableConfigs.map(({ key, cell, symbolize }, index) => {
          const value = stonk[key];

          const isPositive = value > 0;

          const isNegative = value < 0;

          const className =
            (symbolize && ((isPositive && "gain") || (isNegative && "loss"))) ||
            undefined;

          const label = (cell && cell(stonk)) || value || "-";

          return (
            <td
              key={index}
              scope="col"
              className={className}
              onClick={openExternalLink}
            >
              {label}
            </td>
          );
        })}
      </tr>
      {showPosts && hasPosts ? (
        <tr>
          <td
            colSpan={
              MainContentTableConfigs.length +
              MainContentTableRowImg({ getLength: true })
            }
          >
            <MainContentTableRowPosts posts={stonk.posts} />
          </td>
        </tr>
      ) : null}
    </Fragment>
  );
}

export default MainContentTableRow;
