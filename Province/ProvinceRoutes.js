import { EgretLoadable } from "egret";
import ConstantList from "../../appConfig";
import { withTranslation } from 'react-i18next';
const Province = EgretLoadable({
  loader: () => import("./Province")
});
const ViewComponent = withTranslation()(Province);

const ProvinceRoutes = [
  {
    path:  ConstantList.ROOT_PATH+"province_manager/province",
    exact: true,
    component: ViewComponent
  }
];

export default ProvinceRoutes;
