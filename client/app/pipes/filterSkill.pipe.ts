import { Pipe, PipeTransform } from '@angular/core';
@Pipe({ name: 'FilterSkill' })
export class FilterSkill implements PipeTransform {
  transform(categories: any, searchText: any): any {
    if(searchText == null) return categories;
    return categories.filter(function(category){
        return category.skill.toLowerCase().indexOf(searchText.toLowerCase()) > -1;
    })
  }
}
