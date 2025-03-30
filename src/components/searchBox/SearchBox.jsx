import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeFilter } from '../../redux/filtersSlice';
import css from './SearchBox.module.css';

export default function SearchBox() {
  const dispatch = useDispatch();
  const filter = useSelector((state) => state.filters.name);

  const handleFilterChange = (e) => {
    dispatch(changeFilter(e.target.value));
  };

  return (
    <div className={css.searchBox}>
      <label htmlFor="search-input" className={css.label}>
        Search contacts:
      </label>
      <input
        type="text"
        id="search-input"
        placeholder="Search by name..."
        value={filter}
        onChange={handleFilterChange}
        className={css.input}
      />
    </div>
  );
}
