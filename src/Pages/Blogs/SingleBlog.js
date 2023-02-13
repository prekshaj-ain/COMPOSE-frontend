import React, { useEffect, useState } from "react";
import User from "../../Components/User";
import "./SingleBlog.css";
import Image from "../../Components/UIElements/Image";
import { useLocation } from "react-router-dom";
import axios from "../../instance";
import BlogPage from "../../Components/UIElements/BlogPage";
import Section from "../../Components/UIElements/Section";
import Aside from "../../Components/UIElements/Aside";
import Tag from "../../Components/UIElements/Tag";
import UserProfile from "../../Components/UIElements/UserProfile";
import RecommendPost from "../../Components/RecommendPost";
import Skeleton from "../../Components/UIElements/Skeleton";

function SingleBlog() {
  const location = useLocation();
  const path = location.pathname.split("/")[2];
  const [loading, setLoading] = useState(true);
  const [post, setPost] = useState({});
  const [similarPost, setSimilarPost] = useState({});
  useEffect(() => {
    const fetchSimilar = async () => {
      const similar = await axios.get("/post/?similar=" + path);
      setSimilarPost(similar.data.posts);
    };
    fetchSimilar();
  }, [path]);
  useEffect(() => {
    const fetchPost = async () => {
      const res = await axios.get("/post/" + path);
      setPost(res.data.post);
      setLoading(false);
    };
    fetchPost();
  }, [path]);
  return (
    <BlogPage>
      {loading ? (
        <Section className="singlePost">
          <Skeleton type="single" />
        </Section>
      ) : (
        <Section className="singlePost">
          <User
            name={post.author.username}
            uid={post.author.id}
            profile={post.author.image}
            time={post.createdAt}
          />
          <div className="content">
            <h1 className="content--title">{post.title}</h1>
            {!!post.image && (
              <Image className="content--image" src={post.image} />
            )}
            <p
              className="content--para"
              dangerouslySetInnerHTML={{ __html: post.description }}
            />
            <div id="Tags">
              {post.categories &&
                post.categories.map((cat, index) => (
                  <Tag key={index}>{cat}</Tag>
                ))}
            </div>
          </div>
        </Section>
      )}
      <Aside>
        {!loading && (
          <>
            <UserProfile
              image={post.author.image}
              username={post.author.username}
              about={post.author.about}
              id={post.author.id}
            />

            {Object.keys(similarPost).length !== 0 && (
              <div className="asideMenu--trendingPost">
                <h5>More from {post.author.username}</h5>
                <div className="trendingPosts">
                  {similarPost.map((post) => (
                    <RecommendPost
                      key={post.id}
                      id={post.id}
                      uid={post.author}
                      title={post.title}
                      date={post.createdAt}
                      image={post.image}
                      isUser={false}
                      isImage={true}
                    />
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </Aside>
    </BlogPage>
  );
}

export default SingleBlog;
