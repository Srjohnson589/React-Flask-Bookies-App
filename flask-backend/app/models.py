from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash
from flask_login import UserMixin

db = SQLAlchemy()

user_to_read = db.Table(
    'user_to_read',
    db.Column('user_id', db.Integer, db.ForeignKey('user.user_id')),
    db.Column('book_id', db.Integer, db.ForeignKey('book.book_id'))
)

user_current = db.Table(
    'user_current',
    db.Column('user_id', db.Integer, db.ForeignKey('user.user_id')),
    db.Column('book_id', db.Integer, db.ForeignKey('book.book_id'))
)

user_read = db.Table(
    'user_read',
    db.Column('user_id', db.Integer, db.ForeignKey('user.user_id')),
    db.Column('book_id', db.Integer, db.ForeignKey('book.book_id'))
)

follower_followed = db.Table(
    'follower_followed',
    db.Column('follower_id', db.Integer, db.ForeignKey('user.user_id')),
    db.Column('followed_id', db.Integer, db.ForeignKey('user.user_id'))
)

class User(db.Model, UserMixin):
    user_id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, unique=True, nullable=False)
    password = db.Column(db.String, nullable=False)
    profile_pic = db.Column(db.String, nullable=True)
    to_read_shelf = db.relationship('Book',
                             secondary=user_to_read,
                             backref="wants_to_read_by",
                             lazy="dynamic")
    current_shelf = db.relationship('Book',
                             secondary=user_current,
                             backref="currently_read_by",
                             lazy="dynamic")
    read_shelf = db.relationship('Book',
                             secondary=user_read,
                             backref="already_read_by",
                             lazy="dynamic")
    my_reviews = db.relationship('Review', backref='author')
    following = db.relationship('User',
                                secondary= follower_followed,
                                primaryjoin = (follower_followed.columns.follower_id == user_id),
                                secondaryjoin = (follower_followed.columns.followed_id == user_id),
                                backref= "followed_by",
                                lazy='dynamic')

    def __init__ (self, username, password, profile_pic=''):
        self.username = username
        self.password = generate_password_hash(password)
        self.profile_pic = profile_pic

    def save(self):
        db.session.add(self)
        db.session.commit()

    def get_id(self):
        return (self.user_id)
    
class Book(db.Model):
    book_id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String, nullable=False)
    author = db.Column(db.String, nullable=False)
    thumbnail = db.Column(db.String, nullable=True)
    publisher = db.Column(db.String, nullable=True)
    published = db.Column(db.String, nullable=True)
    description = db.Column(db.String, nullable=True)
    googlerating = db.Column(db.Integer, nullable=True)
    reviews = db.relationship('Review', backref='book_reviewed')

    def __init__(self, title, author, thumbnail='', publisher='', published='', description='', googlerating=0):
        self.title = title
        self.author = author
        self.thumbnail = thumbnail
        self.publisher = publisher
        self.published = published
        self.description = description
        self.googlerating = googlerating

    def save(self):
        db.session.add(self)
        db.session.commit()

class Review(db.Model):
    review_id = db.Column(db.Integer, primary_key=True)
    rating = db.Column(db.Integer, nullable=True)
    book_id = db.Column(db.Integer, db.ForeignKey('book.book_id'), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.user_id'), nullable=False)
    text = db.Column(db.String, nullable=True)

    def __init__(self, book_id, user_id, rating=0, text=''):
        self.rating = rating
        self.book_id = book_id
        self.user_id = user_id
        self.text = text

    def save(self):
        db.session.add(self)
        db.session.commit()