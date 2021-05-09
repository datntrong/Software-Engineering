import React, { Component } from "react";
import Layout from "../../core/Layout";
import ReactDatatable from "@ashvin27/react-datatable";
import moment from "moment";
import Swal from "sweetalert2";
import { getGuests } from "../../../Utils/Requests/People";
import Loading from "../../core/Loading";

class Guests extends Component {
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
        key: "phone",
        text: "SĐT",
        className: "phone",
        align: "left",
        sortable: true
      },
      {
        key: "email",
        text: "Email",
        className: "phone",
        align: "left",
        sortable: true
      },
      {
        key: "createdAt",
        text: "Created At",
        className: "date",
        align: "left",
        sortable: true
      },
      {
        key: "address",
        text: "Địa chỉ",
        className: "address",
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
            <button
              className="btn btn-danger btn-sm"
              onClick={() => this.deleteRecord()}
            >
              <i className="fa fa-trash"></i>
            </button>
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
      people: [],
      isLoading: true,
      error: ""
    };
  }

  componentDidMount() {
    this.fetchGuests();
  }

  componentDidUpdate(nextProps, nextState) {
    if (nextState.people === this.state.people) {
      this.fetchGuests();
    }
  }

  deleteRecord = slug => {
    Swal.fire({
      title: "Bạn có chắc?",
      text: "Bạn sẽ không thể hoàn tác!",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes!"
    }).then(result => {
      if (result.value) {
        Swal.fire("Không thể xoá!");
        this.setState({});
      }
    });
  };

  fetchGuests = async () => {
    const resp = await getGuests().catch(err => {
      this.setState({ error: err.response.data.error, isLoading: false });
    });
    if (resp && resp.status === 200) {
      let counter = 1;
      resp.data.map(person => {
        person.createdAt = moment(person.createdAt).format("MMMM Do, YYYY");
        person.sn = counter;
        counter++;
        return person;
      });
      this.setState({ people: resp.data, isLoading: false });
    }
  };

  pageChange = pageData => {
    console.log("OnPageChange", pageData);
  };

  render() {
    return (
      <Layout title="Người > Khách">
        <div className="d-flex" id="wrapper">
          <div id="page-content-wrapper">
            <div className="container-fluid">
              <button className="btn btn-link mt-3" id="menu-toggle"></button>

              <h1 className="mt-2 text-primary">Khách</h1>
              {this.state.isLoading ? (
                <Loading />
              ) : (
                <ReactDatatable
                  config={this.config}
                  records={this.state.people}
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

export default Guests;
