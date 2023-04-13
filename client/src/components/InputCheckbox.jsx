import React from 'react'

function InputCheckbox({lable,value,onChangeHanlde}) {
  return (
    <>
      <input type="checkbox" value={value} onChange={onChangeHanlde} />
      <label >{lable}</label>
    </>
  )
}

export default InputCheckbox
