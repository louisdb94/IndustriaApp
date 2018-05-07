import { Pipe, PipeTransform } from '@angular/core';
@Pipe({ name: 'FilterDegree' })
export class FilterDegree implements PipeTransform {
  transform(categories: any, searchText: any): any {
    if(searchText == null) return categories;
    return categories.filter(function(category){
        return category.toLowerCase().indexOf(searchText.toLowerCase()) > -1;
    })
  }
}
