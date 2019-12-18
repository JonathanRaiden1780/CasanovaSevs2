import { Component, OnInit } from '@angular/core';
import { EncuestaService } from 'src/app/services/encuesta.service';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { EncuestaexInterface } from 'src/app/Models/Encuestaex';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { faArchive, faVoteYea, faBoxes, faStar, faTrophy, faThumbsUp, faThumbsDown, faCar, faCarCrash } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from 'src/app/services/auth.service';
import { RegistroInterface } from 'src/app/Models/registro';
import { MetaInterface } from 'src/app/Models/Meta';

import { ExportAsService, ExportAsConfig } from 'ngx-export-as';
import { RouterLink, Router } from '@angular/router';

@Component({
  selector: 'app-adminc',
  templateUrl: './adminc.component.html',
  styleUrls: ['./adminc.component.css']
})
export class AdmincComponent implements OnInit {
  constructor(
   private encuestaex: EncuestaService,
   private afs: AngularFirestore,
   private authservice: AuthService,
   private router: Router
 ) {

  
 
   this.encuestaex.getitemc().subscribe(id => this.list = id as Array<string>);
   //get rep
   this.encuestaex.getitemrepc().subscribe(id => this.listrep = id as Array<string>);
  
   this.encuestaex.getitemcoll1mb().subscribe(id => this.listp1mb = id as Array<string>);
 
  this.suma = 0;
  this.sumareps = 0;
  this.sumarep1 = 0;
  this.sumarep2 = 0;
  this.sumarep3 = 0;
  this.sumarep4 = 0;
  this.sumarep5 = 0;
  this.sumarep6 = 0;
  this.sumarep7 = 0;
  this.sumarep8 = 0;
  this.insre = 0;
  this.contadorreal = 0;
  this.contadorreperacion = 0;
  this.insre2 = 0;
 }
 faArchive = faArchive;
 faBoxes = faBoxes;
 faVoteYea = faVoteYea;
 faTrophy = faTrophy;
 faStar = faStar;
 faThumbsUp = faThumbsUp;
 faThumbsDown = faThumbsDown;
 faCar = faCar;
 faCarCrash = faCarCrash;

 public rows1: any[];
 colums: any;
 
 public isLogin: boolean;
  

 // Variables
 listado: any;
 


 ens: string;
 ens1: string;
 ens2: string;
 ens3: string;
 list: string[];
 listex: string[];
 listrep: string[];
 listtra: string[];
 listp1mb: string[];
 p1: EncuestaexInterface;
minter: MetaInterface;
 
// Promedio general de todas las encuestas
 sumas: number;
 suma: number;
 prome: string;
 // numero de encuestas
 contador: number;
 contadorreal: number;
 contadorreal1: any
 contadortemporal: number;
 Promedio1: number;
 Promedio2: number;
 Promedio3: number;
 // Encuesta Reparacion
 // 1
 sumarep1: number;
 sumare1: number;
 promere1: string;
 // 2
 sumarep2: number;
 sumare2: number;
 promere2: string;
 // 3
 sumarep3: number;
 sumare3: number;
 promere3: string;
 // 4
 sumarep4: number;
 sumare4: number;
 promere4: string;
 // 5
 sumarep5: number;
 sumare5: number;
 promere5: string;
 // 6
 sumarep6: number;
 sumare6: number;
 promere6: string;
 // 7
 sumarep7: number;
 sumare7: number;
 promere7: string;
 // 8
 sumarep8: number;
 sumare8: number;
 promere8: string;
 // total
 sumarep: any;
 sumareps: any;
 promerep: string;
 // pensar si se agregara un valor no en suma o promedio pero para reflejar cuantas se contestaron con la bandera
 // numero de reparacion
 contadorrep: number;
 contadorreperacion: number;
// --------------------------------------------------------------------------------------------------------------------
user: RegistroInterface;
 compas: any;
// comparadores
 insre: number;
 insre2: number;
 instot: number;
 instot2: number;
// ---------------------------------------------------------
 list3: any;
 Encuestaexes: Observable<EncuestaexInterface[]>;
 
 metass: number;
 
 public emailUsuario: string;
 nomUsuario: any;
 
 mejorpreg: number;
 peorpreg: number;
 
 pr8: number;
 pr9: number;
 pr10: number;
 pr11: number;
 pr12: number;
 pr13: number;
 pr14: number;
 pr15: number;
 meta: number;
   typeCollection: AngularFirestoreCollection<EncuestaexInterface>;
       casd: string;
 
 
 cont() {
   this.afs.collection('EncuestarepsC').valueChanges().subscribe(values => (this.contadorrep = values.length) as number);
   this.afs.collection('typeC').valueChanges().subscribe(values => this.contador = values.length);
   this.afs.collection('typeC').doc('VI0001').valueChanges().pipe(take(1)).subscribe(res => {this.arras(res); } );
}
arras( x: EncuestaexInterface) {
 for (let i = 0 ; i < this.contador ; i++ ) {
   this.ens = this.list[i] as string;
   this.afs.collection('typeC').doc(this.ens).valueChanges().pipe(take(1)).subscribe(res => {this.arrass(res); } );
 }
 for (let i = 0 ; i < this.contadorrep ; i++ ) {
   this.ens2 = this.listrep[i] as string;
   this.afs.collection('EncuestarepsC').doc(this.ens2).valueChanges().pipe(take(1)).subscribe(res => {this.arrass2(res); } );
 }
}
   // Metodo para acumular sumatoria de todas las encuestas
   arrass(x: EncuestaexInterface): number {
     if (x.contestada == true){
       this.sumas = x.total;
     this.suma = this.sumas + this.suma;
     this.list3 =  this.getcomparadortot(this.sumas);
       const contadortemp = 1
       this.contadorreal = contadortemp + this.contadorreal;
       this.prome = (this.suma / this.contadorreal).toFixed(2);
     }
     return this.suma;
   }
       getcomparadortot(x: number) {
         this.mejorpreg = 0;
         this.pr8 = parseFloat(this.promere1);
         this.pr9 = parseFloat(this.promere2);
         this.pr10 = parseFloat(this.promere3);
         this.pr11 = parseFloat(this.promere4);
         this.pr12 = parseFloat(this.promere5);
         this.pr13 = parseFloat(this.promere6);
         this.pr14 = parseFloat(this.promere7);
         this.pr15 = parseFloat(this.promere8);
         function comparar(a, b) {
           return a - b;
         }
         const prt = [this.pr8, this.pr9, this.pr10, this.pr11, this.pr12, this.pr13, this.pr14, this.pr15];
         prt.sort(comparar);
         this.peorpreg = prt[0];
         this.mejorpreg = prt[7];
         this.typeCollection =  this.afs.collection('typeC');
         const querys = this.typeCollection.ref.where('total', '==', this.mejorpreg).get()
         .then(snapshot => {
          snapshot.forEach(doc => {this.casd = doc.id;
          });
        });
       }
    
// ----------------------------------------------------------------------------------------------------------------
   arrass2(x: EncuestaexInterface): number {
     if(x.contestada == true){
     this.sumare1 = x.pregunta1;
     this.sumarep1 = this.sumare1 + this.sumarep1;
     this.sumare2 = x.pregunta2;
     this.sumarep2 = this.sumare2 + this.sumarep2;
     this.sumare3 = x.pregunta3;
     this.sumarep3 = this.sumare3 + this.sumarep3;
     this.sumare4 = x.pregunta4;
     this.sumarep4 = this.sumare4 + this.sumarep4;
     this.sumare5 = x.pregunta5;
     this.sumarep5 = this.sumare5 + this.sumarep5;
     this.sumare6 = x.pregunta6;
     this.sumarep6 = this.sumare6 + this.sumarep6;
     this.sumare7 = x.pregunta7;
     this.sumarep7 = this.sumare7 + this.sumarep7;
     this.sumare8 = x.pregunta8;
     this.sumarep8 = this.sumare8 + this.sumarep8;
     this.sumarep = x.total;
     this.sumareps = this.sumarep + this.sumareps;
     var tem = 1;
     this.contadorreperacion = tem + this.contadorreperacion;
     this.prom2(this.sumareps);
     this.getcomparador2(this.sumarep);
     return  this.sumarep1, this.sumarep2, this.sumarep3, this.sumarep4 , this.sumarep5 , this.sumarep6 , this.sumarep7, this.sumarep8, this.sumareps;
   }
 }
       prom2(x: number) {
         this.promere1 = (this.sumarep1 / this.contadorreperacion).toFixed(2);
         this.promere2 = (this.sumarep2 / this.contadorreperacion).toFixed(2);
         this.promere3 = (this.sumarep3 / this.contadorreperacion).toFixed(2);
         this.promere4 = (this.sumarep4 / this.contadorreperacion).toFixed(2);
         this.promere5 = (this.sumarep5 / this.contadorreperacion).toFixed(2);
         this.promere6 = (this.sumarep6 / this.contadorreperacion).toFixed(2);
         this.promere7 = (this.sumarep7 / this.contadorreperacion).toFixed(2);
         this.promere8 = (this.sumarep8 / this.contadorreperacion).toFixed(2);
         this.promerep = (this.sumareps / this.contadorreperacion).toFixed(2);
         this.Promedio2 = (this.sumareps / this.contadorreperacion);
      }
       // Metodo par saber calificación mas alta o baja de servicio
       getcomparador2(x: number): number {
         if (this.insre >= x) {
           this.insre2 = x;
           return this.insre, this.insre2 ;
         } else {
           this.insre = x ;
           return this.insre, this.insre2;
         }
       }
  ngOnInit() {
   this.cont();
   this.getData1();
    this.authservice.getAuth().subscribe( user => {
     if (user) {
       this.isLogin = true;
       this.emailUsuario = user.email;
      this.nombreusuaro(this.emailUsuario);
     } else {
       this.isLogin = false;
     }
   });
 
 }
 nombreusuaro(x: string) {
   this.afs.collection('Registro').doc(x).valueChanges().pipe(take(1)).subscribe(res => {this.arrayss(res); } );
   this.afs.collection('Meta').doc('METAC').valueChanges().pipe(take(1)).subscribe(res => {this.metad(res); } );
 }
 arrayss(x: RegistroInterface): string {
   this.nomUsuario = x.nombre;
 return this.nomUsuario;
}
metad(x: MetaInterface) {
 this.metass = x.meta;
}
otroget(){
    this.rows1 = this.vas;
}
 vas: any[];
 getData1(): any  {
return  this.encuestaex.getitemallC().subscribe(x => {
 this.vas = x.filter(x=>x.ubicacion  == 'Centenario' && x.contestada == true); 
 this.rows1 = this.vas;
 return this.vas;
  });
 }
 metaprom(x: MetaInterface) {
   x.meta = this.metass;
   x.Promgen = (this.Promedio1 + this.Promedio2 + this.Promedio3);
   this.encuestaex.addMetaC(x);
 }
 metaact({value}: {value: MetaInterface}) {
   value.meta = this.meta;
   this.encuestaex.addMetaC(value); 
   this.metass = this.meta;
 }
 export() {
  this.router.navigate(['/dashboardt']);
}


 
}
