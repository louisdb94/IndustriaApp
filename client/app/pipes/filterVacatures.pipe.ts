import { Pipe, PipeTransform } from '@angular/core';
@Pipe({ name: 'FilterVacature' })
export class FilterVacature implements PipeTransform {
  transform(categories: any, searchText: any, type: any): any {
    if(searchText == null) return categories;

    return categories.filter(function(category){

      if(type == 'Vacature'){
        return category.vacature_name.toLowerCase().indexOf(searchText.toLowerCase()) > -1;
      }
      else if (type == 'Type'){
        return category.type.toLowerCase().indexOf(searchText.toLowerCase()) > -1;}
      else if (type == 'Company'){
        return category.company_name.toLowerCase().indexOf(searchText.toLowerCase()) > -1;}
      else if (type == 'Com'){
        return category.name.toLowerCase().indexOf(searchText.toLowerCase()) > -1;}


    })
  }
}
