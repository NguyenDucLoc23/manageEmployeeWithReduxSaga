import { EgretLoadable } from "egret";
import ConstantList from "../../appConfig";
import {withTranslation} from 'react-i18next';
const District = EgretLoadable({
  loader: () => import("./District")
});
const ViewComponent = withTranslation()(District);

const DistrictRoutes = [
  {
    path:  ConstantList.ROOT_PATH+"district_manager/district",
    exact: true,
    component: ViewComponent
  }
];

export default DistrictRoutes;
