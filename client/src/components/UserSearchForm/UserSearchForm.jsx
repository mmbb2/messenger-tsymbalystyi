import React, { useState } from 'react';
import {useDispatch, useSelector} from "react-redux";
import { getAllByName } from '../../store/actions/UserActions';
import SearchedUser from './SearchedUser/SearchedUser';
import { TextField, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const UserSearchForm = ()=> {

    const dispatch = useDispatch();
    const [searchValue, setSearchValue] = useState('');
    const searchedUsers = useSelector(state=> state.searchedUsers);

     function onSearch(){
        console.log(searchValue, " form")
       dispatch(getAllByName(searchValue));

    }

    return (
        <>

            <div className="UserSearchForm">
                <TextField variant="outlined" fullWidth
                    onChange = {e=>{setSearchValue(e.target.value)}} 
                    placeholder = "search"
                />

                <IconButton  onClick={onSearch}>
                    <SearchIcon />
                </IconButton>
            </div>
            

           
        </>
    );
}

export default UserSearchForm;