import { useEffect, useState } from "react";
import "./sorting.css";

function SortData() {
    const [ users, setUsers ] = useState([]);
    const [ isLoading, setIsLoading ] = useState(false);
    const [ sort, setSort ] = useState('ascending');

    async function fetchListOfUsers() {
        try {
            setIsLoading(true);
            const apiResponse = await fetch('https://dummyjson.com/users');
            const result = await apiResponse.json();
            if (result && result.users && result.users.length > 0) {
                sort !== '' ? handleSort(result.users) : setUsers(result.users);
                setIsLoading(false);
            }
            else
                throw new Error('No Users found.');
        }
        catch(err) {
            console.error('error fetching users: ', err);
            setIsLoading(false);
            setUsers([]);
        }
    }

    useEffect(() => {
        fetchListOfUsers();
    }, []);

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