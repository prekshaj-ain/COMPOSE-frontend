import axios from '../../instance';
import React, { useContext, useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import { AuthContext } from '../../Components/Context/auth-context';
import Button from '../../Components/FormElement/Button';
import Input from '../../Components/FormElement/Input';
import Image from '../../Components/UIElements/Image'
import Skeleton from '../../Components/UIElements/Skeleton';
import './EditUser.css'
function EditUser(props) {
    const {user,refresh} = useContext(AuthContext);
    const [username,setUsername] = useState("");
    const [bio,setBio] = useState("");
    const [file,setFile] = useState(null);
    const [preview,setPreview] = useState(null);
    const [loading,setLoading] = useState(false);
    const [error,setError] = useState(null);
    const fileHandler = (e)=>{
        setFile(e.target.files[0]);
        setPreview(URL.createObjectURL(e.target.files[0]));
    }
    useEffect(()=>{
        const fetchData = async ()=>{
            const res = await axios.get('/user/'+user);
            setUsername(res.data.user.username);
            setBio(res.data.user.about);
            setFile(res.data.user.image);
            setPreview(res.data.user.image);
        }
        fetchData();
    },[user])
    const saveHandler = async ()=>{
        setLoading(true);
        setError(null);
        try{
            const formData = new FormData();
            formData.append("image", file);
            formData.append("about", bio);
            formData.append("username", username);
            await axios.patch('/user/'+user,formData);
            setLoading(false);
            refresh();
            props.onClick();
        }catch(err){
            setError(err.response.data.message);
            setLoading(false);
        }
    }
    const content = (
        <div className={props.className}>
            <h2>Profile Information</h2>
            {loading && <Skeleton type="spinner"/>}
            {(!loading && error) && <div className='err'>{error}</div>}
            <div className='image--section'>
                <p>Photo</p>
                <div id="image">
                    <Image className="user-img" src={file ? preview: ""} alt="" />
                    <Input 
                        className="auth-input"
                        inputStyle="auth-input-text"
                        onChange={fileHandler}
                        element="input"
                        name="file"
                        type="file"
                        id="file"
                        label="Upload"
                        labelStyle={{color:"green",cursor:"pointer" }}
                        style={{ display: "none" }}
                    />
                    <p style={{color: "#ab0d0d",cursor:"pointer"}} onClick={()=>{setFile("")}}>Remove</p>
                </div>
            </div>
            <div className="name--section">
                <p>Name</p>
                <Input 
                    className="auth-input"
                    inputStyle="input-text"
                    labelStyle={{"display":"none"}}
                    element="input"
                    type="text"
                    label="Username"
                    id="username"
                    name="Username"
                    pattern="^.{3,20}"
                    value={username}
                    onChange={(e)=>{setUsername(e.target.value)}}
                    errorMsg="Enter a valid username minimum 3 characters and maximum 20 character"
                    required
                />
            </div>
            <div className="bio--section">
                <p>Bio</p>
                <Input 
                    className="auth-input"
                    inputStyle="input-text"
                    labelStyle={{"display":"none"}}
                    element="input"
                    type="text"
                    label="about"
                    id="about"
                    name="About"
                    pattern="^.{0,120}"
                    value={bio}
                    onChange={(e)=>{setBio(e.target.value)}}
                    errorMsg="Your bio should not exceed 120 characters"
                />
            </div>
            <div className="buttons">
                <Button inverse size="small" className="btn" onClick={props.onClick}>Cancel</Button>
                <Button size="small" className="btn" onClick={saveHandler}>Save</Button>
            </div>
        </div>
    )
  return ReactDOM.createPortal(content,document.getElementById('drawer-hook'));
}

export default EditUser