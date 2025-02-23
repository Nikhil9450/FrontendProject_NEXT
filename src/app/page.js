"use client"; 
import styles from "./page.module.css";
import { useState,useEffect } from "react";
import axios from "axios";
import Card from "@/components/Card";
import Filter from "@/components/Filter";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Pagination from 'react-bootstrap/Pagination';

export default function Home() {
  const [carsList, setCarsList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [make,setMake]=useState([]);
  const [model,setModel]=useState([]);
  const [year,setYear]=useState([]);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const [filteredCars, setFilteredCars] = useState(carsList);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    axios.get("/api/cars")
        .then(response => {
            console.log(response.data);
            setCarsList(response.data);
            setFilteredCars(response.data);
            const uniqueMakes = [...new Set(response.data.map(car => car.make))];
            const uniqueModels = [...new Set(response.data.map(car => car.model))];
            const uniqueYears = [...new Set(response.data.map(car => car.year))];
            setMake(uniqueMakes);
            setModel(uniqueModels);
            setYear(uniqueYears);
        })
        .catch(error => {
            console.error("Error fetching data:", error);
            setError("Failed to load car data.");
        })
        .finally(() => {
            setLoading(false);
        });
}, []);


useEffect(()=>{
  console.log("make--------->",make)
  console.log("model--------->",model)
  console.log("year--------->",year)
},[make,model,year])

const lastIndex = currentPage * itemsPerPage;
const firstIndex = lastIndex - itemsPerPage;
const currentCars = filteredCars.slice(firstIndex, lastIndex);

const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
};

const handleFilterApply = (filters) => {
let filteredData = carsList;
if (filters.make) {
  filteredData = filteredData.filter((car) => car.make === filters.make);
}
if (filters.model) {
  filteredData = filteredData.filter((car) => car.model === filters.model);
}
if (filters.year) {
  filteredData = filteredData.filter(
    (car) => car.year === parseInt(filters.year)
  );
}

if (filters.priceSort === "ascending") {
  filteredData = [...filteredData].sort((a, b) => a.price - b.price);
} else if (filters.priceSort === "descending") {
  filteredData = [...filteredData].sort((a, b) => b.price - a.price);
}

if (filters.dateSort === "ascending") {
  filteredData = [...filteredData].sort((a, b) => a.year - b.year);
} else if (filters.dateSort === "descending") {
  filteredData = [...filteredData].sort((a, b) => b.year - a.year);
}

setFilteredCars(filteredData);
setCurrentPage(1);
console.log("filteredData------------>",filteredData)
};
const handleSearch = () => {
    let searchResult = carsList.filter((car) =>
        car.model.toLowerCase().includes(searchQuery.toLowerCase()) ||
        car.year.toString().includes(searchQuery) ||
        car.color.toLowerCase().includes(searchQuery.toLowerCase()) ||
        car.price.toString().includes(searchQuery)
    );
    
    setFilteredCars(searchResult);
    setCurrentPage(1);
};
  return (
    <div className={styles.page}>
        <div className={styles.pagination_and_search_container}>
          <div className={styles.pagination_container}>
            {filteredCars.length > itemsPerPage && (
              <div className={styles.pagination}>
              {filteredCars.length > itemsPerPage && (
                                    <Pagination className="mt-3">
                                        {[...Array(Math.ceil(carsList.length / itemsPerPage))].map((_, index) => (
                                            <Pagination.Item
                                                key={index + 1}
                                                className={index + 1 === currentPage ? styles.paginationActive : styles.paginationItem}
                                                active={index + 1 === currentPage}
                                                onClick={() => handlePageChange(index + 1)}
                                            >
                                                {index + 1}
                                            </Pagination.Item>
                                        ))}
                                    </Pagination>
                                )}
              </div>
            )}
          </div>
          <div className={styles.search_container}>
            <InputGroup >
                <Form.Control
                    className='search_input'
                    size="sm"
                    placeholder="Model / Year / Color / Price"
                    aria-label="Search Model/Year/Color/Price"
                    aria-describedby="basic-addon2"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                />
                <Button variant="primary" id="button-addon2" size="sm" onClick={handleSearch}>
                    Search
                </Button>
            </InputGroup>
            <Filter make={make} model={model} year={year} onApplyFilter={handleFilterApply}/>
          </div>
        </div>
      <div className={styles.CarListContainer}>
                {loading && <p>Loading cars...</p>}
                {error && <p style={{ color: "red" }}>{error}</p>}
                
                {currentCars.length > 0 ? (
                    currentCars.map((car) => (
                        <Card key={car.id} image={car.image} title={car.make} model={car.model} carDetails={car} />
                    ))
                ) : (
                    !loading && !error && <p>No cars available.</p>
                )}

            </div>
    </div>
  );
}
