import React from 'react';
import { Typography, Row, Col } from "antd";

const { Text } = Typography;

const tempStyle={
    fontSize: 48,
    fontWeight: 500,
}

const unitStyle = {
    fontSize: 24,
    fontWeight: 400,
    color: "gray"
}

const descriptionStyle = {
    fontSize: 18,
    fontWeight: 400,
    color: "gray"
}

const Weather = (props) =>{
    const { currWeather } = props;

    return (
        <Row style={{textAlign: 'center'}}>
            <Col span={24} style={{display: "flex", justifyContent: "center", alignItems: "flex-start"}}>
            <img src={currWeather?.condition?.icon} />
                <Text style={tempStyle}>
                    {currWeather.temp_c}
                </Text>
                <Text style={unitStyle}>
                     °C
                </Text>
            </Col>
            <Col span={24}>
                <Text style={descriptionStyle}>
                    Humidity: { currWeather.humidity}%
                </Text>
            </Col>
            <Col span={24}>
                <Text style={descriptionStyle}>
                    Feels like: { currWeather.feelslike_c } °C
                </Text>
            </Col>
            <Col span={24}>
                <Text style={descriptionStyle}>
                    Condition: { currWeather?.condition?.text }
                </Text>
            </Col>
        </Row>
    )
}

export default Weather;