from . import auth_api
from flask import request, jsonify
from app.models import db, User
from werkzeug.security import check_password_hash

# Create User
@auth_api.post('/signup')
def signup_api():
    '''
    payload should include
    {
    "username": "string",
    "password": "string"
    }
    '''
    data = request.get_json()
    queried_user = User.query.filter(User.username == data['username']).first()
    if not queried_user:
        new_user = User(username = data['username'], password = data['password'])
        new_user.save()
        return jsonify({
            'status': 'ok',
            'message': 'User was successfully created'
        })
    else:
        return jsonify({
            'status': 'not ok',
            'message': 'Username already exists'
        })

@auth_api.post('/login')
def login_api():
    '''
    payload should include
    {
    "username": "string",
    "password": "string"
    }
    '''
    data = request.get_json()
    queried_user = User.query.filter(User.username == data['username']).first()
    if queried_user and check_password_hash(queried_user.password, data['password']):
        return jsonify({
            'status': 'ok',
            'message': 'Username and password are correct'
        })
    else:
        return jsonify({
            'status': 'not ok',
            'message': 'Username or password are incorrect'
        })
    
@auth_api.get('/all_users/<username>')
def get_users(username):
    queried_user = User.query.filter(User.username == username).first()
    if queried_user:
        users = User.query.filter(User.user_id != queried_user.user_id)
        notfollowing = []
        following = []
        for user in users:
            thisuser = {
                'username': user.username,
            }
            if user in queried_user.following:
                following.append(thisuser)
            else:
                notfollowing.append(thisuser)
        return jsonify({
            'status': 'ok',
            'message': 'Found users',
            'notfollowing': notfollowing,
            'following': following
        })
    else:
        return jsonify({
            'status': 'not ok',
            'message': 'User does not exist'
        })
    
@auth_api.post('/follow')
def follow():
    '''
    payload should include
    {
    "user": "string",
    "tofollow": "string"
    }
    '''
    data = request.get_json()
    print(data)
    queried_user = User.query.filter(User.username == data['user']).first()
    queried_to_follow = User.query.filter(User.username == data['tofollow']).first()
    if queried_user and queried_to_follow:
        queried_user.following.append(queried_to_follow)
        db.session.commit()
        return jsonify({
            'status': 'ok',
            'message': 'Following user'
        })
    else:
        return jsonify({
            'status': 'not ok',
            'message': 'One of the users does not exist'
        })
    
@auth_api.post('/unfollow')
def unfollow():
    '''
    payload should include
    {
    "user": "string",
    "unfollow": "string"
    }
    '''
    data = request.get_json()
    print(data)
    queried_user = User.query.filter(User.username == data['user']).first()
    queried_unfollow = User.query.filter(User.username == data['unfollow']).first()
    if queried_user and queried_unfollow:
        queried_user.following.remove(queried_unfollow)
        db.session.commit()
        return jsonify({
            'status': 'ok',
            'message': 'Not following user'
        })
    else:
        return jsonify({
            'status': 'not ok',
            'message': 'One of the users does not exist'
        })