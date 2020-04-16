import React from "react";
import Avatar from "../avatar/avatar";
import NavBar from "../navbar/navbar_container";
import { Link } from "react-router-dom";

class Following extends React.Component{
    constructor(props){
        super(props);
    }

    componentDidMount(){
        this.props.fetchAllUsers();
    }

    render(){
        let followingLength = 0;
        let usersLi = this.props.users.map((user) => {
            if (user.followers.includes(this.props.currentUser.id)){
                followingLength += 1;
                return(
                    <li key = {user.id}>
                    <span>
                        <Avatar
                            authorId = {user.id}
                            openModal = {() => this.props.openModal("User Show")}
                            avatarUrl = {user.avatarUrl}
                        />
                    <span className = "following-user">{user.username}</span></span>
                    <button className = "unfollow-but" onClick = {() => this.props.unfollow(user.id)}>Unfollow</button>
                    </li>
                )
            }
        });
        return(
            <div>
                <NavBar />
                <div className = "following-container">
                    <Link to = "/following" className = "following-length">Following {followingLength} Tumblrs</Link>
                        <ul className = "following-list">
                            {usersLi}
                        </ul>
                </div>
            </div>
        )
    }
}

export default Following;