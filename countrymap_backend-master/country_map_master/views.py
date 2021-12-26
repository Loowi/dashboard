from django.http import response
from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from django.http.response import JsonResponse
from django.db.models import Count
import json
from django.contrib.staticfiles.storage import staticfiles_storage

from streamlit.state.session_state import Serialized
from country_map_master.models import countrymap
from country_map_master.serializers import CountrySerializer
import streamlit as st
import time
import pandas as pd
import plotly.express as px
import plotly.graph_objects as go
import numpy as np
import altair as alt

file_path = staticfiles_storage.path('2017 Q4.xlsx')

def countrymapApi(request,id=0):
    if request.method=='GET':
        data = pd.read_excel(file_path)
        riskValue = data['risk metrics'].unique()
        table = pd.pivot_table(data,  
                                    values=['Value'], 
                                index=['Country', 'subtype'], 
                                columns=['risk metrics'],
                                aggfunc=np.sum).reset_index()
        table.columns = ['Country', 'Segment', 'Default_Rate', 'LGD', 'Loss_Rate', 'PD']
        jsond = table.reset_index().to_json(orient='records')
        parsed = json.loads(jsond)
        jsonds= pd.Series(riskValue).to_json(orient='values')
        parseds = json.loads(jsonds)
        return JsonResponse({'excel':parsed, 'dbData':parseds},safe=False)


def uperTable(request,id=0):
    if request.method=='GET':
        data = pd.read_excel(file_path)
        m2, m3, m4, m5 = st.columns((1, 1, 1, 1))
        col1 = m2.metric(label='Average ratio of good clients', value=str(3.19) +" %", delta='+21.2% YoY', delta_color='inverse')
        col2 = m3.metric(label='Average ratio of bad clients', value=str(3.19) +" %", delta='+31,3% YoY', delta_color='inverse')
        col3 = m4.metric(label='Average ratio of new clients', value=str(0.22)+" %", delta='+31,3% YoY')
        arr=[col1,col2,col3]
        arr1=[{'label':'Average ratio of good clients', 'value':'3.19' , 'delta' :'+21.2'},
        {'label':'Average ratio of bad clients', 'value':'3.19' , 'delta' :'+21.2'}
        ,{'label':'Average ratio of new clients', 'value':'0.22' , 'delta' :'+21.2'}]
        return JsonResponse(arr1,safe=False) 

def graphData(request,riskmetrics):
    if request.method=='GET':
        data = pd.read_excel(file_path)
        m22, m23, m24, m25 = st.columns((1, 1, 1, 1))
        var_type = riskmetrics
        idx = data['risk metrics'].isin([var_type])
        table2 = data[idx].groupby(['date', 'subtype'])['Value'].mean().reset_index()
        table2.columns = ['Year', 'Segment', 'Value']      
        jsond = table2.reset_index().to_json(orient='records')
        parsed = json.loads(jsond)
        return JsonResponse(parsed, safe=False)


def mapData(request,riskmetrics):
    if request.method=='GET':
        data = pd.read_excel(file_path)
        m32, m33, m34, m35 = st.columns((1, 1, 1, 1))
        var_type = riskmetrics
        idx = data['risk metrics'].isin([var_type])
        table3 = data[idx].groupby(['Country'])['Value'].mean().reset_index()
        table3.columns = ['Country', 'Value']
        jsond = table3.reset_index().to_json(orient='records')
        parsed = json.loads(jsond)
        return JsonResponse(parsed, safe=False)
