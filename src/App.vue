<template>
  <div>
    <nav>
      <RouterLink to="/io">io</RouterLink>
      <RouterLink to="/inspect">inspect</RouterLink>
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
input {
  outline: none;
  border: none;
  border-bottom: 1px solid #888;
  background-color: transparent;
  color: white;
  font-family: monospace;
  font-size: 1em;
}
input:focus {
  border-color: white;
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
