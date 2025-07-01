const Header = (props) => {
  console.log('Header: ', props)
  return <h2>{props.course_name}</h2>
}

const Part = (props) => {
  console.log('Part: ', props)
  return <p>{props.part.name} {props.part.exercises}</p>
}

const Content = (props) => {
  console.log('Content: ', props)
  return (
    <div>
      {props.parts.map((part) => <Part key={part.id} part={part} />)}
    </div>
  )
}

const Total = (props) => {
  console.log(props)
  return (
    <p>
      total of exercises {props.parts.reduce((sum, part) => {
        return sum + part.exercises
      }, 0)}
    </p>
  )
}

const Course = (props) => {
  console.log('Course: ', props)
  return (
    <>
      <Header course_name={props.course.name} />
      <Content parts={props.course.parts} />
      <Total parts={props.course.parts} />
    </>
  )
}

export default Course
