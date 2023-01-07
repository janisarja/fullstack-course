
const Hello = (props) => {
  return (
    <>
      <p>Hello {props.name}, you are {props.age} years old</p>
    </>
  )
}

const App = () => {
  const nimi = 'Juuso'
  const ika = 10
  
  return (
    <>
      <h1>Greetings</h1>
      <Hello name="Jani" age={21}/>
      <Hello name={nimi} age={ika}/>
    </>
  )
}

export default App
