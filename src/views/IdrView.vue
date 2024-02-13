<template>




<div class="px-4 mx-auto sm:max-w-xl md:max-w-full text-white lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-10 ">
    <div class="max-w-xl mb-10 md:mx-auto sm:text-center lg:max-w-2xl md:mb-12">
      <div>
      </div>
      <h2 class="max-w-lg mb-6 font-sans text-3xl font-bold leading-none tracking-tight  sm:text-4xl md:mx-auto">
        <span class="relative inline-block">

          <span class="relative">Plusieurs</span>
        </span>
        Tests pour savoir quelle type de personnes vous-êtes ?
      </h2>
      <h3 class="text-base text-gray-100 md:text-lg">
        Des tests a faire dans les 2 sens : Pour vous et pour lui.
      </h3>
      <div id="app" class="text-center">
        
      <PersonalityTest/>
      <RoucoulTest/>
    </div>
    </div>
  </div>





  </template>
  
  <script>
import PersonalityTest from '../components/PersonalityTest.vue';
import RoucoulTest from '../components/RoucoulTest.vue';

export default {
  name: 'App',
  components: {
    PersonalityTest,
    RoucoulTest // Ajoutez cette ligne pour enregistrer RoucoulTest comme composant
  }
};

  </script>
  