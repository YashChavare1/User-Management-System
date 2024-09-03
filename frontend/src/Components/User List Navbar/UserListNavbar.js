import { useState } from "react";
import "./UserListNavbar.css"

export const UserListNavbar = ({ userData, setDisplayUsers }) => {
    const [data, setData] = useState(userData);
    const [isFilterVisible, setFilterVisible] = useState(false);

    const handleSortUserId = (event) => {
        const { value } = event.target;

        if (value === "") {
            console.log("return");
            return;
        }

        const sorted = [...data].sort((a, b) => {
            if (value === "ascending") {
                return a.userId - b.userId;
            }

            if (value === "descending") {
                return b.userId - a.userId;
            }
            return 0;
        });

        setDisplayUsers(sorted);
        console.log("Sorted by UserId:", sorted);
    };


    const handleSortDOB = (event) => {
        const { value } = event.target;

        if (value === "") {
            console.log("return");
            return;
        }

        const sorted = [...data].sort((a, b) => {
            const dateA = new Date(a.dateOfBirth);
            const dateB = new Date(b.dateOfBirth);

            if (value === "ascending") {
                return dateB - dateA;
            }
            if (value === "descending") {
                return dateA - dateB;
            }
            return 0;
        });

        setDisplayUsers(sorted);
        console.log(sorted);
    };

    return (
        <>
            <div className="filter-button">
                <button onClick={() => setFilterVisible(!isFilterVisible)}>
                    {isFilterVisible ? "Hide Filters" : "Filters"}
                </button>
            </div>

            <div className="user-list-navbar">
                {isFilterVisible && (
                    <div className="sort-options">
                        <div className="sort-userId">
                            <h3>User Id</h3>
                            <select name="sort" id="sort" onChange={handleSortUserId}>
                                <option value="">-- Select -- </option>
                                <option value="ascending">Ascending</option>
                                <option value="descending">Descending</option>
                            </select>
                        </div>

                        <div className="sort-dob">
                            <h3>Date of Birth</h3>
                            <select name="sort" id="sort" onChange={handleSortDOB}>
                                <option value="">-- Select -- </option>
                                <option value="ascending">Ascending</option>
                                <option value="descending">Descending</option>
                            </select>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};