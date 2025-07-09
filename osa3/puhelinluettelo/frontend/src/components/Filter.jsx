const Filter =(props) => {
  return (
    <>
      filter shown with <input value={props.newFilter} 
                                onChange={props.handleFilterChange}/>
    </>
  )
}

export default Filter
