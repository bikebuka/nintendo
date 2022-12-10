import {useRoutes} from 'react-router-dom';
import {AuthRoutes} from "../packages/Auth/routes/AuthRoutes";
import {ProductRoutes} from "../packages/Product/routes/ProductRoutes";

let systemRoutes=[];
//dashboard routes
systemRoutes.push(...ProductRoutes)
//auth routes
systemRoutes.push(...AuthRoutes)
//
export default function Router() {
  
  return useRoutes(systemRoutes);
}
