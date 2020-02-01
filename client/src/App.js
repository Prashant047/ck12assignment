import React from 'react';
import * as axios from 'axios';
import MonacoEditor from 'react-monaco-editor';
import {connect} from 'react-redux';

import './App.css';
import ChatBubble from './ChatBubble.js';
import Tab from './Tab.js';

class App extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			messageText: '',
			editorWidth: window.innerWidth/2
		};
		this.editor = null;

		this.chatBox = React.createRef();
		
		this.editorDidMount = this.editorDidMount.bind(this);
		this.onChange = this.onChange.bind(this);
		this.addBtnHandler = this.addBtnHandler.bind(this);
		this.applyBtnHandler = this.applyBtnHandler.bind(this);
		this.onMessageChangeHandler = this.onMessageChangeHandler.bind(this);
		this.onKeyPressHandler = this.onKeyPressHandler.bind(this);
	}

	// componentDidMount(){
	// 	console.log(this.props.chat);
	// 	console.log(this.props.tabs);
	// }
	componentDidMount(){
		// function noScroll(){
		// 	window.scrollTo(0,0);
		// }
		// window.addEventListener('scroll', noScroll);
		window.addEventListener('resize', () => {
			this.setState({editorWidth: window.innerWidth/2});
		});
	}
	
	editorDidMount(editor, monaco){
		console.log('editor mounted');
		this.editor = editor;
		editor.focus();
	}

	onChange(newValue, e){
		// console.log('onChange', newValue, e);
		this.props.updateCode(newValue);
		this.editor.focus();
	}

	componentDidUpdate(){
		this.chatBox.current.scrollTop = this.chatBox.current.scrollHeight;
	}

	addBtnHandler(){
		this.props.addNewTab();
	}

	applyBtnHandler(){
		this.props.sendCode(
			this.props.code['main']
		);
	}

	onMessageChangeHandler(event){
		this.setState({
			messageText: event.target.value
		});

	}

	onKeyPressHandler(event){
		if(event.key === 'Enter'){
			if(this.state.messageText.length !== 0){
				this.props.sendMessage(this.state.messageText);
				this.setState({messageText: ""})
			}
		}
	}

	getTabs(){
		return this.props.tabs.map((tab) => <Tab isSelected={tab.selected} title={tab.title} key={tab.title} />);
	}

	getChats(){
		return this.props.chat.map((chat, index) => <ChatBubble mtag={chat.mtag} message={chat.message} key={index} />);
	}

	render(){
		const editorOptions = {
			selectOnLineNumbers: true
		};

		return (
			<div class="wrapper">
				<div class="top-bar">
					<span class="title-text">AI playground</span>
				</div>
				<div class="work-section">
					<div class="editor-section">
						<div className="tab-bar">
							{this.getTabs()}
							<button class="new-tab-btn" onClick={this.addBtnHandler}>+</button>
							<button class={`apply-btn ${this.props.applyChange?'green':''}`} 
								onClick={this.applyBtnHandler}>{this.props.applyBtnText}</button>
						</div>
						<div className="editor-box">
							<MonacoEditor
								width={this.state.editorWidth}
								height="681"
								language="javascript"
								theme="vs-dark"
								value={this.props.code[this.props.selectedTab]}
								options={editorOptions}
								onChange={this.onChange}
								editorDidMount={this.editorDidMount}
							/>
						</div>
					</div>
					<div class="chat-box-section">
						<div className="chat-box" ref={this.chatBox}>
							{this.getChats()}
						</div>
						<input 
							type="text" 
							class="input-box"
							placeholder="Type Message here..."
							onChange={this.onMessageChangeHandler}
							onKeyPress={this.onKeyPressHandler}
							value={this.state.messageText}
						/>
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		chat: state.chat,
		tabs: state.tabs,
		selectedTab: state.selectedTab,
		code: state.code,
		applyChange: state.applyChange,
		applyBtnText: state.applyBtnText
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		updateCode: (code) => {
			dispatch({
				type: 'UPDATE_CODE',
				payload: code
			});

			dispatch({
				type: 'CHANGE_APPLY_BTN_TEXT',
				payload: 'Apply change'
			});
		},
		addNewTab: () => {
			dispatch({
				type: 'ADD_NEW_TAB'
			});
		},
		sendMessage: (message) => {
			// dispatch({
			// 	type: 'SEND_MESSAGE',
			// 	payload: message
			// });

			dispatch((dispatcher) => {
				dispatcher({
					type: 'SEND_MESSAGE',
					payload: {mtag:'CLIENT', message: message}
				});

				dispatcher({
					type: 'SEND_MESSAGE',
					payload: {mtag:'WAITING'}

				});

				axios.post('/message',{message})
					.then((response) => {
						// console.log(response);
						const {reply} = response.data;
						
						// console.log(reply);
						dispatcher({
							type: 'SEND_MESSAGE',
							payload: {mtag: 'SERVER', message: reply}
						});
					})
					.catch((error) => {
						console.log("error sending message", error);
					});
			});
		},
		sendCode: (code) => {
			dispatch((dispatcher) => {
				dispatcher({
					type: 'APPLY_CAHNGE'
				});
				
				dispatcher({
					type: 'CHANGE_APPLY_BTN_TEXT',
					payload: 'Applying'
				});

				axios.post('/code', {code})
					.then((response) => {
						if(response.data.received){
							dispatcher({
								type: 'CHANGE_APPLIED'
							});
							dispatcher({
								type: 'CHANGE_APPLY_BTN_TEXT',
								payload: 'Change Applied'
							});
						}
					})
					.catch((error) => {
						console.log("error sending code" ,error)
					});
			})
		}
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
