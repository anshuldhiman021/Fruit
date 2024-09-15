from flask import Flask, jsonify, request, abort
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.exc import IntegrityError


from flask_cors import CORS
import os

app = Flask(__name__)


CORS(app)


app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///faqs.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

# FAQ Model
class FAQ(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    question = db.Column(db.String(200), nullable=False)
    answer = db.Column(db.String(500), nullable=False)

    def to_dict(self):
        return {"id": self.id, "question": self.question, "answer": self.answer}

# Initialize the database
with app.app_context():
    db.create_all()

# Error Handlers
@app.errorhandler(404)
def not_found_error(error):
    return jsonify({"error": "Resource not found"}), 404

@app.errorhandler(400)
def bad_request_error(error):
    return jsonify({"error": "Bad request"}), 400

@app.errorhandler(500)
def internal_server_error(error):
    return jsonify({"error": "Internal server error"}), 500

# Endpoints

# GET /faqs: Fetch all FAQs
@app.route('/faqs', methods=['GET'])
def get_faqs():
    faqs = FAQ.query.all()
    return jsonify([faq.to_dict() for faq in faqs]), 200

# GET /faqs/<id>: Fetch a single FAQ by ID
@app.route('/faqs/<int:id>', methods=['GET'])
def get_faq(id):
    faq = FAQ.query.get(id)
    if faq is None:
        abort(404)
    return jsonify(faq.to_dict()), 200

# POST /faqs: Create a new FAQ
@app.route('/faqs', methods=['POST'])
def create_faq():
    data = request.get_json()
    if not data or not 'question' in data or not 'answer' in data:
        abort(400)

    faq = FAQ(question=data['question'], answer=data['answer'])
    try:
        db.session.add(faq)
        db.session.commit()
    except IntegrityError:
        db.session.rollback()
        abort(500)
    return jsonify(faq.to_dict()), 201

# PUT /faqs/<id>: Update a FAQ by ID
@app.route('/faqs/<int:id>', methods=['PUT'])
def update_faq(id):
    data = request.get_json()
    if not data:
        abort(400)

    faq = FAQ.query.get(id)
    if faq is None:
        abort(404)

    if 'question' in data:
        faq.question = data['question']
    if 'answer' in data:
        faq.answer = data['answer']

    try:
        db.session.commit()
    except IntegrityError:
        db.session.rollback()
        abort(500)

    return jsonify(faq.to_dict()), 200

# DELETE /faqs/<id>: Delete a FAQ by ID
@app.route('/faqs/<int:id>', methods=['DELETE'])
def delete_faq(id):
    faq = FAQ.query.get(id)
    if faq is None:
        abort(404)

    try:
        db.session.delete(faq)
        db.session.commit()
    except IntegrityError:
        db.session.rollback()
        abort(500)

    return jsonify({"message": "FAQ deleted"}), 200

if __name__ == '__main__':
    port = int(os.environ.get("PORT", 5000))
    app.run(debug=False, host='0.0.0.0', port=port)