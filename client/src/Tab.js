import React from 'react';
import {connect} from 'react-redux';
import crossIcon from './cross.png';

class Tab extends React.Component {
	constructor(props){
		super(props);

		this.onClickHandler = this.onClickHandler.bind(this);
		this.onClose = this.onClose.bind(this);
		this.onMouseOver = this.onMouseOver.bind(this);
		this.onMouseLeave = this.onMouseLeave.bind(this);

		this.state = {
			showCross: false
		};
	}

	onClickHandler(){
		// console.log(this.props.title);
		this.props.changeTab(this.props.title);
	}

	onMouseOver() {
		this.setState({showCross: true});
	}
	onMouseLeave() {
		this.setState({showCross: false});
	}

	onClose(){
		this.props.closeTab(this.props.title);
	}

	render(){
		let show_class = "";
		if(this.state.showCross){
			show_class = "show"
		}

		let selected_class = "";
		if(this.props.isSelected){
			selected_class = "selected";
		}

		return (
			<div className={`tab ${selected_class}`} onClick={this.onClickHandler} onMouseOver={this.onMouseOver} onMouseLeave={this.onMouseLeave}>
				<img src={crossIcon}  alt="close" className={`cross-icon ${show_class}`} onClick={this.onClose}/>
				{this.props.title}
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		selectedTab: state.selectedTab
	}
};

const mapDispatchToProps = (dispatch) => {
	return {
		changeTab: (title) => {
			dispatch({
				type: 'CHANGE_TAB',
				payload: title
			});
		},
		closeTab: (title) => {
			dispatch({
				type: 'CLOSE_TAB',
				payload: title
			})
		}
	}
};

export default connect(mapStateToProps, mapDispatchToProps)(Tab);
