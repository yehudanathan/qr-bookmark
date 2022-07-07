import React, { useState } from 'react'
import Test2 from './Test2'

const Test1 = () => {
  const [total, setTotal] = useState(2);

  return (
    <Test2 total={total} handleTotal={setTotal}>{total}</Test2>
  )
}

export default Test1