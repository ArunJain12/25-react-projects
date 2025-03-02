import { useEffect, useState } from "react";
import "./sorting.css";
import useCustomFetch from "../../custom-hooks/useCustomFetch";

function SortData() {
    const { data, isLoading, error } = useCustomFetch('https://dummyjson.com/users', {});
    const [ users, setUsers ] = useState([]);
    const [ sort, setSort ] = useState('ascending');

    useEffect(() => {
        if (data && data.users && data.users.length > 0) {
            sort !== '' ? handleSort(data.users) : setUsers(data.users);
        }
    }, [data]);

    function handleSort(listOfUsers) {
        let copyUsers = [...listOfUsers];
        if (sort === 'ascending') {
            copyUsers = copyUsers.sort((firstUser, secondUser) => firstUser.firstName > secondUser.firstName ? 1 : -1);
        }
        else if (sort === 'descending') {
            copyUsers = copyUsers.sort((firstUser, secondUser) => firstUser.firstName > secondUser.firstName ? -1 : 1);
        }
        setUsers(copyUsers);
    }

    useEffect(() => {
        handleSort(users);
    }, [sort]);

    return (
        <div className="sort-data-container">
            <h1>Sort Data</h1>
            <div className="sort-dropdown-container">
                <select name="sort" value={sort} onChange={(event) => setSort(event.target.value)}>
                    <option value="" id="">Please Select Option</option>
                    <option value="ascending" id="ascending">Sort A - Z</option>
                    <option value="descending" id="descending">Sort Z - A</option>
                </select>
            </div>
            {isLoading ? <h3 className="error-text">Loading Data. Please wait!!</h3> : null}
            <ul>
                {users && users.length > 0
                    ? users.map((userItem) => (
                        <li key={userItem.id}>
                            <p>{userItem.firstName}</p>
                        </li>
                    ))
                    : null
                }
            </ul>
        </div>
    );
}

export default SortData;