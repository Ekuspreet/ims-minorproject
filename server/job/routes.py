from app import app
from job.models import Job

@app.route("/job/create", methods=["POST"])
def create_job():
    return Job().create_job()

@app.route("/job/cancel", methods=["POST"])
def cancel_job():
    return Job().cancel_job()
