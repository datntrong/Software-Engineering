import React, { Component } from "react";
import Layout from "../../core/Layout";
import {
  changeVerificationStatus,
  removeBooking,
  getAllBookings
} from "../../../Utils/Requests/Booking";
import ReactDatatable from "@ashvin27/react-datatable";
import moment from "moment";
import Swal from "sweetalert2";
import { SERVER_ROUTE } from "../../../Utils/config";
import Loading from "../../core/Loading";

class MyBookings extends Component {
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
        key: "busNumber",
        text: "Số xe",
        className: "name",
        align: "left",
        sortable: true
      },
      {
        key: "busName",
        text: "Nhà xe",
        className: "name",
        align: "left",
        sortable: true
      },
      {
        key: "ownerName",
        text: "Tên chủ xe",
        className: "name",
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
        key: "clientName",
        text: "Tên khách hàng",
        className: "clientName",
        align: "left",
        sortable: true
      },
      {
        key: "clientPhone",
        text: "SĐT",
        className: "clientPhone",
        align: "left",
        sortable: true
      },
      {
        key: "clientAddress",
        text: "Địa chỉ khách hàng",
        className: "clientAddress",
        align: "left",
        sortable: true
      },
      {
        key: "bookedDate",
        text: "Ngày đặt",
        className: "date",
        align: "left",
        sortable: true
      },
      {
        key: "seatNumber",
        text: "Vị trí chỗ ngồi",
        className: "date",
        align: "left",
        sortable: true
      },
      {
        key: "verification",
        text: "Status",
        className: "date",
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
                className={`btn btn-${
                  record.verification === "verified" ? "warning" : "success"
                } btn-sm`}
                onClick={this.toggleVerify(record._id, record.verification)}
                style={{
                  marginRight: "5px",
                  display: record.verification === "payed" ? "none" : "block"
                }}
              >
                <i
                  className={`fa fa-${
                    record.verification === "verified" ? "times" : "check"
                  }`}
                ></i>
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
      filename: "Bookings",
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
      bookings: [],
      isLoading: true,
      error: "",
      clientName: "",
      busNumber: ""
    };
  }

  componentDidMount() {
    this.fetchBookings();
  }

  componentDidUpdate(nextProps, nextState) {
    if (nextState.bookings === this.state.bookings) {
      this.fetchBookings();
    }
  }

  toggleVerify = (id, status) => async e => {
    let toggledVerification =
      status === "verified" ? "notverified" : "verified";

    Swal.fire({
      title: "Bạn có chắc?",
      text: "Bạn đang thay đổi trạng thái xác minh",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes!"
    }).then(async result => {
      if (result.value) {
        const resp = await changeVerificationStatus(
          id,
          toggledVerification
        ).catch(err => {
          this.setState({ error: err.response.data.error });
        });
        if (resp && resp.status === 200) {
          Swal.fire(
            `${toggledVerification}!`,
            "Tệp của bạn đã được cập nhật.",
            "success"
          );
          this.setState({});
        }
      }
    });
  };

  deleteRecord = id => {
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
        const resp = await removeBooking(id).catch(err => {
          this.setState({ error: err.response.data.error });
        });
        if (resp && resp.status === 200) {
          Swal.fire("Deleted!", "Tệp của bạn đã bị xóa.", "success");
          this.setState({});
        }
      }
    });
  };

  fetchBookings = async () => {
    const resp = await getAllBookings().catch(err => {
      this.setState({ error: err.response.data.error, isLoading: false });
    });

    if (resp && resp.status === 200) {
      let counter = 1;
      resp.data.map(booking => {
        const client = booking.guest
          ? booking.guest
          : booking.user
          ? booking.user
          : booking.self;
        booking.bookedDate = moment(booking.createdAt).format("MMMM Do, YYYY");
        booking.journeyDate = moment(booking.bus.journeyDate).format(
          "MMMM Do, YYYY"
        );
        booking.sn = counter;
        counter++;
        booking.clientName = client.name;
        booking.clientPhone = client.phone;
        booking.clientAddress = client.address;
        booking.ownerName = booking.owner.name;
        booking.busNumber = booking.bus.busNumber;
        booking.departure_time = booking.bus.departure_time;
        booking.image = booking.bus.image;
        booking.busName = booking.bus.name;
        return booking;
      });
      this.setState({ bookings: resp.data, isLoading: false });
    }
  };

  pageChange = pageData => {
    console.log("OnPageChange", pageData);
  };

  render() {
    console.log(this.state);
    return (
      <Layout title="All Bookings">
        <div className="d-flex" id="wrapper">
          <div id="page-content-wrapper">
            <div className="container-fluid">
              <button className="btn btn-link mt-3" id="menu-toggle"></button>

              <h1 className="mt-2 text-primary">Tất cả xe đã đặt</h1>
              {this.state.isLoading ? (
                <Loading />
              ) : (
                <ReactDatatable
                  config={this.config}
                  records={this.state.bookings}
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

export default MyBookings;
