import React from 'react';

export default function ReceivedMoneyTabs(props){
    const tabs = [
        ["1","2","3"],
        ["4","5","6"],
        ["7","8","9"],
        ["0","00","000"]
    ]
    return(
        <div>
            <div className = "sum-area">
                <span>{props.sum ? props.sum : "00"}</span>
            </div>
            <div >
            <table className = "money-tabs-table">
                <tbody>
                    {tabs.map((tr,i)=><tr key = {i}>{tr.map((el,i)=><td key = {`0${i}`}><button onClick = {props.onChange}
                     value = {el} className = "money-tabs">{el}</button></td>)}</tr>)}
                </tbody>
            </table>
            </div>
            
        </div>
    )
}