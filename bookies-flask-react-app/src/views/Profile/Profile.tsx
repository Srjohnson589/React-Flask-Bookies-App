import Nav from "/src/components/Nav/Nav.tsx";
import './Profile.css'
import { useContext , useEffect, useState} from 'react';
import UserContextProvider, { UserContext } from '../../context/UserContext';

const Profile = () => {
    const {user, setUser} = useContext(UserContext);

    useEffect(() => {
        if (user.username === ''){
          const loggedInUser = localStorage.getItem('user');
          if (loggedInUser) {
            console.log(loggedInUser);
            setUser({'username': loggedInUser})
          }
        }}, [user]);

  return (
    <>
        <Nav/>
        <h3>Profile Settings</h3>
        <div className="profile-container">
            <img className="profile-img" src="https://png.pngtree.com/png-clipart/20210915/ourmid/pngtree-user-avatar-login-interface-abstract-blue-icon-png-image_3917504.jpg" alt="profile-image" />
            <h4>{user.username}</h4>
        </div>
        <input type="file"/>
        <div className="examples-div">
            <img className="example-img" src="https://i.pinimg.com/236x/85/5b/2b/855b2b606c64c961da2922a240a43236.jpg" alt="" />
            <img className="example-img" src="https://i.pinimg.com/236x/f5/6b/ae/f56baef86aed6c261c422402aab59065.jpg" alt="" />
            <img className="example-img" src="https://www.monkeyminionpress.com/cdn/shop/products/raccoon_23cc2abb-29f7-45f0-b004-4e2134eaee13_300x300.png?v=1702877813" alt="" />
            <img className="example-img" src="https://render.fineartamerica.com/images/rendered/square-product/small/images/artworkimages/mediumlarge/3/cute-animal-faces-for-kids-cute-owl-face-drawing-licensed-art.jpg" alt="" />
            <img className="example-img" src="https://img.over-blog-kiwi.com/0/71/28/25/20140115/ob_fabc43_simons-cat.png" alt="" />
            <img className="example-img" src="https://store-images.s-microsoft.com/image/apps.59647.ad902cbd-dcf3-483e-ae85-dd4dbca116a7.c181b39b-17bd-4082-b322-2819f0286996.5562977f-6347-4776-a2a5-91ccf94dae17.png" alt="" />
            <img className="example-img" src="https://render.fineartamerica.com/images/rendered/square-product/small/images/artworkimages/mediumlarge/3/cartoon-chinese-dragon-head-ancient-tradition-culture-mouth-face-noirty-designs.jpg" alt="" />
            <img className="example-img" src="https://i.pinimg.com/736x/21/7f/a3/217fa3019ed8b8bc35524df34c45fd58.jpg" alt="" />
            <img className="example-img" src="https://cdn01.justjaredjr.com/wp-content/uploads/headlines/2017/07/hp-jk-rowling-birthday-tweets.jpg" alt="" />
            <img className="example-img" src="https://i.pinimg.com/474x/e5/03/8d/e5038de3eddd113b64fb4fb9e200c86e.jpg" alt="" />
            <img className="example-img" src="https://i.etsystatic.com/25096843/r/il/b4524f/2618207121/il_300x300.2618207121_4kbu.jpg" alt="" />
        </div>
    </>
  )
}
export default Profile