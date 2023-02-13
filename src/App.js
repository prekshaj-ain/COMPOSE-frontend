import React, { Suspense, useEffect, useState } from 'react'
import {
  Switch,
  Route,
  Redirect,
  BrowserRouter as Router
} from 'react-router-dom'
import Blogs from './Pages/Blogs/Blogs';
// import Auth from './Pages/Users/Auth';
// import SingleBlog from './Pages/Blogs/SingleBlog';
// import NewBlog from './Pages/Blogs/NewBlog';
// import UserBlog from './Pages/Users/UserBlog';
import MainNav from './Components/Navigation/MainNav';
import { AuthContext } from './Components/Context/auth-context';
import { useCallback } from 'react';
import axios from './instance.js';
import SearchResult from './Components/SearchResult';
import Skeleton from './Components/UIElements/Skeleton';

const Auth = React.lazy(()=>import('./Pages/Users/Auth'));
const SingleBlog = React.lazy(()=>import('./Pages/Blogs/SingleBlog'));
const NewBlog = React.lazy(()=>import('./Pages/Blogs/NewBlog'));
const UserBlog = React.lazy(()=>import('./Pages/Users/UserBlog'));


let logoutTimer;
function App() {
  const [user,setUser] = useState(null);
  const [expireTime,setExpireTime] = useState();
  const login = useCallback((uid,expireTime)=>{
    const tokenExpire = expireTime || new Date(new Date().getTime() + 20 * 3600 * 1000)
    setExpireTime(tokenExpire)
    setUser(uid);
    localStorage.setItem("user", JSON.stringify({user:uid, expiresIn:tokenExpire.toISOString()}))
  },[])
  const logout = useCallback(()=>{
    const Logout = async ()=>{
      await axios.post('/user/logout');
      localStorage.removeItem("user");
      setUser(null);
      setExpireTime(null);
    }
    Logout();
  },[])
  const refresh = ()=>{
    window.location.reload(false);
  }
  useEffect(()=>{
    const storedData = JSON.parse(localStorage.getItem("user"))
    if(storedData && storedData.user && new Date(storedData.expiresIn) > new Date()){
      login(storedData.user, new Date(storedData.expiresIn))
    }
  },[login])
  useEffect(()=>{
    if(user && expireTime){
      const remainingTime = expireTime.getTime() - new Date().getTime();
      logoutTimer = setTimeout(logout,remainingTime);
    }else{
      clearTimeout(logoutTimer);
    }
  },[user,expireTime,logout])
  let routes;
  if(!!user){
    routes = (
      <Switch>
        <Route path='/' exact>
          <Blogs/>
        </Route>
        <Route path='/user/:id'>
          <UserBlog/>
        </Route>
        <Route path='/post/new'>
          <NewBlog/>
        </Route>
        <Route path='/post/:id' >
          <SingleBlog/>
        </Route>
        <Route path='/search'>
          <SearchResult />
        </Route>
        <Redirect to="/"/>
      </Switch>
    )
  }else{
    routes = (
      <Switch>
        <Route path='/' exact>
          <Blogs/>
        </Route>
        <Route path='/user/:id'>
          <UserBlog/>
        </Route>
        <Route path='/post/new' exact>
          <Auth/>
        </Route>
        <Route path='/post/:id'>
          <SingleBlog/>
        </Route>
        <Route path='/search'>
          <SearchResult />
        </Route>
        <Route path='/login' exact>
          <Auth/>
        </Route>
        <Redirect to='/login' />
      </Switch>
    )
  }
  return (
    <AuthContext.Provider value={{user:user,login:login,logout:logout,refresh:refresh}}>
    <Router>
    <MainNav />
      <Suspense
        fallback={
          <Skeleton type="spinner"/>
        }  
      >
      {routes}
      </Suspense>
    </Router>
    </AuthContext.Provider>
  )
}

export default App