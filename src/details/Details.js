import { useEffect, useMemo, useState } from "react";
import { useParams, useHistory } from "react-router-dom";

// material ui imports
import { Divider, Paper } from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";

// custom components
import Profile from "./Profile/Profile";
import Section from "./section/Section";
import Repos from "./Repos/Repos";
import cssClasses from "./details.module.css";

// Made these local se that it's easy for you guys to run
// Else it would be in .env file
const client_id = "51d62b7141f20f79d97a";
const client_secret = "5c849a657c2bef881b43b99f6c7192f67c99f237";

const Details = () => {
  const params = useParams();
  const history = useHistory();
  const [user, setUser] = useState({});         // state for user data
  const [repos, setRepos] = useState([]);       // state for user repos

  const login = params.login;

  const loginM = useMemo(() => login, [login]);

  // fetching user data
  useEffect(() => {
    fetch(
      "https://api.github.com/users/" +
        loginM +
        "?&client_id=" +
        client_id +
        "&client_secret=" +
        client_secret
    )
      .then((res) => res.json())
      .then((data) => {
        setUser(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [loginM]);

    // fetching user repos
  useEffect(() => {
    fetch(
      "https://api.github.com/users/" +
        loginM +
        "/repos" +
        "?sort=updated" +
        "&client_id=" +
        client_id +
        "&client_secret=" +
        client_secret
    )
      .then((res) => res.json())
      .then((data) => {
        setRepos(data);
      });
  }, [loginM]);

  // Taking user back to search page
  const backClickHandler = () => {
    history.replace("/");
  };

  return (
    <Paper className={cssClasses.Details}>
      <div className={cssClasses.top}>
        <ArrowBackIosNewIcon
          onClick={backClickHandler}
          className={cssClasses.backarrow}
        />
      </div>
      <Profile
        avatar_url={user.avatar_url}
        name={user.name}
        login={user.login}
      />
      <Divider />
      <div>
        <Section title="Bio" desc={user.bio} />
        <Section title="Works at" desc={user.company} />
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Section title="Repositories" desc={user.public_repos} />
          <Section title="Followers" desc={user.followers} />
        </div>
        <p style={{marginLeft: '10px', fontSize: "1.2rem"}}>Pinned Repositories</p>
      </div>
      <Repos list={repos.length > 0 ? repos.slice(0, 6) : []} />
    </Paper>
  );
};

export default Details;
