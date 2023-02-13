import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import PersonIcon from '@mui/icons-material/Person';
import ArticleIcon from '@mui/icons-material/Article';
import './UserMenu.css';
import { AuthContext } from '../Context/auth-context';
import BackDrop from '../UIElements/BackDrop';
import EditUser from '../../Pages/Users/EditUser';
function UserMenu(props){
    const auth = useContext(AuthContext);
    const [isOpen,setIsOpen] = useState(false);
    const logoutHandler = ()=>{
        auth.logout()
    }
    const editHandler = ()=>{
        setIsOpen(true);
    }
    const closeHandler = ()=>{
        setIsOpen(false);
    }
    return (
        <>
        { isOpen && <BackDrop onClick={closeHandler}/>}
        <EditUser className={isOpen ? 'edit enable':'edit'} onClick={closeHandler}/>
        <div className='userMenu' onClick={props.onClick}>
            <div className="options">
                <div className='profile' onClick={editHandler}>
                    <PersonIcon fontSize="small"/>
                    <p>Profile</p>
                </div>
                <Link to={`/user/${auth.user}`} className="stories">
                    <ArticleIcon fontSize="small"/>
                    <p>Blogs</p>
                </Link>
            </div>
            <div className='logout' onClick={logoutHandler} >
                <p>Logout</p>
                <p>{props.name}</p>
            </div>
        </div>
        </>
    );
}
export default UserMenu;