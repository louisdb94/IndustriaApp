import { Pipe, PipeTransform } from '@angular/core';
@Pipe({ name: 'FilterPipe' })
export class FilterPipe implements PipeTransform {
  transform(categories: any, searchText: any, type: any): any {
    if(searchText == null) return categories;

    return categories.filter(function(category){

      if(type == 'Degree'){
        return category.degree.toLowerCase().indexOf(searchText.toLowerCase()) > -1;
      }
      else if (type == 'Name'){
        return category.name.toLowerCase().indexOf(searchText.toLowerCase()) > -1;}
      // else if (type == 'Graduation Year'){
      //   if(category.gradYear = (searchText > -1)){
      //     return category.gradYear;
      //   }
      //
      // }


    })
  }
}
