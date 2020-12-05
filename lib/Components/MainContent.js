import { usePriceInjector, useShowFilters } from "../hooks";
import MainContentHeader from "./MainContentHeader";
import MainContentFilters from "./MainContentFilters";
import PendingSVG from "./PendingSVG";

function MainContent({ initialStonks, fetchingNewStonks, params }) {
  const { stonks, fetchStonkPrice } = usePriceInjector({
    initialStonks,
  });

  const { showFilters, setShowFilters } = useShowFilters();

  console.log({ stonks, fetchingNewStonks, params });

  return (
    <div id="main-content">
      <MainContentHeader
        setShowFilters={setShowFilters}
        showFilters={showFilters}
        sendRequest={fetchStonkPrice.sendRequest}
        pending={fetchStonkPrice.pending}
      />
      {showFilters ? (
        <MainContentFilters params={params} setShowFilters={setShowFilters} />
      ) : null}
      {fetchingNewStonks ? <PendingSVG id="pending" /> : "Table..."}
    </div>
  );
}

export default MainContent;
