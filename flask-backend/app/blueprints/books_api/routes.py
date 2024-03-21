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
    'thumbnail' = 'string'
    'publisher' = 'string'
    'published' = 'string'
    }
    '''
    data = request.get_json()
    queried_user = User.query.filter(User.username == data['username']).first()
    book = Book.query.filter(Book.title == data['title']).first()
    if not book:
        new_book = Book(title=data['title'], author=data['author'], thumbnail=data['thumbnail'], publisher=data['publisher'], published=data['published'])
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

# Show To Read shelf
@books_api.post('/show_to_read')
def show_to_read():
    '''
    payload should include
    {
    'username' = 'string'
    }
    '''
    data = request.get_json()
    print(data)
    
    queried_user = User.query.filter(User.username == data['username']).first()
    print(queried_user)
    to_read_shelf = []
    for book in queried_user.to_read_shelf:
        to_read_shelf.append(
            {'title': book.title,
                'author': book.author,
                'thumbnail': book.thumbnail,
                })
    print(to_read_shelf)
    return jsonify({
        'status': 'ok',
        'message': 'User was found',
        'to_read_shelf': to_read_shelf
        })
    
    # Show To Read shelf
@books_api.post('/remove_to_read')
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