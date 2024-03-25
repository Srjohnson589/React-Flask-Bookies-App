import Nav from '/src/components/Nav/Nav.tsx';
import './Friends.css';
import { useContext , useEffect, useState} from 'react';
import { Link } from 'react-router-dom'
import UserContextProvider, { UserContext } from '../../context/UserContext';


const Friends = () => {

    const {user, setUser} = useContext(UserContext);
    const [allUsers, setAllUsers] = useState([]);
    const [following, setFollowing] = useState([]);

    useEffect(() => {
        if (user.username === ''){
          const loggedInUser = localStorage.getItem('user');
          if (loggedInUser) {
            console.log(loggedInUser);
            setUser({...user,'username': loggedInUser})
          }
        }}, [user]);

    useEffect(() => {
        if (allUsers.length === 0){
            getUsers(user.username)
        }}, [allUsers])

    const getUsers = async (u) => {
        const response = await fetch(`http://127.0.0.1:5000/auth_api/all_users/${u}`, {
          method: 'GET',
          headers: {'Content-Type': 'application/json'},
        })
        const data = await response.json();
        console.log(data);
        setAllUsers(data.notfollowing);
        setFollowing(data.following);
    }

    const follow = async (tofollow) => {
        const response = await fetch("http://127.0.0.1:5000/auth_api/follow", {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                user: user.username,
                tofollow: tofollow
            })
        })
        const data = await response.json();
        console.log(data);
        getUsers(user.username);
    }

    const unfollow = async (u) => {
        const response = await fetch(`http://127.0.0.1:5000/auth_api/unfollow`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                user: user.username,
                unfollow: u
            })
        })
        const data = await response.json();
        console.log(data);
        getUsers(user.username);
    }

  return (
    <>
        <Nav/>
        <h3>Following</h3>
        <div className="users-container">
            {following && following.map(
                (otheruser, idx) => 
                <>
                <div className="profile-card" key={idx}>
                    {otheruser.profile_pic ? 
                    <>
                    <Link to={"/FriendsBooks"} state={{ friend: `${otheruser.username}`}}>
                        <img className="following profile-pic" src={otheruser.profile_pic} alt="" /> 
                    </Link>
                    </>
                    : 
                    <>
                    <Link to={"/FriendsBooks"} state={{ friend: `${otheruser.username}`}}>
                        <img className="following profile-pic" src="https://cdn2.iconfinder.com/data/icons/hobby-butterscotch-vol-3/512/Reading-512.png" alt="" />
                    </Link>
                    </>}
                    <p className="user">{otheruser.username}</p>
                    <p onClick={()=> {unfollow(otheruser.username)}} className="follow-btn">Unfollow</p>
                </div>
                </>
            )}
        </div>

        <h3 onClick={() => {getUsers(user.username)}}>All users</h3>
        <div className="users-container">
            {allUsers && allUsers.map(
                (otheruser, idx) => 
                <>
                <div className="profile-card" key={idx}>
                    {otheruser.profile_pic ? 
                    <img className="profile-pic" src={otheruser.profile_pic} alt="" /> 
                    : <img className="profile-pic" src="https://cdn2.iconfinder.com/data/icons/hobby-butterscotch-vol-3/512/Reading-512.png" alt="" />}
                    <p className="user">{otheruser.username}</p>
                    <p onClick={()=> {follow(otheruser.username)}} className="follow-btn">Follow</p>
                </div>
                </>
            )}
        </div>
    </>
  )
}
export default Friends