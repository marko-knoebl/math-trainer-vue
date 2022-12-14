<script lang="ts">
import { RouterLink, RouterView } from "vue-router";

export default { components: { RouterLink, RouterView } };
</script>

<template>
  <div id="app">
    <nav>
      <router-link to="/">Startseite</router-link> |
      <router-link to="/times-table-bingo">Malsätzchenbingo</router-link> |
      <router-link to="/basic-arithmetic">Grundrechnungsarten</router-link> |
      <router-link to="/equations-simple">Gleichungen (einfach)</router-link> |
      <router-link to="/equations">Gleichungen</router-link> |
      <router-link to="/fractions">Brüche</router-link>
    </nav>
    <nav>
      extern:
      <a href="https://www.matheaufgaben.net/mathe-online/" target="_blank">
        matheaufgaben.net
      </a>
    </nav>
    <RouterView />
  </div>
</template>
