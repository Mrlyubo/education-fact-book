#!/usr/bin/env python
# coding: utf-8

# In[ ]:


from selenium import webdriver
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.by import By
from selenium.common.exceptions import TimeoutException
from selenium.webdriver.support.ui import Select

import re
import numpy as np
import pandas as pd
from bs4 import BeautifulSoup
import pandas as pd
from os import system
from tqdm import tqdm
from time import sleep
import glob

def dataScrape():
    driver.get('https://www.bls.gov/bls/news-release/wkyeng.htm#2018')
    assert driver.title=='Usual Weekly Earnings of Wage and Salary Workers Archived News Releases :  U.S. Bureau of Labor Statistics', 'Webpage has an unexpected title.'
    select('.ext_search_link > a').click()
    assert driver.title=='Usual Weekly Earnings of Wage and Salary Workers Archived News Releases :  U.S. Bureau of Labor Statistics', 'Webpage has an unexpected title.'

    select('.form_checkbox_text > label').click()

    Select(select('.date_search_start > .form_elem > .form_inputs > .form_input > select.select_calendar_day')).select_by_index(1)
    Select(select('.date_search_start > .form_elem > .form_inputs > .form_input > select.select_calendar_month')).select_by_index(1)
    Select(select('.date_search_start > .form_elem > .form_inputs > .form_input > select.select_calendar_year')).select_by_index(1)

    select('.bbg').click()

    select('.nlp_resultlist_download_csv_right_top > a').click()
    waitAndAttemptUntilSuccess('mv ~/Downloads/leerverkaeufe_*.csv data.csv')

    df = pd.read_csv('data.csv', encoding = 'latin1',header = None, skiprows = 1,sep = ',')
    df = df[[2,0,1,3,4,6]]
    df.columns = ['Gender','ISIN','Race','Position Date','Income']
    df['PersonID'] = df.index
    df['Position Date'].astype(str)
    #Drop the rows where at least one element is missing.
    df.dropna()
    df.to_csv(data, header=False, sep=',')

