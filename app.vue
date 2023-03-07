<script lang="ts" setup>
useHead({
  titleTemplate: (title) => title ? `${title} "| web"` : 'web'
  // titleTemplate: (title) => title ? `${title} "| >_if Config"` : '>_if Config'
})
</script>

<template>
  <NuxtLayout>
    <!-- <Transition name="page" mode="out-in">
      <div :key="$route.fullPath">
        <NuxtPage></NuxtPage>
      </div>
    </Transition> -->
      <NuxtPage></NuxtPage>
  </NuxtLayout>
</template>

