import React, { useState } from 'react';
import {useDispatch, useSelector} from "react-redux";
import { getAllByName } from '../../store/actions/UserActions';
import SearchedUser from './SearchedUser/SearchedUser';


const UserSearchForm = ()=> {

    const dispatch = useDispatch();
    const [searchValue, setSearchValue] = useState('');
    const searchedUsers = useSelector(state=> state.searchedUsers);

     function onSearch(){
        console.log(searchValue, " form")
       dispatch(getAllByName(searchValue));

        console.log("from store", searchedUsers);
    }

    return (
        <>
            <input 
                onChange = {e=>{setSearchValue(e.target.value)}} 
                value = {searchValue}
                type="text"
                placeholder = "search"
            />

            <button onClick={onSearch} >Search</button>

            {
                searchedUsers.map(user=> <SearchedUser  {...user}/>)
            }
        </>
    );
}

export default UserSearchForm;