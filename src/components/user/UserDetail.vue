<template>
    <div>
        <h3>Some User Details</h3>
        <p>User loaded has ID: {{ $route.params.id }}</p>
        <!-- ovo u {{ }} smo mogli sacuvati dole u neki property, ali posto ova ruta nece biti apdejtovana tako sto navigate nazad ka drugoj ruti, mozemo jednostavno napisati $route.params.id.
        Dakle ovde ne treba onaj watcher da watchujemo promene ove rute jer smo samo na ovaj UserDetail komponenti, nema nacina za nas da kliknemo negde da ucitamo korisnika sa id-em 2, a ako rucno unesemo u url, ono ce se reloadovati svakako. Tako da nema potrebe da setujemo ponovo watcher gde watchujem moguce promene paramsa u ruti, jer se to nece desiti. Komponenta ce se REKREIRATI svakako jer moram da navigate away i onda da je ponovo ucitamo jer klikcem na link
        -->
        <!-- <router-link tag="button" :to="'/user/' + $route.params.id + '/edit'" class="btn btn-success">Edit User</router-link> -->
        <router-link tag="button" :to="link" class="btn btn-success">Edit User</router-link>
        <!-- ovde query definisemo kao objekat sa key:value parom.  -->
        
    </div>
</template>

<script>
export default {
    data() {
        return {
            link: {
                name: 'user-edit',
                params: {
                    id: this.$route.params.id
                },
                query: {
                    lokal: 'en',
                    q: 100
                },
                hash: '#data' // ali ovo i dalje ne skroluje do #data
            }
        }
    },

	beforeRouteEnter(to, from, next) { //* ovde (tj na sva tri ona mesta za beforeEach(), beforeEach i ovo) nemam pristup komponenti kojoj ovo prosledjujemo (nzm sta), vec imamo pristup samo ruti sa koje dolazimo i ka kojoj idemo, i ovoj next() fji
		// this.link // JOK!
		// ovde recimo proveravamo da li je korisnik autentifikovan, i ako je to slucaj, okidamo next(), a ako nije autentifikovan onda jednostavno kazemo next da obustavi radnju tj stavljamo mu da je false:
		if(true) { // stavi ovde false samo da proveris da l stva nece dozvoliti pristup, tj obustavice se dalja radnja tj odradice se ovaaj dole else
			next()
		} else {
			next(false)
		}
		// next(vm => {
		// 	vm.link
		// }) //! mnogo bitno, dokle god ne pozovemo ovo next() ova komponenta nije ucitana!!! To takodje znaci da u uvom lifecycle hooku NE MOZES DA PRISTUPIS VUE INSTANCI, NE MOZES DA PRISTUPIS SVOJIM PODACIMA!!! tako da ako stavimo samo this.link NECE RADITI ,jer se komponenta jos nije kreirala. Ovo su retke situacije kada smo u ovom fajlu, ali ovaj objekat link nije skroz inicijalizovan tako da mu ne mozemo pristupiti ovde. I kljucno je da to imamo na umu!
		//! Ako apsolutno moramo da mu pristupimo, mozemo proslediti callback next-u, gde prosledjujemo nas vue model, tj instancu ove komponenteovoj fji, i onda mozemo pristupiti linku sa vm.link
	}

	
}
</script>