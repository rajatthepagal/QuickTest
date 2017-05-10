
package com.model.quickTest;

import java.sql.Connection;
import java.sql.Statement;


public class performa {
    private int studentId;
    private int testId;
    private int marks = 0;
    private String response="";
    private String remark = "none";
    
    
    public void viewData()
    {
        System.out.println(this.studentId);
        System.out.println(this.testId);
        System.out.println(this.marks);
        System.out.println(this.response);
        System.out.println(this.remark);
    }
    
    
    public int createDB(Connection dbObj)
    {
        try
        {
            Statement state = dbObj.createStatement();
            state.execute("CREATE TABLE IF NOT EXISTS performa(\n" +
                               "    studentId   INT NOT NULL,\n" +
                               "    testId      INT NOT NULL,\n" +
                               "    response    VARCHAR(50) DEFAULT ' ',\n" +
                               "    marks       INT         DEFAULT  0, \n" +
                               "    remark      VARCHAR(50) DEFAULT 'none' \n" +
                               ");");
            return 1;
        }
        catch(Exception ex)
        {
            System.out.println(ex);
            return 0;
        }
    
    }
    
    
    
    public int insertPerforma(String response)
    {
        try
        {
            return 1;
        }
        catch(Exception ex)
        {
            System.out.println(ex);
            return 0;
        }
    
    }
    
    public int insertIntoDB(Connection dbObj)
    {
        try{
        
            return 1;
        }catch(Exception ex){
            System.out.println(ex);
            return 0;
        }
    }
            
    
}
