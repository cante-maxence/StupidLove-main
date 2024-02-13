<template>
    <div class="add-article text-white">
      <h2>Ajouter un nouvel article</h2>
      <!-- Formulaire pour l'ajout d'un article -->
      <form @submit.prevent="submitArticle">
        <div class="form-group">
          <label for="title" >Titre</label>
          <!-- v-model lie la valeur de l'input à la propriété title de data -->
          <input type="text" class="text-black" id="title" v-model="article.title" required>
        </div>
        <div class="form-group">
          <label for="content">Contenu</label>
          <!-- Utilisation de textarea pour le contenu de l'article -->
          <textarea id="content" class="text-black" v-model="article.content" required></textarea>
        </div>
        <div class="form-group">
          <label for="author">Auteur</label>
          <input type="text" class="text-black" id="author" v-model="article.author" required>
        </div>

        <!-- Bouton pour soumettre le formulaire -->
        <button type="submit">Ajouter l'article</button>
      </form>
    </div>
  </template>
  
  <script>
  // Importation des fonctions nécessaires depuis Firebase
 import { db } from '../../src/firebase-config.js';
  import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

  import { ref } from 'vue';

  

  export default {
    name: 'AddArticle',
    setup() {
      // Réactif state pour l'article à ajouter
      const article = ref({
        title: '',
        content: '',
        author: ''
      });
  
      // Fonction appelée lors de la soumission du formulaire
      async function submitArticle() {
        if (!article.value.title || !article.value.content || !article.value.author) {
          alert("Tous les champs sont requis !");
          return;
        }
        
        try {
          // Ajout de l'article dans la collection 'articles' de Firestore
          await addDoc(collection(db, "articles"), {
            title: article.value.title,
            content: article.value.content,
            author: article.value.author,
            createdAt: serverTimestamp()
          });
          alert("Article ajouté avec succès !");
          // Réinitialisation des champs après l'ajout
          article.value = { title: '', content: '', author: '' };
        } catch (error) {
          console.error("Erreur lors de l'ajout de l'article :", error);
          alert("Erreur lors de l'ajout de l'article.");
        }
      }
  
      return { article, submitArticle };
    }
  };
  </script>
  
  <!-- Style de base -->
  <style scoped>
  .add-article {
    max-width: 600px;
    margin: auto;
    padding: 20px;
  }
  
  .form-group {
    margin-bottom: 20px;
  }
  
  .form-group label {
    display: block;
    margin-bottom: 5px;
  }
  
  .form-group input[type="text"],
  .form-group textarea {
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
  }
  </style>
  