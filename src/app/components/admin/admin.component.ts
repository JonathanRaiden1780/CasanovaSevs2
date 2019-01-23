import { Component, OnInit } from '@angular/core';
import { EncuestaService } from 'src/app/services/encuesta.service';
import { AngularFirestore } from 'angularfire2/firestore';
import { EncuestaexInterface } from 'src/app/Models/Encuestaex';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
// tslint:disable-next-line:max-line-length
import { faArchive, faVoteYea, faBoxes, faStar, faTrophy, faThumbsUp, faThumbsDown, faCar, faCarCrash } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from 'src/app/services/auth.service';
import { RegistroInterface } from 'src/app/Models/registro';
import { MetaInterface } from 'src/app/Models/Meta';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  constructor(
    private encuestaex: EncuestaService,
    private encuestas: EncuestaService,
    private afs: AngularFirestore,
    private authservice: AuthService
  ) {

    this.listadoEncu = encuestas.getAllEncuestaex();

    this.listadoEncuestaex = this.encuestaex.getAllEncuestaex();
    // tslint:disable-next-line:prefer-const
    let pruebasva = this.encuestaex.getAllEncuestaex();
    this.encuestaex.getitem().subscribe(id => this.list = id as Array<string>);

    console.log(pruebasva);

   this.suma = 0;
   this.sumarep = 0;
   this.sumareps = 0;
   this.sumaprom = 0;
   this.sumap2 = 0;
   this.sumap3 = 0;
   this.sumap4 = 0;
   this.sumap5 = 0;
   this.sumap6 = 0;
   this.sumap7 = 0;
   this.sumarep1 = 0;
   this.sumarep2 = 0;
   this.sumarep3 = 0;
   this.sumarep4 = 0;
   this.sumarep5 = 0;
   this.sumarep6 = 0;
   this.sumarep7 = 0;
   this.sumarep8 = 0;
   this.ins = 0;
   this.ins2 = 0;
   this.sumap8 = 0;
   this.promexesp=0
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

  rows1: any;
  colums: any;


  public isLogin: boolean;

  listadoEncu: any;

  listadoEncuestaex: any;
  ens: string;
  list: string[];
  p1: EncuestaexInterface;


//Promedio general de todas las encuestas
  sumas: number;
  suma: number;
  prome: string;
  //numero de encuestas
  contador: number;


//Encuesta Express
  //1
  sumaspreg: number;
  sumaprom: number;
  prome1: string;
  //2
  sumap2: number;
  suma2: number;
  prome2: string;
  //3
  sumap3: number;
  suma3: number;
  prome3: string;
  //4
  sumap4: number;
  suma4: number;
  prome4: string;
  //5
  sumap5: number;
  suma5: number;
  prome5: string;
  //6
  sumap6: number;
  suma6: number;
  prome6: string;
  //7
  sumap7: number;
  suma7: number;
  prome7: string;
  //8
  sumap8: number;
  suma8: number;
  prome8: string;
  //total
  promexes: number;
  promexesp: number;
  promeex: string;
  //numero de express
  contadorre: number;
//--------------------------------------------------------------------------------------------------------------------
  //promedios: string;
  //sucursals: string;
  
//Encuesta Reparacion
  //1
  sumarep1: number;
  sumare1: number;
  promere1: string;
  //2
  sumarep2: number;
  sumare2: number;
  promere2: string;
  //3
  sumarep3: number;
  sumare3: number;
  promere3: string;
  //4
  sumarep4: number;
  sumare4: number;
  promere4: string;
  //5
  sumarep5: number;
  sumare5: number;
  promere5: string;
  //6
  sumarep6: number;
  sumare6: number;
  promere6: string;
  //7
  sumarep7: number;
  sumare7: number;
  promere7: string;
  //8
  sumarep8: number;
  sumare8: number;
  promere8: string;
  //total
  sumarep: any;
  sumareps: any;
  promerep: string;
  //pensar si se agregara un valor no en suma o promedio pero para reflejar cuantas se contestaron con la bandera
  //numero de reparacion
  contadorrep: number;
//--------------------------------------------------------------------------------------------------------------------
//Encuesta Tramites
  //1
  sumatrap1: number;
  sumatra1: number;
  prometra1: string;
  //2
  sumatrap2: number;
  sumatra2: number;
  prometra2: string;
  //3
  sumatrap3: number;
  sumatra3: number;
  prometra3: string;
  //4
  sumatrap4: number;
  sumatra4: number;
  prometra4: string;
  //5
  sumatrap5: number;
  sumatra5: number;
  prometra5: string;
  //6
  sumatrap6: number;
  sumatra6: number;
  prometra6: string;
  //7
  sumatrap7: number;
  sumatra7: number;
  prometra7: string;
  //8
  sumatrap8: number;
  sumatra8: number;
  prometra8: string;
  //total
  sumatra: any;
  sumatraps: any;
  prometras:string;
  //pensar si se agregara un valor no en suma o promedio pero para reflejar cuantas se contestaron con la bandera
  //numero de reparacion
  contadortram: number;
//--------------------------------------------------------------------------------------------------------------------
  user: RegistroInterface;
  compas: any;
  ins: number;
  ins2: number;
  primev: any;
  list2: any;
  list3: any;
  Encuestaexes: Observable<EncuestaexInterface[]>;
metass:number;
  public emailUsuario: string;
  nomUsuario: any;
  mejorpreg: number;
  peorpreg: number;
  pr1: number;
  pr2: number;
  pr3: number;
  pr4: number;
  pr5: number;
  pr6: number;
  pr7: number;
  pr8: number;
  meta: number;
  

  cont() {
    this.afs.collection('Encuestaexes').valueChanges().subscribe(values => (this.contadorre = values.length) as number);
    this.afs.collection('Encuestareps').valueChanges().subscribe(values => (this.contadorrep = values.length) as number);
    this.afs.collection('Encuestatram').valueChanges().subscribe(values => (this.contadortram = values.length) as number);
    this.afs.collection('type').valueChanges().subscribe(values => this.contador = values.length);
   // this.encuestaex.getAllEncuestaex().subscribe(id      => this.p1 = id );
   // this.list = this.p1[0] as number;
   // tslint:disable-next-line:max-line-length
   // this.list = this.afs.collection('Encuestaexes').snapshotChanges().pipe(map(action => {return action.map( a => {const idz = a.payload.doc.id; return idz});}));
    this.afs.collection('type').doc('VI0001').valueChanges().pipe(take(1)).subscribe(res => {this.arras(res); } );
    // console.log(this.listadoEncuestaex);
}
arras( x: EncuestaexInterface) {
  for (let i = 0 ; i < this.contador ; i++ ) {
    this.ens = this.list[i] as string;
    this.afs.collection('type').doc(this.ens).valueChanges().pipe(take(1)).subscribe(res => {this.arrass(res); } );
    this.afs.collection('Encuestaexes').doc(this.ens).valueChanges().pipe(take(1)).subscribe(res => {this.arrass1(res); } );
    this.afs.collection('Encuestareps').doc(this.ens).valueChanges().pipe(take(1)).subscribe(res => {this.arrass2(res); } );
    this.afs.collection('Encuestatram').doc(this.ens).valueChanges().pipe(take(1)).subscribe(res => {this.arrass3(res); } );
  }
}
    //Metodo para acumular sumatoria de todas las encuestas
    arrass(x: EncuestaexInterface): number {
      this.sumas = x.total;
      this.suma = this.sumas + this.suma;
      // console.log(x.total);
      // console.log(this.suma);
      this.prom(this.suma);
      return this.suma;
    }
        //Metodo saca el promedio general
        prom(x: number) {
          this.prome  = (this.suma / this.contador).toFixed(2);
        }
//----------------------------------------------------------------------------------------------------------------
    arrass1(x: EncuestaexInterface): number {
      this.sumaspreg = x.pregunta1;
      this.sumaprom = this.sumaspreg + this.sumaprom;
      this.suma2 = x.pregunta2;
      this.sumap2 = this.suma2 + this.sumap2;
      this.suma3 = x.pregunta3;
      this.sumap3 = this.suma3 + this.sumap3;
      this.suma4 = x.pregunta4;
      this.sumap4 = this.suma4 + this.sumap4;
      this.suma5 = x.pregunta5;
      this.sumap5 = this.suma5 + this.sumap5;
      this.suma6 = x.pregunta6;
      this.sumap6 = this.suma6 + this.sumap6;
      this.suma7 = x.pregunta7;
      this.sumap7 = this.suma7 + this.sumap7;
      this.suma8 = x.pregunta8;
      this.sumap8 = this.suma8 + this.sumap8;
      this.promexes = x.total;
      this.promexesp = this.promexes + this.promexesp
      // console.log(x.total);
    // console.log(this.sumaprom);
    // console.log(this.sumaspreg);
      this.prom1(this.sumaprom);
      this.getcomparador(this.promexes);
      return  this.sumaprom, this.sumap2, this.sumap3, this.sumap4 , this.sumap5 , this.sumap6 , this.sumap7, this.sumap8, this.promexesp;
    }
        prom1(x: number) {
          this.prome1 = (this.sumaprom / this.contadorre).toFixed(2);
          this.prome2 = (this.sumap2 / this.contadorre).toFixed(2);
          this.prome3 = (this.sumap3 / this.contadorre).toFixed(2);
          this.prome4 = (this.sumap4 / this.contadorre).toFixed(2);
          this.prome5 = (this.sumap5 / this.contadorre).toFixed(2);
          this.prome6 = (this.sumap6 / this.contadorre).toFixed(2);
          this.prome7 = (this.sumap7 / this.contadorre).toFixed(2);
          this.prome8 = (this.sumap8 / this.contadorre).toFixed(2);
          this.promeex = (this.promexesp / this.contadorre).toFixed(2);
          this.getpreguntamayor();
          // tslint:disable-next-line:max-line-length
        }
            getpreguntamayor() {
              this.mejorpreg = 0;
              this.pr1 = parseFloat(this.prome1);
              this.pr2 = parseFloat(this.prome2);
              this.pr3 = parseFloat(this.prome3);
              this.pr4 = parseFloat(this.prome4);
              this.pr5 = parseFloat(this.prome5);
              this.pr6 = parseFloat(this.prome6);
              this.pr7 = parseFloat(this.prome7);
              this.pr8 = parseFloat(this.prome8);
              
              function comparar(a, b) {
                return a - b;
              }
              const prt = [this.pr1, this.pr2, this.pr3, this.pr4, this.pr5, this.pr6, this.pr7, this.pr8];
              const prt2 = [this.pr1, this.pr2, this.pr3, this.pr4, this.pr5, this.pr6, this.pr7, this.pr8];
              prt.sort(comparar);
              this.peorpreg = prt[0];
              this.mejorpreg = prt[7];
              // console.log(prt);
              }
        //Metodo par saber calificación mas alta o baja de servicio
        getcomparador(x: number): number {
          if (this.ins >= x) {
            console.log(this.ins);
            this.ins2 = x;
            console.log( this.ins2);
            // tslint:disable-next-line:no-unused-expression
            return this.ins, this.ins2 ;
          } else {
            this.ins = x ;
            console.log(this.ins);
            console.log(this.ins2);
            // tslint:disable-next-line:no-unused-expression
            return this.ins, this.ins2;
          }
        }
//----------------------------------------------------------------------------------------------------------------
    arrass2(x: EncuestaexInterface): number {
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
      //this.getcomparador(this.sumarep);
      this.prom2(this.sumareps);
      return  this.sumarep1, this.sumarep2, this.sumarep3, this.sumarep4 , this.sumarep5 , this.sumarep6 , this.sumarep7, this.sumarep8, this.sumareps;
    }
        prom2(x: number) {
          this.promere1 = (this.sumarep1 / this.contadorrep).toFixed(2);
          this.promere2 = (this.sumarep2 / this.contadorrep).toFixed(2);
          this.promere3 = (this.sumarep3 / this.contadorrep).toFixed(2);
          this.promere4 = (this.sumarep4 / this.contadorrep).toFixed(2);
          this.promere5 = (this.sumarep5 / this.contadorrep).toFixed(2);
          this.promere6 = (this.sumarep6 / this.contadorrep).toFixed(2);
          this.promere7 = (this.sumarep7 / this.contadorrep).toFixed(2);
          this.promere8 = (this.sumarep8 / this.contadorrep).toFixed(2);
          this.promerep = (this.sumareps / this.contadorrep).toFixed(2);
          // this.getpreguntamayor();
          // tslint:disable-next-line:max-line-length
       }

//----------------------------------------------------------------------------------------------------------
    arrass3(x: EncuestaexInterface): number {
      this.sumatra1 = x.pregunta1;
      this.sumatrap1 = this.sumatra1 + this.sumatrap1;
      this.sumatra2 = x.pregunta2;
      this.sumatrap2 = this.sumatra2 + this.sumatrap2;
      this.sumatra3 = x.pregunta3;
      this.sumatrap3 = this.sumatra3 + this.sumatrap3;
      this.sumatra4 = x.pregunta4;
      this.sumatrap4 = this.sumatra4 + this.sumatrap4;
      this.sumatra5 = x.pregunta5;
      this.sumatrap5 = this.sumatra5 + this.sumatrap5;
      this.sumatra6 = x.pregunta6;
      this.sumatrap6 = this.sumatra6 + this.sumatrap6;
      this.sumatra7 = x.pregunta7;
      this.sumatrap7 = this.sumatra7 + this.sumatrap7;
      this.sumatra8 = x.pregunta8;
      this.sumatrap8 = this.sumatra8 + this.sumatrap8;
      this.sumatra = x.total;
      this.sumatraps = this.sumatra + this.sumatraps;

      //this.getcomparador(this.sumarep);
      this.prom3(this.sumareps);
      return  this.sumatrap1, this.sumatrap2, this.sumatrap3, this.sumatrap4 , this.sumatrap5 , this.sumatrap6 , this.sumatrap7, this.sumatrap8, this.sumatraps;
    }
        prom3(x: number) {
          this.prometra1 = (this.sumatrap1 / this.contadortram).toFixed(2);
          this.prometra1 = (this.sumatrap2 / this.contadortram).toFixed(2);
          this.prometra1 = (this.sumatrap3 / this.contadortram).toFixed(2);
          this.prometra1 = (this.sumatrap4 / this.contadortram).toFixed(2);
          this.prometra1 = (this.sumatrap5 / this.contadortram).toFixed(2);
          this.prometra1 = (this.sumatrap6 / this.contadortram).toFixed(2);
          this.prometra1 = (this.sumatrap7 / this.contadortram).toFixed(2);
          this.prometra1 = (this.sumatrap8 / this.contadortram).toFixed(2);
          this.prometras = (this.sumatraps / this.contadortram).toFixed(2);
          // this.getpreguntamayor();
          // tslint:disable-next-line:max-line-length
      }

   // this.afs.collection<EncuestaexInterface>('type', ref =>{      return ref.orderBy('total ', 'desc').limit(1);} );
// this.list3 = this.list2.or;      
  ngOnInit() {
    
    this.cont();
    this.getData1();
     this.authservice.getAuth().subscribe( user => {
      if (user) {
        this.isLogin = true;
        this.emailUsuario = user.email;
       this.nombreusuaro(this.emailUsuario);
        // console.log(this.nomUsuario);
      } else {
        this.isLogin = false;
      }
    });

  }
  nombreusuaro(x: string) {
    this.afs.collection('Registro').doc(x).valueChanges().pipe(take(1)).subscribe(res => {this.arrayss(res); } );
    this.afs.collection('Meta').doc('META').valueChanges().pipe(take(1)).subscribe(res => {this.metad(res); } );
    // this.AuthService.getUser(this.emailUsuario);
  }
  arrayss(x: RegistroInterface): string {
    this.nomUsuario = x.nombre;
//   console.log(x.nombre);
//   console.log(this.nomUsuario); 
  return this.nomUsuario;
 }
 metad(x:MetaInterface){
  this.metass=x.meta;
 }
  getData1() {
    this.afs.collection('type').valueChanges().subscribe((encuesta) => {
      this.rows1 = encuesta ;
    });
  }
  metaact({value}: {value: MetaInterface}) {
    value.meta = this.meta;
    this.encuestaex.addMeta(value);
    this.metass = this.meta;
    //window.location.reload();
  }

}
