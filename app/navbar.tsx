import { cookies } from "next/headers";
import Link from "next/link";

export default function NavBar() {
    return (
    <nav className="navbar bg-dark navbar-expand-lg" data-bs-theme="dark">
    <div className="container-fluid">
        <a className="navbar-brand" href="#">Form Builder</a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
            <a className="nav-link" href="#">Forms</a>
            </li>
        </ul>
        {
            cookies().has("jwt") ? (
                <>
                <Link className="btn btn-primary" href="/account">Account</Link>
                </>
            ) : (
                <>
                <Link className="btn btn-outline-light me-2" href="/login">Login</Link>
                <Link className="btn btn-primary" href="/signup">Sign-up</Link>
                </>
            )
        }
        </div>
    </div>
    </nav>
    )
}