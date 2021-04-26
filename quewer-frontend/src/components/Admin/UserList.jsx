import './user-list.css';

export default function UserList({ list, id }) {
    let i = 0;
    return (
        <div className="user-list" id={(id) ? id : null}>
            {(list !== undefined) ? list.map(user => {
                return <User key={user.name + i++} user={user} />;
            }) : ""}
        </div>
    );
}

function User(props) {
    const user = props.user;
    if (user === null) return (<></>);
    return (
        <div className="user-item">
                <div className="name-photo">
                    <img id="user-img" src={user.photos[0].value} alt={user.name} />
                    <h3>{user.name}</h3>
                </div>
                {/* <a href={`mailto:${user.email}`}>{user.emails[0].value}</a> */}
        </div>
    );
}