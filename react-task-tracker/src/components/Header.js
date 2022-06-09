import PropTypes from 'prop-types'
import Button from './Button'
const Header = (props) => {
    const onClick = () => {
        console.log('click')
    }
  return (
    <header className='header'>
        <h1>{props.title}</h1>
        <Button color = 'green' text='Add' onClick={onClick}/>
    </header>
  )
}
/* style={headingStyle} */
Header.defaultProps = {
    title: 'Task Tracker',
}

Header.propTypes = {
    title: PropTypes.string,
}

// CSS in JS
// const headingStyle = {
//     color:'yellow',
//     backgroundColor:'blue'
// }
export default Header