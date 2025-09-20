import { injectable } from 'tsyringe';
@injectable()
export class Tree {
  constructor() {}

  getFunctionTree(data: any[], level: number, root: string): any[] {
    let result: any[] = [];
    for(let i = 0;  i < data.length; i++){
        if (data[i].level == level && data[i].parent_id == root){
            let row = Object.assign({}, data[i]);
            let lowerLevel:any[] = this.getFunctionTree(data, level+1, row.function_id);
            let isLeaf = lowerLevel.length == 0;
            let levelResult = {
              title: row.function_name,
              key: row.function_id,
              value: row.function_id,
              parent_id: row.parent_id,
              level: row.level,
              url: row.url,
              children: lowerLevel,
              sort_order: row.sort_order,
              is_leaf: isLeaf
            };
            result.push(levelResult);
        }
    }
    return result;
  }

  getLocationTree(data: any[], level: number, root: number): any[] {
    let result: any[] = [];
    for(let i = 0;  i < data.length; i++){
        if (data[i].level == level && data[i].parent_id == root){
            let row = Object.assign({}, data[i]);
            let lowerLevel:any[] = this.getLocationTree(data, level+1, row.location_id);
            let isLeaf = lowerLevel.length == 0;
            let levelResult = {
              title: row.location_name,
              key: row.location_id,
              value: row.location_id,
              parent_id: row.parent_id,
              level: row.level,
              url: row.url,
              children: lowerLevel,
              sort_order: row.sort_order,
              is_leaf: isLeaf
            };
            result.push(levelResult);
        }
    }
    return result;
  }

}
