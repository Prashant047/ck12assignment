import React from 'react';

const ChatBubble = ({mtag, message}) => {
	if(mtag === "SERVER"){
		return <div class="chat-bubble you">{message}</div>;
	}

	else if(mtag === "CLIENT"){
		return <div class="chat-bubble me">{message}</div>;
	}

	else if(mtag === "WAITING"){
		return <div class="chat-bubble you">...</div>;
	}
}

export default ChatBubble;