import {ProductLinks} from "../../../packages/Product/routes/ProductLinks";
import {UserLinks} from "../../../packages/User/routes/UserLinks";
import {CustomerLinks} from "../../../packages/Customer/routes/CustomerLinks";

const navConfig = [];
//dashboard links
navConfig.push(...ProductLinks)
navConfig.push(...UserLinks)
navConfig.push(...CustomerLinks)

export default navConfig;
