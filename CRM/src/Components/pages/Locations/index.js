import React, { Component } from "react";
import Layout from "../../core/Layout";
import ReactDatatable from "@ashvin27/react-datatable";
import moment from "moment";
import Swal from "sweetalert2";
import {
  getAllLocations,
  removeLocation
} from "../../../Utils/Requests/Location";
import Loading from "../../core/Loading";

class Locations extends Component {
  constructor(props) {
    super(props);

    this.columns = [
      {
        key: "sn",
        text: "S.N",
        className: "id",
        align: "left",
        sortable: true
      },
      {
        key: "name",
        text: "Tên",
        className: "name",
        align: "left",
        sortable: true
      },
      {
        key: "district",
        text: "Thành phố/huyện",
        className: "name",
        align: "left",
        sortable: true
      },
      {
        key: "action",
        text: "Action",
        className: "action",
        width: 100,
        align: "left",
        sortable: false,
        cell: record => {
          return (
            <>
              <button
                data-toggle="modal"
                data-target="#update-user-modal"
                className="btn btn-primary btn-sm"
                onClick={() =>
                  this.props.history.push(`/edit-location/${record._id}`)
                }
                style={{ marginRight: "5px" }}
              >
                <i className="fa fa-edit"></i>
              </button>
              <button
                className="btn btn-danger btn-sm"
                onClick={() => this.deleteRecord(record._id)}
              >
                <i className="fa fa-trash"></i>
              </button>
            </>
          );
        }
      }
    ];

    this.config = {
      page_size: 10,
      length_menu: [10, 20, 50],
      filename: "Buses",
      no_data_text: "Không tìm thấy!",
      button: {
        excel: true,
        print: true,
        csv: true
      },
      language: {
        length_menu: "Hiện _MENU_ kết quả mỗi trang",
        filter: "Tìm...",
        info: "Từ _START_ đến _END_ trong _TOTAL_ chuyến",
        pagination: {
          first: "Trang đầu",
          previous: "Trang trước",
          next: "Trang sau",
          last: "Trang cuối"
        }
      },
      show_length_menu: true,
      show_filter: true,
      show_pagination: true,
      show_info: true
    };

    this.state = {
      locations: [],
      isLoading: true,
      error: ""
    };
  }

  componentDidMount() {
    this.fetchLocations();
  }

  componentDidUpdate(nextProps, nextState) {
    if (nextState.locations === this.state.locations) {
      this.fetchLocations();
    }
  }

  deleteRecord = id => {
    Swal.fire({
      title: "Bạn có chắc?",
      text: "Bạn sẽ không thể hoàn tác!",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes!"
    }).then(async result => {
      if (result.value) {
        const resp = await removeLocation(id).catch(err => {
          this.setState({ error: err.response.data.error });
        });
        if (resp && resp.status === 200) {
          Swal.fire("Deleted!", "Địa điểm đã bị xóa.", "success");
          this.setState({});
        }
      }
    });
  };

  fetchLocations = async () => {
    const resp = await getAllLocations().catch(err => {
      this.setState({ error: err.response.data.error, isLoading: false });
    });
    if (resp && resp.status === 200) {
      let counter = 1;
      resp.data.map(location => {
        location.createdAt = moment(location.createdAt).format("MMMM Do, YYYY");
        location.sn = counter;
        counter++;
        return location;
      });
      this.setState({ locations: resp.data, isLoading: false });
    }
  };

  pageChange = pageData => {
    console.log("OnPageChange", pageData);
  };

  render() {
    return (
      <Layout title="Địa điểm">
        <div className="d-flex" id="wrapper">
          <div id="page-content-wrapper">
            <div className="container-fluid">
              <button className="btn btn-link mt-3" id="menu-toggle"></button>

              <button
                className="btn btn-outline-primary float-right mt-3 mr-2"
                data-toggle="modal"
                data-target="#add-user-modal"
                onClick={() => this.props.history.push("/add-location")}
              >
                {" "}
                Thêm địa điểm
              </button>

              <h1 className="mt-2 text-primary">Địa điểm</h1>
              {this.state.isLoading ? (
                <Loading />
              ) : (
                <ReactDatatable
                  config={this.config}
                  records={this.state.locations}
                  columns={this.columns}
                  onPageChange={this.pageChange}
                />
              )}
            </div>
          </div>
        </div>
      </Layout>
    );
  }
}

export default Locations;
