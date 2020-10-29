<template>
  <div class="person-item">
        <h3>{{ content.full_name }}</h3>
        <div class="details">
          <span>{{`کسب‌شده: ${content.earned}`}}</span>
          <span>{{`خرج‌شده: ${content.spent}`}}</span>
          <span>{{`موجودی: ${content.current}`}}</span>
        </div>
  </div>
</template>

<script>
export default {
  name: 'Person',

  props: {
    content: {
      type: Object,
    }
  },
}
</script>

<style lang="scss" scoped>
  .person-item {
    margin-bottom:  3vh;
    padding:        1rem;
    background:   #fff;
    border:         1px solid #edf2f9;
    box-shadow:     none;
    border-radius:  5px;
    box-shadow:     0 8px 40px rgba(28,44,64,.03);


    h3 {
      border-bottom-width:  1px;
      border:       0 solid #edf2f9;
      display:      block;
      color:      #000;
      font-size:    20px;
      font-weight:  700;
    }
    
    .details {
      margin-top:       20px;
      display:          flex;
      justify-content:  center;
      flex-wrap:        wrap;
    }

    span {
      padding: 5px 8px;

      &:nth-child(1) {
        color: blue;
      }

      &:nth-child(2) {
        color: red;
      }

      &:nth-child(3) {
        font-weight:  500;
        color:      green;
      }

    }
  }
</style>