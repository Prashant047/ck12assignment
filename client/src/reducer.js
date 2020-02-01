import {createReducer} from '@reduxjs/toolkit';
const initState = {

	chat: [
		{mtag: "SERVER", message: "Hi, I am a chatbot"},
	],
	tabs: [
		{title: 'main',selected: true}
		// {title: 'what',selected: false}
	],
	selectedTab: 'main',
	code : {
		'main' : `
async function respond(inputText) {
	return inputText;
}
		`
	},
	tabIncrementer: 0,
	applyChange: false,
	applyBtnText: 'Apply Change'

};

const reducer = createReducer(initState, {
	TESTING: (state, action) => {
		console.log('testing');
	},

	CHANGE_TAB: (state, action) => {
		let prevselectedTab = state.selectedTab;
		// let nextstate = {...state};

		state.tabs.forEach((val, index) => {
			if(val.title === prevselectedTab){
				state.tabs[index].selected = false;
			}

			if(val.title === action.payload){
				state.tabs[index].selected = true;
				state.selectedTab = action.payload;
			}
		});

	},

	ADD_NEW_TAB: (state, action) => {
		let newTitle = `file${state.tabIncrementer + 1}`
		state.tabs.push({
			title: newTitle,
			selected: false
		});

		state.code[newTitle] = "// start editing this file";

		state.tabIncrementer += 1;
	},

	UPDATE_CODE: (state, action) => {
		state.code[state.selectedTab] = action.payload;
	},

	CLOSE_TAB: (state, action) => {
		if(action.payload !== 'main'){
			state.tabs.forEach((tab, index) => {
				if(tab.title === action.payload){
					state.tabs.splice(index, 1);
				}
			});

			state.selectedTab = 'main';
		}
	},

	SEND_MESSAGE: (state, action) => {
		if(action.payload.mtag === 'CLIENT'){
			state.chat.push({
				mtag: 'CLIENT',
				message: action.payload.message
			});
		}
		else if(action.payload.mtag === 'WAITING'){
			state.chat.push({
				mtag: 'WAITING',
				message: ''
			});

		}
		else {
			state.chat.pop();
			state.chat.push({
				mtag: 'SERVER',
				message: action.payload.message
			});
		}
	},

	APPLY_CAHNGE: (state, action) => {
		state.applyChange = true;
	},

	CHANGE_APPLY_BTN_TEXT: (state, action) => {
		state.applyBtnText = action.payload;
	},

	CHANGE_APPLIED: (state, action) => {
		state.applyChange = false;
	}

});

export default reducer;


