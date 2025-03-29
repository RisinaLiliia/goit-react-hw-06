import React from "react";
import { useDispatch } from "react-redux";
import { changeFilter } from "../../redux/filtersSlice";
import css from "./SearchBox.module.css";

export default function SearchBox() {
  const dispatch = useDispatch();

  const handleFilterChange = (e) => {
    const newFilter = e.target.value;
    dispatch(changeFilter(newFilter));
  };

  return (
    <div className={css.searchBox}>
      <input
        type="text"
        placeholder="Search contacts..."
        onChange={handleFilterChange}
        className={css.input}
      />
    </div>
  );
}
