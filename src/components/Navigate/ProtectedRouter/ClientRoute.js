
import {Navigate} from 'react-router-dom';



const  ClientRoute = ({children}) => {
  const client = localStorage.getItem("client");
  if(!client){
    return <Navigate to = '/login' replace/>
  }
    return children;
};

export default ClientRoute;