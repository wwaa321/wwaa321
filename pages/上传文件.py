
import streamlit as st
import pandas as pd
import numpy as np
import plotly.express as px
from PIL import Image


# 设置页面配置
st.set_page_config("aaa",page_icon="👋",)

# 在侧边栏添加标题
st.sidebar.subheader("aa")

# 在侧边栏添加文件上传器
uploaded_file = st.sidebar.file_uploader("上传文件")

# 添加页面标题
st.title("hello")

# 添加文本
st.write("aaa")

Images=Image.open('images/u2.png')
st.image(Images,width=350,caption="aaa")

# 检查文件是否已上传
if uploaded_file is not None:
    # 将文件读取为 pandas dataframe
    data = pd.read_csv(uploaded_file)
    # 使用 plotly 创建饼图
    fig = px.pie(data, values='value', names='category')
    st.plotly_chart(fig)
else:
    # 创建随机数据以用于饼图
    data = pd.DataFrame({
        'category': ['分类1', '分类2', '分类3'],
        'value': np.random.randint(1, 10, size=3)
    })
    # 使用 plotly 创建饼图
    fig = px.pie(data, values='value', names='category')
    st.plotly_chart(fig)

    # 添加振动时域波形波形图
    simulated_data = pd.DataFrame({
        'time': np.arange(0, 10, 0.1),
        'amplitude': np.sin(np.arange(0, 10, 0.1))
    })
    st.line_chart(simulated_data)

