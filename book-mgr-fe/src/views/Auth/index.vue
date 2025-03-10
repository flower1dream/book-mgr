<template>
    <div class="auth">
      <div class="bg"></div>
      <div>
        <img src="" alt="">
        <h2 class="title">图书管理系统</h2>
      </div>

      <div class="form">
        <a-tabs >
          <a-tab-pane key="1" tab="登录">

            <div class="item">
            <a-input size="large"
             placeholder="账户"
             v-model:value="loginForm.account"
             >
              <template #prefix>
                <user-outlined/>
              </template>
            </a-input>
            
            </div>

            <div class="item">
            <a-input size="large"
             placeholder="密码"
             v-model:value="loginForm.password"
            >
              <template #prefix>
                <lock-outlined/>
              </template>
            </a-input>
            </div>

            <div class="item">
              <a href="">忘记密码</a>
            </div>

            <div class="item">
              <a-button 
              size="large" 
              type="primary"
              @click="login"
            >
                登入
              </a-button>
            </div>

          </a-tab-pane>
          <a-tab-pane key="2" tab="注册">
            <div class="item">

            <a-input 
              size="large" 
              placeholder="账户"
              v-model:value="regForm.account"
            >
              <template #prefix>
                <user-outlined/>
              </template>
            </a-input>
            </div>

            <div class="item">
            <a-input 
              size="large"
              placeholder="密码"
              v-model:value="regForm.password"
            >
              <template #prefix>
                <lock-outlined/>
              </template>              
            </a-input>
            </div>
            
            <div class="item">
            <a-input
              size="large"
              placeholder="邀请码"
              v-model:value="regForm.inviteCode"
              >
              <template #prefix>
                <mail-outlined/>
              </template>
            </a-input>
            </div>

        
            <div class="item">
              <a-button 
                @click="register"
                size="large"
                type="primary"
              >
                注册
              </a-button>
            </div>
          </a-tab-pane>
          
        </a-tabs>
      </div>
    </div>
  </template>
  
  <script src="./index.js"></script>
  
  <style lang="scss" scoped>
    @import './index.scss';
  </style>