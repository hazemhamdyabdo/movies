<template>
  <nav
    flex="~ col"
    items-center
    pt-28
    gap-30
    py5
    lg:px5
    border="t lg:r base"
    bg-black
  >
    <NuxtLink
      v-for="item in navbarItems"
      :key="item.name"
      :title="item.name"
      :to="item.path"
      class="text-3xl"
      v-slot="{ isActive }"
    >
      <Icon
        :name="isActive ? item.iconActive : item.icon"
        :class="isActive ? ' text-primary' : ''"
      />
    </NuxtLink>
  </nav>
</template>
<style scoped>
nav {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 5;
  height: 100dvh;
  overflow-y: hidden;
}

@media only screen and (max-width: 900px) {
  nav {
    flex-direction: row;
    height: auto;
    padding: 0.7rem;
    top: auto;
    bottom: 0;
    left: 0;
    width: 100dvw;
    justify-content: space-evenly;
    align-items: center;
  }
}
</style>
