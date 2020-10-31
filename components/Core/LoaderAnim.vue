<template>
  <div id="anim-root" class="block w-full h-full">
    <span />
    <span />
    <span />
    <span />
    <span />
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
@import '~/assets/scss/styles.scss';
@import '~/assets/scss/colours.scss';

#anim-root {
  position: relative;

  span {
    display: inline-block;
    position: absolute;
    bottom: 48%;
    top: 48%;
    width: 17%;
    background: $color-secondary-300;
    border-radius: 1.25rem;

    animation: anim 1.5s infinite ease-in-out
  }

  span:nth-child(2) {
    left: 20%;

    animation-delay: .2s;
  }
  span:nth-child(3) {
    left: 40%;

    animation-delay: .4s;
  }
  span:nth-child(4) {
    left: 60%;

    animation-delay: .6s;
  }
  span:nth-child(5) {
    left: 80%;

    animation-delay: .8s;
  }
}

@keyframes anim {
  0% {top: 48%; bottom: 48%; background: $color-secondary-300;}
  25% {top: 2%; bottom: 2%; background:$color-primary-300;}
  50% {top: 2%; bottom: 2%; background:$color-primary-300;}
  75% {top: 48%; bottom: 48%; background:$color-secondary-300;}
}

</style>
