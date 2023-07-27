import React from "react";
import { connect } from "react-redux";
import { actionCreators } from "../store";

function ToDo({ text, onBtnClick }) {
  return (
    <li>
      {text} <button onClick={onBtnClick}>DEL</button>
    </li>
  );
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    onBtnClick: () => dispatch(actionCreators.deleteToDo(ownProps.id))
    // 원래 store에 저장되어 있던 state를 삭제해야 하므로 ownProps를 활용
  };
}

// mapStateToProps는 값을 읽어오는 것 뿐이므로 삭제하기 위해선 필요없어서 null 처리
export default connect(null, mapDispatchToProps)(ToDo);
