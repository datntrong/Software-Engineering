import React, { Component, memo } from "react";
import Layout from "../../core/Layout";
import { removeBus, getAllUnavailableBuses } from "../../../Utils/Requests/Bus";
import ReactDatatable from "@ashvin27/react-datatable";
import moment from "moment";
import Swal from "sweetalert2";
import { SERVER_ROUTE } from "../../../Utils/config";
import Loading from "../../core/Loading";

class BusUnavailable extends Component {
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
        key: "image",
        text: "Image",
        className: "image",
        width: 100,
        align: "left",
        sortable: false,
        cell: record => {
          console.log(record);
          return (
            <>
              <img
                className="busImage"
                src={`${SERVER_ROUTE}/uploads/` + record.image}
              />
            </>
          );
        }
      },
      {
        key: "name",
        text: "Tên nhà xe",
        className: "name",
        align: "left",
        sortable: true
      },
      {
        key: "busNumber",
        text: "Số xe",
        className: "busNumber",
        align: "left",
        sortable: true
      },
      {
        key: "ownerName",
        text: "Tên chủ xe",
        className: "ownerName",
        align: "left",
        sortable: true
      },
      {
        key: "travel",
        text: "Chuyến",
        className: "travel",
        align: "left",
        sortable: true
      },
      {
        key: "journeyDate",
        text: "Ngày khởi hành",
        className: "name",
        align: "left",
        sortable: true
      },
      {
        key: "departure_time",
        text: "Giờ Khởi hành",
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
                  this.props.history.push(`/edit-bus/${record.slug}`)
                }
                style={{ marginRight: "5px" }}
              >
                <i className="fa fa-edit"></i>
              </button>
              <button
                className="btn btn-danger btn-sm"
                onClick={() => this.deleteRecord(record.slug)}
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
      filename: "Users",
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
      buses: [],
      isLoading: true,
      error: ""
    };
  }

  componentDidMount() {
    this.fetchUnavailableBuses();
  }

  componentDidUpdate(nextProps, nextState) {
    if (nextState.buses === this.state.buses) {
      this.fetchUnavailableBuses();
    }
  }

  fetchUnavailableBuses = async () => {
    const buses = await getAllUnavailableBuses().catch(err => {
      this.setState({ error: err.response.data.error, isLoading: false });
    });
    if (buses && buses.status === 200) {
      let counter = 1;
      buses.data.map(bus => {
        bus.journeyDate = moment(bus.journeyDate).format("MMMM Do, YYYY");
        bus.sn = counter;
        counter++;
        bus.ownerName = bus.owner.name;
        bus.travel = bus.travel.name;
        return bus;
      });
      this.setState({ buses: buses.data, isLoading: false });
    }
  };

  deleteRecord = slug => {
    Swal.fire({
      title: "Bạn có chắc?",
      text: "Bạn sẽ không thể hoàn tác!",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then(async result => {
      if (result.value) {
        const resp = await removeBus(slug).catch(err => {
          this.setState({ error: err.response.data.error });
        });
        if (resp && resp.status === 200) {
          Swal.fire("Deleted!", "Tệp của bạn đã bị xóa.", "success");
          this.setState({});
        }
      }
    });
  };

  pageChange = pageData => {
    console.log("OnPageChange", pageData);
  };

  render() {
    return (
      <Layout title="Tất cả > chuyến chuẩn đã đi/huỷ">
        <div className="d-flex" id="wrapper">
          <div id="page-content-wrapper">
            <div className="container-fluid">
              <button className="btn btn-link mt-3" id="menu-toggle"></button>
              <button
                className="btn btn-outline-primary float-right mt-3 mr-2"
                data-toggle="modal"
                data-target="#add-user-modal"
                onClick={() => this.props.history.push("/add-bus")}
              >
                {" "}
                Add Bus
              </button>
              <h1 className="mt-2 text-primary">Các chuyến chuẩn đã đi/huỷ</h1>
              {this.state.isLoading ? (
                <Loading />
              ) : (
                <ReactDatatable
                  config={this.config}
                  records={this.state.buses}
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

export default memo(BusUnavailable);
