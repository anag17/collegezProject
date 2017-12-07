'''
    college_tuition.py
    Anton Nagy, Julia Weingart

    Flask app used for implementing our Collegez.
'''
import sys
import flask
import pandas as pd
import re
from getData import returnData
import json
import urllib.request

app = flask.Flask(__name__, static_folder='static', template_folder='templates')

@app.route('/')
def get_main_page():
    '''
    Home page for Collegez
    '''
    collegeInfo = returnData()
    return flask.render_template('index.html', message = collegeInfo.to_dict(orient="index"))

@app.route('/college/')
def get_college_page():
    return flask.render_template('college.html')

#app.run(host='localhost', port=8000)
