import { Link } from "react-router-dom"

const GuestBook = () => {
    return(
        <>
            <div>Guestbook Page</div>
            <Link to='/'>Main Page Link</Link>
            <Link to='/testpage'>testpage Page Link</Link>
        </>
    )
}

export default GuestBook;