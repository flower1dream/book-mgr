<template>
    <div>
      <a-card title="邀请码管理">
        <div style="display: flex; align-items: center; gap: 10px;">
          <a-input-number v-model:value="count" :min="1" :max="1000" />
          <a-button type="primary" @click="add">添加</a-button>
        </div>

        <a-divider></a-divider>

        <div>
          <a-table 
            :pagination="false"
            bordered
            :columns="columns"
            :data-source="list"
            >
            <template #status="{ record }">
              {{ record.user ? '已使用' : '未使用' }}
            </template>
            <template #actions="{ record }">
              <a-button
                @click="remove(record)"
                size="small"
                style="color: aliceblue; background-color: red;"
              >
                删除
              </a-button>
            </template>
          </a-table>
        </div>
        <flex-end style="margin-top: 24px">
            <a-pagination
                v-model:current="curPage"
                :pageSize="20"
                :total="total"
                @change="setPage"
            ></a-pagination>
        </flex-end>
      </a-card>
    </div>
  </template>

<script src="./index.js"></script>