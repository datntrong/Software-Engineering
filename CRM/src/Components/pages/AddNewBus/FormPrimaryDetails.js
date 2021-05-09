import React, { Component } from "react";
import Layout from "../../core/Layout";
import Swal from "sweetalert2";

export default class FormPrimaryDetails extends Component {
  continue = e => {
    e.preventDefault();

    if (
      !this.props.values.name ||
      !this.props.values.fare ||
      !this.props.values.busNumber
    ) {
      return Swal.fire({
        type: "error",
        title: "Điền đủ cách ô bắt buộc"
      });
    }
    this.props.nextStep();
  };

  render() {
    const { values, handleChange } = this.props;

    return (
      <Layout title="Thêm chuyến xe">
        <div className="form-group">
          <label>Tên nhà xe *</label>
          <input
            type="text"
            className="form-control"
            required
            placeholder="Nhập tên"
            onChange={handleChange("name")}
            value={values.name}
          />
        </div>

        <div className="form-group">
          <label>Số xe *</label>
          <input
            type="text"
            className="form-control"
            required
            placeholder="Số xe"
            onChange={handleChange("busNumber")}
            value={values.busNumber}
          />
        </div>

        <div className="form-check check-group">
          <input
            type="checkbox"
            id="checkbox"
            className="form-check-input"
            onChange={handleChange("isAvailable")}
            checked={values.isAvailable}
          />
          <label className="checkbox-label" htmlFor="checkbox">
            Chuẩn bị khởi hành
          </label>
        </div>

        <div className="form-group">
          <label>Loại xe</label>
          <select
            className="form-control"
            value={values.type}
            onChange={handleChange("type")}
          >
            <option>Xe limousine</option>
            <option>Xe thường</option>
          </select>
        </div>
        <div className="form-group">
          <label>chuyến xe</label>
          <select
            className="custom-select custom-select-sm form-control"
            onChange={handleChange("travel")}
            value={values.travel}
          >
            <option value="Default" disabled>
              Chọn chuyến xe
            </option>
            {values.travels.map(travel => (
              <option value={travel._id} key={travel._id}>
                {travel.name}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Giá vé (VND) *</label>
          <input
            type="number"
            className="form-control"
            required
            placeholder="Nhập giá"
            onChange={handleChange("fare")}
            value={values.fare}
          />
        </div>

        <div className="form-group">
          <label>Số lượng chỗ ngồi</label>
          <input
            type="number"
            className="form-control"
            placeholder="Nhập tổng số ngồi"
            onChange={handleChange("numberOfSeats")}
            value={values.numberOfSeats}
          />
        </div>

        <button className="btn btn-info" onClick={this.continue}>
          Tiếp tục
        </button>
      </Layout>
    );
  }
}
