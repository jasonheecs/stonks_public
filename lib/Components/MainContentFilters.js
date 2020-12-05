import { filters } from "../constants";

const MainContentFilters = ({ params, setShowFilters }) => (
  <div id="filters-container">
    <h2 id="filters-title">reddit post filters</h2>
    {filters.map((filter, filterIndex) => (
      <div key={filterIndex} className="filters-section">
        <span className="filters-label">{filter.label || filter.key}</span>
        <ul className="filters-list">
          {filter.options.map((filterOption, optionIndex) => (
            <li key={optionIndex} className="filters-list-item">
              <button
                className={
                  params.values[filter.key] === filterOption.value
                    ? "checked"
                    : ""
                }
                onClick={() => {
                  params.set({ [filter.key]: filterOption.value });
                  setShowFilters();
                }}
              >
                {filterOption.label}
              </button>
            </li>
          ))}
        </ul>
      </div>
    ))}
    <button id="close" onClick={setShowFilters}>
      close
    </button>
  </div>
);

export default MainContentFilters;
