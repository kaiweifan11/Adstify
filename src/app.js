import React, { useEffect, useState } from "react";
import { Row, Col, Input, Grid, notification } from "antd";
import logo from "./assets/logo.png";
import axios from "axios";
import NewsCard from './components/NewsCard';
import Weather from './components/Weather';
import User from './components/User';

const { Search } = Input;
const { useBreakpoint } = Grid;

const NYT_API_KEY = "bJ8aHbSJbClRh3jDwxNNZzj9ePDvtW0n";
const WEATHER_API_KEY = "906ee29b9dfa4b1e845101445241010";

const defaultArticle = {
    title: "",
    source: "",
};

const getScreenSize = (screens) => {
    if (screens.xxl) return "xxl";
    else if (screens.xl) return "xl";
    else if (screens.lg) return "lg";
    else if (screens.md) return "md";
    else if (screens.sm) return "sm";
    else if (screens.xs) return "xs";
};

const openNotification = ({title, description}) => {
    notification.open({
      message: title,
      description: description,
      type: 'error'
    });
};

const App = () =>{
    const [ user, setUser ] = useState({});
    const [ news, setNews ] = useState([defaultArticle, defaultArticle, defaultArticle, defaultArticle]);
    const [ currWeather, setCurrWeather] = useState(true);
    const [ isLoading, setIsLoading] = useState(true);
    const [screenSize, setScreenSize] = useState("lg");

    const screens = useBreakpoint();
    
    useEffect(()=>{
        getUser();
        getNews("world");
        getWeather();
    }, []);

    useEffect(() => {
        if (Object.keys(screens)?.length > 0) {
          const newScreenSize = getScreenSize(screens);
          // breakpoint at "lg" (i.e. 1200px)
          // if smaller than 1200px, show mobile version
          setScreenSize(newScreenSize);
        }
    }, [screens]);

    const getNews = (keyword) =>{
        setIsLoading(true);
        axios({
            method: 'get',
            url: `https://api.nytimes.com/svc/topstories/v2/${keyword}.json?api-key=${NYT_API_KEY}`,
        })
        .then(function (response) {
            if(response?.data?.results){ 
                setNews(response.data.results);
                setIsLoading(false);
            } else {
                openNotification({title: "No Data", description: "The search did not yield any results"});
            }
        })
        .catch((message) =>{
            if(message.status === 429) setTimeout(getNews, 10000);
            else openNotification({title: "No Data", description: "The search did not yield any results"});
        });
    }

    const getWeather = () =>{
        axios({
            method: 'get',
            url: 'https://api.weatherapi.com/v1/current.json?q=singapore&key=' + WEATHER_API_KEY,
        })
        .then(function (response) {
            if(response?.data?.current) setCurrWeather(response.data.current);
        })
        .catch((message) =>{
            console.log('weather api error', message);
        });
    }

    const getUser = () =>{
        axios({
            method: 'get',
            url: 'https://randomuser.me/api/',
        })
        .then(function (response) {
            if(response?.data?.results?.[0]) setUser(response.data.results[0]);
        })
        .catch((message) =>{
            console.log('user api error', message);
        });
    }

    const onSearch = (value) =>{
        getNews(value);
    }

    return (
        <Row style={{width: "100%"}}>
            <Col span={12} style={{padding: "24px"}}> 
                <img src={logo} />
            </Col>
            <Col span={12} style={{padding: "24px", display: "flex", justifyContent: "right"}}> 
                <User user={user} screenSize={screenSize} />
            </Col>
            <Col span={24} style={{marginTop: "24px", display: "flex", justifyContent: "center"}}>
                <Weather currWeather={currWeather} />
            </Col>
            <Col span={24} style={{display: "flex", justifyContent: "center", marginTop: "24px"}}>
                <Search size="large" placeholder="Search the web" allowClear style={{width: "60%", fontSize: "156px"}} onSearch={onSearch}/>
            </Col>
            <Col span={24} style={{marginTop: "24px"}}>
                <Row gutter={[24, 24]} style={{maxWidth: "100%", padding: "24px"}}>
                    {news.map(article =>{
                        if(article.title)
                            return (
                                <Col span={screenSize === "xl" || screenSize === "xxl"? 6 : 12}>
                                    <NewsCard article= {article} isLoading={isLoading} /> 
                                </Col>
                            )
                    })}
                </Row>
            </Col>
        </Row>
    )
}

export default App
