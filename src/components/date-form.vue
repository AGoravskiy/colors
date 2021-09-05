<script>
import { date, useQuasar } from 'quasar';
import { ref } from 'vue';

export default {
  name: 'date-form',
  props: {
    data: Array
  },
  setup (props) {
    const $q = useQuasar();
    const datesModel = ref([]);
    const color = ref(null);
    const getEvents = () => props.data.reduce((arr, item) => {
        arr.push(item.date);
        return arr;
      }, []);
    const displayNotify = (color, icon, message) => {
      $q.notify({
        color,
        textColor: 'white',
        icon,
        message
      });
    };
    const changeDateFormat = (date) => 
      [date.getFullYear(), date.getMonth() + 1, date.getDate()]
      .map(n => n < 10 ? `0${n}` : `${n}`).join('/');
    const pushDate = (arr, date, color) => {
      arr.push({ date, color });
    }
    const compareData = (newData, oldData) => {
      newData.map((itemNew) => {
          const index = oldData.findIndex(itemOld => itemOld.date === itemNew.date);
          if (index !== -1) {
            oldData.splice(index, 1);
          }
        });
      return [...oldData, ...newData];
    }

    return {
      datesModel,
      events: getEvents(),
      color,

      onSubmit () {
        try {
          if (datesModel.value === null || datesModel.value.length === 0) {
            displayNotify('red-5', 'warning', 'Выберите дни')
          } else if (color.value === null) {
            displayNotify('red-5', 'warning', 'Выберите цвет')
          } else {
            const newDataToSave = datesModel.value.reduce((dataArr, val) => {
              if (typeof val === 'string') {
                pushDate(dataArr, val, color.value);
              } else if (typeof val === 'object') {
                pushDate(dataArr, val.from, color.value);
                const from = new Date(val.from);
                const to = new Date(val.to);
                while (from.getDate() < to.getDate()) {
                  from.setDate(from.getDate() + 1);
                  pushDate(dataArr, changeDateFormat(from), color.value);
                }
              }
              return dataArr;
            }, []);
            const dataToSave = compareData(newDataToSave, props.data);
            window.myAPI.wrireData(JSON.stringify(dataToSave));
            displayNotify('green-4', 'cloud_done', 'Данные сохранены');
          }
          datesModel.value = null
          color.value = null
        } catch (error) {
          displayNotify('red-5', 'warning', 'Упс, все сломалось');
          console.log(error)
          datesModel.value = null
          color.value = null
        }
        
      },

      onReset () {
        datesModel.value = null
        color.value = null
      },
      setEventColor (date) {
        return props.data.find(d => d.date === date).color;
      }
    }
  }
}
</script>

<template>
  <div class="q-pa-md" style="max-width: 400px">
    <q-form
      @submit="onSubmit"
      @reset="onReset"
      class="q-gutter-md"
    >
      <q-date name="wedding" v-model="datesModel" :events="events" :event-color="(date) => setEventColor(date)" range multiple/>
      <div class="q-gutter-sm">
        <q-radio keep-color v-model="color" val="red" label="Red" color="red" />
        <q-radio keep-color v-model="color" val="green" label="Green" color="green" />
      </div>
      <div>
        <q-btn label="Submit" type="submit" color="primary"/>
        <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
      </div>
    </q-form>
  </div>
</template>
