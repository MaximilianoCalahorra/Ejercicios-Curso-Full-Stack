const LoggedUser = ({user, handleLogout}) => <p>{user.name} logged in<button onClick={() => handleLogout()}>logout</button></p>

export default LoggedUser