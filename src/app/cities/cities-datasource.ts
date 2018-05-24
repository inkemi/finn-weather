import { DataSource } from '@angular/cdk/collections';
import { MatPaginator, MatSort } from '@angular/material';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';

export interface CitiesItem {
  nimi: string;
  maakunta: string;
}

const EXAMPLE_DATA: CitiesItem[] = [
  {nimi: 'Akaa', maakunta: 'Pirkanmaa'},
  {nimi: 'Alajärvi', maakunta: 'Etelä-Pohjanmaa'},
  {nimi: 'Alavuus', maakunta: 'Etelä-Pohjanmaa'},
  {nimi: 'Espoo', maakunta: 'Uusimaa'},
  {nimi: 'Forssa', maakunta: 'Kanta-Häme'},
  {nimi: 'Haapajärvi', maakunta: 'Pohjois-Pohjanmaa'},
  {nimi: 'Haapavesi', maakunta: 'Pohjois-Pohjanmaa'},
  {nimi: 'Hamina', maakunta: 'Kymenlaakso'},
  {nimi: 'Hanko', maakunta: 'Uusimaa'},
  {nimi: 'Harjavalta', maakunta: 'Satakunta'},
  {nimi: 'Heinola',maakunta: 'Päijät-Häme'},
  {nimi: 'Helsinki', maakunta: 'Uusimaa'},
  {nimi: 'Huittinen', maakunta: 'Satakunta'},
  {nimi: 'Hyvinkää', maakunta: 'Uusimaa'},
  {nimi: 'Hämeenlinna', maakunta: 'Kanta-Häme'},
  {nimi: 'Iisalmi', maakunta: 'Pohjois-Savo'},
  {nimi: 'Ikaalinen', maakunta: 'Pirkanmaa'},
  {nimi: 'Imatra', maakunta: 'Etelä-Karjala'},
  {nimi: 'Joensuu', maakunta: 'Pohjois-Karjala'},
  {nimi: 'Jyväskylä', maakunta: 'Keski-Suomi'},
  {nimi: 'Jämsä', maakunta: 'Keski-Suomi'},
  {nimi: 'Järvenpää', maakunta: 'Uusimaa'},
  {nimi: 'Kaarina', maakunta: 'Varsinais-Suomi'},
  {nimi: 'Kajaani', maakunta: 'Kainuu'},
  {nimi: 'Kalajoki', maakunta: 'Pohjois-Pohjanmaa'},
  {nimi: 'Kangasala', maakunta: 'Pirkanmaa'},
  {nimi: 'Kankaanpää', maakunta: 'Satakunta'},
  {nimi: 'Kannus', maakunta: 'Keski-Pohjanmaa'},
  {nimi: 'Karkkila', maakunta: 'Uusimaa'},
  {nimi: 'Kaskinen', maakunta: 'Pohjanmaa'},
  {nimi: 'Kauhajoki', maakunta: 'Etelä-Pohjanmaa'},
  {nimi: 'Kauhava', maakunta: 'Etelä-Pohjanmaa'},
  {nimi: 'Kauniainen', maakunta: 'Uusimaa'},
  {nimi: 'Kemi', maakunta: 'Lappi'},
  {nimi: 'Kemijärvi', maakunta: 'Lappi'},
  {nimi: 'Kerava', maakunta: 'Uusimaa'},
  {nimi: 'Keuruu', maakunta: 'Keski-Suomi'},
  {nimi: 'Kitee', maakunta: 'Pohjois-Karjala'},
  {nimi: 'Kiuruvesi', maakunta: 'Pohjois-Savo'},
  {nimi: 'Kokemäki', maakunta: 'Satakunta'},
  {nimi: 'Kokkola', maakunta: 'Keski-Pohjanmaa'},
  {nimi: 'Kotka', maakunta: 'Kymenlaakso'},
  {nimi: 'Kouvola', maakunta: 'Kymenlaakso'},
  {nimi: 'Kristiinankaupunki', maakunta: 'Pohjanmaa'},
  {nimi: 'Kuhmo', maakunta: 'Kainuu'},
  {nimi: 'Kuopio', maakunta: 'Pohjois-Savo'},
  {nimi: 'Kurikka', maakunta: 'Etelä-Pohjanmaa'},
  {nimi: 'Kuusamo', maakunta: 'Pohjois-Pohjanmaa'},
  {nimi: 'Lahti', maakunta: 'Päijät-Häme'},
  {nimi: 'Laitila', maakunta: 'Varsinais-Suomi'},
  {nimi: 'Lappeenranta', maakunta: 'Etelä-Karjala'},
  {nimi: 'Lapua', maakunta: 'Etelä-Pohjanmaa'},
  {nimi: 'Lieksa', maakunta: 'Pohjois-Karjala'},
  {nimi: 'Lohja', maakunta: 'Uusimaa'},
  {nimi: 'Loimaa', maakunta: 'Varsinais-Suomi'},
  {nimi: 'Loviisa', maakunta: 'Uusimaa'},
  {nimi: 'Maarianhamina', maakunta: 'Ahvenanmaa'},
  {nimi: 'Mikkeli', maakunta: 'Etelä-Savo'},
  {nimi: 'Mänttä-Vilppula', maakunta: 'Pirkanmaa'},
  {nimi: 'Naantali', maakunta: 'Varsinais-Suomi'},
  {nimi: 'Nivala', maakunta: 'Pohjois-Pohjanmaa'},
  {nimi: 'Nokia', maakunta: 'Pirkanmaa'},
  {nimi: 'Nurmes', maakunta: 'Pohjois-Karjala'},
  {nimi: 'Närpiö', maakunta: 'Pohjanmaa'},
  {nimi: 'Orimattila', maakunta: 'Päijät-Häme'},
  {nimi: 'Orivesi', maakunta: 'Pirkanmaa'},
  {nimi: 'Oulainen', maakunta: 'Pohjois-Pohjanmaa'},
  {nimi: 'Oulu', maakunta: 'Pohjois-Pohjanmaa'},
];

export class CitiesDataSource extends DataSource<CitiesItem> {
  data: CitiesItem[] = EXAMPLE_DATA;

  constructor(private paginator: MatPaginator, private sort: MatSort) {
    super();
  }

  connect(): Observable<CitiesItem[]> {

    const dataMutations = [
      observableOf(this.data),
      this.paginator.page,
      this.sort.sortChange
    ];

    this.paginator.length = this.data.length;

    return merge(...dataMutations).pipe(map(() => {
      return this.getPagedData(this.getSortedData([...this.data]));
    }));
  }

  disconnect() { }

  private getPagedData(data: CitiesItem[]) {
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    return data.splice(startIndex, this.paginator.pageSize);
  }

  private getSortedData(data: CitiesItem[]) {
    if (!this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort.direction === 'asc';
      switch (this.sort.active) {
        case 'name': return compare(a.nimi, b.nimi, isAsc);
        case 'id': return compare(a.maakunta, b.maakunta, isAsc);
        default: return 0;
      }
    });
  }
}

function compare(a, b, isAsc) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
