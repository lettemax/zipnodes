from app.models import db, Review

# Adds a demo user, you can add other users here if you want
def seed_reviews():

    review1 = Review(writer_id=3,
    application_id=1, 
    content="Did a great job!",
    score=5)
    review2 = Review(writer_id=4,
    application_id=2, 
    content="Didn't show up!",
    score=1)
    review3 = Review(writer_id=5,
    application_id=3, 
    content="Was thoughtful and a great contributor!",
    score=5)

    db.session.add(review1)
    db.session.add(review2)
    db.session.add(review3)

    db.session.commit()

# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and resets
# the auto incrementing primary key
def undo_reviews():
    db.session.execute('TRUNCATE reviews CASCADE;')
    db.session.execute("ALTER SEQUENCE reviews_id_seq RESTART WITH 1")
    db.session.commit()
