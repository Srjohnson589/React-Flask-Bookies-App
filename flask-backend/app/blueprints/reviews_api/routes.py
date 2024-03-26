from . import reviews_api
from flask import request, jsonify
from app.models import db, User, Book, Review
from openai import OpenAI
client = OpenAI()

# Add a Review
@reviews_api.post('/add_review')
def add_review():
    '''
    payload should include
    {
    'rating' = 'int'
    'username' = 'string'
    'title' = 'string'
    'text' = 'could be blank'
    }
    '''
    data = request.get_json()
    try:
        print(data)
        queried_user = User.query.filter(User.username == data['username']).first()
        queried_book = Book.query.filter(Book.title == data['title']).first()
        if not Review.query.filter(Review.book_id == queried_book.book_id, Review.user_id == queried_user.user_id).first():
            new_review = Review(rating=data['rating'], book_id=queried_book.book_id, user_id=queried_user.user_id, text=data['text'])
            new_review.save()
            return jsonify({
                'status': 'ok',
                'message': 'Review was successfully added'
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
@reviews_api.get('/get_reviews/<title>')
def get_reviews(title):
    print(title)
    book = Book.query.filter(Book.title == title).first()
    reviews_list = []
    for review in book.reviews:
        author = review.author
        review_dict = {
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
    
@reviews_api.post('/chatgpt')
def chatgpt():
    '''
    payload should include
    {
    'message' = [],
    }
    '''
    data = request.get_json()
    message = data['message']
    print(message)
    completion = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=message,
        temperature=1,
        max_tokens=100,
        top_p=1,
        frequency_penalty=0,
        presence_penalty=0
        )
    chat_response = completion.choices[0].message.content
    return jsonify({'status': 'ok', 
                    'message': chat_response})