import React, { useState, useEffect } from "react";
import "./cashe-page.css";
import ProductCodeInput from "./product-code-input";
import ReceivedMoneyTabs from "./received-money-tabs";
import ProductsGrid from "./products-grid";
import SumReceivedBackSubmitSpaces from "./sum-received-back-submit";
import ZReport from "./z-report-popup";
import CheckPopup from "./check-popup";
import firebase from "../../firebase";

export default function CasheMainPage(props) {

  let previousPageData = props.location.state;
  
  const [productsData, setProductsData] = useState([]);
  const [productId, setProductId] = useState("");
  const [chosenProducts, setChosenProducts] = useState([]);
  const [productCode, setProductCode] = useState("");
  const [receivedMoney, setReceivedMoney] = useState("");
  const [sumOfCurrentCheckMoney, setSumOfCurrentCheckMoney] = useState(0);
  const [backMoney, setBackMoney] = useState(0);
  const [currentProduct, setCurrentProduct] = useState([]);
  const [checksCount, setChecksCount] = useState(0);
  const [sumOfAllChecksMoney, setSumOfAllChecksMoney] = useState(0);

  //set copies for print check after deleting the all check data 
  const [copyOfChosenProducts, setCopyOfChosenProducts] = useState(chosenProducts);
  const [copyOfSum, setCopyOfSum] = useState(sumOfCurrentCheckMoney);
  const [copyOfBack, setCopyOfBack] = useState(backMoney);
  const [copyOfReceivedMoney, setCopyOfReceivedMoney] = useState(receivedMoney);

  useEffect(()=>{
    const ref = firebase.firestore().collection("products");
        ref.get().then((item)=>{
            const items = item.docs.map((doc)=>doc.data());
            setProductsData(items);
        }); 
    },[]);

  useEffect(()=>{
    let added = false;
      if(productId){
      let filtered = productsData.filter((el)=>el.id === productId);
      if(filtered.length > 0){
        setProductCode(true);
        setCurrentProduct(filtered[0]);
      }else{
        setProductCode(false);
      }
      let data = [...chosenProducts];
    data.forEach((el) => {
      if(el.id === productId){
        added = true;
        setCurrentProduct(el);
        return ( + (el.count)++);
        }   
    });

    if(added){
      setChosenProducts(data);
    }
    else if(filtered.length > 0){
      filtered[0].count = "1";
        let id = [...chosenProducts].concat(filtered);
        setChosenProducts(id);
      }
      setProductId("");
      }
  }, [chosenProducts, productId, productsData, productCode]);

  useEffect(()=>{
    if(chosenProducts.length > 0){
        let count = chosenProducts.reduce((prev, cur) => (prev + (cur.price * cur.count)),0)
           setSumOfCurrentCheckMoney(count);
    }
    let back = receivedMoney - sumOfCurrentCheckMoney;
    setBackMoney(back);
},[chosenProducts, receivedMoney, sumOfCurrentCheckMoney]);

function handleProductId(e){
  let elementCount = document.getElementById("count-input");
  elementCount.value = "1"
  if(e.target.value.length === 6 && elementCount.value === "1"){
    setProductId(e.target.value);
    setTimeout(() => e.target.select(), 500); 
  }
}

function handleProductCount(e){
  e.target.value  = !isNaN(+e.target.value) ? e.target.value : "";
   let productCount = e.target.value;
    if(productCount > Number("1") && chosenProducts.length > 0 && productCode ){
      console.log(currentProduct.count)
      if(currentProduct.count !== "1"){
        currentProduct.count = +productCount + (+currentProduct.count)-1;
      }else{
        currentProduct.count = productCount;
      }
      let temp = [...chosenProducts]
       setChosenProducts(temp);
      } 
}

function deleteItem(id){
  setChosenProducts(chosenProducts.filter((el)=>el.id !== id));
}

function moneyTabs(e){
  e.preventDefault();
  let received = receivedMoney;
  received += e.target.value ? e.target.value : "";
  setReceivedMoney(received);
  console.log(e.target.value.value)
}

function deleteReceivedMoneyNum(e){
  e.preventDefault();
  let received = receivedMoney;
  received = received.slice(0,receivedMoney.length-1);
  setReceivedMoney(received);
}

function handlePayment(e){
  e.preventDefault();
  if(receivedMoney && (+backMoney>=0) >= 0){
     let checks = checksCount;
     checks++;
     setChecksCount(checks);
    let allChecksSumMoney = sumOfAllChecksMoney + sumOfCurrentCheckMoney;
    setCopyOfSum(sumOfCurrentCheckMoney);
    setCopyOfBack(backMoney);
    setCopyOfReceivedMoney(receivedMoney);
    setSumOfAllChecksMoney(allChecksSumMoney);
    setReceivedMoney("");
    setBackMoney(0);
    setSumOfCurrentCheckMoney(0);
    setProductId("");
    setCopyOfChosenProducts([...chosenProducts]);
    setChosenProducts([]);
    let code = document.getElementById("code-input");
    code.value = "";
    let elementCount = document.getElementById("count-input");
    elementCount.value = "1"
  }
}
    return (
      <div id= "cashe-body"> 
        { productsData.length === 0 ?
        <p style = 
          {{paddingTop: "18%", 
           paddingBottom: "26.2%", 
           margin:"0",
           textAlign: "center",
           color: "#ef8354"}}>
           Загрузка...
        </p> :
        <>
        <div id = "App-header">
        <header>
          <div className = "cashe-data">
          <p>Касса номер: {previousPageData.casheDeskNumber} <br/> Кассир: {previousPageData.cashier}</p>
          </div>
          <div className = "product-code" onChange={handleProductId} >
            <ProductCodeInput productCode = {`${productCode}`}/>
          </div>
          <div className = "product-count"  onChange={handleProductCount} onClick = {(e)=>e.target.select()} >
            <input type = "text" id= "count-input" defaultValue="1"/>
          </div>
        </header>
        </div>
        <div id = "cashe-desk-area">
        <div id = "left-side">
          <ProductsGrid  id = "cashe-desk-body" chosenProducts = {chosenProducts} onDelete = {deleteItem}/>
        </div>
        <div id = "right-side">
          <ReceivedMoneyTabs onChange = {moneyTabs} sum = {sumOfCurrentCheckMoney}/>
          <SumReceivedBackSubmitSpaces receivedMoney = {receivedMoney} onDelete = {deleteReceivedMoneyNum} backMoney = {backMoney} payment = {handlePayment}/>
        </div>
        </div>
        <div id = "footer">
          <CheckPopup checksCount = {checksCount} data = {copyOfChosenProducts} casheDeskNumber = {previousPageData.casheDeskNumber} 
          cashier = {previousPageData.cashier} sum = {copyOfSum} receivedMoney = {copyOfReceivedMoney} backMoney = {copyOfBack} />
          <ZReport  startDate = {previousPageData.startDate} checksCount = {checksCount} sumOfAllChecksMoney = {sumOfAllChecksMoney} casheDeskNumber = {previousPageData.casheDeskNumber} cashier = {previousPageData.cashier} />
        </div>
        </>
        }
      </div>
    );
  }
