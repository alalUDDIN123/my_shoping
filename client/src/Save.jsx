import { useEffect, useState } from "react";
import getData from "./redux/AppReducer/actions";
import style from "./App.module.css";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("");
  const [brands, setBrands] = useState([]);
  const [Categories, SetCategories] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [rating, setRating] = useState("")
  const [sort, setSort] = useState("");
  const [order, setOrder] = useState("");
  const [page, setPage] = useState(1);
  // const [limit, setLimit] = useState(10);
  // const [products, setProducts] = useState([]);

  const ratingOption = [5, 4, 3, 2, 4.5, 3.5, 2.5]
  const categoryOption = ["Electronics","accessories","clothing"]
  const brandOption = ["Apple","ideaPad","aldo","supcase","gopgan","adidas"]


  const setFiltersInUrl = () => {
    const params = new URLSearchParams();
    params.set("page", page);
    params.set("limit", 10);
    if (category) params.set("category", category);
    if (selectedBrands.length > 0)
      params.set("brand", selectedBrands.join(","));
    if (minPrice) params.set("minPrice", minPrice);
    if (maxPrice) params.set("maxPrice", maxPrice);
    if (sort) params.set("_sort", sort);
    if (order) params.set("_order", order);
    if (rating) params.set("ratings", rating);
    const url = `${window.location.pathname}?${params.toString()}`;
    window.history.pushState({}, "", url);
  };

  setFiltersInUrl()

  function VariousFilters() {
    const urlParams = new URLSearchParams(window.location.search);
    const page = urlParams.get('page');
    const limit = urlParams.get('limit');
    const category = urlParams.get('category');
    const brands = urlParams.get('brand');
    const minPrice = urlParams.get('minPrice');
    const maxPrice = urlParams.get('maxPrice');
    const sort = urlParams.get('_sort');
    const order = urlParams.get('_order');
    const rating = urlParams.get('ratings');

    return ({
      page: +page,
      limit: +limit,
      category: category,
      brands: brands,
      minPrice: +minPrice,
      maxPrice: +maxPrice,
      sort: sort,
      order: order,
      ratings: +rating
    });

  }


  useEffect(() => {
    const filters = VariousFilters();
    getData(filters)
      .then((res) => {
        if (res) {
          // console.log("component res::", res, "total::", res.length);
          const allBrands = res.map((product) => product.brand);
          const uniqueBrands = [...new Set(allBrands)];
          const allCategories = res.map((product) => product.category);
          const uniqueCategories = [...new Set(allCategories)];
          setBrands(uniqueBrands);
          SetCategories(uniqueCategories);
        }
      })
      .catch((err) => {
        alert(err);
      });
  }, [window.location.search]);




  const handleBrandChange = (event) => {
    const value = event.target.value;
    if (selectedBrands.includes(value)) {
      setSelectedBrands(selectedBrands.filter((brand) => brand !== value));
      console.log(setSelectedBrands(selectedBrands.filter((brand) => brand !== value)));
    } else {
      setSelectedBrands([...selectedBrands, value]);
    }
  };


  const brandClassName = () => {
    const className = brandOption && brandOption.length > 5 ? "_greater_five_brand" : "_five_brand";
    return className

  }

  return (
    <div className={style.App}>
      {/* search bar */}
      <form className={style._searchForm}>
        <input
          type="text"
          placeholder="Search product..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>

      {/* select category */}
      <div className={style._select_Category}>
        <label htmlFor="">Select Category</label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="" disabled>---Select Category---</option>
          {categoryOption.map((cate, index) => (
            <option key={index} value={cate}>
              {cate}
            </option>
          ))}
        </select>

      </div>

      {/* select brand */}
      <div className={brandClassName()}>

        <label htmlFor="">Select Brand</label>
        {brandOption.map((brand, index) => (
          <div key={index}>
            <input
              type="checkbox"
              id={brand}
              value={brand}
              onChange={handleBrandChange}
            />
            <label htmlFor={brand}>{brand}</label>
          </div>
        ))}
      </div>


      {/* price range */}
      <div className={style._price}>
        <label htmlFor="">Price Range</label>
        <div>
          <input
            type="number"
            placeholder="Min Price"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}


          />
          <input
            type="number"
            placeholder="Max Price"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
          />
        </div>
      </div>


      {/* select rating */}
      <div className={style._select_ratings}>
        <label htmlFor="">Choose ratings</label>
        <select
          value={rating}
          onChange={(e) => setRating(+e.target.value)}
        >
          <option value="" disabled>---Choose Rating---</option>
          {ratingOption.map((rate, index) => (
            <option key={index} value={rate}>
              {rate}
            </option>
          ))}
        </select>

      </div>

      {/* sort */}
      <div className={style._order}>
        <label htmlFor="">Sort by</label>
        <select value={sort} onChange={(e) => setSort(e.target.value)}>
          <option value="">---Sort---</option>
          <option value="price">Price</option>
          <option value="ratings">Ratings</option>
        </select>
        <select value={order} onChange={(e) => setOrder(e.target.value)}>
          <option value="" disabled>---Select Order---</option>
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </div>

      {/* pagination */}
      <div className={style._pagination}>
        <button onClick={() => setPage(page > 1 ? page - 1 : 1)}>Previous</button>
        <span>{page}</span>
        <button onClick={() => setPage(page + 1)}>Next</button>
      </div>


    </div>
  );
}

export default App;
