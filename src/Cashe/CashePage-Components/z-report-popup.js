import React, {useState} from 'react';
import PopUp from "./popup"

export default function ZReport(props){

    const [isOpen, setIsOpen] = useState(false);

    let endDate = new Date().toLocaleString("ru");
 
  const togglePopup = () => {
    setIsOpen(!isOpen);
    if(isOpen){
        window.history.back();
    }
  }
    return(
        <div className = "z-report">
            <button className="print" onClick={togglePopup}>Z-отчёт</button> 

    {isOpen && <PopUp 
      content={<>
        <p style = {{fontSize : "18px"}}>Супермаркет ЗВЕЗДА</p>
        <hr style = {{width : "80%", size: "50"}}/>
        <div style ={{fontSize : "12px"}}>
            <p style = {{fontSize : "18px"}}>Кассовый чек Z-отчёт</p>
          <div style = {{textAlign : "right", marginRight: "10px"}}>
            <p>{`Количество чеков : ${props.checksCount.toFixed(2)}`}</p>
            <p> {`Итог : ${props.sumOfAllChecksMoney.toFixed(2)}`}</p>
          </div>
          <div style = {{textAlign : "left", fontSize:"12px"}}>
            <p>{`Кассир: ${props.cashier}`}</p>
            <p>{`Касса номер: ${props.casheDeskNumber}`}</p>
          </div>
          <div  style = {{textAlign : "center", fontSize: "14px"}}>
            <p>{`Начало смены: ${props.startDate}`}</p>
            <p>{`Конец смены: ${endDate}`}</p>
          </div>
        </div>
          <button>Печать чека</button>
      </>}
      handleClose={togglePopup} 
    />}
        </div>
    )
}