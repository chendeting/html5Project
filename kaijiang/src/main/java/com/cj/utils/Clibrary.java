package com.cj.utils;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;


public class Clibrary {


    /**
     * 初始化数据库连接
     */
    public static Connection getConnection(String driver, String url, String userName, String password) {
        Connection connection = null;
        try {
            Class.forName(driver);
            connection = DriverManager.getConnection(url, userName, password);
        } catch (ClassNotFoundException e) {
            e.printStackTrace();
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return connection;
    }

    /**
     * 关闭数据库连接
     */
    public static void closeConnection(Connection connection) {
        if (null != connection) {
            try {
                connection.close();
            } catch (SQLException e) {
                e.printStackTrace();
            }
        }
    }


}
