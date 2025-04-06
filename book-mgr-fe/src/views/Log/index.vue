<template>
  <div>
    <a-spin :spinning="loading">
      <a-card>
        <h2>操作日志</h2>
        <a-divider />
        
        <a-table
          bordered
          :columns="columns"
          :data-source="list"
          :pagination="false"
        >
          <template #createdAt="{record}">
            {{ formatTimestamp(record.meta.createdAt) }}
          </template>
          <template #action="{record}">
            <a href="javascript:;" @click="remove(record)">删除</a>
          </template>
        </a-table>

        <flex-end>
        <a-pagination
          v-model:current="curPage"
          :pageSize="20"
          :total="total"
          @change="setPage"
        />
      </flex-end>
          
      </a-card>
    </a-spin>
  </div>
</template>

<script src="./index.js"></script>