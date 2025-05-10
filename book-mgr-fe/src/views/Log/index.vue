<template>
  <div>
    <a-spin :spinning="loading">
      <a-card
        :title="simple ? '最近的操作日志' : ''"
      >
        <div v-if="!simple">
          <h2>操作日志</h2>
          <a-divider />
        </div>
        
        <a-table
          bordered
          :columns="columns"
          :data-source="list"
          :pagination="false"
        >
          <template #createdAt="{record}">
            {{ formatTimestamp(record.meta.createdAt) }}
          </template>
          <template v-if="!simple" #action="{record}">
            <a href="javascript:;" @click="remove(record)">删除</a>
          </template>
        </a-table>

        <flex-end v-if="!simple" style="margin-top: 24px;">
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