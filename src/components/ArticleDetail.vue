<template>
    <article class="max-w-2xl px-4 py-24 mx-auto space-y-12 text-white dark:bg-gray-800 dark:text-gray-50">
      <div class="w-full mx-auto space-y-4 text-center">
        <h1 class="text-4xl font-bold md:text-5xl">{{ article.title }}</h1>
        <p class="text-sm dark:text-gray-400">par
          <a rel="noopener noreferrer" href="/Contact" target="_blank" class="underline dark:text-violet-400">
            <span itemprop="name">{{ article.author }}</span>
          </a> écrit le
          <time :datetime="new Date(article.createdAt.seconds * 1000).toISOString()">{{ new Date(article.createdAt.seconds * 1000).toLocaleDateString() }}</time>
        </p>
      </div>
      <div class="dark:text-gray-100">
        <div class="max-w-3xl mx-auto p-5">
          <p class="mb-6" v-html="article.content"></p>
        </div>
      </div>
      <div class="pt-12 border-t dark:border-gray-700">
        <div class="flex flex-col space-y-4 md:space-y-0 md:space-x-6 md:flex-row">
          <!-- Si vous avez une image pour l'auteur, vous pouvez l'inclure ici -->
          
          <div class="flex flex-col">
            <h4 class="text-lg font-semibold">{{ article.author }}</h4>
            <p class="dark:text-gray-400">Cet article a été écrit par quelqu'un comme vous et moi. Ne voyez pas ce texte comme une vérité générale mais comme des conseils venant d'un ami.</p>
          </div>
        </div>
      </div>
    </article>
  </template>
  
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import { db } from '../../src/firebase-config';
  import { doc, getDoc } from 'firebase/firestore';
  import { useRoute } from 'vue-router';
  
  const route = useRoute();
  const article = ref({});
  
  onMounted(async () => {
    const docRef = doc(db, "articles", route.params.id);
    const docSnap = await getDoc(docRef);
  
    if (docSnap.exists()) {
      article.value = docSnap.data();
    } else {
      console.error("Article not found!");
    }
  });
  </script>
  
  <style>
  /* Ajoutez votre style ici */
  </style>
  