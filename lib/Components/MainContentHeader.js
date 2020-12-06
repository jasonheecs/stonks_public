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
      <span className="pipe-divider" />
      <a
        className="header-link"
        href="https://buymeacoffee.com/nameer"
        target="_blank"
      >
        support
      </a>
      <span className="pipe-divider" />
      <a
        className="header-link"
        href="https://github.com/nameer-rizvi/stonks_public"
        target="_blank"
      >
        github
      </a>
      <span className="pipe-divider" />
      <a className="header-link" href="https://twentiment.com" target="_blank">
        twentiment
      </a>
    </div>
  </header>
);

export default MainContentHeader;
