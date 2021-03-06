from .db import db
from flask_login import UserMixin
import datetime

class Order(db.Model, UserMixin):
  __tablename__ = 'orders'

  id = db.Column(db.Integer, primary_key = True)
  nonprofit_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
  title = db.Column(db.String(100), nullable = False)
  description = db.Column(db.String(255), nullable = False)
  location = db.Column(db.String(200), nullable = False)
  start_time = db.Column(db.DateTime, default=datetime.datetime.utcnow)
  duration = db.Column(db.Integer, nullable = False, default=0)
  karma = db.Column(db.Integer, nullable = False, default=0)
  virtual = db.Column(db.Boolean, nullable = False)
  status = db.Column(db.String(35), nullable = False, default="Open")
  created_at = db.Column(db.DateTime, default=datetime.datetime.utcnow)
  updated_at = db.Column(db.DateTime, default=datetime.datetime.utcnow)
  nonprofit = db.relationship("User", back_populates="orders")
  applications = db.relationship("Application", back_populates="order")

  def to_dict(self):
    app_node_ids = []
    apps = []
    has_pending_apps = False
    has_accepted_app = False
    has_confirmed_app = False
    confirmed_app_id = None
    for app in self.applications:
      app_node_ids.append(app.node_id)
      apps.append(app.to_dict())
      if app.status == 'Pending':
        has_pending_apps = True
      elif app.status == 'Accepted':
        has_accepted_app = True
      elif app.status == 'Confirmed':
        has_confirmed_app = True
        confirmed_app_id = app.id

    return {
      "id": self.id,
      "nonprofit_id": self.nonprofit_id,
      "title": self.title,
      "description": self.description,
      "location": self.location,
      "start_time": self.start_time,
      "duration": self.duration,
      "karma": self.karma,
      "virtual": self.virtual,
      "status": self.status,
      "updated_at": self.updated_at,
      "app_node_ids": app_node_ids,
      "apps": apps,
      "has_pending_apps": has_pending_apps,
      "has_accepted_app": has_accepted_app,
      "has_confirmed_app": has_confirmed_app,
      "confirmed_app_id": confirmed_app_id,
      "nonprofit_username": self.nonprofit.username
    }
