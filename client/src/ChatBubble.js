import React from 'react';

const ChatBubble = ({mtag, message}) => {
	if(mtag === "SERVER"){
		return <li className="chat you">{message}</li>;
	}

	else if(mtag === "CLIENT"){
		return <li className="chat me">{message}</li>;
	}

	else if(mtag === "WAITING"){
		return <li className="chat you">...</li>;
	}
}

export default ChatBubble;