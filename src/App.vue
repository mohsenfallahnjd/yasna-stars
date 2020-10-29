<template>
  <div id="app">
    <input type="text" v-model="search">
    <template v-for="(item, index) in filteredList">
      <div class="person" :key="index">
        <h3>{{ item.full_name }}</h3>
        <span>{{`کسب کرده: ${item.earned}`}}</span>
        <span>{{`خرج کرده: ${item.spent}`}}</span>
        <span>{{`موجودی: ${item.current}`}}</span>
      </div>
    </template>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'App',

  data:() => ({
    obj: {},
    data: '',
    search:'',
    persons:[]
  }),

  computed:{
    filteredList() {
      return this.persons.filter((item) => {
        return item.full_name.includes(this.search);
      })
    }
  },

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
      .split(' =&gt; ').join(':');

      this.data = this.data.split(this.data.split('{')[0]).join('').replace('\n','');


      const array = this.data.split(/["full_name: "][",earned"]/);
      const nameArray= [];
      for (let index = 3; index < array.length; index += 10) {
        nameArray.push(array[index].trim().replace(':', ''))
      }

      nameArray.forEach( item => {
        this.data = this.data.split(item).join('"' + item + '"')
      })

      this.data = this.data.split('protected').join('"protected"')
      .split('full_name').join('"full_name"')
      .split('earned').join('"earned"')
      .split('spent').join('"spent"')
      .split('current').join('"current"');

      for (let index = 0; index < nameArray.length; index++) {
        this.data = this.data.replace(`${index}:`, `"${index}":`);
      }

      this.data = this.data.split('},\n\n        },\n\n},\n\n').join('} } }')

      this.data = JSON.parse(this.data).protected;
      
      for (let index = 0; index < nameArray.length; index++) {
        this.persons.push(this.data[index]);
      }
    })
  },
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;

  .person {
    margin: 10px 0;
    span {
      padding: 5px 8px;
    }
  }
}
</style>
