import React from 'react';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';


export default function ProductsGrid(props){
  const chosenProducts = props.chosenProducts;
    return(
        <div id="products-grid">
            <table id = "grid">
              <thead>
                <tr className = "tr">
                  <th></th>
                  <th>Наименование</th>
                  <th>Цена</th>
                  <th>Количество</th>
                  <th style = {{width: "20px"}}></th>
                </tr>
              </thead>
              <tbody className = "scroll-body">
                {chosenProducts.map((el,i)=><tr key={i} className = "tr" style = {{border: "1px solid #eeeef0"}}>
                  <td>{i+1}</td>
                  <td style = {{width: "60%"}}>{el.name}</td>
                  <td style = {{textAlign:"center"}}>{el.price}</td>
                  <td style = {{textAlign:"center"}}>{el.count}</td>
                 <td><DeleteOutlinedIcon style = {{fontSize: "16px", color:"#ef8354"}}
                 onClick = {()=>props.onDelete(el.id)}/></td>
                </tr>)}
              </tbody>
            </table>
        </div>
    )
}