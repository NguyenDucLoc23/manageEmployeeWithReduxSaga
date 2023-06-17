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
} from "@material-ui/core";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";

import "../../../styles/views/_loadding.scss";
import clsx from "clsx";
import CircularProgress from "@material-ui/core/CircularProgress";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../../styles/views/_style.scss";
import { useEffect, useState} from "react";
import { useSelector, useDispatch } from "react-redux";

import { addProvince, updateProvince } from "app/redux/actions/ProvinceActions";

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

function ProvinceEditorDialog(props) {
  const [name, setName] = useState(props.item.name ? props.item.name : "");
  const [code, setCode] = useState(props.item.code ? props.item.code : "");
  const [area, setArea] = useState(props.item.area ? props.item.area : "");
  const [loading, setLoading] = useState(false);
  const [listProvince, setListProvince] = useState([]);

  const dispatch = useDispatch();
  useEffect(() => {
    setListProvince(props.list);
  }, []);

  const handleFormSubmit = () => {
    let object = {
      name: name,
      code: code,
      area: area,
      voided: false,
    };

    let listCode = [];
    listCode = listProvince.filter((item) => item.code === object.code);

    if (!props.item.id) {
      if (listCode.length > 0) {
        toast.warning("Trùng mã code của tỉnh khác");
      } else {
        dispatch(addProvince(object));
        toast.success("Thêm người dùng thành công");
        props.handleClose();
      }
    } else {
      let objectUpdate = {
        ...object,
        id: props.item.id,
      };
      dispatch(updateProvince(objectUpdate));
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
          {props.item.id ? "Chỉnh sửa thông tin tỉnh " : "Thêm mới tỉnh"}{" "}
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
                    {"Tên tỉnh"}
                  </span>
                }
                onChange={(event) => {
                  setName(event.target.value);
                }}
                type="text"
                name="name"
                value={name ? name : props.item.name}
                validators={["required"]}
                errorMessages={["Hãy nhập lại tỉnh"]}
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
                    {"Mã Tỉnh"}
                  </span>
                }
                onChange={(event) => {
                  setCode(event.target.value);
                }}
                type="text"
                name="code"
                value={code ? code : props.item.code}
                validators={["required"]}
                errorMessages={["Hãy nhập lại mã nhân viên"]}
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
                    {"Diện tích tỉnh"}
                  </span>
                }
                onChange={(event) => {
                  setArea(event.target.value);
                }}
                type="text"
                name="area"
                value={area ? area : props.item.area}
                validators={["required"]}
                errorMessages={["Hãy nhập lại diện tích tỉnh"]}
                variant="outlined"
                size="small"
              />
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

export default ProvinceEditorDialog;
