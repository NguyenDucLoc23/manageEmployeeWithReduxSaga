import React, { Component } from "react";
import {
  Dialog,
  Button,
  Grid,
  MenuItem,
  DialogActions,
  DialogTitle,
  DialogContent,
  IconButton,
  Icon,
} from "@material-ui/core";
import {
  ValidatorForm,
  TextValidator,
  SelectValidator,
} from "react-material-ui-form-validator";
import { deleteCertificateEmployee } from "./EmployeeService";
import "../../../styles/views/_loadding.scss";
import MaterialTable, { MTableToolbar } from "material-table";
import clsx from "clsx";
import CircularProgress from "@material-ui/core/CircularProgress";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../../styles/views/_style.scss";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addEmployee, updateEmployee } from "app/redux/actions/EmployeeAction";
import { getProvinces } from "app/redux/actions/ProvinceActions";
import { getDistrictsByProvinces } from "app/redux/actions/DistrictActions";
import { getWardsByDistricts } from "app/redux/actions/WardActions";
import CertificateEditorDialog from "./Certificate";

toast.configure({
  autoClose: 1000,
  draggable: false,
  limit: 3,
});
function MaterialButton(props) {
  const item = props.item;
  return (
    <div>
      <IconButton onClick={() => props.onSelect(item, 1)}>
        <Icon color="error">delete</Icon>
      </IconButton>
    </div>
  );
}

function EmployeeEditorDialog(props) {
  const [name, setName] = useState(props.item.name ? props.item.name : "");
  const [email, setEmail] = useState(props.item.email ? props.item.email : "");
  const [phone, setPhone] = useState(props.item.phone ? props.item.phone : "");
  const [code, setCode] = useState(props.item.code ? props.item.code : "");
  const [age, setAge] = useState(props.item.age ? props.item.age : "");
  const [certificates, setCerticates] = useState(
    props.item.certificates ? props.item.certificates : []
  );
  const [certificateId, setCertificateId] = useState("");
  const [loading, setLoading] = useState(false);
  const [provinceId, setProvinceId] = useState(
    props.item.provinceId ? props.item.provinceId : ""
  );
  const [districtId, setDistrictId] = useState(
    props.item.districtId ? props.item.districtId : ""
  );
  const [wardsId, setWardsId] = useState(
    props.item.wardsId ? props.item.wardsId : ""
  );

  const [listEmployee, setListEmployee] = useState([]);
  const [cerOfEmployee, setCerOfEmployee] = useState([]);
  const [reload, setReload] = useState(false);
  const [openAddCertificate, setOpenAddCertificate] = useState(false);

  const dispatch = useDispatch();
  // const listCertificateOfEmployee = useSelector((state) => state.certificate.certificates)
  const listProvince = useSelector((state) => state.province.provinces);
  const listDistrict = useSelector((state) => state.district.districts);
  const listWard = useSelector((state) => state.ward.wards);
  const [itemCertificate, setItemCertificate] = useState({});

  useEffect(() => {
    setListEmployee(props.list);

    dispatch(getProvinces());
    if (props.item.provinceId) {
      handleGetDistrict(props.item.provinceId);
    }
    if (props.item.districtId) {
      handleGetWard(props.item.districtId);
    }
  }, []);

  const handleChangePosition = (event, status) => {
    if (status === "province") {
      setProvinceId(event?.target?.value);
      setDistrictId("");
      setWardsId("");
      handleGetDistrict(event.target.value);
    }

    if (status === "district") {
      setDistrictId(event?.target?.value);
      setWardsId("");
      handleGetWard(event.target.value);
    }

    if (status === "ward") {
      setWardsId(event?.target?.value);
    }
  };

  const handleGetDistrict = (item) => {
    dispatch(getDistrictsByProvinces(item));
  };

  const handleGetWard = (item) => {
    dispatch(getWardsByDistricts(item));
  };

  const handleOpenAddCertificateEmployee = () => {
    setOpenAddCertificate(true);
    setItemCertificate({});
  };

  const handleAddCertificate = (data) => {
    setCerticates([...certificates, data]);
  };

  const columns = [
    {
      title: "Thao tác",
      field: "custom",
      width: "150",
      render: (rowData) => (
        <MaterialButton
          item={rowData}
          onSelect={async (rowData, method) => {
            if (method === 1) {
              let arrNew = certificates.filter(
                (item) => item.code !== rowData.code
              );
              setCerticates(arrNew);
              toast.success("Xóa chứng chỉ thành công");
            } else if (method === 0) {
              console.log("0");
            } else throw new Error(`Invalid method ${method}`);
          }}
        />
      ),
    },
    { title: "Tên chứng chỉ", field: "name", width: "150" },
    { title: "Mã chứng chỉ", field: "code", width: "150" },
    {
      title: "Nơi cấp",
      field: "provinceId",
      width: "150",
      render: (rowData) => (
        <div>
          {rowData.provinceId
            ? listProvince.find((value) => value.id === rowData.provinceId)
                ?.name
            : ""}
        </div>
      ),
    },
    { title: "Ngày hiệu lực", field: "effectiveDate", width: "150" },
    { title: "Ngày hết hạn", field: "expirationDate", width: "150" },
  ];

  const handleFormSubmit = () => {
    let object = {
      name: name,
      phone: phone,
      email: email,
      code: code,
      age: age,
      provinceId: provinceId,
      districtId: districtId,
      wardsId: wardsId,
      voided: false,
      certificates: certificates,
    };

    let listCode = [];
    listCode = listEmployee.filter((item) => item.code === object.code);

    if (!props.item.id) {
      if (listCode.length > 0) {
        toast.warning("Trùng mã code của nhân viên khác");
      } else {
        dispatch(addEmployee(object));
        toast.success("Thêm người dùng thành công");
        props.handleClose();
        //Đã gọi api get trong saga nên không cần dùng props.update
      }
    } else {
      let objectUpdate = {
        ...object,
        id: props.item.id,
      };

      dispatch(updateEmployee(objectUpdate));
      toast.success("Cập nhật thông tin người dùng thành công");
      props.handleClose();
      //Đã gọi api get trong saga nên không cần dùng props.update
    }
  };

  return (
    <Dialog open={props.open} fullWidth={true} maxWidth={"md"}>
      <div className={clsx("wrapperButton", !loading && "hidden")}>
        <CircularProgress className="buttonProgress" size={24} />
      </div>
      <DialogTitle
        style={{ cursor: "move", padding: "6px 12px" }}
        id="draggable-dialog-title"
      >
        <span className="mb-20 styleColor">
          {" "}
          {props.item.id
            ? "Chỉnh sửa thông tin nhân viên "
            : "Thêm mới nhân viên"}{" "}
        </span>
        <IconButton
          style={{ position: "absolute", right: "10px" }}
          onClick={() => props.handleClose()}
        >
          <Icon color="error" title={"close"}>
            close
          </Icon>
        </IconButton>
      </DialogTitle>
      <ValidatorForm
        // ref={refForm}
        onSubmit={handleFormSubmit}
        style={{
          overflowY: "auto",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <DialogContent dividers>
          <Grid className="mb-16" container spacing={1}>
            <Grid item lg={4} md={6} sm={12} xs={12}>
              <TextValidator
                className="w-100 mb-16"
                label={
                  <span className="font">
                    <span style={{ color: "red" }}> * </span>
                    {"Họ tên nhân viên"}
                  </span>
                }
                onChange={(event) => {
                  setName(event.target.value);
                }}
                type="text"
                name="name"
                value={name}
                validators={["required"]}
                errorMessages={["Hãy nhập lại họ tên"]}
                variant="outlined"
                size="small"
              />
            </Grid>

            <Grid item lg={4} md={6} sm={12} xs={12}>
              <TextValidator
                className="w-100 mb-16"
                label={
                  <span className="font">
                    <span style={{ color: "red" }}> * </span>
                    {"Mã Nhân viên"}
                  </span>
                }
                onChange={(event) => {
                  setCode(event.target.value);
                }}
                type="text"
                name="code"
                value={code}
                validators={["required", "matchRegexp:^\\S{6,10}$"]}
                errorMessages={[
                  "Hãy nhập lại mã nhân viên",
                  "Mã code phải có 6 đến 10 ký tự",
                ]}
                variant="outlined"
                size="small"
              />
            </Grid>

            <Grid item lg={4} md={6} sm={12} xs={12}>
              <TextValidator
                className="w-100 mb-16"
                label={
                  <span className="font">
                    <span style={{ color: "red" }}> * </span>
                    {"Email"}
                  </span>
                }
                onChange={(event) => {
                  setEmail(event.target.value);
                }}
                type="email"
                name="email"
                value={email}
                validators={["required", "isEmail"]}
                errorMessages={[
                  "Hãy nhập lại email",
                  "Hãy nhập đúng định dạng email",
                ]}
                variant="outlined"
                size="small"
              />
            </Grid>

            <Grid item lg={6} md={6} sm={12} xs={12}>
              <TextValidator
                className="w-100 mb-16"
                label={
                  <span className="font">
                    <span style={{ color: "red" }}> * </span>
                    {"Số điện thoại"}
                  </span>
                }
                onChange={(event) => {
                  setPhone(event.target.value);
                }}
                type="text"
                name="phone"
                value={phone}
                validators={[
                  "required",
                  "isNumber",
                  "matchRegexp:^([0]{1}[0-9]{9})?$",
                ]}
                errorMessages={[
                  "Hãy nhập lại số điện thoại",
                  "Yêu cầu nhập số",
                  "Số điện thoại phải có ít 10 chữ số và số 0 ở đầu",
                ]}
                variant="outlined"
                size="small"
              />
            </Grid>

            <Grid item lg={6} md={6} sm={12} xs={12}>
              <TextValidator
                className="w-100 mb-16"
                label={
                  <span className="font">
                    <span style={{ color: "red" }}> * </span>
                    {"Tuổi"}
                  </span>
                }
                onChange={(event) => {
                  setAge(event.target.value);
                }}
                type="text"
                name="age"
                value={age}
                validators={[
                  "required",
                  "isNumber",
                  "matchRegexp:^([0-9]{1}[0-9]{1})?$",
                ]}
                errorMessages={[
                  "Hãy nhập tuổi",
                  "Yêu cầu nhập số",
                  "Số tuổi không hợp lệ !!!",
                ]}
                variant="outlined"
                size="small"
              />
            </Grid>

            <Grid item lg={4} md={6} sm={12} xs={12}>
              <SelectValidator
                name="province"
                value={provinceId}
                fullWidth={true}
                variant="outlined"
                size="small"
                validators={["required"]}
                errorMessages={["Chưa chọn Tỉnh/Thành phố"]}
                label={
                  <span className="font">
                    <span style={{ color: "red" }}> * </span>
                    {"Tỉnh/Thành phố"}
                  </span>
                }
                onChange={(event) => handleChangePosition(event, "province")}
              >
                {listProvince.map((item) => {
                  return (
                    <MenuItem key={item.id} value={item.id}>
                      {item.name}
                    </MenuItem>
                  );
                })}
              </SelectValidator>
            </Grid>

            <Grid item lg={4} md={6} sm={12} xs={12}>
              <SelectValidator
                name="district"
                value={districtId}
                fullWidth={true}
                variant="outlined"
                size="small"
                validators={["required"]}
                errorMessages={["Chưa chọn Quận/Huyện"]}
                label={
                  <span className="font">
                    <span style={{ color: "red" }}> * </span>
                    {"Quận/Huyện"}
                  </span>
                }
                onChange={(event) => handleChangePosition(event, "district")}
              >
                {listDistrict.map((item) => {
                  return (
                    <MenuItem key={item.id} value={item.id}>
                      {item.name}
                    </MenuItem>
                  );
                })}
              </SelectValidator>
            </Grid>

            <Grid item lg={4} md={6} sm={12} xs={12}>
              <SelectValidator
                name="ward"
                value={wardsId}
                fullWidth={true}
                variant="outlined"
                size="small"
                validators={["required"]}
                errorMessages={["Chưa chọn Phường/Xã"]}
                label={
                  <span className="font">
                    <span style={{ color: "red" }}> * </span>
                    {"Phường/Xã"}
                  </span>
                }
                onChange={(event) => handleChangePosition(event, "ward")}
              >
                {listWard.map((item) => {
                  return (
                    <MenuItem key={item.id} value={item.id}>
                      {item.name}
                    </MenuItem>
                  );
                })}
              </SelectValidator>
            </Grid>

            <Grid item lg={6} md={6} sm={12} xs={12}>
              <Button
                className="mt-16"
                variant="contained"
                color="primary"
                onClick={() => {
                  handleOpenAddCertificateEmployee();
                }}
              >
                {"Thêm chứng chỉ"}
              </Button>
            </Grid>
          </Grid>
        </DialogContent>

        <Grid item xs={12}>
          <MaterialTable
            style={{ padding: "6px 12px" }}
            title="Danh sách chứng chỉ"
            columns={columns}
            data={certificates}
            options={{
              search: false,
              sorting: true,
              paging: false,
              filtering: false,
              toolbar: false,
              header: true,
              headerStyle: {
                backgroundColor: "#358600",
                color: "#fff",
              },
              padding: "dense",
              maxBodyHeight: "200px",
              minBodyHeight: "200px",
            }}
            localization={{
              body: {
                emptyDataSourceMessage: "Không có dữ liệu",
              },
            }}
            components={{
              Toolbar: (props) => <MTableToolbar {...props} />,
            }}
          />
        </Grid>

        <DialogActions
          spacing={4}
          className="flex flex-end flex-middle"
          style={{ padding: "6px 21px" }}
        >
          <Button
            variant="contained"
            color="secondary"
            onClick={() => props.handleClose()}
          >
            {"Đóng"}
          </Button>
          <Button
            variant="contained"
            color="primary"
            type="submit"
            disabled={loading}
          >
            {"Lưu"}
          </Button>
        </DialogActions>
      </ValidatorForm>

      {openAddCertificate && (
        <CertificateEditorDialog
          handleClose={() => setOpenAddCertificate(false)}
          open={openAddCertificate}
          item={itemCertificate}
          addCertificate={handleAddCertificate}
          listCertificate={certificates}
        />
      )}
    </Dialog>
  );
}

export default EmployeeEditorDialog;
