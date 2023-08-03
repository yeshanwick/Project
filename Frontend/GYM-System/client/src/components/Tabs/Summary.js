import React, { useEffect, useState } from "react";
import {
  CardContainer,
  CardContent,
  Container,
  Circle,
  RateContainer,
  RateTitle,
} from "./style";
import { Button, Card, Row } from "antd";
import { UserOutlined } from "@ant-design/icons";
import {
  getNewRegistrants,
  getUserCountForRoles,
} from "../../actions/AuthActions";
import { userRoles } from "../../resources/UserRoles";
import { PDFDownloadLink } from "@react-pdf/renderer";
import PDFFile from "./PDFFile";


const Summary = ({ forceRender }) => {
  const [memberCount, setMemberCount] = useState(0);
  const [trainerCount, setTrainerCount] = useState(0);
  const [newRCount, setNewRCount] = useState(0);

  const fetchData = async () => {
    const newRegistrants = await getNewRegistrants();
    const countByRole = await getUserCountForRoles();
    countByRole.forEach((element) => {
      if (element?.userRole === userRoles.INSTRUCTOR) {
        setTrainerCount(element.count);
      } else if (element?.userRole === userRoles.MEMBER) {
        setMemberCount(element.count);
      }
    });
    setNewRCount(newRegistrants.length);
  };
  useEffect(() => {
    fetchData();
  }, [forceRender]);

  const rate = () => {
    const gcd = calculateGCD(trainerCount, memberCount);
    const simplifiedNumerator = trainerCount / gcd;
    const simplifiedDenominator = memberCount / gcd;

    return `${simplifiedNumerator}:${simplifiedDenominator}`;
  };
  const calculateGCD = (a, b) => {
    if (b === 0) {
      return a;
    }
    return calculateGCD(b, a % b);
  };
 

  return (
    <Container>
      <CardContainer>
        <Card
          size="small"
          title="Members"
          style={{
            width: 300,
          }}
        >
          <CardContent>
            <UserOutlined />
            <span>{memberCount}</span>
          </CardContent>
        </Card>
        <Card
          size="small"
          title="Trainers"
          style={{
            width: 300,
          }}
        >
          <CardContent>
            {" "}
            <UserOutlined />
            <span>{trainerCount}</span>
          </CardContent>
        </Card>
        <Card
          size="small"
          title="New Registrants"
          style={{
            width: 300,
          }}
        >
          <CardContent>
            {" "}
            <UserOutlined />
            <span>{newRCount}</span>
          </CardContent>
        </Card>
      </CardContainer>
      <RateContainer>
        <RateTitle>Trainers : Members</RateTitle>
        <Circle>{rate()}</Circle>
      </RateContainer>
      <Row justify='end'>
        {/* <PDFDownloadLink document={<PDFFile />} filename="Summary.pdf">
          {({ loading }) => (loading ? <Button>Loading Document...</Button> : <Button>DownloadPDF</Button>)}
        </PDFDownloadLink> */}
        
      </Row>
    </Container>
  );
};

export default Summary;
