import React, { useState } from "react";
import { snacks } from "../data/data";

const DataTable = () => {
  const [searchText, setSearchText] = useState("");
  const [sortBy, setSortBy] = useState({
    key: "",
    sortAscending: ""
  });

  const searchHandler = (searchText) => {
    return snacks.filter((item) =>
      item.product_name.toLowerCase().includes(searchText.toLowerCase())
    );
  };

  const sortByAscending = (data, key) => {
    return data.sort((a, b) => a[key] - b[key]);
  };

  const sortByDescending = (data, key) => {
    return data.sort((a, b) => b[key] - a[key]);
  };

  const sortHandler = (sortKey) => {
    if (sortKey === sortBy.key) {
      setSortBy((pre) => ({ ...pre, sortAscending: !pre.sortAscending }));
    } else {
      setSortBy({ key: sortKey, sortAscending: true });
    }
  };

  const filter = (snacks) => {
    let filteredSnacks = [...snacks];

    if (searchText) {
      filteredSnacks = searchHandler(searchText);
    }

    if (sortBy.key) {
      filteredSnacks = sortBy.sortAscending
        ? sortByAscending(filteredSnacks, sortBy.key)
        : sortByDescending(filteredSnacks, sortBy.key);
    }
    return filteredSnacks;
  };

  const snacksData = filter(snacks);

  return (
    <div>
      <div className="search">
        <input
          onChange={(e) => setSearchText(e.target.value)}
          placeholder="Search.."
        />
      </div>
      {searchText && snacksData.length == 0 ? (
        <h2 style={{ margin: "1rem" }}>Product Not Available</h2>
      ) : (
        <>
          <div>
            <table className="table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Product Name</th>
                  <th>Product Weight</th>
                  <th onClick={() => sortHandler("price")}>Price(INR)</th>
                  <th onClick={() => sortHandler("calories")}>Calories</th>
                  <th>ingredients</th>
                </tr>
              </thead>
              <tbody>
                {snacksData.map((item) => (
                  <>
                    <tr>
                      <td>{item.id}</td>
                      <td>{item.product_name}</td>
                      <td>{item.product_weight}</td>
                      <td>{item.price}</td>
                      <td>{item.calories}</td>
                      <td>
                        {item.ingredients.map((ingredient) => (
                          <span>{ingredient}, </span>
                        ))}
                      </td>
                    </tr>
                  </>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
};

export default DataTable;
