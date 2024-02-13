<template>
 <div class="grid md:grid-cols-2 items-center min-h-screen p-4 gap-4">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
      <div
        class="max-w-md mx-auto my-10 bg-white/10 p-4 sm:p-6 lg:p-8 rounded-md shadow-lg transform transition duration-500 hover:scale-105">
        <div class="text-center">
          <h1 class="my-3 text-2xl sm:text-3xl font-semibold text-white">Inscription</h1>
          <p class="text-white text-xs sm:text-sm md:text-base">Inscrivez-vous pour avoir un compte</p>
        </div>

        <div class="m-7">
          <form method="POST" id="signup-form" class="animate-fade-in-up">

            <div class="mb-6">
              <label for="email" class="block mb-2 text-xs sm:text-sm md:text-base text-white">Email</label>
              <input type="email" v-model="email" placeholder="CentralPerk@mail.com" required
                class="w-full px-3 py-2 placeholder-gray-300 bg-white/20 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-300 focus:border-indigo-300" />
            </div>
            <div class="mb-6">
              <label for="password" class="block mb-2 text-xs sm:text-sm md:text-base text-white">Mot de passe</label>
              <input type="password" v-model="password" placeholder="Votre mot de passe" required
                class="w-full px-3 py-2 placeholder-gray-300 bg-white/20 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-300 focus:border-indigo-300" />
            </div>
            <div class="mb-6">
              <button @click.prevent="signUp" type="button"
                class="w-full px-3 py-2 sm:py-3 md:py-4 text-white bg-red-600 rounded-md hover:bg-red-700 focus:outline-none shadow-lg transform transition duration-500 hover:scale-105">
                S'inscrire
              </button>
              <p class="text-xs sm:text-sm md:text-base text-center text-white">{{ resultMessage }}</p>
            </div>
            <p class="text-xs sm:text-sm md:text-base text-center text-white" id="signup-result"></p>
          </form>
        </div>
      </div>
    </div>


    <div class="grid  items-center min-h-screen p-4">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <div
          class="max-w-md mx-auto my-10 bg-white/10 p-4 sm:p-6 lg:p-8 rounded-md shadow-lg transform transition duration-500 hover:scale-105">
          <div class="text-center">
            <h1 class="my-3 text-3xl font-semibold text-white">
              Connexion
            </h1>
            <p class="text-white text-sm">
              Connectez-vous pour accéder à votre compte
            </p>
          </div>

          <div class="m-7">
            <form method="POST" id="login-form" class="animate-fade-in-up">

              <div class="mb-6">
                <label for="email" class="block mb-2 text-sm text-white">Email</label>
                <input type="email" v-model="email" name="email" id="email" placeholder="CentralPerk@mail.com" required
                  class="w-full px-3 py-2 placeholder-gray-300 bg-white/20 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-300 focus:border-indigo-300" />
              </div>
              <div class="mb-6">
                <label for="password" class="block mb-2 text-sm text-white">Mot de passe</label>
                <input type="password" v-model="password" name="password" id="password" placeholder="Mot de passe"
                  required
                  class="w-full px-3 py-2 placeholder-gray-300 bg-white/20 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-300 focus:border-indigo-300" />
              </div>
              <div class="mb-6">
                <button @click.prevent="login" type="button"
                  class="w-full px-3 py-4 text-white bg-red-600 mb-4 rounded-md hover:bg-red-700 focus:outline-none shadow-lg transform transition duration-500 hover:scale-105">
                  Se connecter
                </button>
                <hr>
                <button type="button" @click="logout"
                  class="w-full px-3 mt-4 py-4 text-white bg-red-600 rounded-md hover:bg-red-700 focus:outline-none shadow-lg transform transition duration-500 hover:scale-105">
                  Déconnexion
                </button>

                <p class="text-base text-center text-white">{{ resultMessage }}</p>
            
              </div>
              <p class="text-base text-center text-white" id="login-result"></p>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
  

  
<script>
import { ref } from 'vue';
import { auth } from '../firebase-config';
import { signOut } from 'firebase/auth';


import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

export default {
  methods: {
    async logout() {
      try {
        await signOut(auth);
        console.log("Vous êtes maintenant déconnecté.");
        // Redirigez l'utilisateur ou affichez un message
      } catch (error) {
        console.error("Erreur de déconnexion: ", error);
      }
    }
  },
  name: 'AuthenticationComponent',
  setup() {
    const email = ref('');
    const password = ref('');
    const resultMessage = ref('');

    const signUp = async () => {
      try {
        const userCredential = await createUserWithEmailAndPassword(auth, email.value, password.value);
        resultMessage.value = 'Inscription réussie';
        console.log(userCredential);
      } catch (error) {
        resultMessage.value = error.message;
        console.error(error);
      }
    };

    const login = async () => {
      try {
        const userCredential = await signInWithEmailAndPassword(auth, email.value, password.value);
        resultMessage.value = 'Connexion réussie';
        console.log(userCredential);
      } catch (error) {
        resultMessage.value = error.message;
        console.error(error);
      }
    };

    return { email, password, resultMessage, signUp, login };
  },
  logout() {
    signOut(auth).then(() => {
      // Déconnexion réussie, rediriger ou informer l'utilisateur
      console.log('Déconnexion réussie');
      
      // Par exemple, rediriger vers la page de connexion ou d'accueil
      this.$router.push('/'); // Ajustez selon votre route de connexion
    }).catch((error) => {
      // Gérer les erreurs de déconnexion ici
      console.error('Erreur lors de la déconnexion:', error);
    });

  }

  

}

const logout = async () => {
  try {
    await signOut(auth);
    resultMessage.value = 'Déconnexion réussie';
    console.log("L'utilisateur a été déconnecté.");
    // Redirigez l'utilisateur ou mettez à jour l'interface utilisateur comme nécessaire
  } catch (error) {
    resultMessage.value = "Erreur lors de la tentative de déconnexion : " + error.message;
    console.error(error);
  }
};

</script>
