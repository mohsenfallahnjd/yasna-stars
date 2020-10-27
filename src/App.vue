<template>
  <div id="app">
    {{ data }}
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'App',

  data:() => ({
    obj: {},
    data: '',
  }),

  mounted() {
    axios.get('https://yasna.team/manage/rewards/stars')
    .then((res) => {
      this.obj = res.data;
    }).finally(() => {
      this.data = String(this.obj).split('>')[1]
      .split('<')[0]
      .split('(').join('{')
      .split(')').join('}')
      .split('[').join('')
      .split(']').join('')
      .split('Array').join('')
      .split('items:').join('')
      .split('earned').join(',earned')
      .split('spent').join(',spent')
      .split('current').join(',current')
      .split('}').join('},')
      .split('=&gt;').join(':');

      this.data = this.data.split(this.data.split('{')[0]).join('');

      console.log(this.data);

    })
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
