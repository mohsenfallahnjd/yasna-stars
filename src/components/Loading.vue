<template>
    <transition name="fade">
        <div id="loading-wrapper" v-if="active">
            <loading-progress
                :indeterminate="true"
                :hide-background="false"
                size="50"
                rotate
                fillDuration="2"
                rotationDuration="1"
            />
        </div>
    </transition>
</template>

<script>
export default {
    name: 'Loading',

    props: {
        active: {
            type: Boolean,
            default: false,
        }
    }
}
</script>

<style lang="scss">

#loading-wrapper {
    z-index:            5;
    background-color:   #fff;
    display:            flex;
    justify-content:    center;
    align-items:        center;
    width:              100vw !important;
    height:             100vh !important;
    position:           fixed;
    top:                0;
    bottom:             0;
    right:              0;
    left:               0;

    .vue-progress-path {
        margin-bottom: 10px;

        path {
            stroke-width: 3 !important;
        }

        .progress {
            stroke: #0073bb !important;
        }

        .background {
            stroke: darken(#fafafa, $amount: 10%) !important;
        }
    }
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity .5s;
}
.fade-enter,
.fade-leave-to {
    opacity: 0;
}

</style>