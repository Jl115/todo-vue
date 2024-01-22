<script setup>
import { ref } from 'vue';
import { useRouter, RouterView } from 'vue-router';

const router = useRouter();

const items = ref([
    {
        label: 'Home',

        command: () => {
            router.push("/");
        }
    },
    {
        label: 'Calendar',
        command: () => {
            router.push('/calendar');
        }
    },
]);


</script>

<template>
  <div class="content h-screen items-center content-center  p-0 m-0">
  <header class="w-5/6 flex items-center justify-center p-0 m-0">
    
    <!-- <nav class="test h-10 gap-9">
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/about">About</RouterLink>
    </nav> -->
    <nav class="w w-11/12 items-center justify-center">
      <div class=" p-menubar bg-green-950 w-full justify-center  gap-48 ">
        <Menubar :model="items" class="p-menubar bg-green-950 text-sky-100 gap-48"/>
    </div>
    </nav>
    
  </header>

  <RouterView class="router h-full w-full itmes-center justify-center"/>

  </div>

    
    
    
 
</template>

<style scoped>
nav {
  
  display: flex;
  justify-content: center;
  margin-top: 2rem;
}
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  padding: 0;
  margin: 0;
  width: 100vw;
}
.router {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  width: 100%;
}
/* header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
} */
</style>
