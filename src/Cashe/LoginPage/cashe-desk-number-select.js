// import { PinDropSharp } from '@material-ui/icons'
import React from 'react'
import Select from 'react-select'


export default function SelectCasheDesksNumber(props){
    const options = [
        { value: '1', label: '1' },
        { value: '2', label: '2' },
        { value: '3', label: '3' }
      ]

      const customStyle = {
        option: (base, state) => ({
          ...base,
          color: "#2d3142",
          height: "40px",
          marginTop: "-4px",
          marginBottom: "-4px",
          border: "1px solid #bfc0c0",
          borderRadius: "4px"
        })
      }
    return (
        <Select options={options} styles={customStyle} defaultValue={options[0]} onChange = {props.onChange}/>
    )

}