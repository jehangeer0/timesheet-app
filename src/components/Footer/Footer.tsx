import { Row, Col } from "antd";

export default function Footer() {
  return (
    <footer className="w-full shadow-sm bg-white rounded-lg">
      <Row justify="center" align="middle" className="max-w-[1280px] mx-auto px-4 py-8 ">
        <Col>
          <p className="text-gray-500 text-center">
            © 2025 tentwenty. All rights reserved.
          </p>
        </Col>
      </Row>
    </footer>
  );
}
