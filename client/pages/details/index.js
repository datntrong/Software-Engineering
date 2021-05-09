import Layout from "../../components/Layout";
import {
  Row,
  Col,
  Card,
  Input,
  Select,
  AutoComplete,
  InputNumber,
  Button
} from "antd";
import Swal from "sweetalert2";
import Router from "next/router";
import { dec } from "../../utils/encdec";
import { postBookSeat } from "../../actions/book";
const { Option } = Select;

class Details extends React.Component {
  state = {
    dataSource: [],
    name: "",
    email: "",
    phone: "",
    address: ""
  };

  handleAutoComplete = value => {
    this.setState({
      dataSource:
        !value || value.indexOf("@") >= 0
          ? []
          : [
              `${value}@gmail.com`,
              `${value}@hotmail.com`,
              `${value}@yahoo.com`
            ],
      email: value
    });
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleNumber = value => {
    this.setState({ phone: value });
  };

  handleSubmit = async () => {
    const { name, phone, address, email } = this.state;
    const seatNumber = this.props.seat;
    const info = { name, phone, address, email, seatNumber };
    const resp = await postBookSeat(this.props.slug, info);
    if (!resp.error) {
      this.sweetAlert("success");
    } else {
      this.sweetAlert("error");
    }
  };

  sweetAlert = status => {
    setTimeout(() => {
      if(status !== "error"){
        Router.push("/");
      }
    }, 1000);

    if (status === "error") {
      return Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!"
      });
    } else {
      Swal.fire("Chúc mừng!", "Chỗ ngồi của bạn đã được đặt", "thành công");
    }
  };

  render() {
    return (
      <Layout>
        <Row className="row-container">
          {console.log(this.state)}
          <Col span={4}></Col>
          <Col span={8}>
            <Card title="Thông tin hành khách" style={{ width: "100%" }}>
              <Input.Group>
                <h4>Tên:</h4>
                <Input onChange={this.handleChange} name="name" />
              </Input.Group>
              <br />
              <Input.Group>
                <h4>Email:</h4>
                <AutoComplete
                  dataSource={this.state.dataSource}
                  style={{ width: "100%" }}
                  onChange={this.handleAutoComplete}
                />
              </Input.Group>
              <Input.Group>
                <h4>Địa chỉ hiện tại:</h4>
                <Input onChange={this.handleChange} name="address" />
              </Input.Group>
              <br />
              <Row>
                <Col span={11}>
                  <Input.Group>
                    <h4>SDT: </h4>
                    <InputNumber
                      style={{ width: "100%" }}
                      onChange={this.handleNumber}
                      name="phone"
                    />
                  </Input.Group>
                </Col>
                <Col span={2}></Col>
                <Col span={11}>
                  <Input.Group>
                    <h4>Nơi thường trú: </h4>
                    <Select defaultValue="Hà Nội" style={{ width: "100%" }}>
                      <Option disabled value="Hà Nội">
                        Hà Nội
                      </Option>
                      <Option disabled value="Việt Nam">
                        Việt Nam
                      </Option>
                    </Select>
                  </Input.Group>
                </Col>
              </Row>
              <br />
              <Button
                type="primary"
                style={{ width: "100%" }}
                onClick={this.handleSubmit}
              >
                Tiến hành xác nhận
              </Button>
            </Card>
          </Col>
          <Col span={2}></Col>
          <Col span={6}>
            <Card title="Travel Details" style={{ width: "100%" }}>
              <p>
                <b>Tuyến đường: </b>
                {this.props.start} - {this.props.end}
              </p>
              <p>
                <b>Thời gian: </b>
                {this.props.journeyDate}
              </p>
              <p>
                <b>Chỗ ngồi: </b>
                {this.props.seat}
              </p>
              <p>
                <b>chuyến xe: </b>
                {this.props.travelName}
              </p>
            </Card>

            <br />
            <Card title="Payment Details" style={{ width: "100%" }}>
              <p>
                <b>Giá mỗi vé: </b>VND. {this.props.fare}
              </p>
              <p>
                <b>Tổng giá: </b>VND. {this.props.fare}
              </p>
            </Card>
          </Col>
          <Col span={4}></Col>
        </Row>
      </Layout>
    );
  }
}

Details.getInitialProps = ({ query }) => {
  const info = dec(query.info);
  if (info) {
    return info;
  }
  return {};
};

export default Details;
