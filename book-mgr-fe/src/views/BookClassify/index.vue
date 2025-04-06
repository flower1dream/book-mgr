<template>
    <div>
      <a-card title="书籍分类管理">
        <div>
          <a-input
            v-model:value="title"
            placeholder="输入书籍分类"
            style="width: 200px;"
          />
          &nbsp;
          <a-button @click="add" type="primary">添加</a-button>
        </div>
        <a-divider/>
        <div>
            <a-table
                bordered
                :data-source="list"
                :columns="columns"
            >
                <template #actions="{ record }">
                    <a-button
                        size="small"
                        @click="updateTitle(record)"
                    >
                      修改
                    </a-button>
                    &nbsp;
                    <a-button
                        size="small"
                        @click="remove(record)"
                        style="background-color: red;"
                    >
                      删除
                    </a-button>
                </template>
            </a-table>
        </div>
      </a-card>
    </div>
  </template>

<script src="./index.jsx"></script>