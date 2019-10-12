import { Component, OnInit } from '@angular/core';
// tslint:disable-next-line:max-line-length
import { faCarCrash, faShippingFast, faNotesMedical, faEnvelope, faMobileAlt, faFileInvoice, faCarSide, faTachometerAlt, faGasPump, faCarAlt, faCheck, faTimes, faUser, faUserCheck } from '@fortawesome/free-solid-svg-icons';
import { EncuestaexInterface } from 'src/app/Models/Encuestaex';
import { EncuestaService } from 'src/app/services/encuesta.service';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';
import { LevelaccessService } from 'src/app/services/levelaccess.service';
import { AuthService } from 'src/app/services/auth.service';
import { RegistroInterface } from 'src/app/Models/registro';
import { Router } from '@angular/router';

@Component({
  selector: 'app-taller',
  templateUrl: './taller.component.html',
  styleUrls: ['./taller.component.css']
})
export class TallerComponent implements OnInit {
  /* Variables de opciones de formulario */
  value: string;
  opcion: string;
  name: string;
  idenc: string;
  
  /* Iconos */
  faCarCrash = faCarCrash;
 
public isLogin = false;
public isLoginAdmin = false;
public isLoginCallcenter = false;
public isLoginSuadmin = false;
public isLoginTaller = false;

public ubi :string;

  constructor(
    private afs: AngularFirestore,
    public authService: AuthService,
    public router: Router,
    private lvlaccess: LevelaccessService,
    public encuestase: EncuestaService) { }

  ngOnInit() {
    this.authService.getAuth().subscribe( user => {
      if (user) {
        this.isLogin = true;
        this.lvlaccess.getUserData(user.email).subscribe( (info: RegistroInterface) => {
            if(info.suadmin === true){
              this.ubi = info.ubicacion;
              this.isLoginSuadmin = true;
              this.isLoginAdmin = false;
              this.isLoginCallcenter = false;
              this.isLoginTaller = false;
            } else if (info.admin === true) {
              this.ubi = info.ubicacion;
              this.isLoginAdmin = true;
              this.isLoginSuadmin = false;
              this.isLoginCallcenter = false;
              this.isLoginTaller = false;
            } else if (info.tipo === 'CallCenter') {
              this.ubi = info.ubicacion;
              this.isLoginCallcenter = true;
              this.isLoginAdmin = false;
              this.isLoginTaller = false;
              this.isLoginSuadmin = false;
            } else if (info.tipo === 'Taller') {
              this.ubi = info.ubicacion;
              this.isLoginTaller = true;
              this.isLoginCallcenter = false;
              this.isLoginAdmin = false;
              this.isLoginSuadmin = false;
            } else {
              console.log('Error de sistema: Usuario sin Permisos')
            }
        });
      } else {
        this.isLogin = false;
      }
      
    });
  }           
  onEncuesta({value}: {value: EncuestaexInterface}) {
  this.name = this.idenc.toUpperCase();
  this.opcion = 'reparación'
    value.Folio = this.name;
    value.id = this.name;
    value.tipo = this.opcion;
    value.validacion = 'falta_validar';
    value.contestada = false;
    value.ubicacion = this.ubi;
//___________________________________________________________________________________
    this.afs.firestore.doc('Encuestareps/' + this.name).get()
    .then(docSnapshot => {
      if (docSnapshot.exists === true) {
        confirm('Ya existe el registro ' + this.name);
      }
      else{
        this.afs.firestore.doc('EncuestarepsC/' + this.name).get()
        .then(docSnapshot => {
          if (docSnapshot.exists === true) {
            confirm('Ya existe el registro ' + this.name);
          }
          else{
            if(this.name.includes('VI') == true){
              this.encuestase.addEcuescont(value);
              this.encuestase.addEncuestare(value);
              confirm('Registro ' + this.name + ' guardado');
            }
            else if(this.name.includes('CE') == true){
              this.encuestase.addEcuescontC(value);
              this.encuestase.addEncuestareC(value);
              confirm('Registro ' + this.name + ' guardado');
            }
          }
        });
      }
    });
  }
}
  
