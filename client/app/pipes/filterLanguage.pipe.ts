import { Pipe, PipeTransform } from '@angular/core';
@Pipe({ name: 'FilterLanguage' })
export class FilterLanguage implements PipeTransform {
  transform(categories: any, searchText: any): any {
    if(searchText == null) return categories;
    return categories.filter(function(category){
        return category.type.toLowerCase().indexOf(searchText.toLowerCase()) > -1;
    })
  }
}
