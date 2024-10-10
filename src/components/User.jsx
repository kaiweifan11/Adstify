import React from 'react';
import { Typography, Flex, Avatar } from "antd";

const { Text } = Typography;

const usernameStyle ={
    fontFamily: "cursive",
    marginLeft: "12px"
}

const User = (props) =>{
    const { user, screenSize } = props;
    console.log('user', user)
    console.log('user?.login?.username', user?.login?.username)
    console.log('screenSize', screenSize)
    console.log('screenSize === "xl" || screenSize === "xxl"', screenSize === "xl" || screenSize === "xxl")

    return (
        <Flex align={'top'} style={{height: "60px"}}>
            <Avatar size="large" src={user?.picture?.large} style={{width: "60px", height: "60px"}}/>
            {screenSize === "xl" || screenSize === "xxl" && (
                <Flex align={'center'}>
                    <Text style={usernameStyle}>{user?.login?.username}</Text>
                </Flex>
            )}
        </Flex>
    )
}

export default User;