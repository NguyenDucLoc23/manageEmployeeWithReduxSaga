import React, { Component } from "react";
import {
  Dialog,
  Button,
  Grid,
  DialogActions,
  DialogTitle,
  DialogContent,
  IconButton,
  Icon,
  MenuItem,
} from "@material-ui/core";
import {
  ValidatorForm,
  TextValidator,
  SelectValidator,
} from "react-material-ui-form-validator";

import "../../../styles/views/_loadding.scss";
import clsx from "clsx";
import CircularProgress from "@material-ui/core/CircularProgress";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../../styles/views/_style.scss";
import { useEffect, useState, } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addDistrict, updateDistrict } from "app/redux/actions/DistrictActions";
import { getProvinces } from "app/redux/actions/ProvinceActions";

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

function DistrictEditorDialog(props) {
  const [name, setName] = useState(props.item.name ? props.item.name : "");
  const [code, setCode] = useState(props.item.code ? props.item.code : "");
  const [area, setArea] = useState(props.item.area ? props.item.area : "");
  const [provinceId, setProvinceId] = useState(
    props.item.provinceId ? props.item.provinceId : ""
  );
  const [loading, setLoading] = useState(false);
  const [listDistrict, setListDistrict] = useState([]);

  const dispatch = useDispatch();
  const listProvince = useSelector((state) => state.province.provinces)
  useEffect(() => {
    setListDistrict(props.list);

    dispatch(getProvinces())
  }, []);

  const handleFormSubmit = () => {
    let object = {
      name: name,
      code: code,
      area: area,
      voided: false,
      provinceDto: {
        id: provinceId,
      },
    };

    let listCode = [];
    listCode = listDistrict.filter((item) => item.code === object.code);

    if (!props.item.id) {
      if (listCode.length > 0) {
        toast.warning("Trùng mã code của huyện khác");
      } else {
        dispatch(addDistrict(object));
        toast.success("Thêm người dùng thành công");
        props.handleClose();
      }
    } else {
      let objectUpdate = {
        ...object,
        id: props.item.id,
      };
      dispatch(updateDistrict(objectUpdate));
      toast.success("Cập nhật thông tin tỉnh thành công");
      props.handleClose();
    }
  };

  return (
    <Dialog open={props.open}>
      <div className={clsx("wrapperButton", !loading && "hidden")}>
        <CircularProgress className="buttonProgress" size={24} />
      </div>
      <DialogTitle style={{ cursor: "move" }} id="draggable-dialog-title">
        <span className="mb-20 styleColor">
          {" "}
          {props.item.id ? "Chỉnh sửa thông tin huyện " : "Thêm mới huyện"}{" "}
        </span>
        <IconButton
          style={{ position: "absolute", right: "10px", top: "10px" }}
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
            <Grid item lg={12} md={12} sm={12} xs={12}>
              <TextValidator
                className="w-100 mb-16"
                label={
                  <span className="font">
                    <span style={{ color: "red" }}> * </span>
                    {"Tên huyện"}
                  </span>
                }
                onChange={(event) => {
                  setName(event.target.value);
                }}
                type="text"
                name="name"
                value={name ? name : props.item.name}
                validators={["required"]}
                errorMessages={["Hãy nhập lại huyện"]}
                variant="outlined"
                size="small"
              />
            </Grid>

            <Grid item lg={12} md={12} sm={12} xs={12}>
              <TextValidator
                className="w-100 mb-16"
                label={
                  <span className="font">
                    <span style={{ color: "red" }}> * </span>
                    {"Mã Huyện"}
                  </span>
                }
                onChange={(event) => {
                  setCode(event.target.value);
                }}
                type="text"
                name="code"
                value={code ? code : props.item.code}
                validators={["required"]}
                errorMessages={["Hãy nhập lại mã huyện"]}
                variant="outlined"
                size="small"
              />
            </Grid>

            <Grid item lg={12} md={12} sm={12} xs={12}>
              <TextValidator
                className="w-100 mb-16"
                label={
                  <span className="font">
                    <span style={{ color: "red" }}> * </span>
                    {"Diện tích huyện"}
                  </span>
                }
                onChange={(event) => {
                  setArea(event.target.value);
                }}
                type="text"
                name="area"
                value={area ? area : props.item.area}
                validators={["required"]}
                errorMessages={["Hãy nhập lại diện tích huyện"]}
                variant="outlined"
                size="small"
              />
            </Grid>

            <Grid item lg={12} md={12} sm={12} xs={12}>
              <SelectValidator
                name="province"
                value={provinceId ? provinceId : props.item.provinceId}
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
                onChange={(event) => {
                  console.log(event.target);
                  setProvinceId(event.target.value);
                }}
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
          </Grid>
        </DialogContent>

        <DialogActions spacing={4} className="flex flex-end flex-middle">
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
    </Dialog>
  );
}

export default DistrictEditorDialog;
