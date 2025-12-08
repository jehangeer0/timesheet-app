import { Spin, Row, Col } from "antd";

export default function HomePage() {
  return (
   <Row className="h-screen bg-white" align="middle" justify="center">
            <Col className="text-center">
                <Spin size="large" />
                <div className="mt-4 text-gray-500">Loading...</div>
            </Col>
        </Row>
  );
}
