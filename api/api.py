from flask import Flask, request, json, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from json_type import Json

app = Flask(__name__)
app.config ['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///cidera.sqlite3'
db = SQLAlchemy(app)
ma = Marshmallow(app)


class Job(db.Model):
    id = db.Column('job_id', db.Integer, primary_key=True)
    job_type = db.Column(db.String(20))
    test_repo = db.Column(db.String(100))
    profile_id = db.Column(db.String(50))
    devices = db.Column(Json())

    def __init__(self, job_type, test_repo, profile_id, devices):
        self.job_type = job_type
        self.test_repo = test_repo
        self.profile_id = profile_id
        self.devices = devices


class JobSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Job


@app.route("/insert_job", methods=['POST'])
def insert_job():
    try:
        content = request.json
        db.session.add(Job(**content))
        db.session.commit()
    except Exception as e:
        return jsonify({"status": "Failed", "reason": str(e)})
    return jsonify({"status": "Success"})


@app.route('/query_job')
@app.route('/query_job/<profile_id>')
def query_job(profile_id=None):
    if profile_id:
        jobs = Job.query.filter_by(profile_id=profile_id).all()
    else:
        jobs = Job.query.all()
    return JobSchema().jsonify(jobs, many=True)


if __name__ == '__main__':
    db.create_all()
    app.run(host='0.0.0.0', debug=True)
