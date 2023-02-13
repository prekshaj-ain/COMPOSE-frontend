import React, { useContext, useEffect, useState } from "react";
import Input from "../../Components/FormElement/Input";
import Button from "../../Components/FormElement/Button";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { AuthContext } from "../../Components/Context/auth-context";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.bubble.css";
import "../../Components/TextEditor.css";
import "./NewBlog.css";
import axios from "../../instance";
import { useHistory, useLocation } from "react-router-dom";
import Modal from "../../Components/UIElements/Modal";
import BackDrop from "../../Components/UIElements/BackDrop";
import CloseIcon from "@mui/icons-material/Close";
import "../../Components/UIElements/InputTag.css";
import Skeleton from "../../Components/UIElements/Skeleton";
function NewBlog() {
  const [user, setUser] = useState();
  const [openModal, setOpenModal] = useState(false);
  const history = useHistory();
  const postId = useLocation().search.split("=")[1];
  const auth = useContext(AuthContext);
  const [title, setTitle] = useState("");
  const [des, setDes] = useState("");
  const [cat, setCat] = useState([]);
  const [file, setFile] = useState(null);
  const [preview,setPreview] = useState();
  const [loading,setLoading] = useState(false);
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get("/user/" + auth.user);
        setUser(res.data.user.username);
      } catch (err) {
        console.log(err.message);
      }
    };
    fetchUser();
  }, [auth.user]);
  const fileHandler = (e)=>{
    setFile(e.target.files[0]);
    setPreview(URL.createObjectURL(e.target.files[0]));
  }
  const InputHandler = (e)=>{ 
    e.target.style.height = '45px';
    e.target.style.height = `${e.target.scrollHeight}px`
    setTitle(e.target.value)
  }
  useEffect(() => {
    if (postId) {
      const fetchPost = async () => {
        const res = await axios.get("/post/" + postId);
        setTitle(res.data.post.title);
        setDes(res.data.post.description);
        setCat(res.data.post.categories);
        setFile(res.data.post.image);
        setPreview(`${process.env.REACT_APP_BACKEND_URL}/${res.data.post.image}`);
      };
      fetchPost();
    }else{
      setTitle("");
        setDes("");
        setCat([]);
        setFile("");
    }
  }, [postId]);
  const desVal = des.replace(/<\/?[^>]+>/gi, "");
  let isEmpty = !title || !desVal;
  const openModalHandler = () => {
    setOpenModal(true);
  };
  const closeModalHandler = () => {
    setOpenModal(false);
  };
  const clickHandler = async () => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("image", file);
      formData.append("title", title);
      formData.append("description", des);
      formData.append("categories", cat);
      const res = postId
        ? await axios.patch("/post/" + postId, formData)
        : await axios.post("/post/", formData);
        setLoading(false);
      history.push("/post/"+res.data.post.id);
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  };
  const modules = {
    toolbar: [["bold", "italic", "underline", "strike"]],
  };
  const placeholder = "Compose an epic...";
  const removeHandler = (indexToRemove) => {
    let newCat = cat.filter((_,index)=> index !== indexToRemove );
    setCat(newCat);
  };
  const addTags = (e) => {
    if(e.target.value.trim() === ''){
        return;
    }
    if(cat.length === 5){
        return;
    }
    setCat([...cat, e.target.value.toLowerCase()]);
    e.target.value = "";
  };

  const formats = ["bold", "italic", "underline", "strike"];
  return (
    <React.Fragment>
      {openModal && (
        <React.Fragment>
          <BackDrop onClick={closeModalHandler} />
          <Modal
            footer=<Button
              size="small"
              onClick={clickHandler}
              className="confirmButton"
            >
              Publish
            </Button>
          >
            {loading && <Skeleton type="spinner"/>}
            <h5>Publishing to: {user}</h5>
            <p style={{ color: "#666" }}>
              Add Topics (up to 5) so readers can know what your story is about.
            </p>
            <div className="inputTag">
              {cat && cat.map((tag, index) => (
                <div className="tagInput" key={index}>
                  <p>{tag}</p>
                  <CloseIcon
                    className="closeIcon"
                    onClick={() => removeHandler(index)}
                  />
                </div>
              ))}
              {cat.length < 5 && (
                <input
                  type="text"
                  placeholder="Add topics here..."
                  className="EnterTag"
                  onKeyUp={(e) => (e.key === "Enter" ? addTags(e) : null)}
                />
              )}
            </div>
          </Modal>
        </React.Fragment>
      )}
      <div className="new-blog">
        {file && (
          <img
            className="newBlog--Image"
            src={preview}
            alt=""
          />
        )}
        <div className="new-blog--content content">
          <div className="writeBlog">
            <Input
              element="input"
              label={<AddCircleOutlineIcon color="disable" fontSize="large" />}
              id="fileInput"
              type="file"
              style={{ display: "none" }}
              labelStyle={{ cursor: "pointer" }}
              onChange={fileHandler}
            />
            <textarea
              className="title-input"
              onChange={InputHandler}
              placeholder="Title"
              rows={3}
              value={title}
            />
          </div>
          <div className="editor">
            <ReactQuill
              className="editor"
              name="description"
              theme="bubble"
              modules={modules}
              formats={formats}
              placeholder={placeholder}
              onChange={setDes}
              value={des}
            />
          </div>
        </div>
        <Button
          size="small"
          className="publishButton"
          onClick={openModalHandler}
          disabled={isEmpty}
        >
          Publish
        </Button>
      </div>
    </React.Fragment>

  );
}

export default NewBlog;
