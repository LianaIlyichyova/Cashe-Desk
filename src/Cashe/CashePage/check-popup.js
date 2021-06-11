import React, {useState} from 'react';
import PopUp from "./popup"
import "./cashe-page.css"

export default function CheckPopup(props){
    let data = props.data;
    let date = new Date().toLocaleString("ru");

    const [isOpen, setIsOpen] = useState(false);
 
  function togglePopup(){
    setIsOpen(!isOpen); 
  }
 
  return (
  <div className = "print-check">
      {
          props.checksCount > 0 ? <button className="print" onClick={togglePopup}>Печать чека</button> :
          <button className="print">Печать чека</button>
      }
      <div className= "popup">
    {isOpen && <PopUp  className = "popup-inner"
      content={
      <>
        <p style = {{fontSize : "18px"}}>Супермаркет ЗВЕЗДА</p>
        <hr style = {{width : "80%", size: "50"}}/>
        <p style = {{fontSize : "18px"}}>Кассовый чек приход</p>
        <table>
            <tbody>
        {data.map((el,i)=><tr className = "check-tr" key = {i} style ={{fontSize : "13px"}}> 
            <td style = {{verticalAlign: "top"}}>{i+1}</td>
            <td style = {{textAlign : "left", maxWidth: "64.65%"}}>{el.name}</td>
            <td style = {{paddingLeft : "25px"}}>{`${(Number(el.count).toFixed( 2 ))} *`}</td>
            <td style = {{paddingLeft : "25px"}}>{(Number(el.price).toFixed( 2 ))}</td>
            <td style = {{paddingLeft : "30px"}}>{`= ${(el.count*el.price).toFixed( 2 )}`}</td>
        </tr>)}
            </tbody>
        </table>
        <div style ={{fontSize : "13px"}}>
          <div style = {{textAlign : "right", marginRight: "10px"}}>
            <p> {`Итог : ${props.sum}.00`}</p>
            <p> {`Оплачено : ${props.receivedMoney}.00`}</p>
            <p> {`Сдача : ${props.backMoney}.00`}</p>
          </div>
          <div style = {{textAlign : "left", fontSize:"12px"}}>
            <p>{`Кассир: ${props.cashier}`}</p>
            <p>{`Касса номер: ${props.casheDeskNumber}`}</p>
          </div>
          <div style = {{textAlign : "center", fontSize: "14px"}}>
            <p>{date}</p>
            <p>Спасибо за покупку!</p>
          </div>
        </div>
        <button >Печать чека</button>
      </>
      }
      handleClose={togglePopup} 
    />}
    </div>
  </div>
  )
}
