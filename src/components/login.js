import './styles/styles.css';
export default function Login(props) {
    return (
        <form onSubmit={props.onLogin}>
            <input type="text" className="form-input" value={props.name} placeholder="Username" onChange={(e)=>{props.setName(e.target.value)}} />
            <input type="password" className="form-input" value={props.password} placeholder="Password" onChange={(e) => { props.setPassword(e.target.value) }} />
            {props.valid? null:<p className="form-error">Wrong username or password</p>}
            <button type="submit" className="form-submit">Login</button>
        </form>
    )
}