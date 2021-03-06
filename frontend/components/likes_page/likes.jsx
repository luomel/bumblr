import React from "react";
import Navbar from '../navbar/navbar_container';
import PostItem from "../posts/post_item_container";
import Avatar from "../avatar/avatar";

class Likes extends React.Component{
    constructor(props){
        super(props);
    }

    componentDidMount(){
        this.props.fetchAllPosts();
        this.props.fetchAllUsers();
    }

    renderRecommendedBlogs(){
        let unfollowedUsers = [];
        this.props.users.forEach((user) => {
           if (!user.followers.includes(this.props.currentUser.id) && user.id !== this.props.currentUser.id){
               unfollowedUsers.push(user);
           }
        })
        
        const usersList = unfollowedUsers.map((user) => {
            let avatarUrl;
            if(!user.avatarUrl){
                avatarUrl = window.defaultAvatar;
            } else{
                avatarUrl = user.avatarUrl;
            }
            return(
            <li className = "rec-users" key = {user.id}>
                <Avatar 
                    authorId = {user.id}
                    openModal = {() => this.props.openModal("User Show")}
                    avatarUrl = {avatarUrl}
                />
                <span className = "user-show-username" authorid = {user.id} onClick = {() => this.props.openModal("User Show")}>{user.username}</span>
                <button className = "follow-button" onClick = { () => this.props.follow(user.id) }>Follow</button>
            </li>
            )
        });

        return(
            <ul className = "recommended-blogs">
                <h1 className = "rec-blogs-title">Recommended Blogs</h1>
                {usersList}
            </ul>
        )
    }
    renderLikes(){
        let likeLength = 0;
        let posts = this.props.currentUser.likes.map((post_id) => {
            likeLength += 1;
            return(
                <PostItem
                    key = {post_id}
                    post = {this.props.posts[post_id]}
                    users = {this.props.users}
                    authoringUser = {this.props.posts[post_id].author}
                    deletePost = {this.props.deletePost}
                />
                )
        })
        let sortPosts = posts.reverse();
        if (likeLength > 0){
            return( 
                <div className = "liked-posts-container">
                    <h1 className = "like-length">{likeLength} {likeLength === 1 ? "like" : "likes"}</h1>
                    {sortPosts}
                </div>
            )
        } else{
            return(
                <div className = "liked-posts-container">
                    <h1 className = "like-length">{likeLength} likes</h1>
                    <div className = "no-likes">No posts available.</div>
                </div>
            )
        }
    }

    renderRadar(){
        let radarPosts = Object.values(this.props.posts).filter((post) => post.likers.length >= 3 && post.author.id !== this.props.currentUser.id)
        let radar;
        if (radarPosts.length > 0){
            radar = radarPosts[0];
            return(
                <div className = "radar-post">
                    <h1 className = "radar-title">Radar</h1>
                    <PostItem
                        key = {radar.id}
                        post = {radar}
                        authoringUser = {radar.author}
                    />
                </div>
            )
        }
    }
 
    render(){
        return(
        <div className="likes-container">
                <Navbar />
            <section className="empty-width"></section>
                {this.renderLikes()}
            <section className = "dashboard-right">
                {this.renderRecommendedBlogs()}
                {this.renderRadar()}
            </section>
        </div>
        )
    }
}

export default Likes;