import React from 'react';
import { Card, Typography, Row, Col } from "antd";

const { Text } = Typography;

const titleStyle = {
    fontWeight: 600,
    fontSize: 20,
}
const sourceStyle = {
    fontSize: 16, 
    color: 'gray'
}

const NewsCard = (props) =>{
    const { article, isLoading } = props;
    const imageSrc = article?.multimedia?.[0]?.url || "";

    const openNewTab = () =>{
        window.open(article.url)
    }

    return (
        <Card
            loading={isLoading}
            hoverable
            onClick={openNewTab}
        >
            <Row>
                <Col span={24}>
                    <img src={imageSrc} style={{width: "100%" }} />
                </Col>
                <Col span={24}>
                    <Text style={titleStyle} >
                        {article?.title}
                    </Text>
                </Col>
                <Col span={24}>
                    <Text style={sourceStyle} >
                        {article?.byline}
                    </Text>
                </Col>
            </Row>
        </Card>
    )
}

export default NewsCard;