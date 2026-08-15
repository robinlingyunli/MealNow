import React from "react";
import { topMeels } from "../../../Data/topMeels";
import { PAGE_PADDING_X, PAGE_MAX_WIDTH } from "../../../constants/layout";

const CATEGORY_SPLIT_THRESHOLD = 5;

const Footer = ({ onCategoryClick }) => {
  const useTwoColumns = topMeels.length > CATEGORY_SPLIT_THRESHOLD;
  const rows = useTwoColumns
    ? Math.ceil(topMeels.length / 2)
    : topMeels.length;

  return (
    <footer className="border-t border-gray-200 bg-white">
      <div
        className={`${PAGE_MAX_WIDTH} ${PAGE_PADDING_X} py-14 h-auto md:h-80 grid grid-cols-1 md:grid-cols-3 gap-10`}
      >
        <div>
          <h3 className="text-xl font-bold text-gray-900">Meal Now</h3>
          <p className="mt-4 text-sm text-gray-500 max-w-xs">
            Order from your favorite restaurants and get fresh food delivered
            right to your door — fast, easy, and all in one place.
          </p>
        </div>

        <div className="overflow-hidden">
          <h4 className="text-base font-bold text-gray-900">Categories</h4>
          <ul
            className="mt-4 gap-x-8 gap-y-3"
            style={
              useTwoColumns
                ? {
                    display: "grid",
                    gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
                    gridTemplateRows: `repeat(${rows}, auto)`,
                    gridAutoFlow: "column",
                  }
                : { display: "grid" }
            }
          >
            {topMeels.map((item) => (
              <li key={item.title}>
                <button
                  onClick={() => onCategoryClick?.(item.title)}
                  className="text-sm text-gray-600 hover:text-[#e91e63] hover:underline"
                >
                  {item.title}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-base font-bold text-gray-900">Stay Updated</h4>
          <p className="mt-4 text-sm text-gray-500">
            Subscribe to get updates on new restaurants and exclusive offers.
          </p>
          <form
            onSubmit={(e) => e.preventDefault()}
            className="mt-4 space-y-3"
          >
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:border-gray-400"
            />
            <button
              type="submit"
              className="w-full bg-gray-900 text-white text-sm font-semibold rounded-md py-2.5 hover:bg-gray-800"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
