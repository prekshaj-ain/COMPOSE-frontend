import axios from '../instance';
import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import './SearchResult.css';
import Aside from './UIElements/Aside';
import BlogPage from './UIElements/BlogPage';
import Section from './UIElements/Section';
import SearchResultBlog from '../Pages/Blogs/SearchResultBlog';
import SearchResultUser from '../Pages/Users/SearchResultUser';
import RecommendPost from './RecommendPost';
import Image from './UIElements/Image';
import { Link } from 'react-router-dom';


function SearchResult() {
  const keyword = useLocation().search.split('=')[1];
  const [user,setUser] = useState([]);
  const [post,setPost] = useState([]);
  const [userError,setUserError] = useState(null);
  const [postError,setPostError] = useState(null);
  const [showPost,setShowPost] = useState(true);
  const [showUser,setShowUser] = useState(false);
  useEffect(()=>{
    setPostError(null);
    const postResult = async ()=>{
      try{
        const res = await axios.get('/search/post?q='+keyword);
        setPost(res.data);
      }catch(err){
        setPostError(err.response.data.message)
      }
    }
    postResult();
  },[keyword])
  useEffect(()=>{
    setUserError(null);
    const userResult = async ()=>{
      try{
        const res = await axios.get('/search/user?q='+keyword);
        setUser(res.data);
      }catch(err){
        setUserError(err.response.data.message)
      }
    }
    userResult();
  },[keyword])
  const postHandler = ()=>{
    setShowUser(false);
    setShowPost(true);
  }
  const userHandler = ()=>{
    setShowPost(false);
    setShowUser(true);
  }
  return (
    <BlogPage>
    <Section>
    <div className='search'>
      <h1>Results for <span>{keyword}</span></h1>
      <ul className='options'>
        <NavLink className="option" to={`/search/blogs?q=${keyword}`} activeClassName="selected" onClick={postHandler}>Blogs</NavLink>
        <NavLink className="option" to={`/search/users?q=${keyword}`} activeClassName="selected" onClick={userHandler}>Users</NavLink>
      </ul>
    </div>
      {showPost && <SearchResultBlog error={postError} post={post} />}
      {showUser && <SearchResultUser error={userError} user={user} />}
    </Section>
    <Aside>
      {(!showPost && !postError) && 
        <div className="asideMenu--trendingPost">
        <h5><span className='Trending'>Blogs matching {keyword}</span></h5>
            <div className="trendingPosts">
            {
                post.slice(0,3).map(p =>(
                    <RecommendPost
                        key={p.id}
                        id={p.id}
                        uid={p.author.id}
                        authorImg = {p.author.image}
                        name = {p.author.username}
                        title = {p.title}
                        date={p.createdAt}
                        image={p.image}
                        isUser={true}
                        isImage={true}
                    />
                ))
            }
        </div>
        </div>
      }
      {(!showUser && !userError) && 
        <div className="asideMenu--trendingPost">
        <h5><span className='Trending'>People matching {keyword}</span></h5>
        <div className='trendingPosts'>
          {user.slice(0,3).map(u => (
            <Link to={`/user/${u.id}`} key={u.id} className="User link">
              <Image src={u.image} className="user-img" />
              <div className="userInfo">
                <p>{u.username}</p>
                <p>{u.about.substring(0,20)}</p>
              </div>
            </Link>
          ))}
        </div>
        </div>
      }
    </Aside>
    </BlogPage>
  )
}

export default SearchResult