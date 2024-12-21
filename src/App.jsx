import { useState, useMemo } from 'react';
import CardList from './CardList';
import Filters from './Filters';
import './App.css';

const App = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortType, setSortType] = useState('expensive');
  const [selectedColors, setSelectedColors] = useState([]);
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  const memoizedCards = useMemo(() => [
    { id: 1, photo: 'https://a.lmcdn.ru/img389x562/M/P/MP002XM1UA16_21173645_1_v1.jpg', name: 'Кеды', description: 'Выполнены из натуральной кожи и резины', color: 'Коричневый', price: '390', rating: '90' },
    { id: 2, photo: 'https://cdn.lepodium.com/images/167/316/167316568-3.jpg', name: 'Кроссовки', description: 'Выполнены из искусственной кожи и резины', color: 'Бежевый', price: '130', rating: '94' },
    { id: 3, photo: 'https://www.lookbuck.com/system/products/items/images/015/971/474/small/image1xxl.jpg?1545396914', name: 'Туфли', description: 'Выполнены из замши', color: 'Красный', price: '290', rating: '80' },
    { id: 4, photo: 'https://konfiskat.ua/img/p/full/398/341398d.jpg?v=f741bb56fb79ac1833470877775c7138', name: 'Ботинки', description: 'Выполнены из натуральной кожи, натурального меха и резины', color: 'Бежевый', price: '450', rating: '62' },
    { id: 5, photo: 'https://i.pinimg.com/736x/fd/a6/a3/fda6a3ab43210b866ad9523ee1e6218c.jpg', name: 'Туфли', description: 'Выполнены из натуральной кожи', color: 'Чёрный', price: '90', rating: '86' },
    { id: 6, photo: 'https://intertop.kz/load/ZW20230/1600x2133/1.jpeg', name: 'Лоферы', description: 'Выполнены из натуральной кожи и резины', color: 'Чёрный', price: '180', rating: '77' },
    { id: 7, photo: 'https://ae01.alicdn.com/kf/Sc94477af11c447149eac0d6a3ab5a796l.jpg?width=800&height=800&hash=1600', name: 'Сапоги', description: 'Выполнены из искусственного меха и кожи', color: 'Коричневый', price: '235', rating: '69' },
    { id: 8, photo: 'https://www.myjane.ru/data/cache/2019mar/13/11/872251_48818nothumb650.jpg', name: 'Полусапоги', description: 'Выполнены из натуральной кожи и меха', color: 'Синий', price: '470', rating: '83' },
  ], []);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const sortCards = (type) => {
    setSortType(type);
  };

  const handleColorChange = (color) => {
    setSelectedColors((prevColors) => {
      if (prevColors.includes(color)) {
        return prevColors.filter((c) => c !== color);
      } else {
        return [...prevColors, color];
      }
    });
  };

  const handleMinPriceChange = (event) => {
    setMinPrice(event.target.value);
  };

  const handleMaxPriceChange = (event) => {
    setMaxPrice(event.target.value);
  };

  const filteredCards = useMemo(() => {
    return memoizedCards.filter((card) => {
      const price = parseInt(card.price, 10);
      const minPriceValue = minPrice ? parseInt(minPrice, 10) : 0;
      const maxPriceValue = maxPrice ? parseInt(maxPrice, 10) : Infinity;

      return (
        (card.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          card.description.toLowerCase().includes(searchQuery.toLowerCase())) &&
        (selectedColors.length === 0 || selectedColors.includes(card.color)) &&
        price >= minPriceValue &&
        price <= maxPriceValue
      );
    });
  }, [memoizedCards, searchQuery, selectedColors, minPrice, maxPrice]);

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
      <Filters
        searchQuery={searchQuery}
        handleSearchChange={handleSearchChange}
        sortType={sortType}
        sortCards={sortCards}
        selectedColors={selectedColors}
        handleColorChange={handleColorChange}
        minPrice={minPrice}
        maxPrice={maxPrice}
        handleMinPriceChange={handleMinPriceChange}
        handleMaxPriceChange={handleMaxPriceChange}
        cards={memoizedCards}
      />
      <CardList
        cards={sortedCards}
        sortType={sortType}
        minPrice={minPrice}
        maxPrice={maxPrice}
      />
    </div>
  );
};

export default App;