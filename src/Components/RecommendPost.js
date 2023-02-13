import React from "react";
import { Link } from "react-router-dom";
import "./RecommendPost.css";
import Image from "./UIElements/Image";
function RecommendPost(props) {
  const date = new Date(props.date).toDateString()
  return (
    <div className={`recommendPost ${props.className}`} style={props.style}>
      <div className="recommendPost--content">
        {props.isUser ? (
          <Link className="user-detail" to={`/user/${props.uid}`}>
            <Image className="user-img" src={props.authorImg} />
            <p className="author-name">{props.name}</p>
          </Link>
        ) : (
          <div>
            <p className="createDate">{date}</p>
          </div>
        )}
        <Link to={`/post/${props.id}`} className="recommendPost--title">
          <p>{props.title}</p>
        </Link>
      </div>
      {(props.isImage && props.image) && 
      <div className="recommendPost--image">
      <Image className="img" src={props.image}/>
      </div>}
    </div>
  );
}

export default RecommendPost;
