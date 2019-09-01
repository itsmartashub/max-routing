<template>
    <div>
        <h3>Edit the User</h3>
        <p>Locale: {{ $route.query.lokal }}</p>
        <p>Analytics: {{ $route.query.q }}</p>
        <hr>
        <button class="btn btn-primary" @click="confirmed = true">Confirm</button>
        <div style="height: 700px"></div>
        <p id="data">Some extra Data</p>
    </div>
</template>

<script>
export default {
	data() {
		return {
			confirmed: false
		}
	},

	beforeRouteLeave(to, from, next) { // ovo je jedino mesto gde ovo mogu da uradim, tj unutar komponente gde hocu da proverim ovo, jelte. Ovo se odradi neposredno pre nego sto odemo van ove rute, navigate away, tako da cekiranje ovoga na global nivou bi bilo prekasno jer navigate bi vec bila na svom putu. Pa umesto toga stavljamo ovde u ovu komponentu koja ce odluciti da li ti je uopste dozvoljeno da ides negde drugde 
		//! e ovde za razliku od onog beforeRouteEnter() u UserDetail.vue imamo pristup objektima u ovoj komponenti, trecimo this.confirmed i mi pricamo o tome da li nam je dozvoljeno da ODEMO, dakle gotovom tu smo vec bili, dakle samim tim smo imali pristup podacima u ovoj komponenti, tj naravno da je komponetna vec kreirana jer je koristimo sve vreme

		if(this.confirmed) {
			next()
		} else {
			if(confirm('Are You sure?')) { // ovim pitamo korisnika da li je sig da zeli da napusti stranicu, recimo ako je slucajno kliknuo
				next()
			} else {
				next(false)
			}
		}
	}
}
</script>