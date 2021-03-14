from flask import Blueprint, jsonify, session, request
from app.models import User, Review, Order, Application, db
from app.forms import ReviewForm
from flask_login import current_user, login_user, logout_user, login_required

review_routes = Blueprint('reviews', __name__)


@review_routes.route('/', methods=['GET'])
def get_reviews():
    """
    Gets all reviews.
    """
    reviews = Review.query.all()
    return_reviews = []
    for review in reviews:
        return_reviews.append(review.to_dict())
    return jsonify(return_reviews)
    

@review_routes.route('/', methods=['POST'])
def create_review():
    """
    Creates an review.
    """
    form = ReviewForm()
    print(request.get_json())
    # Get the csrf_token from the request cookie and put it into the
    # form manually to validate_on_submit can be used
    form['csrf_token'].data = request.cookies['csrf_token']
    print('<<<<<<<<<<<< csrf', form['csrf_token'].data)
    if form.validate_on_submit():
        print('validated form')
        review = Review(
            writer_id = form.data['writer_id'],
            reviewee_id = form.data['reviewee_id'],
            application_id = form.data['application_id'],
            content = form.data['content'],
            score = form.data['score'],
            response_id = form.data['response_id']
        )
        db.session.add(review)
        db.session.commit()
        # look for existing review for application 
        app_id = form.data['application_id']
        first_rev = Review.query.filter(Review.application_id == app_id).first()
        # if it's there update its response id with new review's id
        if first_rev: 
            first_rev.response_id = review.id
            db.session.add(first_rev)
            db.session.commit()
        else: 
            print('no first rev')
        rev = review.to_dict()
        order_id = rev['order_id']
        order = Order.query.filter(Order.id == order_id).first()
        order.status = "Complete"
        db.session.add(order)
        db.session.commit()
        return review.to_dict()
    return 'invalid form'

