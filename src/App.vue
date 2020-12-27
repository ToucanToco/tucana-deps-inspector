<template>
  <div>
    <nav>
      <RouterLink to="/io">io</RouterLink>
      <RouterLink to="/inspect">inspect</RouterLink>
      <RouterLink to="/range">range</RouterLink>
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
textarea {
  width: 100%;
  background-color: transparent;
  color: white;
  border: 1px solid #888;
  padding: 1em;
  box-sizing: border-box;
}
textarea:focus {
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
