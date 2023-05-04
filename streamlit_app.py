import streamlit as st
import pandas as pd
import numpy as np
import plotly.express as px
import time
st.set_page_config("综合可视化看板",page_icon="📈",layout='wide')
st.sidebar.subheader("📈综合可视化看板")

st.title("📈综合可视化看板")
st.write("gggaaafff")
st.markdown("##### aaa #####  ")

col1,col2,col3=st.columns(3)
with col1:
  st.markdown("***月度统计***  ")
  #饼状图包括未鉴定、鉴定中、已鉴定

  #ff=pd.read_excel('file/tongji.xlsx',sheet_name='Sheet1',index_col=[0],na_values=['NA'])

 # coiumn_name=ff.columns.tolist()

  #mon_list=ff.index.tolist()
  #mon=st.selectbox('选择月份',mon_list)
  #if mon==3:
  #  row_val=ff.iloc[0].tolist()
  #elif mon==4:
  #  row_val=ff.iloc[1].tolist()
  


  #fig=px.pie(ff,values=row_val, names=ff.columns,width=350,title='鉴定情况占比')
  #st.plotly_chart(fig)

with col2:
  st.markdown("***年度统计***  ")
  #柱状图表现每个月鉴定数量
  year_tj=pd.read_excel('file/tongji.xlsx',sheet_name='Sheet2',index_col=[0],na_values=['NA'])
  #st.dataframe(ff)

  st.bar_chart(year_tj)

with col3:
  st.markdown("***各级别合格率***  ")
  #用折线图表现各级别合格率情况
  hegelv_tj=pd.read_excel('file/tongji.xlsx',sheet_name='Sheet3',index_col=[0],na_values=['NA'])
  st.line_chart(hegelv_tj)

st.divider()
st.area_chart(hegelv_tj)



