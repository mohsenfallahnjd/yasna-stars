<template>
  <div id="app">
    <c-loading :active="$wait.is('loading-page')" />

    <div class="container">

        <div id="logo">
            <img src="@/assets/images/yasnateam-logo.png" alt="yasnateam-logo">
        </div>

        <b-form-input type="text" v-model="search" placeholder="جستوجو کنید :)" />

        <div class="error" v-html="error" v-if="error" />

        <div class="person-list" v-else>
          <template v-for="(item, index) in filteredList">
            <c-person :content="item" :key="index" />
          </template>
        </div>


    </div>

  </div>
</template>

<script>
import axios from 'axios';
import CPerson from '@/components/Person';
import CLoading from '@/components/Loading';

export default {
  name: 'App',

  components: {
    CPerson,
    CLoading,
  },

  data:() => ({
    obj:      {},
    data:     '',
    search:   '',
    persons:  [],
    error:    null,
  }),

    beforeCreate() {
        this.$wait.start('loading-page');
    },

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
    }).catch((err) => {
      this.error = err;
      console.log(err);
    })
    .finally(() => {
      this.$wait.end('loading-page');
    })
  },
}
</script>

<style lang="scss">
#app {
  min-height:   100vh;
  background:   url(./assets/images/bg.png) 50% repeat;
  text-align:   center;
  padding:      40px 3rem;
  overflow:     hidden;

  .container {
    max-width: 400px;
  }

  #logo {
    margin-bottom: 30px;
    width:        100%;
    img {
      max-height: 120px;
    }
  }

  .form-control {
    direction:        rtl;
    margin-bottom:    30px;
    padding:          .85714rem 1.42857rem;
    border:           2px solid #f5f5f5;
    border-radius:    4px;
    background-color: #fff;
    box-shadow:       none;
    transition:       all .2s ease-in-out;
    display:          flex;
    height:           50px;
    width:            100%;
    max-width:        100%;
    position:         relative;
    font-weight:      500;
    font-size:        .85714rem;
    font-family:      inherit;
    line-height:      inherit;
    color:          #000;
    outline:          0;
    
    &:focus {
      box-shadow:   none;
      border-color: #1875f0;
    }
  }

  .person-list {
    height:           60vh;
    overflow:         auto;
    scroll-behavior:  smooth;

    &::-webkit-scrollbar {
      width: 9px;
    }

    &::-webkit-scrollbar-track {
      border-radius:    5px;
      background-color: darken(#fafafa, 10%)
    }

    &::-webkit-scrollbar-thumb {
      border-radius:    5px;
      background-color: #85929e;
    }
  }
}
</style>
