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
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addCertificate } from "app/redux/actions/CertificateActions";
import { getProvince } from "./EmployeeService";

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

function CertificateEditorDialog(props) {
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [effectiveDate, setEffectiveDate] = useState("");
  const [expirationDate, setExpirationDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [provinceId, setProvinceId] = useState("");
  const [listProvince, setListProvince] = useState([]);
  const listCertificate = props.listCertificate;

  const dispatch = useDispatch();

  useEffect(() => {
    getProvince({}).then((res) => {
      setListProvince(res.data.data);
    });
  }, []);

  const handleFormSubmit = () => {
    let object = {
      name: name,
      code: code,
      effectiveDate: effectiveDate,
      expirationDate: expirationDate,
      provinceId: provinceId,
    };

    let listCode = listCertificate.filter((item) => item.code === object.code);

    if (listCode.length === 0) {
      props.addCertificate(object);
      toast.success("Thêm chứng chỉ thành công");
      props.handleClose();
    } else {
      toast.warning("Code trùng với chứng chỉ khác");
    }
  };

  return (
    <Dialog open={props.open} maxWidth={"md"} fullWidth={true}>
      <div className={clsx("wrapperButton", !loading && "hidden")}>
        <CircularProgress className="buttonProgress" size={24} />
      </div>
      <DialogTitle style={{ cursor: "move" }} id="draggable-dialog-title">
        <span className="mb-20 styleColor"> {"Thêm mới chứng chỉ"} </span>
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
            <Grid item lg={4} md={6} sm={12} xs={12}>
              <TextValidator
                className="w-100 mb-16"
                label={
                  <span className="font">
                    <span style={{ color: "red" }}> * </span>
                    {"Tên chứng chỉ"}
                  </span>
                }
                onChange={(event) => {
                  setName(event.target.value);
                }}
                type="text"
                name="name"
                value={name}
                validators={["required"]}
                errorMessages={["Hãy nhập lại tên"]}
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
                    {"Mã chứng chỉ"}
                  </span>
                }
                onChange={(event) => {
                  setCode(event.target.value);
                }}
                type="text"
                name="code"
                value={code}
                validators={["required"]}
                errorMessages={["Hãy nhập lại mã chứng chỉ"]}
                variant="outlined"
                size="small"
              />
            </Grid>

            <Grid item lg={4} md={6} sm={12} xs={12}>
              <SelectValidator
                className="mb-16"
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
                onChange={(event) => {
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

            <Grid item lg={6} md={6} sm={12} xs={12}>
              <TextValidator
                className="w-100 mb-16"
                label={
                  <span className="font">
                    <span style={{ color: "red" }}> * </span>
                    {"Ngày cấp chứng chỉ"}
                  </span>
                }
                onChange={(event) => {
                  setEffectiveDate(event.target.value);
                }}
                type="date"
                name="effectiveDate"
                value={effectiveDate}
                validators={["required"]}
                errorMessages={["Hãy nhập lại ngày cấp"]}
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
                    {"Ngày chứng chỉ hết hạn"}
                  </span>
                }
                onChange={(event) => {
                  setExpirationDate(event.target.value);
                }}
                type="date"
                name="expirationDate"
                value={expirationDate}
                validators={["required"]}
                errorMessages={["Hãy nhập lại ngày hết hạn"]}
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

export default CertificateEditorDialog;
