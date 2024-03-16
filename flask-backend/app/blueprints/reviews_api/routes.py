from . import reviews_api
from flask import request, jsonify
from app.models import db, User, Book, Review

# Add a Review
@reviews_api.post('/add_review')
def add_review():
    '''
    payload should include
    {
    'rating' = 'int'
    'user_id' = 'int'
    'book_id' = 'int'
    'text' = 'optional'
    }
    '''
    data = request.get_json()
    try:
        if not Review.query.filter(Review.book_id == data['book_id'], Review.user_id == data['user_id']).first():
            if 'text' not in data:
                new_review = Review(rating=data['rating'], book_id=data['book_id'], user_id=data['user_id'])
                new_review.save()
                return jsonify({
                    'status': 'ok',
                    'message': 'Review was added'
                    })
            else:
                new_review = Review(rating=data['rating'], book_id=data['book_id'], user_id=data['user_id'], text=data['text'])
                new_review.save()
                return jsonify({
                    'status': 'ok',
                    'message': 'Review was added'
                    })
        else:
            return jsonify({
                'status': 'not ok',
                'message': 'Book was already reviewed by the user'
                })
    except:
            return jsonify({
                'status': 'not ok',
                'message': 'Something went wrong'
                })
    
#Get all reviews for a book
@reviews_api.get('/get_reviews')
def get_reviews():
    '''
    payload should include
    {
    'book_id' = 'int'
    }
    '''
    data = request.get_json()
    book = Book.query.filter(Book.book_id == data['book_id']).first()
    reviews_list = []
    for review in book.reviews:
        author = review.author
        review_dict = {
            'id': review.review_id,
            'rating': review.rating,
            'username': author.username,
            'text': review.text
            }
        reviews_list.append(review_dict)
    
    return jsonify({'reviews': reviews_list, 'status': 'ok'})

#Update a review
@reviews_api.put('/update_review')
def update_review():
    '''
    payload should include
    {
    'review_id' = 'int'
    'rating' = 'int'
    'text' = 'optional'
    }
    '''
    data = request.get_json()
    review = Review.query.get(data['review_id'])
    if review:
        review.rating = data['rating']
        if 'text' in data:
            review.text = data['text']
        review.save()
        return jsonify({'status': 'ok', 'message': 'Review updated'})
    else:
        return jsonify({'status': 'not ok', 'message': 'No review at id'})
    
#Update a review
@reviews_api.delete('/delete_review')
def delete_review():
    '''
    payload should include
    {
    'review_id' = 'int'
    }
    '''
    data = request.get_json()
    review = Review.query.get(data['review_id'])
    if review:
        db.session.delete(review)
        db.session.commit()
        return jsonify({'status': 'ok', 'message': 'Review deleted'})
    else:
        return jsonify({'status': 'not ok', 'message': 'No review at id'})