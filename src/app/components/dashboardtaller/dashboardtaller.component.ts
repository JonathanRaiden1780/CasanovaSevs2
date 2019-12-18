import { Component, OnInit, ViewChild } from '@angular/core';

import { ExportAsService, ExportAsConfig } from 'ngx-export-as';

import { faCarCrash, faSearch, faStickyNote, faPrint, faCar } from '@fortawesome/free-solid-svg-icons';


import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';


import { AngularFirestore} from 'angularfire2/firestore';
import { EncuestaService } from 'src/app/services/encuesta.service';
import { DatatableService } from 'src/app/services/datatable.service';
import { LevelaccessService } from 'src/app/services/levelaccess.service';
import { AuthService } from 'src/app/services/auth.service';
import { RegistroInterface } from 'src/app/Models/registro';
import { EncuestaexInterface } from 'src/app/Models/Encuestaex';
import { take } from 'rxjs/operators';


@Component({
  selector: 'app-dashboardtaller',
  templateUrl: './dashboardtaller.component.html',
  styleUrls: ['./dashboardtaller.component.css'],
})
export class DashboardtallerComponent implements OnInit {


  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  // Iconos

  faCarCrash = faCarCrash;
  faSearch = faSearch;
  faStickyNote = faStickyNote;
  faPrint = faPrint;
  faCar = faCar;

  fechaent: string;
  fechasal: string;
  listado: any;

  list: string[];
  listv: string[];

  list2 = [];

  // Variables
  rows1: any[] = [];

  dataSource = new MatTableDataSource();
  displayedColumns = ['Folio Encuesta', 'Fecha Entrada', 'Fecha Salida', 'Placa', 'Servicio', 'Asesor', 'Cliente', 'Calificacion'];
ubi:string;
  expanded: any = {};
  timeout: any;

  config: ExportAsConfig = {
    type: 'pdf',
    elementId: 'mytable5',
  };

  cols = [{name: 'Id'}, {name: 'Tipo'}, {name: 'fechaent'}];


  constructor(
    private afs: AngularFirestore,
    private exportAsService: ExportAsService,
    private controlService: EncuestaService,
    private _dataService: DatatableService,
    public authService: AuthService,
    private lvlaccess: LevelaccessService
  ) {
    this.contadorreal = 0;
    this.suma =0;
    this.sumareps = 0;
  this.sumarep1 = 0;
  this.sumarep2 = 0;
  this.sumarep3 = 0;
  this.sumarep4 = 0;
  this.sumarep5 = 0;
  this.sumarep6 = 0;
  this.sumarep7 = 0;
  this.sumarep8 = 0;
  
    this.controlService.getitemc().subscribe(id => this.list = id as Array<string>);
    this.controlService.getitemv().subscribe(id => this.listv = id as Array<string>);

    this.controlService.getitemcoll1mb().subscribe(id => this.listp1mb = id as Array<string>);
   this.controlService.getitemcoll1b().subscribe(id =>  this.listp1b = id as Array<string>);
   this.controlService.getitemcoll1r().subscribe(id =>  this.listp1r = id as Array<string>);
   this.controlService.getitemcoll1m().subscribe(id =>  this.listp1m = id as Array<string>);
   this.controlService.getitemcoll1mm().subscribe(id => this.listp1mm = id as Array<string>);

   this.controlService.getitemcoll2mb().subscribe(id => this.listp2mb = id as Array<string>);
   this.controlService.getitemcoll2b().subscribe(id =>  this.listp2b = id as Array<string>);
   this.controlService.getitemcoll2r().subscribe(id =>  this.listp2r = id as Array<string>);
   this.controlService.getitemcoll2m().subscribe(id =>  this.listp2m = id as Array<string>);
   this.controlService.getitemcoll2mm().subscribe(id => this.listp2mm = id as Array<string>);
   
   this.controlService.getitemcoll3mb().subscribe(id => this.listp3mb = id as Array<string>);
   this.controlService.getitemcoll3b().subscribe(id =>  this.listp3b = id as Array<string>);
   this.controlService.getitemcoll3r().subscribe(id =>  this.listp3r = id as Array<string>);
   this.controlService.getitemcoll3m().subscribe(id =>  this.listp3m = id as Array<string>);
   this.controlService.getitemcoll3mm().subscribe(id => this.listp3mm = id as Array<string>);

   this.controlService.getitemcoll4mb().subscribe(id => this.listp4mb = id as Array<string>);
   this.controlService.getitemcoll4b().subscribe(id =>  this.listp4b = id as Array<string>);
   this.controlService.getitemcoll4r().subscribe(id =>  this.listp4r = id as Array<string>);
   this.controlService.getitemcoll4m().subscribe(id =>  this.listp4m = id as Array<string>);
   this.controlService.getitemcoll4mm().subscribe(id => this.listp4mm = id as Array<string>);

   this.controlService.getitemcoll5mb().subscribe(id => this.listp5mb = id as Array<string>);
   this.controlService.getitemcoll5b().subscribe(id =>  this.listp5b = id as Array<string>);
   this.controlService.getitemcoll5r().subscribe(id =>  this.listp5r = id as Array<string>);
   this.controlService.getitemcoll5m().subscribe(id =>  this.listp5m = id as Array<string>);
   this.controlService.getitemcoll5mm().subscribe(id => this.listp5mm = id as Array<string>);

   this.controlService.getitemcoll6mb().subscribe(id => this.listp6mb = id as Array<string>);
   this.controlService.getitemcoll6b().subscribe(id =>  this.listp6b = id as Array<string>);
   this.controlService.getitemcoll6r().subscribe(id =>  this.listp6r = id as Array<string>);
   this.controlService.getitemcoll6m().subscribe(id =>  this.listp6m = id as Array<string>);
   this.controlService.getitemcoll6mm().subscribe(id => this.listp6mm = id as Array<string>);

   this.controlService.getitemcoll7mb().subscribe(id => this.listp7mb = id as Array<string>);
   this.controlService.getitemcoll7b().subscribe(id =>  this.listp7b = id as Array<string>);
   this.controlService.getitemcoll7r().subscribe(id =>  this.listp7r = id as Array<string>);
   this.controlService.getitemcoll7m().subscribe(id =>  this.listp7m = id as Array<string>);
   this.controlService.getitemcoll7mm().subscribe(id => this.listp7mm = id as Array<string>);

   this.controlService.getitemcoll8mb().subscribe(id => this.listp8mb = id as Array<string>);
   this.controlService.getitemcoll8b().subscribe(id =>  this.listp8b = id as Array<string>);
   this.controlService.getitemcoll8r().subscribe(id =>  this.listp8r = id as Array<string>);
   this.controlService.getitemcoll8m().subscribe(id =>  this.listp8m = id as Array<string>);
   this.controlService.getitemcoll8mm().subscribe(id => this.listp8mm = id as Array<string>);

   this.controlService.getitemcoll9mb().subscribe(id => this.listp9mb = id as Array<string>);
   this.controlService.getitemcoll9r().subscribe(id => this.listp9r = id as Array<string>);
   this.controlService.getitemcoll9mm().subscribe(id =>  this.listp9mm = id as Array<string>);

   this.controlService.getitemcoll10mb().subscribe(id => this.listp10mb = id as Array<string>);
   this.controlService.getitemcoll10mm().subscribe(id =>  this.listp10mm = id as Array<string>);

  }

 ngOnInit() {
  this.authService.getAuth().subscribe( user => {
    if (user) {
      this.lvlaccess.getUserData(user.email).subscribe( (info: RegistroInterface) => {
////console.log('usuario desde lvl:', info);
            if(info.ubicacion == 'Centenario'){
              this.ubi = 'Centenario';
              this.listado = this.controlService.getAllEncuestaexC();
              this.afs.collection('typeC').doc('CE0001').valueChanges().pipe(take(1)).subscribe(res => {this.arras(res); console.log("metodo")} );
              this.afs.collection('typeC').valueChanges().subscribe(values => this.contador = values.length);
              return this._dataService.getDocsC().subscribe(res => this.dataSource.data = res ), this.list, this.rows1;
              
              

            }
            else if (info.ubicacion === 'Viga') {
              this.ubi = 'Viga';
              this.listado = this.controlService.getAllEncuestaex();
              this.afs.collection('type').doc('VI0001').valueChanges().pipe(take(1)).subscribe(res => {this.arrasv(res); } );
              this.afs.collection('typeC').valueChanges().subscribe(values => this.contador = values.length);
              return this._dataService.getDocsV().subscribe(res => this.dataSource.data = res );
          } else {
           // //console.log('Error de sistema: Usuario sin Permisos')
          }
      });
    }
  });
  }

 /* 
  getData1() {

if(this.ubi == 'Centenario'){
  this.afs.collection('typeC').valueChanges().subscribe((encuesta) => {
    this.rows1 = encuesta;
  });
  this.listado = this.rows1;
  this.list = this.rows1;
  this.list2 = this.rows1;
  this.afs.collection('typeC').valueChanges().subscribe(values => this.contador = values.length);
  this.afs.collection('type').doc('VI0001').valueChanges().pipe(take(1)).subscribe(res => {this.arras(res); } );
  console.log('cente')
}
else if(this.ubi == 'Viga'){
  this.afs.collection('type').valueChanges().subscribe((encuesta) => {
    this.rows1 = encuesta;
  });

  this.listado = this.rows1;
  this.list = this.rows1;
  this.list2 = this.rows1;
  this.afs.collection('type').valueChanges().subscribe(values => this.contadorv = values.length);
  this.afs.collection('type').doc('VI0001').valueChanges().pipe(take(1)).subscribe(res => {this.arrasv(res); } );
  //console.log('viga')

}

    
  }
 */contador:number;
contadorv:number;
ens:string;
sumas: number;
suma: number;
contadorreal: number;
prome: string;

cp1mb: number; cp1b: number; cp1r: number; cp1m: number; cp1mm: number;
   cp2mb: number; cp2b: number; cp2r: number; cp2m: number; cp2mm: number;
   cp3mb: number; cp3b: number; cp3r: number; cp3m: number; cp3mm: number;
   cp4mb: number; cp4b: number; cp4r: number; cp4m: number; cp4mm: number;
   cp5mb: number; cp5b: number; cp5r: number; cp5m: number; cp5mm: number;
   cp6mb: number; cp6b: number; cp6r: number; cp6m: number; cp6mm: number;
   cp7mb: number; cp7b: number; cp7r: number; cp7m: number; cp7mm: number;
   cp8mb: number; cp8b: number; cp8r: number; cp8m: number; cp8mm: number;
   cp9mb: number; cp9mm: number; cp9r:number; cp10mb: number; cp10mm: number;

   listp1mb: string[]; listp2mb: string[]; listp3mb: string[]; listp4mb: string[]; listp5mb: string[]; listp6mb: string[]; listp7mb: string[]; listp8mb: string[]; listp9mb: string[]; listp10mb: string[];
   listp1b: string[]; listp2b: string[]; listp3b: string[]; listp4b: string[]; listp5b: string[]; listp6b: string[]; listp7b: string[]; listp8b: string[]; 
   listp1r: string[]; listp2r: string[]; listp3r: string[]; listp4r: string[]; listp5r: string[]; listp6r: string[]; listp7r: string[]; listp8r: string[];  listp9r:string[];
   listp1m: string[]; listp2m: string[]; listp3m: string[]; listp4m: string[]; listp5m: string[]; listp6m: string[]; listp7m: string[]; listp8m: string[]; 
   listp1mm: string[]; listp2mm: string[]; listp3mm: string[]; listp4mm: string[]; listp5mm: string[]; listp6mm: string[]; listp7mm: string[]; listp8mm: string[]; listp9mm: string[]; listp10mm: string[];

arrasv( x: EncuestaexInterface) {
  for (let i = 0 ; i < this.contador ; i++ ) {
    this.ens = this.listv[i] as string;
    this.afs.collection('type').doc(this.ens).valueChanges().pipe(take(1)).subscribe(res => {this.arrassv(res); } );
    this.afs.collection('type').doc(this.ens).valueChanges().pipe(take(1)).subscribe(res => {this.arrassv2(res); } );
  }
}
 arras( x: EncuestaexInterface) {
  for (let i = 0 ; i < this.contador ; i++ ) {
    this.ens = this.list[i] as string;
    this.afs.collection('typeC').doc(this.ens).valueChanges().pipe(take(1)).subscribe(res => {this.arrass(res); } );
    this.afs.collection('typeC').doc(this.ens).valueChanges().pipe(take(1)).subscribe(res => {this.arrass2(res); } );
  }
  
 }
    // Metodo para acumular sumatoria de todas las encuestas
    arrass(x: EncuestaexInterface): number {
      if (x.contestada == true){
        this.sumas = x.total;
      this.suma = this.sumas + this.suma;
        const contadortemp = 1
        this.contadorreal = contadortemp + this.contadorreal;
        this.prome = (this.suma / this.contadorreal).toFixed(2);
        console.log("Promedio Cente", this.prome);
        console.log("Contador Cente", this.contadorreal);


      }
      return this.suma;
    }
    arrassv(x: EncuestaexInterface): number {
      if (x.contestada == true){
        this.sumas = x.total;
      this.suma = this.sumas + this.suma;
        const contadortemp = 1
        this.contadorreal = contadortemp + this.contadorreal;
        this.prome = (this.suma / this.contadorreal).toFixed(2);
        console.log("Promedio Viga", this.prome);
        console.log("Contador Viga", this.contadorreal);

      }
      return this.suma;
    }
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

 Promedio2: number;

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

      this.prom2(this.sumareps);
      return  this.sumarep1, this.sumarep2, this.sumarep3, this.sumarep4 , this.sumarep5 , this.sumarep6 , this.sumarep7, this.sumarep8, this.sumareps;
    }
  }
  arrassv2(x: EncuestaexInterface): number {
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
  
    this.prom2(this.sumareps);
    return  this.sumarep1, this.sumarep2, this.sumarep3, this.sumarep4 , this.sumarep5 , this.sumarep6 , this.sumarep7, this.sumarep8, this.sumareps;
  }
}

prom2(x: number) {
  this.promere1 = (this.sumarep1 / this.contadorreal).toFixed(2);
  this.promere2 = (this.sumarep2 / this.contadorreal).toFixed(2);
  this.promere3 = (this.sumarep3 / this.contadorreal).toFixed(2);
  this.promere4 = (this.sumarep4 / this.contadorreal).toFixed(2);
  this.promere5 = (this.sumarep5 / this.contadorreal).toFixed(2);
  this.promere6 = (this.sumarep6 / this.contadorreal).toFixed(2);
  this.promere7 = (this.sumarep7 / this.contadorreal).toFixed(2);
  this.promere8 = (this.sumarep8 / this.contadorreal).toFixed(2);
  this.promerep = (this.sumareps / this.contadorreal).toFixed(2);
  this.Promedio2 = (this.sumareps / this.contadorreal);

  this.cp1mb = this.listp1mb.length;
    this.cp1b =  this.listp1b.length;
    this.cp1r =  this.listp1r.length;
    this.cp1m =  this.listp1m.length;
    this.cp1mm = this.listp1mm.length;

    this.cp2mb = this.listp2mb.length;
    this.cp2b =  this.listp2b.length;
    this.cp2r =  this.listp2r.length;
    this.cp2m =  this.listp2m.length;
    this.cp2mm = this.listp2mm.length;
    
    this.cp3mb = this.listp3mb.length;
    this.cp3b =  this.listp3b.length;
    this.cp3r =  this.listp3r.length;
    this.cp3m =  this.listp3m.length;
    this.cp3mm = this.listp3mm.length;

    this.cp4mb = this.listp4mb.length;
    this.cp4b =  this.listp4b.length;
    this.cp4r =  this.listp4r.length;
    this.cp4m =  this.listp4m.length;
    this.cp4mm = this.listp4mm.length;

    this.cp5mb = this.listp5mb.length;
    this.cp5b =  this.listp5b.length;
    this.cp5r =  this.listp5r.length;
    this.cp5m =  this.listp5m.length;
    this.cp5mm = this.listp5mm.length;

    this.cp6mb = this.listp6mb.length;
    this.cp6b =  this.listp6b.length;
    this.cp6r =  this.listp6r.length;
    this.cp6m =  this.listp6m.length;
    this.cp6mm = this.listp6mm.length;

    this.cp7mb = this.listp7mb.length;
    this.cp7b =  this.listp7b.length;
    this.cp7r =  this.listp7r.length;
    this.cp7m =  this.listp7m.length;
    this.cp7mm = this.listp7mm.length;

    this.cp8mb = this.listp8mb.length;
    this.cp8b =  this.listp8b.length;
    this.cp8r =  this.listp8r.length;
    this.cp8m =  this.listp8m.length;
    this.cp8mm = this.listp8mm.length;

    this.cp9mb = this.listp9mb.length;
    this.cp9r = this.listp9r.length;
    this.cp9mm = this.listp9mm.length;

    this.cp10mb =this.listp10mb.length;
    this.cp10mm =this.listp10mm.length;
}


  onPage(event) {
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      ////console.log('paged!', event);
    }, 100);
  }

  onDetailToggle(event) {
    ////console.log('Detail Toggled', event);
  }

  exportAs(type) {
    
    this.config.type = type;
    this.exportAsService.save(this.config, 'myFile');
  }

  myFunction() {
    // Declare variables
    let input, filter, table, tr, td, i, txtValue, input2, filter2, input3, filter3;
    input3 = "true";
    filter3 = input3;

    input = document.getElementById('inputfe');
    filter = input.value;
    input2 = document.getElementById('inputfs');
    filter2 = input2.value;
    table = document.getElementById('mytable5');
    tr = table.getElementsByTagName('tr');
/*     for (i = 0; i < tr.length; i++) {
      td = tr[i].getElementsByTagName('td')[1];
      if (td) {
        txtValue = td.textContent || td.innerText;
        if (txtValue >= filter && txtValue <= filter2 && txtValue.indexOf(filter3) > -1 ) {
          tr[i].style.display = '';
        } else {
          tr[i].style.display = 'none';
        }
      }
    } */
    for (i = 0; i < tr.length; i++) {
      td = tr[i].getElementsByTagName('td')[12];
      if (td) {
        txtValue = td.textContent || td.innerText;
        if (txtValue.indexOf(filter3) > -1 ) {
          tr[i].style.display = '';
        } else {
          tr[i].style.display = 'none';
        }
      }
    }
  }
  /* myFunction2() {
    // Declare variables
    let input, filter, table, tr, td, i, txtValue;
    input = "true";
    filter = input;
    
    table = document.getElementById('mytable5');
    tr = table.getElementsByTagName('tr');
    for (i = 0; i < tr.length; i++) {
      td = tr[i].getElementsByTagName('td')[12];
      if (td) {
        txtValue = td.textContent || td.innerText;
        if (txtValue.indexOf(filter) > -1 ) {
          tr[i].style.display = '';
        } else {
          tr[i].style.display = 'none';
        }
      }
    }
  } */

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
