import { Component, OnInit } from '@angular/core';
// tslint:disable-next-line:max-line-length
import { faCarCrash, faShippingFast, faNotesMedical, faEnvelope, faMobileAlt, faFileInvoice, faCarSide, faTachometerAlt, faGasPump, faCarAlt, faCheck, faTimes, faUser, faUserCheck } from '@fortawesome/free-solid-svg-icons';
import { EncuestaexInterface } from 'src/app/Models/Encuestaex';
import { EncuestaService } from 'src/app/services/encuesta.service';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';
import { RegistroCompletoInterface } from 'src/app/Models/Registrocompleto';
import { resetComponentState, componentRefresh } from '@angular/core/src/render3/instructions';
import { FormGroup } from '@angular/forms';
import { LevelaccessService } from 'src/app/services/levelaccess.service';
import { AuthService } from 'src/app/services/auth.service';
import { RegistroInterface } from 'src/app/Models/registro';

@Component({
  selector: 'app-taller',
  templateUrl: './taller.component.html',
  styleUrls: ['./taller.component.css']
})
export class TallerComponent implements OnInit {
  /* Variables de opciones de formulario */
  opt1: boolean;
  opt2: boolean;
  opt3: boolean;
  value: string;
  opcion: string;
  name: string;
  idenc: string;
  EncuestaDoc: AngularFirestoreDocument<EncuestaexInterface>;
  EncuestaCollection: AngularFirestoreCollection<EncuestaexInterface>;
  /* Iconos */
  faCarCrash = faCarCrash;
  faShippingFast = faShippingFast;
  faNotesMedical = faNotesMedical;
  faEnvelope = faEnvelope;
  faMobileAlt = faMobileAlt;
  faFileInvoice = faFileInvoice;
  faCar = faCarSide;
  faSerial = faNotesMedical;
  faKm = faTachometerAlt;
  faGas = faGasPump;
  faBrand = faCarAlt;
  faYes = faCheck;
  faNo = faTimes;
  faUser = faUser;
  faUserCheck = faUserCheck;


/* Datos Llenado completo*/

opcion2:string;
indenc2:string;
placa: string;
vehiculo: string;
marca: string;
combustible: string;
numserie: string;
kilometraje: number;
anio: number;
fechaent: string;
fechasal: string;
tarjetac: string;
llantas: string;
ordenservicio: string;
antena: string;
llantaref: string;
vestiduras: string;
controlllave: string;
gato: string;
tapetes: string;
llavetuerc: string;
taponllanta: string;
extintor: string;
kitherram: string;
segurorueda: string;
senal: string;
placas: string;
tapongas: string;
radio: string;
admonflota: string;
asesor: string;
solicitud: string;
trabajosol: string;
trabajorea: string;
nocliente: string;
ccliente: string;
nucliente: string;
estatus:string;
cliente: string;
tecnico:string;
tipo: string;
comentarios: string;
Diagnostico:string;
rows1:any;
rows2:any;
rows3:any;
rows4:any;


public isLogin = false;
public isLoginAdmin = false;
public isLoginCallcenter = false;
public isLoginSuadmin = false;
public isLoginTaller = false;

public nombreUsuario: string;
public emailUsuario: string;

public admin = false;
public taller = false;
public callcenter = false;
public suadmin = false;


// rol: string;
userName: string;

usuario: RegistroInterface = { 
  id: '',
  nombre: '',
  correo: '',
  admin: false,
  suadmin: false,
  tipo: ''
};
nomUsuario: any;
  constructor(
    private afs: AngularFirestore,
    public authService: AuthService,
    private lvlaccess: LevelaccessService,
    public encuestase: EncuestaService) { }

  ngOnInit() {
    this.Option( this.value );
    this.getData1();

    this.authService.getAuth().subscribe( user => {
      if (user) {
        this.isLogin = true;
        this.lvlaccess.getUserData(user.email).subscribe( (info: RegistroInterface) => {
//console.log('usuario desde lvl:', info);
            if(info.suadmin === true){
              this.isLoginSuadmin = true;
              this.isLoginAdmin = false;
              this.isLoginCallcenter = false;
              this.isLoginTaller = false;
            } else if (info.admin === true) {
              this.isLoginAdmin = true;
              this.isLoginSuadmin = false;
              this.isLoginCallcenter = false;
              this.isLoginTaller = false;
            } else if (info.tipo === 'CallCenter') {
              this.isLoginCallcenter = true;
              this.isLoginAdmin = false;
              this.isLoginTaller = false;
              this.isLoginSuadmin = false;
            } else if (info.tipo === 'Taller') {
              this.isLoginTaller = true;
              this.isLoginCallcenter = false;
              this.isLoginAdmin = false;
              this.isLoginSuadmin = false;
            } else {
              console.log('Erro de sistema: Usuario sin Permisos')
            }
        });
      } else {
        this.isLogin = false;
      }
    });
  }
  getData1() {
    //get coll
        this.afs.collection('Clientes').valueChanges().subscribe((encuesta) => {
       this.rows1 = encuesta ;
     });
     this.afs.collection('AdministradoresFlota').valueChanges().subscribe((encuesta) => {
      this.rows2 = encuesta ;
    });
    this.afs.collection('Mecanicos').valueChanges().subscribe((encuesta) => {
      this.rows3 = encuesta ;
    });
    this.afs.collection('Asesor').valueChanges().subscribe((encuesta) => {
      this.rows4 = encuesta ;
    });
        }
  Option( opt: string ) {
    if ( opt === 'express' ) {
      this.opt1 = true;
      this.opt2 = false;
      this.opt3 = false;
      this.tipo = opt;
    }
    if ( opt === 'reparación' ) {
      this.opt1 = false;
      this.opt2 = true;
      this.opt3 = false;
      this.tipo = opt;
    }
    if ( opt === 'trámite' ) {
      this.opt1 = false;
      this.opt2 = false;
      this.opt3 = true;
      this.tipo = opt;
    }
  }
  Window(){
    var iframe = '<html><head><title>CASANOVA SEVS</title><style>body, html {width: 100%; height: 100%; margin: 0; padding: 0}</style></head><body><iframe src="agregator" style="height:calc(100% - 4px);width:calc(100% - 4px)"></iframe></html></body>';
var win = window.open("CASANOVA SEVS",'CASANOVA SEVS','width=800,height=580,toolbar=no,menubar=no,resizable=no');
win.document.write(iframe);
   // window.open('agregator','CASANOVA SEVS', 'width=800, height=600, directories=no,titlebar=no,toolbar=no,location=no,status=no,menubar=no,scrollbars=no,resizable=no,');
  }
  onGuardar({value}: {value: RegistroCompletoInterface}) {
    
//Folio y tipo de servicio
    value.id =   this.indenc2.toLocaleUpperCase();
    value.tipo = this.opcion2;
//Datos de Vehiculo
    value.placa = this.placa.toLocaleUpperCase();
    value.vehiculo = this.vehiculo;
    value.marca = this.marca.toLocaleLowerCase();
    value.combustible = this.combustible;
    value.numserie = this.numserie;
    value.kilometraje = this.kilometraje;
    value.anio = this.anio;
//Cliente
    value.NombreCliente = this.nocliente;
    value.CorreoCliente = this.ccliente;
    value.NumeroCliente = this.nucliente;
    value.cliente = this.cliente;
//Administrador
    value.Administrador = this.admonflota;
    value.asesor = this.asesor;
//Taller 1era parte
    value.fechaent = this.fechaent ;
    value.fechasal = this.fechasal;
    value.Diagnostico = this.Diagnostico;
    value.Solicta = this.solicitud;
    value.Trabajorealizado = this.trabajorea;
    value.Estatus = this.estatus;
    value.Tecnico = this.tecnico;
//Taller 2da parte
    value.tarjetacirculacion = this.tarjetac;
    value.antena= this.antena;
    value.controlllave = this.controlllave;
    value.llavetuerc = this.llavetuerc;
    value.kitherram = this.kitherram;
    value.llantas = this.llantas;
    value.llantaref = this.llantaref;
    value.gato = this.gato;
    value.taponllanta = this.taponllanta;
    value.segurorueda = this.segurorueda;
    value.tapongas = this.tapongas;
    value.ordenservicio = this.ordenservicio;
    value.vestiduras = this.vestiduras;
    value.tapetes = this.tapetes;
    value.extintor = this.extintor;
    value.senal = this.senal;
    value.radio = this.radio;
    value.comentarios = this.comentarios;
    
    //console.log(value); 
    var nameid = this.indenc2.toUpperCase();
    this.afs.firestore.doc('Encuestaexes/' + nameid).get()
    .then(docSnapshot => {
      if (docSnapshot.exists === true) {
        confirm('Registro ' + nameid + ' guardado');
        value.tipo = 'express';
       this.encuestase.updateType(value);
      } else {
        this.afs.firestore.doc('Encuestareps/' + nameid).get()
        .then(docSnapshot => {
          if (docSnapshot.exists === true) {
            confirm('Registro ' + nameid + ' guardado');
            value.tipo = 'reparación';
            this.encuestase.updateType(value);
          } else {
            this.afs.firestore.doc('Encuestatram/' + nameid).get()
            .then(docSnapshot => {
              if (docSnapshot.exists === true) {
                confirm('Registro ' + nameid+ ' guardado');
                value.tipo = 'trámite';
                this.encuestase.updateType(value);
              } else {
                 confirm('Registro ' + nameid + ' no existe');
                
              }
            });
          }
        });
      }
    });
    
  }
  onEncuesta({value}: {value: EncuestaexInterface}) {
  this.name = this.idenc.toUpperCase();
    value.Folio = this.name;
    value.id = this.name;
    value.tipo = this.opcion;
    value.validacion = 'falta_validar';
    value.contestada = false;
    //console.log(value);

    this.afs.firestore.doc('Encuestaexes/' + this.name).get()
    .then(docSnapshot => {
      if (docSnapshot.exists === true) {
        confirm('Ya existe el registro ' + this.name);
     //  this.encuestase.addEncuestaex(value);
      } else {
        this.afs.firestore.doc('Encuestareps/' + this.name).get()
        // tslint:disable-next-line:no-shadowed-variable
        .then(docSnapshot => {
          if (docSnapshot.exists === true) {
            confirm('Ya existe el registro ' + this.name);
          //  this.encuestase.addEncuestare(value);
          } else {
            this.afs.firestore.doc('Encuestatram/' + this.name).get()
            // tslint:disable-next-line:no-shadowed-variable
            .then(docSnapshot => {
              if (docSnapshot.exists === true) {
                confirm('Ya existe el registro ' + this.name);
              //  this.encuestase.addEncuestare(value);
              } else {
                if (this.opcion === 'express') {
                  this.encuestase.addEcuescont(value);
                  this.encuestase.addEncuestaex(value);
                  confirm('Registro ' + this.name + ' guardado');
                }
                if (this.opcion === 'reparación') { 
                  this.encuestase.addEcuescont(value);
                  this.encuestase.addEncuestare(value);
                  confirm('Registro ' + this.name + ' guardado');
                }
                if (this.opcion === 'trámite') {
                  this.encuestase.addEcuescont(value);
                  this.encuestase.addEncuestatr(value);
                  confirm('Registro ' + this.name + ' guardado');
                }
              }
            });
          }
        });
      }
    });
  }
  
}
