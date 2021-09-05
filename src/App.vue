<script>
import DateForm from './components/date-form.vue'

const changeDateFormat = (date) => {
  const dateForFormate = date ? date : new Date();
  return [dateForFormate.getFullYear(), dateForFormate.getMonth() + 1, dateForFormate.getDate()]
    .map(n => n < 10 ? `0${n}` : `${n}`).join('/');
};

const checkCurrentDay = (data) => {
  return data.find(d => d.date === changeDateFormat());
};

export default {
  name: 'App',
  components: {
    DateForm
  },
  data() {
    return {
      interval: null,
      time: null,
      date: null,
      dayOfWeek: null,
      model: null,
      data: null,
      backgroundColor: null
    }
  },
  methods: {
  },
  mounted () {
    try {
      this.data = window.myAPI.readData();
      const currentDay = checkCurrentDay(this.data);
      if (currentDay) {
        this.backgroundColor = currentDay.color.toString();
      }
    } catch (error) {
      console.log(`Error: ${error}`)
    }
  },
  beforeUnmount() {
    clearInterval(this.interval)
  },
  created() {
    this.interval = setInterval(() => {
      this.time = Intl.DateTimeFormat(navigator.language, {
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric'
      }).format();
      this.dayOfWeek = Intl.DateTimeFormat(navigator.language, {
        weekday: 'long'
      }).format().toUpperCase();
      this.date = Intl.DateTimeFormat(navigator.language, {
        day: 'numeric',
        month: 'numeric',
        year:'numeric'
      }).format();
    }, 1000)
  }
}
</script>

<template>
  <div id="q-app" :class="{ green: this.backgroundColor === 'green', red: this.backgroundColor === 'red' }">
    <q-card class="my-card column content-center">
      <q-card-section class="text-center">
        {{time}}
      </q-card-section>
      <q-card-section class="text-center">
        {{dayOfWeek}}
      </q-card-section>
      <q-card-section class="text-center">
        {{date}}
      </q-card-section>
    </q-card>
    <q-btn flat round color="primary" icon="date_range" class="absolute-top-right q-ma-md">
      <q-menu
        anchor="top left"
        self="top right"
      >
        <date-form :data="data"></date-form>
      </q-menu>
    </q-btn>
  </div>
</template>
