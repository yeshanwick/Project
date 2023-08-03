import React, { useEffect, useState } from "react";
import { Bar, BarChart, Label, Tooltip, XAxis } from 'recharts'
import { Button, Row } from "antd";
import html2pdf from "html2pdf.js";
import { getUserCountByAge, getUserCountForRoles } from "../../actions/AuthActions";
import { getEquipment } from "../../actions/EquipmentAction";
import { PDFContainer } from "./style";
import { Logo } from "../Navigation/style";


const PDFFile = ({ forceRender }) => {

    const [count, setCount] = useState(null);
    const [equipments, setEquipments] = useState([]);
    const [ageCount, setAgeCount] = useState([])


    const handleDownloadClick = () => {
        const input = document.getElementById('lineChartContainer');
        html2pdf().from(input).save('Stats.pdf');
    };

    const fetchData = async () => {
        setCount(await getUserCountForRoles());
        setEquipments(await getEquipment());
        setAgeCount(await getUserCountByAge());

    };
    useEffect(() => {
        fetchData();
    }, [forceRender]);
    const date = new Date();

    console.log(date);
    return (
        <PDFContainer>
            <div id='lineChartContainer'>
                <Logo>
                    Friends & Fitness <span style={{ color: 'black' }}>Sports Club</span>
                </Logo>
                <h1>Created At: {date.toDateString()}</h1>
                <br></br>
                <br></br>
                <br></br>
                <BarChart width={800}
                    height={400}
                    data={equipments}
                    margin={{ top: 5, right: 20, left: 10, bottom: 20 }}>
                    <XAxis dataKey="name" tick={{ fill: 'orange' }}>
                        <Label value="Equipment Counts" position="insideBottom" offset={0} />
                    </XAxis>
                    <Tooltip />
                    <Bar type="monotone" dataKey="totalCount" stroke="#ff7300" yAxisId={0} />
                    {/* <Bar type="monotone" dataKey="availableCount" stroke="#ff7300" yAxisId={1} /> */}
                </BarChart>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <BarChart width={800}
                    height={400}
                    data={ageCount}
                    margin={{ top: 5, right: 20, left: 10, bottom: 20 }}>
                    <XAxis dataKey="ageLimit" tick={{ fill: 'orange' }}>
                        <Label value="Age Limits of Members" position="insideBottom" offset={0} />
                    </XAxis>
                    <Tooltip />
                    <Bar type="monotone" dataKey="count" stroke="#ff7300" yAxisId={0} />
                </BarChart>
                <br></br>
                <br></br>
                <br></br><br></br>
                <br></br>
                <br></br>
                <BarChart width={800}
                    height={400}
                    data={count}
                    margin={{ top: 5, right: 20, left: 10, bottom: 20 }}>
                    <XAxis dataKey="userRole" tick={{ fill: 'orange' }}>
                        <Label value="User Count based on Roles" position="insideBottom" offset={0} />
                    </XAxis>
                    <Tooltip />
                    <Bar type="monotone" dataKey="count" stroke="#ff7300" yAxisId={0} />
                </BarChart>

            </div>
            <Row justify='end' style={{ width: '100%', paddingRight: '20px' }}>
                <Button onClick={handleDownloadClick}>Download PDF</Button>

            </Row>
        </PDFContainer>
    );
};

export default PDFFile;