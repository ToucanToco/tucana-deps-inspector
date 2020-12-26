<template>
  <div>
    <nav>
      <RouterLink to="/io">io</RouterLink>
    </nav>
    <RouterView/>
  </div>
</template>

<style>
body {
  background-color: #222;
  color: white;
  font-family: monospace;
}
.u-clickable:hover {
  opacity: 0.5;
  cursor: pointer;
}
a {
  color: white;
}
a:hover {
  opacity: 0.5;
}
</style>

<style scoped>
nav {
  padding: 1em 0;
}
nav a {
  margin-right: 1em;
}
</style>
