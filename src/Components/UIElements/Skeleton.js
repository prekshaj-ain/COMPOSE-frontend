import { CircularProgress } from '@mui/material';
import React from 'react'
import './Skeleton.css'
export default function Skeleton({type, className}) {
    const COUNTER = 3;
    const FeedSkeleton = ()=>(
        <div className="postSk">
            <div className="postSk--info">
                <div className="info--user"></div>
                <div className="info--detail" />
                <div className="info--detail" />
            </div>
            <div className="postSk--image"></div>
        </div>
    );
    const RecommendFeed = ()=>(
        <div className="circle">
        <CircularProgress color="inherit"/>
        </div>
    )
    const Single = ()=>(
            <div className="singleSk">
                <div className="userSk">
                    <div className="iconSk"></div>
                    <div>
                        <div className="info--detail"></div>
                        <div className="info--detail"></div>
                    </div>
                </div>
                <div className="singlepostSk">
                    <div className="headingSk"></div>
                    <div className="pictureSk"></div>
                    <div className="contentSk"></div>
                    <div className="contentSk"></div>
                    <div className="contentSk"></div>
                </div>
            </div>
    )
    if(type === 'feed'){
        return Array(COUNTER).fill(<FeedSkeleton />)
    }
    if(type === 'single'){
        return (<Single />)
    }
    if(type === 'spinner'){
        return (<RecommendFeed className={className}/>)
    }
}

