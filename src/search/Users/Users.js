import { Button } from "@mui/material";
import User from "./User/User";

import cssClasses from "./Users.module.css";

const Users = (props) => {
 

  // console.log(props.list);

  // Creating a list / map for displaying
  const displayUserList = props.list.map((user, i) => {
    console.log("Displaying more users");
    return (
      <User
        name={user.name}
        bio={user.bio}
        handle={user.login}
        url={user.url}
        key={i}
      />
    );
  });

  return (
    <div className={cssClasses.Users}>
      {displayUserList}
      {props.list.length > 5 && (
        <Button
          variant="outlined"
          style={{ marginLeft: '44%' }}
          onClick={props.fetchMore}
        >
          More
        </Button>
      )}
    </div>
  );
  // return <User />
};

export default Users;
