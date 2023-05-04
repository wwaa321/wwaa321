import streamlit as st
import pandas as pd
import numpy as np

st.set_page_config("综合可视化看板",page_icon="📈",layout='wide')
st.sidebar.subheader("📈综合可视化看板")

st.title("📈综合可视化看板")
st.write("gggaaafff")
st.markdown("##### aaa #####  ")

st.markdown("***各级别合格率***  ")
  #用折线图表现各级别合格率情况
hegelv_tj=pd.read_excel('file/tongji.xlsx',sheet_name='Sheet3',index_col=[0],na_values=['NA'])
st.line_chart(hegelv_tj)

 st.divider()
st.area_chart(hegelv_tj)
