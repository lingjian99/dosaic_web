package com.gordon.dosaic;

import java.io.IOException;
import com.sun.jna.*;
import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class Dosaic {
    
    private byte[] bytes = new byte[100*120];
    private String imgFile = "/home/images/1.jpg";
    public Dosaic(){
        for(int i=0; i<100*120; i++){
            bytes[i] = (byte)(i % 7);
        }
    }
    @RequestMapping("/dosaic")
	public void doDosaic(HttpServletRequest request, HttpServletResponse response)throws IOException {
       
        getData();
        if ( "GET".equals( request.getMethod() ) ) 
        { 
            response.setContentType( "application/octet-stream" ); 
            response.setContentLength( 100*120 ); 

            ServletOutputStream out = response.getOutputStream(); 
            out.write( bytes, 0, 100*120); 
        
            out.close(); 
        }
        return; 
    }
    private boolean getData(){

        DosaicSo ds = new DosaicSo();
        ds.doDosaic(imgFile, bytes);
        for(int i=0; i<100*120; i++){
            if(bytes[i] > 6)
                bytes[i] = 6; // (byte)(i % 7);
        }
        return true;
    }
}




class DosaicSo{

   // This is the standard, stable way of mapping, which supports extensive
    // customization and mapping of Java to native types.

    public interface CLibrary extends Library {
        CLibrary INSTANCE = Native.load("dosaic", CLibrary.class);
		void getBlockData(String file, byte[] imgData);

    }

    public void doDosaic(String file, byte[] imgData){
        CLibrary.INSTANCE.getBlockData("this is a string", imgData);
    }

}
