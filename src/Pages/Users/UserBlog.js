import axios from '../../instance';
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import BlogList from '../../Components/BlogList';
import Aside from '../../Components/UIElements/Aside';
import BlogPage from '../../Components/UIElements/BlogPage';
import Section from '../../Components/UIElements/Section';
import Skeleton from '../../Components/UIElements/Skeleton';
import UserProfile from '../../Components/UIElements/UserProfile';
import './UserBlog.css'
function UserBlog() {
    const location = useLocation();
  const path = location.pathname.split("/")[2];
  const [posts,setPosts] = useState({});
  const [user,setUser] = useState({});
  const [loading,setLoading] = useState(true);
  useEffect(()=>{
    const fetchPost = async ()=>{
        const res = await axios.get('/post/user/'+ path);
        setPosts(res.data.posts);
        setLoading(false);
    }
    fetchPost();
  },[path])
  useEffect(()=>{
    const fetchUser = async ()=>{
        const res = await axios.get('/user/'+ path);
        setUser(res.data.user);
    }
    fetchUser();
  },[path])
  return(
    <BlogPage>
      {loading ? (
        <Section>
          <Skeleton type="feed"/>
        </Section>
      ) : (
      <BlogList posts={posts} heading={user.username} useData={false}/>
      )}
       <Aside>
            <UserProfile  
                id={user.id}
                username={user.username}
                image={user.image}
                about={user.about}
            />
      </Aside>
      
    </BlogPage>
  )
}

export default UserBlog