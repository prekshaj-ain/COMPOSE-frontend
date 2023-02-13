import React, { useState } from "react";
import "./BlogItem.css";
import { Link } from "react-router-dom";
import Image from "./UIElements/Image";
import Tag from "./UIElements/Tag";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import BackDrop from "./UIElements/BackDrop";
import Button from './FormElement/Button';
import { useContext } from "react";
import { AuthContext } from "./Context/auth-context";
import Modal from "./UIElements/Modal";
import axios from "../instance";
function BlogItem(props) {
  const auth = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const openHandler = () => {
    setIsOpen(true);
  };
  const closeHandler = () => {
    setIsOpen(false);
  };
  const showModalHandler = () => {
    setIsOpen(false);
    setShowDeleteModal(true);
  };
  const cancelDeleteHandler = ()=>{
    setShowDeleteModal(false);
  }
  const confirmDeleteHandler = async ()=>{
    setShowDeleteModal(false);
    try{
      await axios.delete('/post/'+ props.id);
      auth.refresh();
    }catch(err){
      console.log(err.message)
    }
  }
  let { title, desc } = props;
  desc = desc.replace(/<\/?[^>]+>/gi, "");
  if (title.length > 50) title = title.substring(0, 50) + "...";
  if (desc.length > 190) desc = desc.substring(0, 190) + "...";
  const date = new Date(props.date).toDateString();
  return (
    <>
      {isOpen && <BackDrop onClick={closeHandler} />}
      {showDeleteModal && (
        <React.Fragment>
          <BackDrop onClick={cancelDeleteHandler}/>
          <Modal footer={
            <React.Fragment>
              <Button inverse size="small" onClick={cancelDeleteHandler}>Cancel</Button>
              <Button danger size="small" onClick={confirmDeleteHandler}>Delete</Button>
            </React.Fragment>
          }>
          <h2>Delete Blog</h2>
          <p>Deletion is not a reversible process. your blog will be permanently deleted.</p>
          </Modal>
        </React.Fragment>

        )}
      <div className="blogItem-Post">
        <div className="blogItem-post--content">
          <Link to={`/user/${props.uid}`} className="userData">
            {props.userData && (
              <Image className="user-img" src={props.userImg} />
            )}
            <div className="info">
              {props.userData && <p className="author">{props.name}</p>}
              <p className="createDate">{date}</p>
            </div>
          </Link>
          <Link to={`/post/${props.id}`} className="postData">
            <h3 className="postData--heading">{title}</h3>
            <p className="postData--des">{desc}</p>
          </Link>
          <div className="MoreDetails">
            <Tag style={{ fontSize: ".6rem" }}>{props.categories[0]}</Tag>
            {auth.user === props.uid && (
              <>
                <MoreHorizIcon className="details" onClick={openHandler} />
                <div className={isOpen ? "menu" : "menu none"}>
                  <Link
                    to={`/post/new?edit=${props.id}`}
                    onClick={closeHandler}
                  >
                    Update
                  </Link>
                  <p onClick={showModalHandler}>Delete</p>
                </div>
              </>
            )}
          </div>
        </div>
        <div className="content-img">
          {props.image && <Image src={props.image} className="img" />}
        </div>
      </div>
    </>
  );
}

export default BlogItem;
