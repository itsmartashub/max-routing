<template>
     <ul class="nav nav-pills">
          <!-- <li role="presentation"><router-link to="/">Home</router-link></li>
          <li role="presentation"><router-link to="/user">User</router-link></li> -->

          <!-- styling active link WTF -->
          <router-link to="/" tag="li" active-class="active" exact><a>Home</a></router-link>
          <!-- <router-link to="/user/1" tag="li" active-class="active" exact><a>User 1</a></router-link> -->
          <!-- <router-link to="/user/2" tag="li" active-class="active" exact><a>User 2</a></router-link> -->
          <!-- medjutim, mi za ovaj user 1 i user 2 mozda menjamo rute, ali id u Loaded ID se ne rifresuje, jer recimo mi kad kliknemo na User 1 i odemo na path /user/1, i onda hocemo na User 2, mi smo u sustini na istoj komponenti, menjamo samo putanju, ali se 'ocitava' ista component. Vue js ne rekreira componentu opet. 
          A to je problem ukoliko nam je neki deo path-a bitan i koji koristimo u komponenti kao  recimo ovde id sto pozivamo u componenti, i za to nam treba neki watcher kojim bismo posmatrali delove url-a tj params, njihovu promenu, i ako se promene, zelimo da aupdejtujemo deo nase stranice koji takodje mora biti apdejtovan u zavisnosti od parametra. Tako da za to mozemo koristiti nas watch (idemo u User.vue da ga definisemo)
          -->
          <router-link to="/user" tag="li" active-class="active" exact><a>User</a></router-link>
     </ul>
</template>