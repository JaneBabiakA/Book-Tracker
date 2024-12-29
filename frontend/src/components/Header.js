import { Link } from "react-router-dom";

export default function Header({}){
    return (
        <div className="header">
                <Link className="link" to={'/'}>
                    Book Tracker
                </Link>
            </div>
    )
}