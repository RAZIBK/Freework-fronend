
import {Navigate} from 'react-router-dom';

const  UserRoute = ({children}) => {
  const user = localStorage.getItem("Token");
  if(!user){
    return <Navigate to = '/login' replace/>
  }
    return children;
};

export default UserRoute;