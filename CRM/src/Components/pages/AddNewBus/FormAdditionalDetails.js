import React, { Component } from "react";
import Layout from "../../core/Layout";

export default class FormAdditionalDetails extends Component {
  continue = e => {
    e.preventDefault();
    this.props.nextStep();
  };

  back = e => {
    e.preventDefault();
    this.props.prevStep();
  };

  render() {
    const { values, handleChange } = this.props;

    console.log(values);

    return (
      <Layout title="Thêm chuyến xe">
        <div className="form-group">
          <label>Tính năng bổ sung</label>
          <input
            type="text"
            className="form-control"
            required
            placeholder="Cách nhau bởi dấu phẩy"
            onChange={handleChange("features")}
            value={values.features}
          />
        </div>

        <div className="form-group">
          <label>Giờ khởi hành *</label>
          <input
            type="time"
            className="form-control"
            required
            placeholder="Enter the bus number"
            onChange={handleChange("departure_time")}
            value={values.departure_time}
            disabled={!values.isAvailable}
          />
        </div>

        <div className="form-group">
          <label>Ngày khởi hành</label>
          <input
            type="date"
            className="form-control"
            onChange={handleChange("journeyDate")}
            value={values.journeyDate}
            disabled={!values.isAvailable}
          />
        </div>

        <div className="form-group">
          <label>Điểm xuất phát</label>

          <select
            className="custom-select custom-select-sm form-control"
            onChange={handleChange("startLocation")}
            value={values.startLocation}
          >
            <option value="Default" disabled>
              Chọn tỉnh/thành phô
            </option>
            {values.locations.map(location => (
              <option value={location._id} key={location._id}>
                {location.name}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Điểm kết thúc</label>
          <select
            className="custom-select custom-select-sm form-control"
            onChange={handleChange("endLocation")}
            value={values.endLocation}
          >
            <option value="Default" disabled>
              Chọn tỉnh/thành phô
            </option>
            {values.locations.map(location => (
              <option value={location._id} key={location._id}>
                {location.name}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Điểm nội trú</label>
          <input
            type="text"
            className="form-control"
            required
            placeholder="Tên cách nhau bởi dấu phẩy"
            onChange={handleChange("boardingPoints")}
            value={values.boardingPoints}
          />
        </div>

        <div className="form-group">
          <label>Điểm trả khách</label>
          <input
            type="text"
            className="form-control"
            required
            placeholder="Tên cách nhau bởi dấu phẩy"
            onChange={handleChange("droppingPoints")}
            value={values.droppingPoints}
          />
        </div>

        <button
          className="btn btn-info"
          onClick={this.back}
          style={{ marginRight: "2rem" }}
        >
          Trở lại
        </button>
        <button className="btn btn-info mx-5" onClick={this.continue}>
          Tiếp tục
        </button>
      </Layout>
    );
  }
}
