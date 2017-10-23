import * as mysql from "mysql";
import {IConnection, IConnectionConfig, IError} from "mysql";

export class MySqlDatabase {

    private static connection: IConnection;

    public static getConnection(): Promise<IConnection> {
        if (MySqlDatabase.connection == null) {
            return MySqlDatabase.makeConnection().then((connection: IConnection) => {
                MySqlDatabase.connection = connection;
                return Promise.resolve(MySqlDatabase.connection);
            })
        }

        return Promise.resolve(MySqlDatabase.connection);
    }

    private static makeConnection(): Promise<IConnection> {
        return new Promise((resolve, reject) => {
            let config: IConnectionConfig = {
                host: '127.0.0.1',
                user: 'root',
                password: 'root',
                database: 'street_problems'
            };

            let connection: IConnection = mysql.createConnection(config);

            connection.connect((error: IError) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(connection);
                }
            });

        })

    }
}
