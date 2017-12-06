'''
    college_tuition.py
    Anton Nagy, Julia Weingart

    Flask app used for implementing our Collegez.
'''
import sys
import flask
import pandas as pd
import re

#Get tuition data
df = pd.read_csv('CollegeTuitionData.csv', encoding = "ISO-8859-1", header = None)
tuitionData = pd.concat([df[0], df[4]], axis=1)

#Get salary data
df2 = pd.read_csv('salaries-by-college-type.csv', encoding = "ISO-8859-1", header = None)
df2 = df2.drop(0)
salaryData = pd.concat([df2[0], df2[1], df2[2]], axis=1)

#Get region data
df3 = pd.read_csv('salaries-by-region.csv', encoding = "ISO-8859-1", header = None)
df3 = df3.drop(0)
regionData = pd.concat([df3[0], df3[1], df3[2]], axis=1)

colleges = list()
tuitions = list()
salaries = list()
collegeType = list()
collegeType2 = list()
regions = list()
for row in salaryData.iterrows():
    college = row[1][0]
    college = re.sub("[\(\[].*?[\)\]]", "", college)
    for row2 in tuitionData.iterrows():
        college2 = row2[1][0]
        if (college == college2):
            if (college in colleges):
                index = colleges.index(college)
                collegeType2[index] = row[1][1]
            else:
                collegeType2.append("")
                colleges.append(college)
                tuitions.append(row2[1][4])
                salaries.append(row[1][2])
                collegeType.append(row[1][1])

def remove_dollarSign(s):
    s = re.sub('[, ]', '', s)
    return float(s[1:])

tuitions = [remove_dollarSign(t) for t in tuitions]
salaries = [remove_dollarSign(s) for s in salaries]

regionData = regionData.set_index(0)
collegesRegion = df3[0]
regions = list()
count = 0
for college in colleges:
    if (college in sorted(collegesRegion)):
        regions.append(regionData.loc[college][1])

collegeData = pd.DataFrame(
    {'College': colleges,
     'Tuition': tuitions,
     'Salary': salaries,
     'College Type': collegeType,
     'College Type 2': collegeType2,
     'Region': regions
    })
collegeData = collegeData.set_index('College')

def returnData():
    return collegeData
