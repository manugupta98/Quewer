import './user-list.css';

export default function UserList({list, id}) {
    return (
        <div className="list" id={(id) ? id : null}>
            {list.map(user => {
                return <User user={user} />;
            })}
        </div>
    );
}

function User({user}) {
    return (
        <div className="user-item">
            <div className="name-photo">
                <img id="user-img" src={user.img} alt={user.name} />
                <h3>{user.name}</h3>
            </div>
            <a href={`mailto:${user.email}`}>{user.email}</a>
        </div>
    );
}