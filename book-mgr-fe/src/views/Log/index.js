import { defineComponent, onMounted, ref } from 'vue';
import { log } from '@/service';
import { formatTimestamp, result } from '@/helpers/utils';
import { getLogInfoByPath } from '@/helpers/log';
import { message } from 'ant-design-vue';

export default defineComponent({
  setup() {
    const curPage = ref(1);
    const pageSize = ref(20); // 新增
    const total = ref(0);
    const list = ref([]);
    const loading = ref(true);

    const columns = [
      {
        title: '用户名',
        dataIndex: ['user', 'account'], // 数组形式访问嵌套属性
        key: 'account',
      },
      {
        title: '动作',
        dataIndex: 'action',
      },
      {
        title: '记录时间',
        slots: {
          customRender: 'createdAt',
        },
      },
      {
        title: '操作',
        slots: {
          customRender: 'action',
        },
      },
    ];


    const getList = async () => {
      loading.value = true;
      const res = await log.list(curPage.value, 20);
      loading.value = false;

      result(res)
        .success(({ data: { list: l, total: t } }) => {
          l.forEach((item) => {
            item.action = getLogInfoByPath(item.request.url);
          });

          list.value = l;
          total.value = t;
        });
    };

    onMounted(() => {
      getList();
    });

    const setPage = (page) => {
      curPage.value = page;
      getList();
    };

    const remove = async ({ _id }) => {
      const res = await log.remove(_id);

      result(res)
        .success(({ msg }) => {
          message.success(msg);
          getList();
        })
    };

    return {
      curPage,
      pageSize, // 暴露
      total,
      list,
      columns,
      setPage,
      loading,
      formatTimestamp,
      remove,
    };
  },
});