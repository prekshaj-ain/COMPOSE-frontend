import React from 'react'
import './RecommendBlogList.css'
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import Aside from './UIElements/Aside'
import RecommendPost from './RecommendPost';
function RecommendBlogList(props) {
    const {posts} = props;
  return (
    <Aside className="asideMenu">
        <div className="asideMenu--trendingPost">
            <h5><span className='Trending'><TrendingUpIcon fontSize='small'/></span>Trending on Compose</h5>
            <div className="trendingPosts">
            {
                posts.slice(0,5).map(post =>(
                    <RecommendPost 
                        key={post.id}
                        id={post.id}
                        uid={post.author.id}
                        authorImg = {post.author.image}
                        name = {post.author.username}
                        title = {post.title}
                        date={post.createdAt}
                        image={post.author.image}
                        isUser={true}
                    />
                ))
            }
            </div>
        </div>
        
    </Aside>
  )
}

export default RecommendBlogList