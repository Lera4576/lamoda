import { useMemo } from 'react';

const Filters = ({
  searchQuery,
  handleSearchChange,
  sortType,
  sortCards,
  selectedColors,
  handleColorChange,
  minPrice,
  maxPrice,
  handleMinPriceChange,
  handleMaxPriceChange,
  cards,
}) => {
  const uniqueColors = useMemo(() => [...new Set(cards.map(card => card.color))], [cards]);

  return (
    <div className="filters-container">
      <input
        className="search-input"
        type="text"
        placeholder="Поиск"
        value={searchQuery}
        onChange={handleSearchChange}
      />
      <div className="buttons">
        <button
          className={`sort-button ${sortType === 'expensive' ? 'active' : ''}`}
          onClick={() => sortCards('expensive')}
        >
          Дорогой сначала
        </button>
        <button
          className={`sort-button ${sortType === 'cheap' ? 'active' : ''}`}
          onClick={() => sortCards('cheap')}
        >
          Дешевый сначала
        </button>
        <button
          className={`sort-button ${sortType === 'popular' ? 'active' : ''}`}
          onClick={() => sortCards('popular')}
        >
          Сначала популярный
        </button>
      </div>
      <div className="color-filters">
        {uniqueColors.map(color => (
          <div key={color} className="color-filter">
            <input
              type="checkbox"
              checked={selectedColors.includes(color)}
              onChange={() => handleColorChange(color)}
              id={`color-${color}`}
            />
            <label htmlFor={`color-${color}`}>{color}</label>
          </div>
        ))}
      </div>
      <div className="price-filters">
        <input
          className="price-input"
          type="number"
          placeholder="от"
          value={minPrice}
          onChange={handleMinPriceChange}
        />
        <input
          className="price-input"
          type="number"
          placeholder="до"
          value={maxPrice}
          onChange={handleMaxPriceChange}
        />
      </div>
    </div>
  );
}

export default Filters;