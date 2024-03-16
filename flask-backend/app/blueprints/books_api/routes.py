from . import books_api
from flask import request, jsonify
from app.models import db, User, Book


# Add to To Read shelf
@books_api.post('/add_to_read')
def add_to_read():
    '''
    payload should include
    {
    'username' = 'string'
    'title' = 'string'
    'author' = 'string'
    'img_small' = 'string'
    'img_large' = 'string'
    }
    '''
    data = request.get_json()
    try:
        queried_user = User.query.filter(User.username == data['username']).first()
        if not Book.query.filter(Book.title == data['title']).first():
            new_book = Book(title=data['title'], author=data['author'], img_small=data['img_small'], img_large=data['img_large'])
            new_book.save()
        queried_book = Book.query.filter(Book.title == data['title']).first()
        if queried_book not in queried_user.to_read_shelf:
            queried_user.to_read_shelf.append(queried_book)
            db.session.commit()
            return jsonify({
                'status': 'ok',
                'message': 'Book was added \'to read\''
                })
        else:
            return jsonify({
                'status': 'not ok',
                'message': 'Book was already in user\'s \'to read\''
                })
    except:
        return jsonify({
                'status': 'not ok',
                'message': 'Sent data was faulty'
                })

# Show To Read shelf
@books_api.get('/show_to_read')
def show_to_read():
    '''
    payload should include
    {
    'username' = 'string'
    }
    '''
    data = request.get_json()
    try:
        queried_user = User.query.filter(User.username == data['username']).first()
        to_read_shelf = []
        for book in queried_user.to_read_shelf:
            to_read_shelf.append(
                {'title': book.title,
                 'author': book.author
                 })
        return jsonify({
            'status': 'ok',
            'message': 'User was found',
            'to_read_shelf': to_read_shelf
            })
    except:
        return jsonify({
                'status': 'not ok',
                'message': 'No user found'
                })
    
    # Show To Read shelf
@books_api.delete('/remove_to_read')
def remove_to_read():
    '''
    payload should include
    {
    'username' = 'string'
    'title' = 'string'
    }
    '''
    data = request.get_json()
    try:
        queried_user = User.query.filter(User.username == data['username']).first()
        queried_book = Book.query.filter(Book.title == data['title']).first()
        if queried_book in queried_user.to_read_shelf:
            queried_user.to_read_shelf.remove(queried_book)
            db.session.commit()
            return jsonify({
                'status': 'ok',
                'message': 'Book was removed from \'to read\' shelf',
                })
        else:
            return jsonify({
                    'status': 'ok',
                    'message': 'Book was not in \'to read\' shelf',
                    })
    except:
        return jsonify({
                'status': 'not ok',
                'message': 'No user found'
                })