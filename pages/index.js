import { Fragment } from "react";
import {
  useGoogleTagManager,
  useParams,
  getMinutes,
  HTMLHead,
  Error,
  MainContent,
  Placeholder,
} from "../lib";
import useAsyncFetch from "async-fetch";
import { isArray } from "simpul";

function Home({ query }) {
  // Initialize Google Tag Manager for Google Analytics.
  useGoogleTagManager();

  // Initialize params/setParams and fetch stonks.
  const { params, setParams } = useParams({ query });

  const { data: stonks, pending, error, sendRequest } = useAsyncFetch({
    useEffectDependency: [query],
    url: "/api/stonks",
    query: params,
    poll: getMinutes(5),
  });

  return (
    <Fragment>
      <HTMLHead />
      <main>
        {error ? (
          <Error error={error} sendRequest={sendRequest} />
        ) : isArray(stonks) ? (
          <MainContent
            initialStonks={stonks}
            fetchingNewStonks={pending}
            params={{ values: params, set: setParams }}
          />
        ) : (
          <Placeholder />
        )}
      </main>
    </Fragment>
  );
}

export const getServerSideProps = async ({ query }) => ({ props: { query } });

export default Home;
