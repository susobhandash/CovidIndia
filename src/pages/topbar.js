import { Outlet, Link } from "react-router-dom";

const TopBar = () => {
    return (
        <>
            <div className='topBar'>
                <label>Covid Dashboard </label>
                <nav>
                    <ul>
                        <li>
                            <Link to="/">Vaccination Data</Link>
                        </li>
                        <li>
                            <Link to="/stats">State Stats</Link>
                        </li>
                    </ul>
                </nav>
            </div>
            <div className='outlet'>
                <Outlet />
            </div>
        </>
    )
};

export default TopBar;