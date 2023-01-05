import {useRoutes} from 'react-router-dom';
import {AuthRoutes} from "../packages/Auth/routes/AuthRoutes";
import {ProductRoutes} from "../packages/Product/routes/ProductRoutes";
import {UserRoutes} from "../packages/User/routes/UserRoutes";
import {CustomerRoutes} from "../packages/Customer/routes/CustomerRoutes";

let systemRoutes=[];
//dashboard routes
systemRoutes.push(...ProductRoutes)
//auth routes
systemRoutes.push(...AuthRoutes)
//
systemRoutes.push(...UserRoutes)
systemRoutes.push(...CustomerRoutes)
export default function Router() {
  
  return useRoutes(systemRoutes);
}
