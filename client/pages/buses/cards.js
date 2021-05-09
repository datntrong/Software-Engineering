import SingleCard from "./singleCard";
import { Row, Col } from "antd";
import NepaliDate from "ad-bs-converter";

const Cards = ({ buses=[] }) => {

  const nepaliDate =
    buses[0] &&
    NepaliDate.ad2bs(buses[0].journeyDate.replace("-", "/").replace("-", "/"))
      .en || Date.now();

  const markup =
    buses.length <= 0 ? (
      <h2>Không tìm thấy</h2>
    ) : (
      <div className="cards">
        <div>
          <hr />
          <Row className="buses-header">
            <Col span={4}></Col>
            <Col span={4}>
              <h3>Chuyến xe</h3>
            </Col>
            <Col span={4}>
              <h3>Loại xe</h3>
            </Col>
            <Col span={4}>
              <h3>Khởi hành</h3>
            </Col>
            <Col span={4}>
              <h3>Available</h3>
            </Col>
            <Col span={4}>
              <h3>Giá vé</h3>
            </Col>
          </Row>
          {buses.length > 0 && buses.map(bus => (
            <SingleCard key={bus._id} bus={bus} />
          ))}
        </div>
      </div>
    );

  return markup;
};

export default Cards;
