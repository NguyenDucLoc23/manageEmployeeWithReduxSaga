import React, { Component } from "react";
import {
  Button,
  Grid,
  InputAdornment,
  IconButton,
  Input,
  Icon,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import SearchIcon from "@material-ui/icons/Search";
import CloseIcon from "@material-ui/icons/Close";
import MaterialTable, { MTableToolbar } from "material-table";
import WardEditorDialog from "./WardEditorDialog";
import { Breadcrumb, ConfirmationDialog } from "egret";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector, useDispatch } from "react-redux";
import { getAllListEmployee } from "./WardService";
import {
  getWards,
  searchWards,
  deleteWard,
} from "app/redux/actions/WardActions";

function MaterialButton(props) {
  const item = props.item;
  return (
    <div>
      <IconButton size="small" onClick={() => props.onSelect(item, 0)}>
        <Icon fontSize="small" color="primary">
          edit
        </Icon>
      </IconButton>
      <IconButton onClick={() => props.onSelect(item, 1)}>
        <Icon color="error">delete</Icon>
      </IconButton>
    </div>
  );
}

toast.configure({
  autoClose: 2000,
  draggable: false,
  limit: 3,
});

function District() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getWards());

    getAllListEmployee().then((res) => {
      setListEmployee(res?.data?.data);
    });
  }, []);

  const listWards = useSelector((state) => state.ward.wards);

  const [shouldOpenConfirmationDialog, setShouldOpenConfirmationDialog] =
    useState(false);
  const [shouldOpenEditorDialog, setShouldOpenEditorDialog] = useState(false);
  const [item, setItem] = useState({});
  const [keyword, setKeyword] = useState("");
  const [deleteId, setDeleteId] = useState(null);
  const [listEmployee, setListEmployee] = useState([]);

  const columns = [
    {
      title: "Action",
      field: "custom",
      align: "left",
      width: "250",
      render: (rowData) => (
        <MaterialButton
          item={rowData}
          onSelect={(rowData, method) => {
            if (method === 1) {
              openConfirmDelDialog(rowData.id);
              setShouldOpenConfirmationDialog(true);
            } else if (method === 0) {
                setItem(rowData);
                setShouldOpenEditorDialog(true);
            } else throw new Error(`Invalid method ${method}`);
          }}
        />
      ),
    },
    { title: "Tên xã", field: "name", width: "150" },
    { title: "Mã xã", field: "code", width: "150" },
  ];

  const updateListWard = async () => {
    dispatch(getWards());
  };

  const handleDelete = () => {
    let check = listEmployee.filter(item => item.wardsId === deleteId)
    if(check.length === 0)
    {
      dispatch(deleteWard(deleteId));
      closeConfirmDelDialog();
      toast.success("Xóa thành công");
    } else 
    {
      toast.warning("Có nhân viên đang sử dụng xã này không được xóa");
    }
  };

  const openConfirmDelDialog = (id) => {
    setDeleteId(id);
    setShouldOpenConfirmationDialog(true);
  };

  const closeConfirmDelDialog = () => {
    setShouldOpenConfirmationDialog(false);
  };

  const search = (keyword) => {
    dispatch(searchWards(keyword));
  };

  const closeSearch = () => {
    setKeyword("");
    updateListWard();
  };

  const handleEditItem = () => {
    setItem({});
    setShouldOpenEditorDialog(true);
  };

  return (
    <div className="staff m-sm-30">
      <div className="mb-sm-30">
        <Breadcrumb
          routeSegments={[
            { name: "Quản lý nhân viên L2", path: "/" },
            { name: "Quản lý xã" },
          ]}
        />
      </div>

      <Grid container spacing={3}>
        <Grid item lg={9} md={5} sm={5} xs={12}>
          {/* Button thêm mới */}
          <Button
            className="mb-16 mr-16 align-bottom"
            variant="contained"
            color="primary"
            onClick={() => {
              handleEditItem();
            }}
          >
            {"Thêm mới"}
          </Button>
        </Grid>

        {/* Thanh tìm kiếm */}
        <Grid item lg={3} md={7} sm={7} xs={12}>
          <Input
            label={"EnterSearch"}
            type="text"
            name="keyword"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            className="w-100 mb-16 mr-10 stylePlaceholder"
            id="search_box"
            placeholder={"Nhập từ khóa tìm kiếm"}
            startAdornment={
              <InputAdornment>
                <Link to="#">
                  <SearchIcon
                    onClick={() => search(keyword)}
                    style={{
                      position: "absolute",
                      top: "0",
                      right: "25",
                    }}
                  />
                </Link>
                <Link to="#">
                  <CloseIcon
                    onClick={() => closeSearch()}
                    style={{
                      position: "absolute",
                      top: "0",
                      right: "0",
                    }}
                  />
                </Link>
              </InputAdornment>
            }
          />
        </Grid>
      </Grid>

      <Grid item xs={12}>
        <MaterialTable
          columns={columns}
          data={listWards}
          options={{
            search: false,
            sorting: true,
            paging: true,
            pageSize: 10,
            pageSizeOptions: [1,2,3,5, 10, 15, 25, 50],
            filtering: false,
            toolbar: false,
            header: true,
            headerStyle: {
              backgroundColor: "#358600",
              color: "#fff",
            },
            padding: "dense",
            
          }}
          localization={{
            body: {
              emptyDataSourceMessage: "Không có dữ liệu",
            },
            pagination: {
              labelDisplayedRows: "{from}-{to} của {count}",
              labelRowsPerPage: "Số hàng mỗi trang:",
              firstTooltip: "Trang đầu",
              previousTooltip: "Trang trước",
              nextTooltip: "Trang sau",
              lastTooltip: "Trang cuối",
              labelRowsSelect: "bản ghi",
            },
          }}
          components={{
            Toolbar: (props) => <MTableToolbar {...props} />,
          }}
        />
      </Grid>
      {shouldOpenConfirmationDialog && (
        <ConfirmationDialog
          title={"Xóa xã"}
          open={shouldOpenConfirmationDialog}
          onConfirmDialogClose={closeConfirmDelDialog}
          onYesClick={handleDelete}
          text={"Bạn có muốn xóa xã này không?"}
          Yes={"Đồng ý"}
          No={"Từ chối"}
        />
      )}

      {shouldOpenEditorDialog && (
        <WardEditorDialog
          handleClose={() => setShouldOpenEditorDialog(false)}
          open={shouldOpenEditorDialog}
          item={item}
          update={updateListWard}
          list={listWards}
        />
      )}
    </div>
  );
}

export default District;
