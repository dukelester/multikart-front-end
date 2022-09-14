<template>
  <div>
    <Fashion />
  </div>
</template>

<script>
const Fashion = () => import('./shop/fashion')
export default {
  components: {
    Fashion
  }
}
</script>
