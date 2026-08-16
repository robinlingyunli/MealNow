import React, { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { topMeels } from "../../../Data/topMeels";
import { PopularCuisines } from "./PopularCuisines";
import SearchDishCard from "./SearchDishCard";
import { useDispatch, useSelector } from "react-redux";
import { searchMenuItem, searchMenuItemByCuisine } from "../../../State/Customers/Menu/menu.action";

const dish = [1, 1, 1, 1];
const Search = () => {
  const dispatch = useDispatch();
  const { menu,auth } = useSelector((store) => store);
  const jwt=localStorage.getItem("jwt")
  const [keyword, setKeyword] = useState("");
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearchMenu = (value) => {
    setKeyword(value);
    setHasSearched(true);
    dispatch(searchMenuItem({keyword: value, jwt:auth.jwt || jwt }));
  };

  const handleCuisineClick = (title) => {
    setHasSearched(true);
    dispatch(searchMenuItemByCuisine({cuisineType: title, jwt:auth.jwt || jwt }));
  };

  return (
    <div className="px-5 lg:px-[18vw]">
      <div className="relative py-5">
        <SearchIcon className="absolute top-[2rem] left-2" />
        <input
          value={keyword}
          onChange={(e) => handleSearchMenu(e.target.value)}
          className="p-2 py-3 pl-12 w-full bg-[#F6F6F6] text-gray-900 placeholder-gray-400 rounded-full outline-none border border-gray-300 focus:border-gray-400"
          type="text"
          placeholder="search food..."
        />
      </div>
      <div>
        <h1 className="py-5 text-2xl font-semibold">Popular Cuisines</h1>
        <div className="flex flex-wrap ">
          {topMeels.slice(0, 9).map((item) => (
            <PopularCuisines image={item.image} title={item.title} onClick={handleCuisineClick} />
          ))}
        </div>
      </div>
      <div className=" mt-7">
        {hasSearched && !menu.loading && menu.search.length === 0 ? (
          <p className="text-center text-gray-500 py-10">
            No dishes found.
          </p>
        ) : (
          menu.search.map((item) => (
            <SearchDishCard key={item.id} item={item} />
          ))
        )}
      </div>
    </div>
  );
};

export default Search;
