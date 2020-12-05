const MainContentHeader = ({
  setShowFilters,
  showFilters,
  sendRequest,
  pending,
}) => (
  <header id="table-title">
    <h1>the $tonk portfolio</h1>
    <div id="options-container">
      <button id="filters" onClick={setShowFilters}>
        {showFilters ? "hide filters?" : "show filters"}
      </button>
      <span className="pipe-divider" />
      <button id="refresh" onClick={sendRequest}>
        {pending ? "refreshing..." : "refresh"}
      </button>
    </div>
  </header>
);

export default MainContentHeader;
