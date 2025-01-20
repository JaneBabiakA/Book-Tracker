import { Link } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import Cookies from "universal-cookie";
const cookie = new Cookies();

export default function Header({}){
    const { token } = useAuthContext();

    const logout = () => {
        cookie.remove("TOKEN", { path: "/" });
        window.location.href = "/";
    }

    return (
        <div className="header">
                <Link className="mainLink" to={'/'}>
                    Book Tracker
                </Link>
                {
                    token ?
                        <Link className="logoutLink" onClick={logout} to={'/'}>
                            Log Out
                        </Link>
                    :
                    null
                }
            </div>
    )
}