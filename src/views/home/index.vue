<template>
  <el-row class="home" :gutter="20">
    <el-col :span="8" style="margintop: 20px">
      <el-card shadow="hover">
        <div class="user">
          <img :src="userImag" />
          <div class="userInfo">
            <p class="name">Admin</p>
            <p class="access">超级管理员</p>
          </div>
        </div>
        <div class="login-info">
          <p>上次登录的时间:<span>2021-7-19</span></p>
          <p>上次登录的地点:<span>武汉</span></p>
        </div>
      </el-card>
      <el-card style="margin-top: 20px; height: 460px">
        <el-table :data="tableData">
          <el-table-column v-for="(val, key) in tableLabel" :key="key" :prop="key" :label="val"></el-table-column>
        </el-table>
      </el-card>
    </el-col>

    <el-col :span="16">
      <div class="num">
        <el-card v-for="item in countData" :key="item.name" :body-style="{ display: 'flex', padding: 0 }">
          <i class="icon" :class="`el-icon-${item.icon}`" :style="{ background: item.color }"></i>
          <div class="detail">
            <p class="num">￥{{ item.value }}</p>
            <p class="txt">{{ item.name }}</p>
          </div>
        </el-card>
      </div>
      <el-card style="height: 280px">
        <!-- 折线图 -->
        <!-- <div style="height: 280px" ref="echarts"></div> -->
        <echart :char-data="echartData.order" style="height: 280px" />
      </el-card>
      <div class="graph">
        <el-card style="height: 260px">
          <!-- 柱状图 -->
          <!-- <div style="height: 240px" ref="userEcharts"></div> -->
          <echart :charData="echartData.user" style="height: 240px" />
        </el-card>

        <el-card style="height: 260px">
          <!-- 饼状图 -->
          <!-- <div style="height: 240px" ref="videoEcharts"></div> -->
          <echart style="height: 240px" :char-data="echartData.video" :isAxisChart="false" />
        </el-card>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import { getData } from "../../api/data.js";
import Echart from "../../components/Echarts.vue";
export default {
  name: "home",
  components: { Echart },
  data() {
    return {
      userImag: require("@/assets/images/user.png"),
      tableData: [],
      tableLabel: {
        name: "品牌",
        todayBuy: "今日销量",
        monthBuy: "本月销量",
        totalBuy: "总销量",
      },
      countData: [
        {
          name: "今日支付订单",
          value: 1234,
          icon: "success",
          color: "#2ec7c9",
        },
        {
          name: "今日收藏订单",
          value: 210,
          icon: "star-on",
          color: "#ffb980",
        },
        {
          name: "今日未支付订单",
          value: 1234,
          icon: "s-goods",
          color: "#5ab1ef",
        },
        {
          name: "本月支付订单",
          value: 1234,
          icon: "success",
          color: "#2ec7c9",
        },
        {
          name: "本月收藏订单",
          value: 210,
          icon: "star-on",
          color: "#ffb980",
        },
        {
          name: "本月未支付订单",
          value: 1234,
          icon: "s-goods",
          color: "#5ab1ef",
        },
      ],
      echartData: {
        order: {
          xData: [],
          series: [],
        },
        user: {
          xData: [],
          series: [],
        },
        video: {
          series: [],
        },
      },
    };
  },
  mounted() {
    getData().then((res) => {
      const { code, data } = res.data;
      if (code === 20000) {
        this.tableData = data.tableData; //拿到Main中的左部的table数据

        // 设置折线图的数据:
        const order = data.orderData; //需要放入到折线图的数据
        const xData = order.date; //拿出折线图的时间轴坐标
        const KeyArray = Object.keys(order.data[0]); //拿出order数据中的key值列表
        const series = [];
        KeyArray.forEach((key) => {
          series.push({
            name: key,
            data: order.data.map((item) => item[key]),
            type: "line",
          });
        });
        this.echartData.order.xData = xData;
        this.echartData.order.series = series;
        // 设置用户图的数据
        this.echartData.user.xData = data.userData.map((item) => item.date);
        this.echartData.user.series = [
          {
            name: "新增用户",
            data: data.userData.map((item) => item.new),
            type: "bar",
          },
          {
            name: "活跃用户",
            data: data.userData.map((item) => item.active),
            type: "bar",
          },
        ];

        // 设置饼图的数据
        this.echartData.video.series = [{ data: data.videoData, type: "pie" }];
      }
    });
  },
};
</script>

<style></style>
