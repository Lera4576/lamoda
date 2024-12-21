import { useMemo } from 'react';

const CardList = ({ cards, sortType, minPrice, maxPrice }) => {
  const filteredCards = useMemo(() => {
    return cards.filter(card => {
      const price = parseInt(card.price, 10);
      return (
        (minPrice === '' || price >= parseInt(minPrice, 10)) &&
        (maxPrice === '' || price <= parseInt(maxPrice, 10))
      );
    });
  }, [cards, minPrice, maxPrice]);

  const sortedCards = useMemo(() => {
    return [...filteredCards].sort((a, b) => {
      switch (sortType) {
        case 'expensive':
          return b.price - a.price;
        case 'cheap':
          return a.price - b.price;
        case 'popular':
          return b.rating - a.rating;
        default:
          return 0;
      }
    });
  }, [filteredCards, sortType]);

  return (
    <div>
      <p className="total-products">Всего продуктов: {sortedCards.length}</p>
      {sortedCards.length === 0 ? (
        <p className="no-results">Ничего не найдено</p>
      ) : (
        <div className="card-container">
          {sortedCards.map(card => (
            <div key={card.id} className="card">
              <img src={card.photo} alt={card.name} />
              <h3>{card.name}</h3>
              <p>{card.description}</p>
              <p>Цвет: {card.color}</p>
              <p>Цена: {card.price} руб.</p>
              <p>Рейтинг: {card.rating}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CardList;