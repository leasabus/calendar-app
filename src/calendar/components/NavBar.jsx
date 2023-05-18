
export const NavBar = () => {
    return (
        <div className="navbar navbar-dark bg-dark mb-4 px-4">
            <span className="navbar-brand">
                <i className="fa fa-calendar-alt"></i>
                &nbsp;
                Leandro
            </span>

            <button className="btn btn-outline-danger">
                <i className="fas fa-sign-out-alt"></i>
                <span>Salir</span>
            </button>
        </div>
    )
}
