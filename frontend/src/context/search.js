import { useState, useContext, createContext } from "react";

const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
    const [auth, setAuth] = useState({
        keyword: "",
        results: [],
    });

    return (
        <SearchContext.Provider value={[auth, setAuth]}>
            {children}
        </SearchContext.Provider>
    );
};

// custom hook
export const useSearch = () => {
      return useContext(SearchContext);
  }

// export { useSearch, SearchProvider };