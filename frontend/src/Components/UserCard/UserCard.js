import "./UserCard.css";

export const UserCard = (props) => {
    const { userId, name, email, dateOfBirth } = props.userData;

    const [year, month, day] = dateOfBirth.split("T")[0].split("-");
    const formattedDate = `${day}-${month}-${year}`;

    const truncateString = (str, maxLength) => {
        return str.length > maxLength ? str.slice(0, maxLength) + "..." : str;
    };

    const truncatedName = truncateString(name, 27);
    const truncatedEmail = truncateString(email, 25);

    return (
        <div className="card">
            <div className="info">
                <label>User ID</label>
                <span>{userId}</span>
            </div>

            <div className="info">
                <label>Name</label>
                <span>{truncatedName}</span>
            </div>

            <div className="info">
                <label>Email</label>
                <span>{truncatedEmail}</span>
            </div>

            <div className="info">
                <label>Date Of Birth</label>
                <span>{formattedDate}</span>
            </div>
        </div>
    );
};
