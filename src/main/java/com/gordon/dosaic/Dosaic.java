package com.gordon.dosaic;

import com.sun.jna.*;

public class Dosaic{

   // This is the standard, stable way of mapping, which supports extensive
    // customization and mapping of Java to native types.

    public interface CLibrary extends Library {

        
        
        CLibrary INSTANCE = (CLibrary) Native.load("dosaic", CLibrary.class);
		void do_dosaic(WString file);
    }

    public void dosaic(String file){
        
        //CLibrary.INSTANCE.do_dosaic1();
        //String str = "/images/2.jpg";
        WString ws = new WString(file);
        CLibrary.INSTANCE.do_dosaic(ws);
    }

}
