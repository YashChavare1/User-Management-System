import "./UserCard.css";

export const UserCard = (props) => {
    const { userId, name, email, dateOfBirth } = props.userData;

    const [year, month, day] = dateOfBirth.split("T")[0].split("-");
    const formattedDate = `${day}-${month}-${year}`;

    return (
        <div className="card">
            <div className="info">
                <label htmlFor="userId">User ID</label>
                <span>{userId}</span>
            </div>

            <div className="info">
                <label htmlFor="name">Name</label>
                <span>{name}</span>
            </div>

            <div className="info">
                <label htmlFor="email">Email</label>
                <span>{email}</span>
            </div>

            <div className="info">
                <label htmlFor="dateOfBirth">Date Of Birth</label>
                <span>{formattedDate}</span>
            </div>
        </div>
    );
};