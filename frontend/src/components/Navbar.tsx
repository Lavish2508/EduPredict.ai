import { Link, useLocation, useNavigate } from "react-router-dom";

function Navbar() {

    const location = useLocation();
    const navigate = useNavigate();

    const loggedIn = localStorage.getItem("user");

    const active = (path: string) =>

        location.pathname === path
            ? "text-yellow-300 font-bold"
            : "hover:text-yellow-300";

    const logout = () => {

        localStorage.removeItem("user");
        navigate("/login");

    };

    return (

        <nav className="bg-blue-700 shadow-lg">

            <div className="max-w-7xl mx-auto px-8 py-4 flex justify-between items-center">

                <Link
                    to="/"
                    className="text-white text-3xl font-bold"
                >
                    🎓 EduPredict AI
                </Link>

                <div className="flex gap-6 text-white font-medium">

                    <Link className={active("/")} to="/">
                        Home
                    </Link>

                    <Link className={active("/about")} to="/about">
                        About
                    </Link>

                    {loggedIn && (
                        <>
                            <Link className={active("/dashboard")} to="/dashboard">
                                Dashboard
                            </Link>

                            <Link className={active("/predict")} to="/predict">
                                Predict
                            </Link>

                            <Link className={active("/history")} to="/history">
                                History
                            </Link>
                        </>
                    )}

                    {!loggedIn ? (
                        <>
                            <Link className={active("/login")} to="/login">
                                Login
                            </Link>

                            <Link className={active("/register")} to="/register">
                                Register
                            </Link>
                        </>
                    ) : (
                        <button
                            onClick={logout}
                            className="bg-red-500 px-4 py-2 rounded-lg hover:bg-red-600"
                        >
                            Logout
                        </button>
                    )}

                </div>

            </div>

        </nav>

    );

}

export default Navbar;