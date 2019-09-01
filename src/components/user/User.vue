<template>
<!-- inace, mora ovde neki div kao wrapper, izbacuje gresku ako nema diva -->
    <div>
        <h1>The User Page</h1>
        <hr>
        <!-- <p>Loaded ID: {{ id }}</p> -->
        <button @click="navigateToHome" class="btn btn-primary">Go to Home</button>
        <router-view></router-view>
    </div>

</template>

<script>
export default {
    // data() {
    //     return {
    //         id: this.$route.params.id // ovako pristupamo parametrima koji se nalaze u /user/:id url-u. $rout'e je aktivna ruta, ruta koja je ucitana, a $router je ruter po sebi, nesto pomocu cega mozemo da navigate
    //     }
    // },

    // watch: {
    //     '$route'(to, from) { // ovo znaci da kadgod se $route promeni, dakle RUTA kad se promeni, samo se ovaj id ne apdejtuje jer nije computed ili dynamic component, ali ovde mozemo da posmatramo route promene, i onda execute neki kod koji zelimo da se okine kad god se ova promena rute desi. Ovo ce biti f-ja, prihvata dva argumenta, TO i FROM, FROM - s koje rute dolazimo, TO - na koju rutu idemo. Ok, ovde je to ista ruta, ali postoji jedna bitna stvar, imamo NOVI PARAMETAR koji se nalazi na ovoj novoj ruti koju hocemo da ucitamo
    //         this.id = to.params.id // to je nova ruta koja ce da se ucita, dakle id je sada jednak+ parametru rute na koju idemo
    //     } 
    // },

    methods: {
        navigateToHome() {
            this.$router.push('/') // dakle vec smo ustanovili da $ se odnosi ne na nase objekte, nego na objekte koje smo omogucili nekim vue paketom itd
        }
    }
}
</script>