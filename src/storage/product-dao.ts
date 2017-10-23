import {Storage} from "./storage";
import {Problem} from "../model/product.model";

export class ProductDao {

    public static save(product: Problem): Promise<any> {
        let sql: string = `INSERT INTO PROBLEMS (ADDRESS, DESCRIPTION) 
            VALUES ('${product.address}', '${product.description}')`;

        return Storage.executeSql(sql);
    }

    public static edit(product: Problem): Promise<any> {
        let sql: string = `UPDATE PROBLEMS SET 
                ADDRESS = '${product.address}', 
                DESCRIPTION = '${product.description}' 
            WHERE ID = ${product.id}`;

        return Storage.executeSql(sql);
    }

    public static getAll(): Promise<Problem[]> {
        let sql: string = `SELECT ID 'id', ADDRESS 'name', DESCRIPTION 'price' FROM PROBLEMS`;

        return Storage.executeSql(sql);
    }

    public static get(id: number): Promise<Problem> {
        let sql: string = `SELECT ID 'id', ADDRESS 'name', DESCRIPTION 'price' FROM PROBLEMS 
            WHERE ID = ${id}`;

        return Storage.executeSql(sql).then((products: Problem[]) => {
            return products[0];
        });
    }

}