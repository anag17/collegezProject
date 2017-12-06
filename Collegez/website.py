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
#import collegez-config
#import psycopg2
import urllib.request

app = flask.Flask(__name__, static_folder='static', template_folder='templates')

@app.route('/')
def get_main_page():
    '''
    Home page for Collegez
    '''
    collegeInfo = returnData()
    print (list(collegeInfo.to_dict(orient="index").keys()))
    return flask.render_template('index.html', message = collegeInfo.to_dict(orient="index"))

@app.route('/college/')
def get_college_page():
    return flask.render_template('college.html')

# @app.route('/college/result/<college_id>/')
# def get_college_page(college_id):
#     '''
#     Render the page containing game information for a specified game_id
#     '''
#     url = base_url+college_id+'/'
#     data_from_server = urllib.request.urlopen(url).read()
#     string_from_server = data_from_server.decode('utf-8')
#     college_info = json.loads(string_from_server)
#
#     return flask.render_template('college.html', message = college_info)

app.run(host='localhost', port=8000)
