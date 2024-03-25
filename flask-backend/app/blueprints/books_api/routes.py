from . import books_api
from flask import request, jsonify
from app.models import db, User, Book


##### Known issue: if missing certain payload info like "publisher" will not save book.

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
    'description' = 'string'
    'googlerating' = 'number'
    }
    '''
    data = request.get_json()
    print(data)
    queried_user = User.query.filter(User.username == data['username']).first()
    book = Book.query.filter(Book.title == data['title']).first()
    try:
        rating = data['googlerating']
        new_book = Book(title=data['title'], 
                        author=data['author'], 
                        thumbnail=data['thumbnail'], 
                        publisher=data['publisher'], 
                        published=data['published'],
                        description=data['description'],
                        googlerating=data['googlerating'])
        new_book.save()
    except:
        new_book = Book(title=data['title'], 
                        author=data['author'], 
                        thumbnail=data['thumbnail'], 
                        publisher=data['publisher'], 
                        published=data['published'],
                        description=data['description'])
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
@books_api.post('/show_shelves')
def show_shelves():
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
    to_read = []
    current = []
    read = []
    if queried_user.to_read_shelf:
        for book in queried_user.to_read_shelf:
            to_read.append(
                {'title': book.title,
                'author': book.author,
                'thumbnail': book.thumbnail,
                })
    if queried_user.current_shelf:
        for book in queried_user.current_shelf:
            current.append(
                {'title': book.title,
                    'author': book.author,
                    'thumbnail': book.thumbnail,
                    })
    if queried_user.read_shelf:
        for book in queried_user.read_shelf:
            read.append(
                {'title': book.title,
                    'author': book.author,
                    'thumbnail': book.thumbnail,
                    })
    print(current)
    return jsonify({
        'status': 'ok',
        'message': 'User was found',
        'to_read_shelf': to_read,
        'current_shelf': current,
        'read_shelf': read
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
    

@books_api.post('/add_current')
def add_current():
    '''
    payload should include
    {
    'username' = 'string'
    'title' = 'string'
    'author' = 'string'
    'thumbnail' = 'string'
    'publisher' = 'string'
    'published' = 'string'
    'description' = 'string'
    'googlerating' = 'number
    }
    '''
    data = request.get_json()
    queried_user = User.query.filter(User.username == data['username']).first()
    book = Book.query.filter(Book.title == data['title']).first()
    try:
        rating = data['googlerating']
        new_book = Book(title=data['title'], 
                        author=data['author'], 
                        thumbnail=data['thumbnail'], 
                        publisher=data['publisher'], 
                        published=data['published'],
                        description=data['description'],
                        googlerating=data['googlerating'])
        new_book.save()
    except:
        new_book = Book(title=data['title'], 
                        author=data['author'], 
                        thumbnail=data['thumbnail'], 
                        publisher=data['publisher'], 
                        published=data['published'],
                        description=data['description'])
        new_book.save()
    queried_book = Book.query.filter(Book.title == data['title']).first()
    if queried_book not in queried_user.current_shelf:
        queried_user.current_shelf.append(queried_book)
        db.session.commit()
        return jsonify({
            'status': 'ok',
            'message': 'Book was added to \'current\''
            })
    else:
        return jsonify({
            'status': 'not ok',
            'message': 'Book was already in user\'s \'current\' shelf'
            })
    
@books_api.post('/remove_current')
def remove_current():
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
        if queried_book in queried_user.current_shelf:
            queried_user.current_shelf.remove(queried_book)
            db.session.commit()
            return jsonify({
                'status': 'ok',
                'message': 'Book was removed from \'current\' shelf',
                })
        else:
            return jsonify({
                    'status': 'ok',
                    'message': 'Book was not in \'current\' shelf',
                    })
    except:
        return jsonify({
                'status': 'not ok',
                'message': 'No user found'
                })
    
    
@books_api.post('/add_read')
def add_read():
    '''
    payload should include
    {
    'username' = 'string'
    'title' = 'string'
    'author' = 'string'
    'thumbnail' = 'string'
    'publisher' = 'string'
    'published' = 'string'
    'description' = 'string'
    'googlerating' = 'number'
    }
    '''
    data = request.get_json()
    print(data)
    queried_user = User.query.filter(User.username == data['username']).first()
    book = Book.query.filter(Book.title == data['title']).first()
    try:
        rating = data['googlerating']
        new_book = Book(title=data['title'], 
                        author=data['author'], 
                        thumbnail=data['thumbnail'], 
                        publisher=data['publisher'], 
                        published=data['published'],
                        description=data['description'],
                        googlerating=data['googlerating'])
        new_book.save()
    except:
        new_book = Book(title=data['title'], 
                        author=data['author'], 
                        thumbnail=data['thumbnail'], 
                        publisher=data['publisher'], 
                        published=data['published'],
                        description=data['description'])
        new_book.save()
    queried_book = Book.query.filter(Book.title == data['title']).first()
    if queried_book not in queried_user.read_shelf:
        queried_user.read_shelf.append(queried_book)
        db.session.commit()
        return jsonify({
            'status': 'ok',
            'message': 'Book was added to \'read\''
            })
    else:
        return jsonify({
            'status': 'not ok',
            'message': 'Book was already in user\'s \'read\' shelf'
            })
    
@books_api.post('/remove_read')
def remove_read():
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
        if queried_book in queried_user.read_shelf:
            queried_user.read_shelf.remove(queried_book)
            db.session.commit()
            return jsonify({
                'status': 'ok',
                'message': 'Book was removed from \'read\' shelf',
                })
        else:
            return jsonify({
                    'status': 'ok',
                    'message': 'Book was not in \'read\' shelf',
                    })
    except:
        return jsonify({
                'status': 'not ok',
                'message': 'No user found'
                })
    
@books_api.post('/make_current')
def make_current():
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
            queried_user.current_shelf.append(queried_book)
            db.session.commit()
            return jsonify({
                'status': 'ok',
                'message': 'Book was added to \'current\' shelf',
                })
        elif queried_book in queried_user.read_shelf:
            queried_user.read_shelf.remove(queried_book)
            queried_user.current_shelf.append(queried_book)
            db.session.commit()
            return jsonify({
                'status': 'ok',
                'message': 'Book was added to \'current\' shelf',
                })
        else:
            return jsonify({
                    'status': 'ok',
                    'message': 'Book was not found',
                    })
    except:
        return jsonify({
                'status': 'not ok',
                'message': 'No user found'
                })
    
@books_api.post('/make_read')
def make_read():
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
            queried_user.read_shelf.append(queried_book)
            db.session.commit()
            return jsonify({
                'status': 'ok',
                'message': 'Book was added to \'read\' shelf',
                })
        elif queried_book in queried_user.current_shelf:
            queried_user.current_shelf.remove(queried_book)
            queried_user.read_shelf.append(queried_book)
            db.session.commit()
            return jsonify({
                'status': 'ok',
                'message': 'Book was added to \'read\' shelf',
                })
        else:
            return jsonify({
                    'status': 'ok',
                    'message': 'Book was not found',
                    })
    except:
        return jsonify({
                'status': 'not ok',
                'message': 'No user found'
                })
    
@books_api.post('/make_to_read')
def make_to_read():
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
        if queried_book in queried_user.read_shelf:
            queried_user.read_shelf.remove(queried_book)
            queried_user.to_read_shelf.append(queried_book)
            db.session.commit()
            return jsonify({
                'status': 'ok',
                'message': 'Book was added to \'to read\' shelf',
                })
        elif queried_book in queried_user.current_shelf:
            queried_user.current_shelf.remove(queried_book)
            queried_user.to_read_shelf.append(queried_book)
            db.session.commit()
            return jsonify({
                'status': 'ok',
                'message': 'Book was added to \'to read\' shelf',
                })
        else:
            return jsonify({
                    'status': 'ok',
                    'message': 'Book was not found',
                    })
    except:
        return jsonify({
                'status': 'not ok',
                'message': 'No user found'
                })
    
@books_api.get('/getBook/<title>')
def getBook(title):
    queried_book = Book.query.filter(Book.title == title).first()
    print(queried_book)
    if queried_book:
        return jsonify({
            'status': 'ok',
            'message': 'Book found',
            'title': queried_book.title,
            'author': queried_book.author,
            'publisher': queried_book.publisher,
            'published': queried_book.published,
            'thumbnail': queried_book.thumbnail,
            'description': queried_book.description,
            'googlerating': queried_book.googlerating
        })
    else:
        return jsonify({
            'status': 'not ok',
            'message': 'Book does not exist'
        })
    

@books_api.post('/add_friends_read')
def add_friends_read():
    '''
    payload should include
    {
    'username' = 'string'
    'title' = 'string'
    }
    '''
    data = request.get_json()
    print(data)
    queried_user = User.query.filter(User.username == data['username']).first()
    queried_book = Book.query.filter(Book.title == data['title']).first()
    if queried_book not in queried_user.read_shelf:
        queried_user.read_shelf.append(queried_book)
        db.session.commit()
        return jsonify({
            'status': 'ok',
            'message': 'Book was added to \'read\''
            })
    else:
        return jsonify({
            'status': 'not ok',
            'message': 'Book was already in user\'s \'read\' shelf'
            })
    
@books_api.post('/add_friends_to_read')
def add_friends_to_read():
    '''
    payload should include
    {
    'username' = 'string'
    'title' = 'string'
    }
    '''
    data = request.get_json()
    print(data)
    queried_user = User.query.filter(User.username == data['username']).first()
    queried_book = Book.query.filter(Book.title == data['title']).first()
    if queried_book not in queried_user.to_read_shelf:
        queried_user.to_read_shelf.append(queried_book)
        db.session.commit()
        return jsonify({
            'status': 'ok',
            'message': 'Book was added to \'to read\''
            })
    else:
        return jsonify({
            'status': 'not ok',
            'message': 'Book was already in user\'s \'to read\' shelf'
            })
    
@books_api.post('/add_friends_current')
def add_friends_current():
    '''
    payload should include
    {
    'username' = 'string'
    'title' = 'string'
    }
    '''
    data = request.get_json()
    print(data)
    queried_user = User.query.filter(User.username == data['username']).first()
    queried_book = Book.query.filter(Book.title == data['title']).first()
    if queried_book not in queried_user.current_shelf:
        queried_user.current_shelf.append(queried_book)
        db.session.commit()
        return jsonify({
            'status': 'ok',
            'message': 'Book was added to \'current\''
            })
    else:
        return jsonify({
            'status': 'not ok',
            'message': 'Book was already in user\'s \'current\' shelf'
            })