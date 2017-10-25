import {Storage} from "./storage";
import {Problem} from "../model/problem.model";

export class ProblemDao {

    public static save(problem: Problem): Promise<any> {
        let sql: string = `INSERT INTO PROBLEMS (ADDRESS, DESCRIPTION) 
            VALUES ('${problem.address}', '${problem.description}')`;

        return Storage.executeSql(sql);
    }

    public static edit(problem: Problem): Promise<any> {
        let sql: string = `UPDATE PROBLEMS SET 
                ADDRESS = '${problem.address}', 
                DESCRIPTION = '${problem.description}' 
            WHERE ID = ${problem.id}`;

        return Storage.executeSql(sql);
    }

    public static getAll(): Promise<Problem[]> {
        let sql: string = `SELECT ID 'id', ADDRESS 'name', DESCRIPTION 'price' FROM PROBLEMS`;

        return Storage.executeSql(sql);
    }

    public static get(id: number): Promise<Problem> {
        let sql: string = `SELECT ID 'id', ADDRESS 'name', DESCRIPTION 'price' FROM PROBLEMS 
            WHERE ID = ${id}`;

        return Storage.executeSql(sql).then((problems: Problem[]) => {
            return problems[0];
        });
    }

}