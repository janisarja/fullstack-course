const Notification = ({ message, success }) => {
  const successStyle = {
    color: 'green',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  }
  
  const failureStyle = {
    ...successStyle,
    color: 'red'
  }

  const notificationStyle = success ? successStyle : failureStyle
  if (message === null) {
    return null
  }
  console.log(message)
  return (
    <div style={notificationStyle}>
      {message}
    </div>
  )
}
  
export default Notification
  