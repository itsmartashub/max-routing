import Vue from 'vue'
import Router from 'vue-router'
	//? ovo ode u lazy load
// import User from './components/user/User.vue'
// import UserStart from './components/user/UserStart.vue'
// import UserDetail from './components/user/UserDetail.vue'
// import UserEdit from './components/user/UserEdit.vue'
import Home from './components/Home.vue'
import Header from './components/Header.vue'

//? LOADING ROUTES LAZY - da se delovi aplikacije ucitaju samo kada su nam potrebni, da se poveca optimizacija. Elem, ovakav kod znaci da ce da napravi odmah u startu sve ove rute, a one nam mozda nece cak ni trebati, tj mozda korisnik nikad ne klikne na nesto, a ruta za to nesto se ucitala. moramo naprabiti balans izmedju tog jednog bundle.js fajla u kom se nalazi sav nas js kod, i toga sta nam u kom trenutku treba. Bilo bi kul da mozemo neporsredno pre klika na neku rutu da naporavimo istu, za to msm da u ovoj vuecli verziji sluzi ono, valjda ono sto po difoltu napravi za one dve rute (nadji na netu), a max je radio ovako:
const User = resolve => { // asinhrona fja
	require.ensure(['./components/user/User.vue'], () => {
		resolve(require('./components/user/User.vue'))
	}, 'user') // ovom ce valjda kodu samo webpack znati da pristupi, Ima triargumenta, u 1. ensure arrayu stavljamo putanje komponenti koje zelimo da se ucitaju, 2. arg je callback fja koja koristi resolve() fju koju smo proslediti kao argument gore, i u tom resolve pozivamo ponovo tu putanju. Ovo znaci, kada god zelimo da pristupimo komponenti koja se nalazi u './components/user/User.vue' (ova putanja iz niza), a recimo zelimo da je posetimo kada smo na /user ruti, dakle kada god se to desi, okini ovu resolve(require('./components/user/User.vue')) f-ju sto je u sustini promise, i tu zapravo koristi ovu komponentu na toj putanji
	// mozemo ove rute da grupisemo tako sto cemo proslediti 3. argument sto je group name, recim 'user'. I time smo grupisali ove rute i sada se pravi jedan bundle sa tim rutama (te cetiri), a ne za svaku rutu posebno (4 bundla)
	
}

const UserStart = resolve => { // asinhrona fja
	require.ensure(['./components/user/UserStart.vue'], () => {
		resolve(require('./components/user/UserStart.vue'))
	}, 'user')
}

const UserDetail = resolve => { // asinhrona fja
	require.ensure(['./components/user/UserDetail.vue'], () => {
		resolve(require('./components/user/UserDetail.vue'))
	}, 'user')
}

const UserEdit = resolve => { // asinhrona fja
	require.ensure(['./components/user/UserEdit.vue'], () => {
		resolve(require('./components/user/UserEdit.vue'))
	}, 'user')
}

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,

  scrollBehavior(to, from, savedPosition) {
      if(savedPosition) return savedPosition // da cekiramo da li postoji neka savedPosition, ako je je kor vec bio na nekoj str i ide nazad sa back btnom, ne zelimo da ga skrolujemo gore dole, vec na poziciji na kojoj je bio prethodno vec

      //? ovo se odradi ako ovo gore nije setovano tj ako nema savedPosition
      if(to.hash) return { selector: to.hash } // mozemo da namestamo da skroluje toliko i toliko (sa x, y), a mozemo da stavimo da skroluje do el sa selectorom to.hash tj #data

      //? ovo se odradi samo ako ovo gore nije odradjeno
      return { x: 0, y: 700 }
  },

  routes: [
    { 
      path: '',
      name: 'home',
      // component: Home
      components: { // na ovoj Home komponenti header je na vrhu
        default: Home,
        'header-top': Header // ovo je onaj name u App.vue u router-view
      }
    }, // { path: '/user/:id', component: User } // user/something
    
    { 
      path: '/user',
      // component: User,
      components: { // na ovo jUser komponenti header je na dnu
        default: User,
        'header-bottom': Header
      },
      children: [ // ovo je array ruta koje su nested unutar ove rute, svaka ta nested ruta ima objekat sa propertyjima, recimo path
     	{
			path: '', // ako stavim oslash tj /, podrazumeva se da ovo ide na root, a ako stavimo bez /, nadogradjuje se na parenta rutu tj /user/nesto
			component: UserStart
     	},
     	{
			path: ':id', 
			component: UserDetail,
			beforeEnter: (to, from, next) => {
				console.log('inside route setup beforeEach')
				next()
			}
		},
     	{ 
			path: ':id/edit', 
			component: UserEdit, 
			name: 'user-edit' 
		}
        // sada nam treba mesto gde bi ucitali ove children rute, jer <router-view> u App.vue je za root ruter, a ne ove nested. Tako da idemo u USer.vue i setujemo novi router-view
      ] 
    }, // user/something


    {
      path: '/redirect-me', // ako odemo na rutu /redirect-me, ono ga redirectuje na rutu koju stavismo dole za redirect (dakle na /user). 
      // redirect: '/user' // ovo moze biti i objekat sa imenima ruta
      redirect: { name: 'user-edit' } // ili name: 'home'
      // medjutim ovde ne resavamo ono sto zelimo, da koja god se url ukuca koja kod nas ne postoji, nismo definisali, da se redirektuje na User recimo ili bilo gde gde namenimo 
    },
    
    {
      path: '*', // generic catch all route, bilo koja ruta da se ukuca a koja nije kod nas 'registrovana', preusmeri se na / tj home
      redirect: '/'
    }
  ]
})

router.beforeEach((to, from, next) => {
	console.log('Global beforeEach') // ovo ovako se opaljuje pre nego sto odemo NA BILO KOJU RUTU, od ovih nasih registrovanih. A nekad zelimo ovo, a cesce zelimo samo pojedine rute ovako da zastitimo. recimo ako zelimo da zastitimo nasu UserDetail, mozemo tamo staviti f-ju tj tamo je to property beforeEach

	next() // obavezno ovo staviti ako zelimo da dozvolimo korisniku da nastavi put do putanje na koju je krenuo. Imamo tri opcije za ovo next, 1. mozemo da mu ne prosledimo nista i ono ce da nastavi svoje putesestvije i da ucita stranicu u neko vreme, 2. mozemo proslediti FALSE i ono ce da obustavi dalju radnju tj putovanje do rute, i 3. mozemo da prosledimo objekat sa putanjom rute 
})

export default router