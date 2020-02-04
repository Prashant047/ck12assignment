import React from 'react';
import * as axios from 'axios';
import safeEval from "safe-eval";
import MonacoEditor from 'react-monaco-editor';
import {connect} from 'react-redux';

import './App.css';
import ChatBubble from './ChatBubble.js';
import Tab from './Tab.js';

class App extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			messageText: ''
		};
		this.editor = null;

		this.chatBox = React.createRef();
		this.editorSection = React.createRef();
		
		this.editorDidMount = this.editorDidMount.bind(this);
		this.onChange = this.onChange.bind(this);
		this.addBtnHandler = this.addBtnHandler.bind(this);
		this.applyBtnHandler = this.applyBtnHandler.bind(this);
		this.onMessageChangeHandler = this.onMessageChangeHandler.bind(this);
		this.onKeyPressHandler = this.onKeyPressHandler.bind(this);
	}

	editorDidMount(editor, monaco){
		console.log('editor mounted');
		this.editor = editor;
		editor.focus();
	}

	onChange(newValue, e){
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
				this.props.sendMessage(this.state.messageText, this.props.code['main']);
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
			selectOnLineNumbers: true,
			automaticLayout: true
		};

		return (
			<div class="wrapper">
				<div class="top-bar">
					<span class="title-text">AI playground</span>
				</div>
					<div className="row">

						<div class="editor-section col-md-6 col-12" >
							<div className="tab-bar">
								{this.getTabs()}
								<button class="new-tab-btn" onClick={this.addBtnHandler}>+</button>
								<button class={`apply-btn ${this.props.applyChange ? 'green' : ''}`}
									onClick={this.applyBtnHandler}>{this.props.applyBtnText}</button>
							</div>
							<div className="editor-box" ref={this.editorSection}>
								{/*
									add MonacoWebpackPlugin to -->
									root/node_modules/react_scripts/config/webpack.config.prod.js
									before running npm start
								*/}
								<MonacoEditor
									className="editor"
									language="javascript"
									theme="vs-dark"
									value={this.props.code[this.props.selectedTab]}
									options={editorOptions}
									onChange={this.onChange}
									editorDidMount={this.editorDidMount}
								/>
							</div>
						</div>
						<div class="chat-box-section col-md-6 col-12">
							<div className="chat-box" ref={this.chatBox}>
								<ul className="chat-list">
									{this.getChats()}
								</ul>
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


const CampK12 = {
	translate(text, fromLang, toLang){
		return new Promise((resolve, reject) => {
			axios.post("https://translate.yandex.net/api/v1.5/tr.json/translate" ,null, {params : {
				lang:`${fromLang}-${toLang}`,
				key: "trnsl.1.1.20200131T134450Z.40bdceadd6b715c0.6451fead3a42dc87e73bca2d45ed7a1bc15142dd",
				text:text
			}})
				.then((response) => {
					resolve(response.data.text[0]);
				})
				.catch((error) => {
					reject(error);
				});
		})
	}
};

const context = {
	reverseIt: function (str) {
		return str.split("").reverse().join("");
	},
	CampK12: CampK12
};
const mapStateToProps = (state) => {
	return {
		chat: state.chat,
		tabs: state.tabs,
		selectedTab: state.selectedTab,
		code: state.code,
		applyChange: state.applyChange,
		applyBtnText: state.applyBtnText
	};
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
		sendMessage: (message, main_code) => {

			dispatch((dispatcher) => {

				dispatcher({
					type: "SEND_MESSAGE",
					payload: {mtag: "CLIENT",message:message}
				});

				dispatcher({
					type: "SEND_MESSAGE",
					payload: {mtag: "WAITING"}
				});


				let code = main_code;
				code = '(' + code + `)("${message}")`;

				try {
					let output = safeEval(code, context);

					output.then(reply => {
						dispatcher({
							type: "SEND_MESSAGE",
							payload: { mtag: "SERVER", message: reply }
						});

					}).catch(err => {
						
						dispatcher({
							type: "SEND_MESSAGE",
							payload: { mtag: "SERVER", message: "Error executing the code" }
						});
					});

				} catch (except) {
					dispatcher({
						type: "SEND_MESSAGE",
						payload: { mtag: "SERVER", message: "Error executing the code" }
					});
				}
			});
		},
		sendCode: (main_code) => {
			dispatch((dispatcher) => {
				dispatcher({
					type: 'APPLY_CAHNGE'
				});
				
				dispatcher({
					type: 'CHANGE_APPLY_BTN_TEXT',
					payload: 'Applying'
				});
				
				try{

					let code = main_code;
					code = '(' + code + `)("Test")`;

					safeEval(code, context);
					dispatcher({
						type: 'CHANGE_APPLIED'
					});

					dispatcher({
						type: 'CHANGE_APPLY_BTN_TEXT',
						payload: 'Change Applied'
					});



				}catch(except){
					dispatcher({
						type: 'CHANGE_APPLIED'
					});
					dispatcher({
						type: 'CHANGE_APPLY_BTN_TEXT',
						payload: 'Error'
					});
					
				}
			})
		}
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
