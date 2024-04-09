import Nav from "../../components/Nav/Nav.tsx";
import './Profile.css'
import { useContext , useEffect, useState} from 'react';
import { UserContext } from '../../context/UserContext';

const Profile = () => {
    const {user, setUser} = useContext(UserContext);
    const [newPic, setNewPic] = useState('')

    useEffect(() => {
        if (user.username === ''){
          const loggedInUser = localStorage.getItem('user');
          if (loggedInUser) {
            console.log(loggedInUser);
            setUser({...user, 'username': loggedInUser})
          }
        }}, [user]);


    const save_picture = async () => {
        const response = await fetch('https://react-flask-bookies-app.onrender.com/auth_api/save_picture', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                username: user.username,
                profile_pic: newPic
            })
        })
        const data = await response.json()
        console.log(data)
        if (data.status === 'ok') {
            setUser({...user, profile_pic: newPic});
            localStorage.setItem('profile_pic', newPic);
        }}

  return (
    <>
        <Nav/>
        <h3>Profile Settings</h3>
        <div className="profile-container">
            {newPic ? 
            <img className="profile-img" src={newPic} alt="profile-img" /> 
             : <img className="profile-img" src={user.profile_pic} alt="profile-image" />}
            <h4>{user.username}</h4>
        </div>
        <input type="file" />
        <p onClick={() => {save_picture()}} className="save-btn">Save Changes</p>
        <div className="examples-div">
            <img onClick={()=>{setNewPic("https://cdn-icons-png.freepik.com/512/9218/9218712.png")}} className="example-img" src="https://cdn-icons-png.freepik.com/512/9218/9218712.png" alt="pink-person" />
            <img onClick={()=>{setNewPic("https://cdn2.iconfinder.com/data/icons/hobby-butterscotch-vol-3/512/Reading-512.png")}}className="example-img" src="https://cdn2.iconfinder.com/data/icons/hobby-butterscotch-vol-3/512/Reading-512.png" alt="generic-reader" />
            <img onClick={()=>{setNewPic("https://i.pinimg.com/236x/85/5b/2b/855b2b606c64c961da2922a240a43236.jpg")}} className="example-img" src="https://i.pinimg.com/236x/85/5b/2b/855b2b606c64c961da2922a240a43236.jpg" alt="pink-devil-horns" />
            <img onClick={()=>{setNewPic("https://i.pinimg.com/236x/f5/6b/ae/f56baef86aed6c261c422402aab59065.jpg")}} className="example-img" src="https://i.pinimg.com/236x/f5/6b/ae/f56baef86aed6c261c422402aab59065.jpg" alt="blue-sunglasses" />
            <img onClick={()=>{setNewPic("https://www.monkeyminionpress.com/cdn/shop/products/raccoon_23cc2abb-29f7-45f0-b004-4e2134eaee13_300x300.png?v=1702877813")}} className="example-img" src="https://www.monkeyminionpress.com/cdn/shop/products/raccoon_23cc2abb-29f7-45f0-b004-4e2134eaee13_300x300.png?v=1702877813" alt="raccoon" />
            <img onClick={()=>{setNewPic("https://render.fineartamerica.com/images/rendered/square-product/small/images/artworkimages/mediumlarge/3/cute-animal-faces-for-kids-cute-owl-face-drawing-licensed-art.jpg")}} className="example-img" src="https://render.fineartamerica.com/images/rendered/square-product/small/images/artworkimages/mediumlarge/3/cute-animal-faces-for-kids-cute-owl-face-drawing-licensed-art.jpg" alt="owl-face" />
            <img onClick={()=>{setNewPic("https://img.over-blog-kiwi.com/0/71/28/25/20140115/ob_fabc43_simons-cat.png")}} className="example-img" src="https://img.over-blog-kiwi.com/0/71/28/25/20140115/ob_fabc43_simons-cat.png" alt="cat-with-big-eyes" />
            <img onClick={()=>{setNewPic("https://store-images.s-microsoft.com/image/apps.59647.ad902cbd-dcf3-483e-ae85-dd4dbca116a7.c181b39b-17bd-4082-b322-2819f0286996.5562977f-6347-4776-a2a5-91ccf94dae17.png")}} className="example-img" src="https://store-images.s-microsoft.com/image/apps.59647.ad902cbd-dcf3-483e-ae85-dd4dbca116a7.c181b39b-17bd-4082-b322-2819f0286996.5562977f-6347-4776-a2a5-91ccf94dae17.png" alt="llama-face" />
            <img onClick={()=>{setNewPic("https://cdn01.justjaredjr.com/wp-content/uploads/headlines/2017/07/hp-jk-rowling-birthday-tweets.jpg")}} className="example-img" src="https://cdn01.justjaredjr.com/wp-content/uploads/headlines/2017/07/hp-jk-rowling-birthday-tweets.jpg" alt="harry-potter" />
            <img onClick={()=>{setNewPic("https://i.pinimg.com/474x/e5/03/8d/e5038de3eddd113b64fb4fb9e200c86e.jpg")}} className="example-img" src="https://i.pinimg.com/474x/e5/03/8d/e5038de3eddd113b64fb4fb9e200c86e.jpg" alt="ron-weasley" />
            <img onClick={()=>{setNewPic("https://i.etsystatic.com/25096843/r/il/b4524f/2618207121/il_300x300.2618207121_4kbu.jpg")}} className="example-img" src="https://i.etsystatic.com/25096843/r/il/b4524f/2618207121/il_300x300.2618207121_4kbu.jpg" alt="hermione" />
        </div>
    </>
  )
}
export default Profile