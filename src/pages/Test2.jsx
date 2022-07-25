import React from 'react'

const Test2 = ({total, handleTotal}) => {
  return (
    <button onClick={handleTotal(4)}>Press me</button>
  )
}

export default Test2