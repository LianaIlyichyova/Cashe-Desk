import React from 'react';

export default function SumReceivedBackSubmitSpaces(props){
    return(
        <div className = "sum">
            <div>
            <div className="received">
            <div id="received">
                {props.receivedMoney ? <span>{props.receivedMoney}</span> : <span>00</span>} 
            </div>
            <div id="clear-num">
                <button className="c" onClick = {props.onDelete}>C</button>
            </div>
            </div>
            <div className="back">
                <label htmlFor = "back">Сдача</label>
                <div id = "back">
                 {props.receivedMoney ? <span>{props.backMoney}</span> : <span>00</span>}
                 </div>
            </div>
            </div>
            <div className="deposit">
                <button className="print" onClick = {props.payment}>Оплата</button>
            </div>
            </div>
    )
}
