import {IConnection, IError} from "mysql";
import {MySqlDatabase} from "./mysql-database";

export class Storage {

    public static executeSql(sql: string): Promise<any | IError> {
        return new Promise((resolve, reject) => {
            MySqlDatabase.getConnection().then((connection: IConnection) => {
                connection.query(sql, (error: IError, result: any) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(result);
                    }
                })
            })
        })
    }

}