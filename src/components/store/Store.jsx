import React, { useEffect, useState } from "react";
import "./store.scss";
import axios from "axios";
import Card from "@mui/material/Card";

const Store = () => {
  const [data, setData] = useState([]);
  const [records, setRecords] = useState(data); //this state for search filter

  useEffect(() => { //fetching API using axios
    (async () => {
      let { data } = await axios.get("https://fakestoreapi.com/products");
      setData(data);
      setRecords(data);
      console.log(data);
    })();
  }, []);

  const Filter = (event) => { // search filter to diplayed the items
    setRecords(
      data.filter((f) => f.title.toLowerCase().includes(event.target.value))
    );
  };

  return (
    <div className="store">
      <div className="container">
        <div className="text">
          <h2>Store</h2>
        </div>
        <div className="search-filter">
          <input
            type="text"
            className="form-control"
            placeholder="Search"
            onChange={Filter}
          />
        </div>
        <div className="card">
          {records.map((item, id) => ( // Map function for displayed data from API
            <Card variant="outlined" key={id}>
              <div className="card-items">
                <div className="item-img">
                  <img src={item.image} alt="" />
                </div>
                <div className="item-details">
                  <ul className="list-items">
                    <li className="list-item">{item.title.slice(0, 20)}</li> 
                    <li className="list-item">Price - {item.price}$</li>
                  </ul>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Store;
