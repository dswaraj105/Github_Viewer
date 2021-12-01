import { useState } from "react";

// Material UI imports
import Paper from "@mui/material/Paper";
import Divider from "@mui/material/Divider";


// My custion Components
import Header from "./header/Header";
import SearchInput from "./searchInput/SearchInput";
import cssClasses from "./search.module.css";
import Users from "./Users/Users";


// Made these local se that it's easy for you guys to run
// Else it would be in .env file
const client_id = "51d62b7141f20f79d97a";
const client_secret = "5c849a657c2bef881b43b99f6c7192f67c99f237";

const Search = () => {
  const [searchKey, setSearchKey] = useState("");   // to store the search key
  const [userList, setUserList] = useState([]);     // state for user list
  const [page, setPage] = useState(1);              // to track the next page to fetch

  const submitFormHandler = (e) => {
    e.preventDefault();

    // Checking if theres any key to search
    if(searchKey === ""){
      return;
    }

    //  making copy and reseting page no to 1
    let name = searchKey;
    setPage(1);

    // Fetching the detals
    fetch(
      "http://api.github.com/search/users?q=" +
        name +
        "&page=" +
        page +
        "&per_page="+
        8+
        "&client_id=" +
        client_id +
        "&client_secret=" +
        client_secret
    )
      .then((res) => res.json())
      .then((data) => {
        setUserList(data.items);

        console.log("page1");
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // Fetching the data for additional pages
  const fetchNewPage = () => {
    let name = searchKey;

    // finging next pageno to track
    const pageno = page + 1;
    console.log("Fetching More");

    // fetching data for next page
    fetch(
      "http://api.github.com/search/users?q=" +
        name +
        "&page=" +
        pageno +
        "&per_page="+
        4 +
        "&client_id=" +
        client_id +
        "&client_secret=" +
        client_secret
    )
      .then((res) => res.json())
      .then((data) => {

        const users = [...userList];
        for(let i=0; i<data.items.length; i++){
          users.push(data.items[i]);
        }
        setUserList(users);
      })
      .catch((err) => {
        console.log(err);
      });

      // updating page no
      setPage(pageno);
  }

  // 2-way binging handler for search key
  const searchKeyChangedHandler = (e) => {
    setSearchKey(e.target.value);
  };

  // clear searches
  const clearSearchBoxHandler = () => {
    setSearchKey("");
    setUserList([]);
  }

  return (
    <Paper elevation={3} className={cssClasses.Search}>
      <Header />
      <SearchInput
        formSubmit={submitFormHandler}
        searchkey={searchKey}
        changed={searchKeyChangedHandler}
        clear={clearSearchBoxHandler}
      />
      <Divider className={cssClasses.line} style={{ margin: "20px 0" }} />
      <Users list={userList} fetchMore={fetchNewPage} />
    </Paper>
  );
};

export default Search;
