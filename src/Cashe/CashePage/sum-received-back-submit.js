import React from 'react';

export default function SumReceivedBackSubmitSpaces(props){
     // ???
     let received = props.receivedMoney;
     /// ??
     let back = props.backMoney;
    console.log(received)
    return(
        <div className = "sum">
            <div>
            <div className="received">
            <div id="received">
                {received ? <span>{received}</span> : <span>00</span>} 
            </div>
            <div id="clear-num">
                <button className="c" onClick = {props.onDelete}>C</button>
            </div>
            </div>
            <div className="back">
                <label htmlFor = "back">Сдача</label>
                <div id = "back">
                 {received ? <span>{back}</span> : <span>00</span>}
                 </div>
            </div>
            </div>
            <div className="deposit">
                <button className="print" onClick = {props.payment}>Оплата</button>
            </div>
            </div>
    )
}
